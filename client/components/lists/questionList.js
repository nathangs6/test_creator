import { useState, useEffect, useContext } from 'react';
import useAPIPrivate from '../../hooks/useAPIPrivate.js';
import { QuestionContext } from '../../context/QuestionContext.js';
import { NewQuestionForm, EditQuestionForm, DeleteQuestionForm } from '../../components/forms/questionForms.js';
import listStyles from './list.module.css';
import buttonStyles from '../buttons.module.css';

export function NewQuestion({ username, subCollectionID, subCollectionName }) {
    const [isOpen, setOpen] = useState(false);

    return (<>
        <div className={listStyles.newQuestion}>
            <button type="button" onClick={() => setOpen(true)} className={[listStyles.maxWidth, buttonStyles.listNew].join(" ")}>New Question</button>
        </div>
        {isOpen && <NewQuestionForm setOpen={setOpen} username={username} subCollectionID={subCollectionID} subCollectionName={subCollectionName}/>}
    </>);
};

function EditQuestion({ owner, id, name, content, source }) {
    const [isOpen, setOpen] = useState(false);
    const currentData = {
        owner: owner,
        id: id,
        name: name,
        content: content,
        source: source
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listEdit}>Edit</button>
        {isOpen && <EditQuestionForm setOpen={setOpen} currentData={currentData}/>}
    </>);
};

function DeleteQuestion({ ownerID, questionID, questionName }) {
    const [isOpen, setOpen] = useState(false);
    const questionData = {
        id: questionID,
        name: questionName
    };
    return (<>
        <button onClick={() => setOpen(true)} className={buttonStyles.listDelete}>Delete</button>
        {isOpen && <DeleteQuestionForm setOpen={setOpen} subCollectionID={ownerID} questionData={questionData}/>}
    </>);
};

function QuestionListItem({ id, name, content, source, subCollectionID, subCollectionName }) {
    return (
        <li key={id} className={listStyles.questionListItem}>
            <span className={listStyles.expandElement}>{name}</span> 
            <EditQuestion owner={subCollectionName} id={id} name={name} content={content} source={source} className={listStyles.fixedElement}/>&nbsp;&nbsp;
            <DeleteQuestion ownerID={subCollectionID} questionID={id} questionName={name} className={listStyles.fixedElement}/>
        </li>
    )
}

export function QuestionList({ username, subCollectionID, subCollectionName }) {
    const {questions, setQuestions} = useContext(QuestionContext);
    const API = useAPIPrivate();
    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await API.get("/question/"+subCollectionID);
            if (response) {
                setQuestions(response.data.data.questionData);
            }
        }
        try {
            fetchQuestions();
        } catch(err) {
            console.log(err);
        };
    }, []);
    return (<ul>
        {questions && questions.map(({ id, name, content, source }) => {
            return <QuestionListItem key={id} id={id} name={name} content={content} source={source} subCollectionID={subCollectionID} subCollectionName={subCollectionName}/>
        })}
        <li><NewQuestion username={username} subCollectionID={subCollectionID} subCollectionName={subCollectionName}/></li>
    </ul>);
};

