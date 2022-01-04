import { createContext, useContext, useEffect, useReducer, useState } from 'react'


const GlobalContext = createContext()

function GlobalContextProvider({ children }) {

    const [isLoading, setIsSpinnerLoading] = useState(true)


    const GlobalContextData = {
        isLoading,
        setIsSpinnerLoading
    }

    return (
        <GlobalContext.Provider value={GlobalContextData} >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
export function useGlobalContext() {
    return useContext(GlobalContext)
} 