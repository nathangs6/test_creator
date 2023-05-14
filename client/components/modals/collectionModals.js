import { useState, useContext } from 'react';
import API from '../../apis/api.js';
import { SmallModal } from './modal.js';
import { CollectionContext } from '../../context/CollectionContext.js';

export function NewCollectionForm({ setOpen, username }) {
    const { addCollection } = useContext(CollectionContext);
    const modalTitle = "New Collection";
    const [name, setName] = useState("Enter Name");
    const [id, setID] = useState(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/collection/new/"+username, {newCollectionName: name});
            addCollection(response.data.data.collectionData);
            setOpen(false);
        } catch(err) {
            console.log(err);
        };
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            name="newCollectionName"
            value={name}
            onChange={e => setName(e.target.value)}
            required/>
    </SmallModal>);
};

export function RenameCollectionForm({ setOpen, collectionData }) {
    const {updateCollection} = useContext(CollectionContext);
    const modalTitle = "Rename Collection";
    const [name, setName] = useState(collectionData.name);
    const [id, setID] = useState(collectionData.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.post("/collection/rename/"+id, {newCollectionName: name});
        updateCollection(response.data.data.collectionData);
        setOpen(false);
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            name="newCollectionName"
            value={name}
            onChange={e => setName(e.target.value)}
            required/><br/>
    </SmallModal>);
};

export function DeleteCollectionForm({ setOpen, collectionData }) {
    const {deleteCollection} = useContext(CollectionContext);
    const modalTitle = "Delete Collection";

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/collection/delete/"+collectionData.id, {});
        deleteCollection(collectionData.id);
        setOpen(false);
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Are you sure you want to delete collection {collectionData.name}?
    </SmallModal>);
};
