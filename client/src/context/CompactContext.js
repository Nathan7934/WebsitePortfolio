import React from 'react';
import {createContext, useState} from 'react';

const CompactContext = createContext({
    useCompact: false,
    setUseCompact: () => {}
});

export const CompactContextProvider = ({children}) => {
    const [useCompact, setUseCompact] = useState(window.innerWidth < 900 ? true : false);

    return (
        <CompactContext.Provider value={{useCompact, setUseCompact}}>
            {children}
        </CompactContext.Provider>
    );
}

export default CompactContext;