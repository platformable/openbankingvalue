import { createContext,useState } from "react";


export const ValueContext = createContext()

export const ValueContextProvider = ({children})=>{
    const [user,setUser]=useState({
        selectedTypeOfValue:"",
        typeOfValues:[],
        favorites:[]
    })
    return(
    <ValueContext.Provider value={[user,setUser]}>
        {children}
    </ValueContext.Provider>
    )
}