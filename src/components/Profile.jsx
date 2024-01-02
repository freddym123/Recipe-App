import { useState } from "react"
export default function Profile({displayUsername}){
    const [darkMode, setDarkMode] = useState(true)

    function slideDarkMode(){
        setDarkMode(!darkMode)   
    }
    if(!sessionStorage.getItem("loggedIn")){
        return <div className="notLoggedInWrapper">
        <div>
        <h2>Log In</h2>
        <p>to change profile settings...</p>
        </div>
        
    </div>
    }

    function userSignOut(){
        displayUsername("")
        sessionStorage.removeItem("loggedIn")
    }
    return(
        <>
            <div className="settingWrapper">
                <button className="signOut" onClick={userSignOut}>Sign Out</button>
                <div className="settings">
                    <div className="settingItem">
                        <div>Dark Mode</div>
                        <div className={darkMode ? "sliderContainer green":"sliderContainer"} onClick={slideDarkMode}><div className={darkMode?"slider slideRight":"slider"}></div></div>
                    </div>
                    <div className="settingItem">Remove all Saves</div>
                </div>
            </div>
        </>
    )
}