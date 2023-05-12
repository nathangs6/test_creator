import React, { useState, createContext } from 'react';

export const PresetContext = createContext();

export const PresetContextProvider = (props) => {
    const [presets, setPresets] = useState([]);

    return (
        <PresetContext.Provider value={{presets, setPresets}}>
            {props.children}
        </PresetContext.Provider>
    );
};
