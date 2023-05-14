import { useState, useEffect, useContext } from 'react';
import { NewQuestionForm, EditQuestionForm, DeleteQuestionForm } from '../../components/modals/questionModals.js';
import { QuestionContext } from '../../context/QuestionContext.js';
import API from '../../apis/api.js';

export function NewQuestion(props) {
    const [isOpen, setOpen] = useState(false);

    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Question</button>
        {isOpen && <NewQuestionForm setOpen={setOpen} username={props.username} subCollectionID={props.id} subCollectionName={props.name}/>}
    </>);
};

function EditQuestion(props) {
    const [isOpen, setOpen] = useState(false);
    const currentData = {
        owner: props.owner,
        id: props.id,
        name: props.name,
        content: props.content,
        source: props.source
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
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
        <button onClick={() => setOpen(true)}>Delete</button>
        {isOpen && <DeleteQuestionForm setOpen={setOpen} subCollectionID={ownerID} questionData={questionData}/>}
    </>);
};

export function QuestionListItem(id, name, content, source, subCollectionID, subCollectionName) {
    return (
        <li key={id}>{name} &nbsp;&nbsp; 
            <EditQuestion owner={subCollectionName} id={id} name={name} content={content} source={source}/>&nbsp;&nbsp;
            <DeleteQuestion ownerID={subCollectionID} questionID={id} questionName={name}/>
        </li>
    )
}

export function QuestionList({subCollectionID, subCollectionName}) {
    const {questions, setQuestions} = useContext(QuestionContext);
    useEffect(() => {
        try {
            const fetchQuestions = async () => {
                console.log("Fetching questions for subcollection " + subCollectionID + "!");
                const response = await API.get("/question/"+subCollectionID);
                setQuestions(response.data.data.questionData);
            }
            fetchQuestions();
        } catch(err) {
            console.log(err);
        };
    }, []);
    if (Object.keys(questions).length === 0) {
        return ;
    };
    return (
        <ul>
            {questions.map(({ id, name, content, source }) => {
                return QuestionListItem(id, name, content, source, subCollectionID, subCollectionName)
            }
            )}
        </ul>
    );
};

