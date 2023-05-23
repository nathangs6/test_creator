import React, { useState, createContext } from 'react';

export const CollectionContext = createContext();

export const CollectionContextProvider = (props) => {
    const [collections, setCollections] = useState([]);

    const addCollection = (collection) => {
        setCollections([...collections, collection]);
    };

    const deleteCollection = (id) => {
        setCollections(collections.filter(collection => {
            return collection.id !== id;
        }));
    };

    const updateCollection = (collectionData) => {
        const newCollections = collections.filter(collection => {
            return collection.id !== collectionData.id;
        });
        setCollections([...newCollections, collectionData]);
    };

    return (
        <CollectionContext.Provider value={{collections, setCollections, addCollection, deleteCollection, updateCollection}}>
            {props.children}
        </CollectionContext.Provider>
    );
};
