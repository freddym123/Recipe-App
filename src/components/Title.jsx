export default function Title({showForm, username}){
    return (
        <header>
            Terrific Chef
            <button onClick={showForm} style={{display: sessionStorage.getItem("loggedIn")? "none": "block"}}>Sign In</button>
            {sessionStorage.getItem("loggedIn") ? <div className="username">{username}</div>:""}
        </header>
    )
}