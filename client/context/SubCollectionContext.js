import React, { useState, createContext } from 'react';

export const SubCollectionContext = createContext();

export const SubCollectionContextProvider = (props) => {
    const [subCollections, setSubCollections] = useState([]);

    const addSubCollection = (subCollection) => {
        setSubCollections([...subCollections, subCollection]);
    };

    const deleteSubCollection = (id) => {
        setSubCollections(subCollections.filter(subCollection => {
            return subCollection.id !== id;
        }));
    };

    const updateSubCollection = (subCollectionData) => {
        const newSubCollections = subCollections.filter(subCollection => {
            return subCollection.id !== subCollectionData.id;
        });
        setSubCollections([...newSubCollections, subCollectionData]);
    };

    return (
        <SubCollectionContext.Provider value={{subCollections, setSubCollections, addSubCollection, deleteSubCollection, updateSubCollection}}>
            {props.children}
        </SubCollectionContext.Provider>
    );
};
