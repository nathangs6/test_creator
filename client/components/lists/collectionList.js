import { useState, useEffect, useContext } from 'react';
import { NewSubCollection, SubCollectionList } from '../../components/lists/subCollectionList.js';
import { NewCollectionForm, RenameCollectionForm, DeleteCollectionForm } from '../../components/modals/collectionModals.js';
import { CollectionContext } from '../../context/CollectionContext.js';
import { SubCollectionContextProvider } from '../../context/SubCollectionContext.js';
import API from '../../apis/api.js';

export function NewCollection({ username }) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Collection</button>
        {isOpen && <NewCollectionForm setOpen={setOpen} username={username}/>}
    </>);
};

function RenameCollection(props, collectionOwner, collectionID, collectionName) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: props.username,
        id: props.id,
        name: props.name
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)}>Rename</button>
        {isOpen && <RenameCollectionForm setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};

function DeleteCollection(props, username, collectionID, collectionName) {
    const [isOpen, setOpen] = useState(false);
    const collectionData = {
        owner: props.username,
        id: props.id,
        name: props.name
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteCollectionForm setOpen={setOpen} collectionData={collectionData}/>}
    </>);
};
export function CollectionListItem(id, name, username, handleChange) {
    return (
        <li key={id}>{name}&nbsp;&nbsp;
            <RenameCollection username={username} id={id} name={name}/>&nbsp;
            <DeleteCollection username={username} id={id} name={name}/>&nbsp;
            <SubCollectionContextProvider>
                <NewSubCollection id={id} name={name}/>
                <SubCollectionList collectionID={id} username={username} handleChange={handleChange}/>
            </SubCollectionContextProvider>
        </li>
    );
}

export function CollectionList(props) {
    const {collections, setCollections} = useContext(CollectionContext);
    useEffect(() => {
        try {
            const fetchCollections = async () => {
                const response = await API.get("/collection/"+props.username);
                setCollections(response.data.data.collectionData);
            }
            fetchCollections();
        } catch(err) {
            console.log(err);
        };
    },[]);
    if (Object.keys(collections).length === 0) {
        return ;
    };
    return (
        <ul>
            {collections.map(({ id, name }) => {
                return CollectionListItem(id, name, props.username, props.handleChange)
            })}
        </ul>
    );
};

