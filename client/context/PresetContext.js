import React, { useState, createContext } from 'react';

export const PresetContext = createContext();

export const PresetContextProvider = (props) => {
    const [presets, setPresets] = useState([]);

    const addPreset = (preset) => {
        setPresets([...presets, preset]);
    };

    const deletePreset = (id) => {
        setPresets(presets.filter(preset => {
            return preset.id !== id;
        }));
    };

    const updatePreset = (presetData) => {
        const newPresets = presets.filter(preset => {
            return preset.id !== presetData.id;
        });
        setPresets([...newPresets, presetData]);
    };

    return (
        <PresetContext.Provider value={{presets, setPresets, addPreset, updatePreset, deletePreset}}>
            {props.children}
        </PresetContext.Provider>
    );
};
