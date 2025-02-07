import { useEffect, useState } from "react";

export default function DarkMode(){

    //use states
    const [darkMode, setDarkmode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);

    //use Effects
    useEffect(() => {
        document.body.className = darkMode ? "dark-mode" : "";
    }, [darkMode]);

    //functions 
    function setDarkMode() {
        setDarkmode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode",newMode);
            return newMode;
        });
    }


    return(
        <button className="darkmode-btn" onClick={setDarkMode}>{darkMode ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}</button>
    )
}