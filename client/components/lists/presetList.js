import { useState, useEffect, useContext } from 'react';
import { NewPresetModal, NewPresetForm, EditPresetForm, DeletePresetModal, DeletePresetForm } from '../../components/modals/presetModals.js';
import { PresetContext } from '../../context/PresetContext.js';
import API from '../../apis/api.js';

export function NewPreset({username}) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button onClick={() => setOpen(true)}>New Preset</button>
        {isOpen && <NewPresetForm setOpen={setOpen} username={username}/>}
    </>);
};

function EditPreset(props) {
    const [isOpen, setOpen] = useState(false);
    const currentData = {
        owner: props.username,
        id: props.id,
        name: props.name,
        preamble: props.preamble,
        sep: props.sep,
        postamble: props.postamble
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
        {isOpen && <EditPresetForm setOpen={setOpen} currentData={currentData}/>}
    </>);
};

function DeletePreset(props) {
    const [isOpen, setOpen] = useState(false);
    const presetData = {
        owner: props.username,
        id: props.id,
        name: props.name
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeletePresetForm setOpen={setOpen} presetData={presetData}/>}
    </>);
};

export function PresetListItem({ id, name, preamble, sep, postamble, username, handleChange }) {
    return (
        <tr>
            <td><input type="radio"
                form="generate-form"
                name="presetSelection" 
                value={id} 
                onChange={e => handleChange(e)}
                required/></td>
            <td>{name}</td>
            <td><EditPreset username={username} id={id} name={name} preamble={preamble} sep={sep} postamble={postamble}/></td>
            <td><DeletePreset username={username} id={id} name={name}/></td>
        </tr>
    );
}

export function PresetList(props) {
    const {presets, setPresets} = useContext(PresetContext);
    useEffect(() => {
        try {
            const fetchPresets = async () => {
                const response = await API.get("/preset/"+props.username);
                console.log(response.data.data.presetData);
                setPresets(response.data.data.presetData);
            }
            fetchPresets();
        } catch(err) {
            console.log(err);
        };
    },[]);
    if (Object.keys(presets).length === 0) {
        return ;
    };
    return (
            <table key="preset-table">
                <tbody key="preset-tbody">
                    <tr key="preset-heading">
                        <th>Select</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {presets.map(({ id, name, preamble, sep, postamble }) => {
                        return <PresetListItem id={id} name={name} preamble={preamble} sep={sep} postamble={postamble} username={props.username} handleChange={props.handleChange}/>
                    })}
                </tbody>
            </table>
    );
};
