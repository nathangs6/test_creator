import { useState, useEffect, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
//import API from '../../apis/api.js';
import { PresetContext } from '../../context/PresetContext.js';
import { NewPresetForm, EditPresetForm, DeletePresetForm } from '../forms/presetForms.js';
import utilStyles from '../../styles/utils.module.css';
import listStyles from './list.module.css';
import buttonStyles from '../buttons.module.css';

export function NewPreset({username}) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button onClick={() => setOpen(true)} className={[buttonStyles.listNew, listStyles.newPresetButton].join(" ")}>New Preset</button>
        {isOpen && <NewPresetForm setOpen={setOpen} username={username}/>}
    </>);
};

function EditPreset({ username, id, name, preamble, sep, postamble }) {
    const [isOpen, setOpen] = useState(false);
    const currentData = {
        owner: username,
        id: id,
        name: name,
        preamble: preamble,
        sep: sep,
        postamble: postamble
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listEdit}>Edit</button>
        {isOpen && <EditPresetForm setOpen={setOpen} currentData={currentData}/>}
    </>);
};

function DeletePreset({ username, id, name }) {
    const [isOpen, setOpen] = useState(false);
    const presetData = {
        owner: username,
        id: id,
        name: name
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listDelete}>Delete</button>
        {isOpen && <DeletePresetForm setOpen={setOpen} presetData={presetData}/>}
    </>);
};

function PresetListItem({ id, name, preamble, sep, postamble, username, handleChange }) {
    return (
        <li>
            <div className={listStyles.presetListItem}>
                <div className={utilStyles.radioContainer}>
                    <input type="radio"
                        form="generate-form"
                        name="presetSelection" 
                        value={id} 
                        onChange={e => handleChange(e)}
                        className={utilStyles.radioInput}
                        required/>
                    <span className={utilStyles.radioSelected}></span>
                </div>
                <span className={listStyles.expandElement}>{name}</span>
                <EditPreset username={username} id={id} name={name} preamble={preamble} sep={sep} postamble={postamble}/>
                <DeletePreset username={username} id={id} name={name}/>
            </div>
        </li>
    );
}

export function PresetList({ username, handleChange }) {
    const {presets, setPresets} = useContext(PresetContext);
    const API = useAPIPrivate();
    useEffect(() => {
        try {
            const fetchPresets = async () => {
                const response = await API.get("/preset/"+username);
                if (response) {
                    setPresets(response.data.data.presetData);
                }
            }
            fetchPresets();
        } catch(err) {
            console.log(err);
        };
    },[]);

    return (<ul className={utilStyles.noMargin}>
        {presets &&
                presets.map(({ id, name, preamble, sep, postamble }) => {
                    return <PresetListItem key={id} id={id} name={name} preamble={preamble} sep={sep} postamble={postamble} username={username} handleChange={handleChange}/>
                })}
        <li><NewPreset username={username}/></li>
    </ul>);
};
