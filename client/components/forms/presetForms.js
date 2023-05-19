import { useState, useContext } from 'react';
import API from '../../apis/api.js';
import { BigModal, SmallModal } from '../modals/modal.js';
import { PresetContext } from '../../context/PresetContext.js';
import modalStyles from '../modals/modal.module.css';

function PresetModal({ setOpen, modalTitle, handleSubmit, presetData }) {
    return (<BigModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <input
            type="hidden"
            name="owner"
            value={presetData.owner}/>
        <input
            type="hidden"
            name="id"
            value={presetData.id}/>
        <label htmlFor="newPresetName">Preset Name:  </label><br/>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newPresetName"
            value={presetData.name}
            onChange={e => presetData.setName(e.target.value)}
            required/>
        <label htmlFor="newPresetPreamble">Preset Preamble: </label><br/>
        <textarea
            className={modalStyles.largeTextarea}
            name="newPresetPreamble"
            value={presetData.preamble}
            onChange={e => presetData.setPreamble(e.target.value)}
            required></textarea>
        <label htmlFor="newPresetSep">Preset Separator: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newPresetSep"
            value={presetData.sep}
            onChange={e => presetData.setSep(e.target.value)}
            />
        <label htmlFor="newPresetPostamble">Preset Postamble: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newPresetPostamble"
            value={presetData.postamble}
            onChange={e => presetData.setPostamble(e.target.value)}
            required/>
    </BigModal>);
};

export function NewPresetForm({ setOpen, username }) {
    const {addPreset} = useContext(PresetContext);
    const [owner, setOwner] = useState(username);
    const [id, setID] = useState(-1);
    const [name, setName] = useState("Name");
    const [preamble, setPreamble] = useState("\\documentclass{article}\n\\begin{document}");
    const [sep, setSep] = useState("\\hrule");
    const [postamble, setPostamble] = useState("\\end{document}");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/preset/"+owner, {
                newPresetName: name,
                newPresetPreamble: preamble,
                newPresetSep: sep,
                newPresetPostamble: postamble
            });
            addPreset(response.data.data.presetData);
            setOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    const modalTitle = "Create New Preset";
    const presetData = {
        owner, setOwner,
        id, setID,
        name, setName,
        preamble, setPreamble,
        sep, setSep,
        postamble, setPostamble
    };

    return <PresetModal setOpen={setOpen} handleSubmit={handleSubmit} presetData={presetData}/>
};

export function EditPresetForm({ setOpen, currentData }) {
    const {updatePreset} = useContext(PresetContext);
    const [owner, setOwner] = useState(currentData.username);
    const [id, setID] = useState(currentData.id);
    const [name, setName] = useState(currentData.name);
    const [preamble, setPreamble] = useState(currentData.preamble);
    const [sep, setSep] = useState(currentData.sep);
    const [postamble, setPostamble] = useState(currentData.postamble);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put("/preset/"+id, {
                newPresetName: name,
                newPresetPreamble: preamble,
                newPresetSep: sep,
                newPresetPostamble: postamble
            });
            updatePreset(response.data.data.presetData);
            setOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    const modalTitle = "Edit Preset";
    const presetData = {
        owner, setOwner,
        id, setID,
        name, setName,
        preamble, setPreamble,
        sep, setSep,
        postamble, setPostamble
    };

    return <PresetModal setOpen={setOpen} handleSubmit={handleSubmit} presetData={presetData}/>
};

export function DeletePresetForm({ setOpen, presetData }) {
    const {deletePreset, setPresets} = useContext(PresetContext);
    const modalTitle = "Delete Preset";

    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            await API.delete("/preset/"+presetData.id, {});
            deletePreset(presetData.id);
            setOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return <SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Are you sure you want to delete preset {presetData.name}?
    </SmallModal>
}
