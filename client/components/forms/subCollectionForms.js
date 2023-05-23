import { useState, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
import { SubCollectionContext } from '../../context/SubCollectionContext.js';
import { SmallModal } from '../modals/modal.js';
import modalStyles from '../modals/modal.module.css';

export function NewSubCollectionForm({ setOpen, collectionID, collectionName }) {
    const { addSubCollection } = useContext(SubCollectionContext);
    const API = useAPIPrivate();
    const modalTitle = "New Subcollection";
    const [name, setName] = useState("");
    const [id, setID] = useState(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/subcollection/"+collectionID, {newSubCollectionName: name});
            if (response) {
                addSubCollection(response.data.data.subCollectionData);
                setOpen(false);
            }
        } catch(err) {
            console.log(err);
        };
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newSubCollectionName">New Subcollection Name: </label>
        <input
            type="text"
            name="newSubCollectionName"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter subcollection name"
            required/>
    </SmallModal>);
};

export function RenameSubCollectionForm({ setOpen, subCollectionData }) {
    const {updateSubCollection} = useContext(SubCollectionContext);
    const API = useAPIPrivate();
    const modalTitle = "Rename Subcollection";
    const [name, setName] = useState(subCollectionData.name);
    const [id, setID] = useState(subCollectionData.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.put("/subcollection/"+id, {newSubCollectionName: name});
        if (response) {
            updateSubCollection(response.data.data.subCollectionData);
            setOpen(false);
        }
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newSubCollectionName">New Subcollection Name: </label>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newSubCollectionName"
            value={name}
            onChange={e => setName(e.target.value)}
            required/><br/>
    </SmallModal>);
};

export function DeleteSubCollectionForm({ setOpen, subCollectionData }) {
    const {deleteSubCollection} = useContext(SubCollectionContext);
    const API = useAPIPrivate();
    const modalTitle = "Delete Subcollection";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.delete("/subcollection/"+subCollectionData.id, {});
        if (response) {
            deleteSubCollection(subCollectionData.id);
            setOpen(false);
        }
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Are you sure you want to delete subcollection {subCollectionData.name}?
    </SmallModal>);
};
