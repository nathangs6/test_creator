import { useState, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
import { SmallModal } from '../modals/modal.js';
import { CollectionContext } from '../../context/CollectionContext.js';
import modalStyles from '../modals/modal.module.css';

export function NewCollectionForm({ setOpen, username }) {
    const { addCollection } = useContext(CollectionContext);
    const API = useAPIPrivate();
    const modalTitle = "New Collection";
    const [name, setName] = useState("Enter Name");
    const [id, setID] = useState(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/collection/"+username, {newCollectionName: name});
            if (response) {
                addCollection(response.data.data.collectionData);
                setOpen(false);
            }
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
    const API = useAPIPrivate();
    const modalTitle = "Rename Collection";
    const [name, setName] = useState(collectionData.name);
    const [id, setID] = useState(collectionData.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.put("/collection/"+id, {newCollectionName: name});
        if (response) {
            updateCollection(response.data.data.collectionData);
            setOpen(false);
        }
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newCollectionName">New Collection Name: </label>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newCollectionName"
            value={name}
            onChange={e => setName(e.target.value)}
            required/><br/>
    </SmallModal>);
};

export function DeleteCollectionForm({ setOpen, collectionData }) {
    const {deleteCollection} = useContext(CollectionContext);
    const API = useAPIPrivate();
    const modalTitle = "Delete Collection";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.delete("/collection/"+collectionData.id, {});
        if (response) {
            deleteCollection(collectionData.id);
            setOpen(false);
        }
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Are you sure you want to delete collection {collectionData.name}?
    </SmallModal>);
};
