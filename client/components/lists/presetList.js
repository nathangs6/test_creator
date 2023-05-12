import { useState, useEffect, useContext } from 'react';
import { NewPresetModal, EditPresetModal, DeletePresetModal } from '../../components/modals/presetModals.js';
import { PresetContext } from '../../context/PresetContext.js';
import API from '../../apis/api.js';

export function newPreset(username) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button onClick={() => setOpen(true)}>New Preset</button>
        {isOpen && <NewPresetModal setOpen={setOpen} username={username}/>}
    </>);
};

function EditPreset(props) {
    const [isOpen, setOpen] = useState(false);
    const presetData = {
        owner: props.username,
        id: props.id,
        name: props.name,
        preamble: props.preamble,
        sep: props.sep,
        postamble: props.postamble
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
        {isOpen && <EditPresetModal setOpen={setOpen} presetData={presetData}/>}
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
        {isOpen && <DeletePresetModal setOpen={setOpen} presetData={presetData}/>}
    </>);
};

export function PresetListItem(id, name, preamble, sep, postamble, username) {
    return (
        <tr>
            <td><input type="radio" name="presetSelection" value={id} required/></td>
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
                setPresets(response.data.data.presetData)
                console.log(presets);
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
                        return PresetListItem(id, name, preamble, sep, postamble, props.username)
                    })}
                </tbody>
            </table>
    );
};
