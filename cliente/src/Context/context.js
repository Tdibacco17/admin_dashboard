import React, {useState} from "react";

const Context = React.createContext({})

export function DarkMOdeContext ({children}) {
    let local = localStorage.getItem("dark-Mode")

    const [darkMode, setDarkMode] = useState(local === "false" ? false : true);
    
    return (
        <Context.Provider value ={{darkMode, setDarkMode}}>
            {children}
        </Context.Provider>
    )
}

export default Context;