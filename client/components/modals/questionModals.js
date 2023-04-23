import { BigModal, SmallModal } from './modal.js'
import modalStyles from './modal.module.css'

function QuestionModal({ setOpen, modalTitle, apiCall, questionData }) {
    return (<BigModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="confirm">
        <label htmlFor="newQuestionName">Question Name:  </label><br/>
        <input
            type="text"
            className={modalStyles.smallTextarea}
            name="newQuestionName"
            defaultValue={questionData.name}
            required/>
        <label htmlFor="newQuestionContent">Question Content: </label><br/>
        <textarea
            className={modalStyles.largeTextarea}
            name="newQuestionContent"
            defaultValue={questionData.content}
            required/>
        <label htmlFor="newQuestionSource">Question Source: </label><br/>
        <textarea
            className={modalStyles.mediumTextarea}
            name="newQuestionSource"
            defaultValue={questionData.source}
            required/>
    </BigModal>);
};

function NewQuestionModal({ setOpen, username, subCollectionID, subCollectionName }) {
    const questionData = {
        owner: subCollectionName,
        id: null,
        name: "Name",
        content: "Prove \$1 + 1 = 2\$.",
        source: "Somewhere"
    };
    const modalTitle = "New Question For " + subCollectionName;
    const apiCall = {
        URL: "http://localhost:3001/api/question/new/" + username + "?subCollectionID=" + subCollectionID,
        method: "POST"
    };
    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} questionData={questionData}/>
};

function EditQuestionModal({ setOpen, questionData }) {
    const modalTitle = "Edit Preset " + questionData.name;
    const apiCall = {
        URL: "http://localhost:3001/api/question/update/" + questionData.id,
        method: "POST"
    };
    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} questionData={questionData}/>
};

function DeleteQuestionModal({ setOpen, subCollectionID, questionData }) {
    const modalTitle = "Delete Question " + questionData.name;
    const apiCall = {
        URL: "http://localhost:3001/api/question/delete/" + questionData.id + "?subCollectionID=" + subCollectionID,
        method: "POST"
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete question {questionData.name}?
    </SmallModal>);
};

export { NewQuestionModal }
export { EditQuestionModal }
export { DeleteQuestionModal }
