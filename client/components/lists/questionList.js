import { useState, useEffect, useContext } from 'react';
import { NewQuestionModal, EditQuestionModal, DeleteQuestionModal } from '../../components/modals/questionModals.js';
import { QuestionContext } from '../../context/QuestionContext.js';
import API from '../../apis/api.js';

export function GenNewQuestion(props) {
    const [isOpen, setOpen] = useState(false);

    return (<>
        <button type="button" onClick={() => setOpen(true)}>New Question</button>
        {isOpen && <NewQuestionModal setOpen={setOpen} username={props.username} subCollectionID={props.id} subCollectionName={props.name}/>}
    </>);
};

function EditQuestion(props) {
    const [isOpen, setOpen] = useState(false);
    const questionData = {
        owner: props.owner,
        id: props.id,
        name: props.name,
        content: props.content,
        source: props.source
    };
    return (<>
        <button onClick={() => setOpen(true)}>Edit</button>
        {isOpen && <EditQuestionModal setOpen={setOpen} questionData={questionData}/>}
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
        {isOpen && <DeleteQuestionModal setOpen={setOpen} subCollectionID={ownerID} questionData={questionData}/>}
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
                console.log(response);
                setQuestions(response.data.data.questionData);
                console.log(questions);
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

