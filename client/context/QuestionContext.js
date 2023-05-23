import React, { useState, createContext } from 'react';

export const QuestionContext = createContext();

export const QuestionContextProvider = (props) => {
    const [questions, setQuestions] = useState([]);

    const addQuestion = (question) => {
        setQuestions([...questions, question]);
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(question => {
            return question.id !== id;
        }));
    };

    const updateQuestion = (questionData) => {
        const newQuestions = questions.filter(question => {
            return question.id !== questionData.id;
        });
        setQuestions([...newQuestions, questionData]);
    };

    return (
        <QuestionContext.Provider value={{questions, setQuestions, addQuestion, deleteQuestion, updateQuestion}}>
            {props.children}
        </QuestionContext.Provider>
    );
};
