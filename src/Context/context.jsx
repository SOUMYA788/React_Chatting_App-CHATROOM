import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const AppProvider = ({ children, reducerData, reducerUpdateor }) => {
    return (
        <AppContext.Provider value={useReducer(reducerUpdateor, reducerData)}>
            {children}
        </AppContext.Provider>
    )
}

const useCurrentState = () => useContext(AppContext)

export { AppProvider, useCurrentState }