import { useState, useEffect, useContext } from 'react';
import { NewQuestion, QuestionList } from '../../components/lists/questionList.js';
import { NewSubCollectionForm, RenameSubCollectionForm, DeleteSubCollectionForm } from '../../components/modals/subCollectionForms.js';
import { SubCollectionContext } from '../../context/SubCollectionContext.js';
import { QuestionContextProvider } from '../../context/QuestionContext.js';
import API from '../../apis/api.js';

export function NewSubCollection(props) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Subcollection</button>
        {isOpen && <NewSubCollectionForm setOpen={setOpen} collectionID={props.id} collectionName={props.name}/>}
    </>);
};

function RenameSubCollection(props) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: props.id,
        name: props.name
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)}>Rename</button>
        {isOpen && <RenameSubCollectionForm setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>)
}

function DeleteSubCollection(props) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: props.id,
        name: props.name
    };
    return (<>
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteSubCollectionForm setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>)
}

export function SubCollectionListItem(id, name, username, handleChange) {
    return (
        <li key={id}>
            <input 
                form="generate-form"
                type="number" 
                min="0" 
                defaultValue="0" 
                name={"subCollectionCount" + id}
                step="1" 
                onChange={e => handleChange(e)}
                style={{width: "3em"}}/> {name}&nbsp;&nbsp;
            <RenameSubCollection id={id} name={name}/>&nbsp;&nbsp;
            <DeleteSubCollection id={id} name={name}/>&nbsp;&nbsp;
            <QuestionContextProvider>
                <NewQuestion username={username} id={id} name={name}/>&nbsp;&nbsp;
                <button type="button">Show Questions</button>
                <QuestionList subCollectionID={id} name={name}/>
            </QuestionContextProvider>
        </li>
    )
}

export function SubCollectionList(props) {
    const {subCollections, setSubCollections} = useContext(SubCollectionContext);
    useEffect(() => {
        try {
            const fetchSubCollections = async () => {
                console.log("Fetching subcollections for collection " + props.collectionID + "!");
                const response = await API.get("/subcollection/"+props.collectionID);
                setSubCollections(response.data.data.subCollectionData);
            }
            fetchSubCollections();
        } catch(err) {
            console.log(err)
        };
    },[]);
    if (Object.keys(subCollections).length === 0) {
        return ;
    };
    return (
        <ul>
            {subCollections.map(({ id, name, questions }) => {
                return SubCollectionListItem(id, name, props.username, props.handleChange)
            })}
        </ul>
    )
}

