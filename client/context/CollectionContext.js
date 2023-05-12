import React, { useState, createContext } from 'react';

export const CollectionContext = createContext();

export const CollectionContextProvider = (props) => {
    const [collections, setCollections] = useState([]);

    return (
        <CollectionContext.Provider value={{collections, setCollections}}>
            {props.children}
        </CollectionContext.Provider>
    );
};
