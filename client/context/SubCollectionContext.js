import React, { useState, createContext } from 'react';

export const SubCollectionContext = createContext();

export const SubCollectionContextProvider = (props) => {
    const [subCollections, setSubCollections] = useState([]);

    return (
        <SubCollectionContext.Provider value={{subCollections, setSubCollections}}>
            {props.children}
        </SubCollectionContext.Provider>
    );
};
