import { SmallModal } from './modal.js'

function NewCollectionModal({ setOpen, username }) {
    const modalTitle = "New Collection For " + username;
    const apiCall = {
        URL: "http://localhost:3001/collectionTemp/new",
        method: "POST"
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

function RenameCollectionModal({ setOpen, collectionData }) {
    const modalTitle = "Rename collection " + collectionData.name;
    const apiCall = {
        URL: "http://localhost:3001/collectionTemp/rename/" + collectionData.id,
        method: "POST"
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            name="newCollectionName"
            value={collectionData.name}
            required/><br/>
    </SmallModal>);
};

function DeleteCollectionModal({ setOpen, collectionData }) {
    const modalTitle = "Delete Collection " + collectionData.name;
    const apiCall = {
        URL: "http://localhost:3001/api/collectionTemp/delete/" + collectionData.id,
        method: "DELETE"
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete collection {collectionData.name}?
    </SmallModal>);
};

function NewSubCollectionModal({ setOpen, collectionName }) {
    const modalTitle = "New Subcollection For " + collectionName;
    const apiCall = {
        URL: "http://localhost:3001/subCollectionTemp/new",
        method: "POST"
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

function RenameSubCollectionModal({ setOpen, subCollectionData }) {
    const modalTitle = "Rename Subcollection " + subCollectionData.name;
    const apiCall = {
        URL: "http://localhost:3001/subCollectionTemp/rename/" + subCollectionData.id,
        method: "POST"
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newSubCollectionName">New Subcollection Name: </label>
        <input
            type="text"
            name="newSubCollectionName"
            value={subCollectionData.name}
            required/><br/>
    </SmallModal>);
};

function DeleteSubCollectionModal({ setOpen, subCollectionData }) {
    const modalTitle = "Delete Subcollection " + subCollectionData.name;
    const apiCall = {
        URL: "http://localhost:3001/api/subCollectionTemp/delete/" + subCollectionData.id,
        method: "DELETE"
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete subcollection {subCollectionData.name}?
    </SmallModal>);
};

export { NewCollectionModal, RenameCollectionModal, DeleteCollectionModal }
export { NewSubCollectionModal, RenameSubCollectionModal, DeleteSubCollectionModal }
