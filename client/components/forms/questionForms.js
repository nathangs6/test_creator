import { useState, useContext } from 'react';
import API from '../../apis/api.js';
import { QuestionContext } from '../../context/QuestionContext.js';
import { BigModal, SmallModal } from '../modals/modal.js';
import modalStyles from '../modals/modal.module.css';

function QuestionModal({ setOpen, modalTitle, handleSubmit, questionData }) {
    return (<BigModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="confirm">
        <label htmlFor="newQuestionName">Question Name:  </label><br/>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newQuestionName"
            value={questionData.name}
            onChange={e => questionData.setName(e.target.value)}
            placeholder={"Name"}
            required/>
        <label htmlFor="newQuestionContent">Question Content: </label><br/>
        <textarea
            className={modalStyles.largeTextarea}
            name="newQuestionContent"
            value={questionData.content}
            onChange={e => questionData.setContent(e.target.value)}
            required/>
        <label htmlFor="newQuestionSource">Question Source: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newQuestionSource"
            value={questionData.source}
            onChange={e => questionData.setSource(e.target.value)}
            required/>
    </BigModal>);
};

export function NewQuestionForm({ setOpen, username, subCollectionID, subCollectionName }) {
    const {addQuestion} = useContext(QuestionContext);
    const modalTitle = "New Question";
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [source, setSource] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Adding question");
        const response = await API.post("/question/new/" + username, {
            newQuestionName: name,
            newQuestionContent: content,
            newQuestionSource: source,
            subCollectionID
        });
        addQuestion(response.data.data.questionData);
        setOpen(false);
    };

    const questionData = {
        name, setName,
        content, setContent,
        source, setSource
    }

    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} questionData={questionData}/>
};

export function EditQuestionForm({ setOpen, currentData }) {
    const {updateQuestion} = useContext(QuestionContext);
    const modalTitle = "Edit Question";
    const [name, setName] = useState(currentData.name);
    const [content, setContent] = useState(currentData.content);
    const [source, setSource] = useState(currentData.source);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.post("/question/update/" + currentData.id, {
            newQuestionName: name,
            newQuestionContent: content,
            newQuestionSource: source
        });
        updateQuestion(response.data.data.questionData);
        setOpen(false);
    };

    const questionData = {
        name, setName,
        content, setContent,
        source, setSource
    }

    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} questionData={questionData}/>

};

export function DeleteQuestionForm({ setOpen, subCollectionID, questionData }) {
    const {deleteQuestion} = useContext(QuestionContext);
    const modalTitle = "Delete Question";

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/question/delete/" + questionData.id, {});
        deleteQuestion(questionData.id);
        setOpen(false);
    };

    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} handleSubmit={handleSubmit} action="delete">
        Are you sure you want to delete question {questionData.name}?
    </SmallModal>);
};
