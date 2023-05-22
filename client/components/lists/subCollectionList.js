import { useState, useEffect, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
import { SubCollectionContext } from '../../context/SubCollectionContext.js';
import { NewSubCollectionForm, RenameSubCollectionForm, DeleteSubCollectionForm } from '../../components/forms/subCollectionForms.js';
import { QuestionContextProvider } from '../../context/QuestionContext.js';
import { NewQuestion, QuestionList } from '../../components/lists/questionList.js';
import listStyles from './list.module.css';
import buttonStyles from '../buttons.module.css';

export function NewSubCollection({ collectionID, collectionName }) {
    const [isOpen, setOpen] = useState(false);
    return (<>
        <div className={listStyles.newSubCollection}>
            <button type="button" onClick={() => setOpen(true)} className={[listStyles.maxWidth, buttonStyles.listNew].join(" ")}>New Subcollection</button>
        </div>
        {isOpen && <NewSubCollectionForm setOpen={setOpen} collectionID={collectionID} collectionName={collectionName}/>}
    </>);
};

function RenameSubCollection({ id, name }) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: id,
        name: name
    }
    return (<>
        <button type="button" onClick={() => setOpen(true)} className={buttonStyles.listEdit}>Rename</button>
        {isOpen && <RenameSubCollectionForm setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>)
}

function DeleteSubCollection({ id, name }) {
    const [isOpen, setOpen] = useState(false);
    const subCollectionData = {
        id: id,
        name: name
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listDelete}>Delete</button>
        {isOpen && <DeleteSubCollectionForm setOpen={setOpen} subCollectionData={subCollectionData}/>}
    </>)
}

function SubCollectionListItem({ id, name, username, handleChange }) {
    const [questionView, setQuestionView] = useState(false);
    const changeView = () => {
        if (questionView === false) {
            setQuestionView(true);
        } else {
            setQuestionView(false);
        }
    }

    return (
        <li key={id}>
            <QuestionContextProvider>
                <div className={listStyles.subCollectionListItem}>
                    <input 
                        form="generate-form"
                        type="number" 
                        min="0" 
                        defaultValue="0" 
                        name={"subCollectionCount" + id}
                        step="1" 
                        onChange={e => handleChange(e)}
                        className={listStyles.counterInput}/>
                    <span className={listStyles.expandElement}>{name}</span>
                    <RenameSubCollection id={id} name={name}/>
                    <DeleteSubCollection id={id} name={name}/>
                    <button type="button" onClick={() => changeView()} className={buttonStyles.listOther}>Show Questions</button>
                </div>
                {questionView && <QuestionList username={username} subCollectionID={id} subCollectionName={name} id={"questionList" + id}/>}
            </QuestionContextProvider>
        </li>
    )
}

function hide(subCollectionID) {
    var elementID = "questionList" + subCollectionID
    var questionListElement = document.getElementById(elementID);
    if (questionListElement.style.display === "none") {
        questionListElement.style.display = "block";
    } else {
        questionListElement.style.display = "none";
    }
}

export function SubCollectionList({ collectionID, collectionName, username, handleChange }) {
    const {subCollections, setSubCollections} = useContext(SubCollectionContext);
    const API = useAPIPrivate();
    useEffect(() => {
        try {
            const fetchSubCollections = async () => {
                const response = await API.get("/subcollection/"+collectionID);
                if (response) {
                    setSubCollections(response.data.data.subCollectionData);
                }
            }
            fetchSubCollections();
        } catch(err) {
            console.log(err)
        };
    },[]);

    return (<ul>{subCollections && subCollections.map(({ id, name, questions }) => {
        return <SubCollectionListItem key={id} id={id} name={name} username={username} handleChange={handleChange}/>
    })}
        <li><NewSubCollection collectionID={collectionID} collectionName={collectionName}/></li>
    </ul>);
}

