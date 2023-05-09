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

const NewQuestionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
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
        formSubmit: NewQuestionSubmit
    };
    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} questionData={questionData}/>
};

const EditQuestionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function EditQuestionModal({ setOpen, questionData }) {
    const modalTitle = "Edit Preset " + questionData.name;
    const apiCall = {
        formSubmit: EditQuestionSubmit
    };
    return <QuestionModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} questionData={questionData}/>
};

const DeleteQuestionSubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => body[property] = value);
    console.table(body);
    return false;
};

function DeleteQuestionModal({ setOpen, subCollectionID, questionData }) {
    const modalTitle = "Delete Question " + questionData.name;
    const apiCall = {
        formSubmit: DeleteQuestionSubmit
    };
    return (<SmallModal setOpen={setOpen} modalTitle={modalTitle} apiCall={apiCall} action="delete">
        Are you sure you want to delete question {questionData.name}?
    </SmallModal>);
};

export { NewQuestionModal }
export { EditQuestionModal }
export { DeleteQuestionModal }
