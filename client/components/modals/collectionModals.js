import { SmallModal } from './modal.js'


const NewCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function NewCollectionModal({ setOpen, username }) {
    const modalTitle = "New Collection For " + username;
    const apiCall = {
        formSubmit: NewCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            name="newCollectionName"
            placeholder="Enter collection name"
            required/><br/>
    </SmallModal>);
};

const RenameCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function RenameCollectionModal({ setOpen, collectionData }) {
    const modalTitle = "Rename collection " + collectionData.name;
    const apiCall = {
        formSubmit: RenameCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            name="newCollectionName"
            defaultValue={collectionData.name}
            required/><br/>
    </SmallModal>);
};

const DeleteCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function DeleteCollectionModal({ setOpen, collectionData }) {
    const modalTitle = "Delete Collection " + collectionData.name;
    const apiCall = {
        formSubmit: DeleteCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete collection {collectionData.name}?
    </SmallModal>);
};

const NewSubCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function NewSubCollectionModal({ setOpen, collectionID, collectionName }) {
    const modalTitle = "New Subcollection For " + collectionName;
    const apiCall = {
        formSubmit: NewSubCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newSubCollectionName">New Subcollection Name: </label>
        <input
            type="text"
            name="newSubCollectionName"
            placeholder="Enter subcollection name"
            required/><br/>
    </SmallModal>);
};

const RenameSubCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function RenameSubCollectionModal({ setOpen, subCollectionData }) {
    const modalTitle = "Rename Subcollection " + subCollectionData.name;
    const apiCall = {
        formSubmit: RenameSubCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newSubCollectionName">New Subcollection Name: </label>
        <input
            type="text"
            name="newSubCollectionName"
            defaultValue={subCollectionData.name}
            required/><br/>
    </SmallModal>);
};

const DeleteSubCollectionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function DeleteSubCollectionModal({ setOpen, subCollectionData }) {
    const modalTitle = "Delete Subcollection " + subCollectionData.name;
    const apiCall = {
        formSubmit: DeleteSubCollectionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete subcollection {subCollectionData.name}?
    </SmallModal>);
};

export { NewCollectionModal, RenameCollectionModal, DeleteCollectionModal }
export { NewSubCollectionModal, RenameSubCollectionModal, DeleteSubCollectionModal }
