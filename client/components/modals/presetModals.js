import { BigModal, SmallModal } from './modal.js'
import modalStyles from './modal.module.css'

function PresetModal({ setOpen, modalTitle, apiCall, presetData }) {
    return (<BigModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newPresetName">Preset Name:  </label><br/>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newPresetName"
            defaultValue={presetData.name}
            required/>
        <label htmlFor="newPresetPreamble">Preset Preamble: </label><br/>
        <textarea
            className={modalStyles.largeTextarea}
            name="newPresetPreamble"
            defaultValue={presetData.preamble}
            required></textarea>
        <label htmlFor="newPresetSep">Preset Separator: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newPresetSep"
            defaultValue={presetData.sep}
            />
        <label htmlFor="newPresetPostamble">Preset Postamble: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newPresetPostamble"
            defaultValue={presetData.postamble}
            required/>
    </BigModal>);
};

const NewPresetSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function NewPresetModal({ setOpen, username }) {
    const presetData = {
        owner: username,
        id: null,
        name: "Name",
        preamble: "\\documentclass{article}\n\\begin{document}",
        sep: "\\hrule",
        postamble: "\\end{document}"
    };
    const modalTitle = "New Preset For " + username;
    const apiCall = {
        formSubmit: NewPresetSubmit
    };
    return <PresetModal 
        setOpen={setOpen}
        modalTitle={modalTitle} 
        presetData={presetData} 
        apiCall={apiCall}
    />
};

const EditPresetSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function EditPresetModal({ setOpen, presetData }) {
    const modalTitle = "Edit Preset " + presetData.name;
    const apiCall = {
        formSubmit: EditPresetSubmit
    };
    return <PresetModal 
        setOpen={setOpen} 
        modalTitle={modalTitle} 
        presetData={presetData} 
        apiCall={apiCall}
    />
};

const DeletePresetSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function DeletePresetModal({ setOpen, presetData }) {
    const modalTitle = "Delete Preset " + presetData.name;
    const apiCall = {
        formSubmit: DeletePresetSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete preset {presetData.name}?
    </SmallModal>);
};

export { NewPresetModal }
export { EditPresetModal }
export { DeletePresetModal }
