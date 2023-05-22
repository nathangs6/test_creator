import { useState, useEffect, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
import { CollectionContext } from '../../context/CollectionContext.js';
import { NewCollectionForm, RenameCollectionForm, DeleteCollectionForm } from '../forms/collectionForms.js';
import { SubCollectionContextProvider } from '../../context/SubCollectionContext.js';
import { NewSubCollection, SubCollectionList } from '../../components/lists/subCollectionList.js';
import utilStyles from '../../styles/utils.module.css';
import listStyles from './list.module.css';
import buttonStyles from '../buttons.module.css';

export function NewCollection({ username }) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button type="button" onClick={() => setOpen(true)} className={[listStyles.newCollectionButton, buttonStyles.listNew].join(" ")}>New Collection</button>
        {isOpen && <NewCollectionForm setOpen={setOpen} username={username}/>}
    </>);
};

function RenameCollection({ username, id, name }) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: username,
        id: id,
        name: name
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)} className={buttonStyles.listEdit}>Rename</button>
        {isOpen && <RenameCollectionForm setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};

function DeleteCollection({ username, id, name }) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: username,
        id: id,
        name: name
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listDelete}>Delete</button>
        {isOpen && <DeleteCollectionForm setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};
function CollectionListItem({ id, name, username, handleChange }) {
    return (
        <li key={id}>
            <SubCollectionContextProvider>
                <div className={listStyles.collectionListItem}>
                    <span className={listStyles.expandElement}>{name}</span>
                    <RenameCollection username={username} id={id} name={name} className={listStyles.fixedItem}/>&nbsp;
                    <DeleteCollection username={username} id={id} name={name} className={listStyles.fixedItem}/>&nbsp;
                </div>
                <SubCollectionList collectionID={id} collectionName={name} username={username} handleChange={handleChange}/>
            </SubCollectionContextProvider>
        </li>
    );
}

export function CollectionList({ username, handleChange }) {
    const {collections, setCollections} = useContext(CollectionContext);
    const API = useAPIPrivate();
    useEffect(() => {
        try {
            const fetchCollections = async () => {
                const response = await API.get("/collection/"+username);
                if (response) {
                    setCollections(response.data.data.collectionData);
                }
            }
            fetchCollections();
        } catch(err) {
            console.log(err);
        };
    },[]);
    return (<ul className={utilStyles.noMargin}>
        {collections &&
                collections.map(({ id, name }) => {
                    return <CollectionListItem key={id} id={id} name={name} username={username} handleChange={handleChange}/>
                })}
        <li><NewCollection username={username}/></li>
    </ul>);
};

