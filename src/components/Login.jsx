import { useState } from "react"
import axios from "axios";
export default function Login({show, closeForm, displayUsername, adjustSavedRecipes}){
    const [signUp, setSignUp] = useState(false);
    const [showSignUpEnd, setShowSignUpEnd] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrMsg] = useState("Missing Required Field")
    const [unfilled, setUnfilled] = useState(false)
    const [email, setEmail] = useState("");
    const [forgotPassword, setforgotPassword] = useState(false)

    function userForgotPassword(){
        setUnfilled(false)
        setUsername("")
        setPassword("")
        if(signUp || forgotPassword){
            setSignUp(false)
            setforgotPassword(false)
        }else{
            setforgotPassword(true)
            setSignUp(false);
        }
        
    }

    function closeSignUpEnd(){
        setShowSignUpEnd(false)

    }

    function userSignUp(){
        setUnfilled(false)
        setUsername("")
        setPassword("")
        setEmail("")
        setSignUp(true)
        
        setforgotPassword(false)
    }

    function verifyEmail(email){
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }

    async function submitForm(e){
        e.preventDefault();

        if(!signUp && !forgotPassword){
            if(username == "" || password == ""){
                setErrMsg("Missing Required Field")
                setUnfilled(true);
                return;
            }
            await axios.post("http://127.0.0.1:8000", {username: username, password: password}).then(res =>{
                let user = res.data
                
                if(user.detail){
                    console.log(user.detail)
                    setErrMsg(user.detail)
                    setUnfilled(true)
                    return
                }
                console.log(res)
                setEmail("")
                setPassword("")
                setUsername("")
                adjustSavedRecipes(res.data.recipes)
                closeForm()

                sessionStorage.setItem("loggedIn", username)
                displayUsername(username)
                })
        }else if(forgotPassword){
            if(email==""){
                setErrMsg("Missing Required Field")
                setUnfilled(true)
                return
            }
            
            if(!verifyEmail(email)){
                setErrMsg("Invalid Email")
                setUnfilled(true)
                return
            }
            
            await axios.post("http://127.0.0.1:8000", {username: "forgot", password: "32"}).then(res =>{console.log(res)})
        }else{
            if(username == "" || password == "" || email == ""){
                setErrMsg("Missing Required Field")
                setUnfilled(true);
                return;
            }

            if(!verifyEmail(email)){
                setErrMsg("Invalid Email")
                setUnfilled(true)
                return
            }
            
            console.log("Signed Up")
            await axios.post("http://127.0.0.1:8000/signup", {"username": username, "password": password, "email":email}).then(res =>{
                console.log(res)
                console.log('detail' in res.data)
                if('detail' in res.data){
                    setErrMsg(res.data.detail)
                    setUnfilled(true)
                    return
                }
                setPassword("")
                setEmail("")
                setUsername("")
                setSignUp(false)
                setforgotPassword(false)
                closeForm()
                setShowSignUpEnd(true)
        })
        }
      }

    return(
    <>
    <div className="signUpPopup" style={{display: showSignUpEnd ? "block": "none"}}>
        <div className="closeLogin" onClick={closeSignUpEnd}>X</div>
        <h3>Thank you for signing up...</h3>
        <p>You can now save recipes</p>
        <div className="singUpLogIn">Sign in</div>
    </div>
    <div className="loginPopup" style={{display: show?"block":"none"}}>

        <div className="closeLogin" onClick={closeForm}>X</div>
        <form onSubmit={submitForm}>
            {
                forgotPassword ? "": <label>
                Username:
                <input type="text" onChange={(e)=>{setUnfilled(false) 
                    setUsername(e.currentTarget.value)}} value={username}></input>
            </label>
            }
            {
                forgotPassword ? "":<label>
                Password:
                <input type="password" onChange={(e)=>{setUnfilled(false)
                    setPassword(e.currentTarget.value)}} value={password}></input>
            </label>
            }
            
            
            {
                signUp || forgotPassword? <label>
                Email:
                <input type="text" onChange={(e)=>{setEmail(e.currentTarget.value); setUnfilled(false)}} value={email}></input>
            </label> :""
            }
            <p className="error" style={{display: unfilled ? "block":"none"}}>{errorMsg}</p>
            <button type="submit" >Submit</button>
            
        </form>
        <div className="loginOptions">
            <div onClick={userForgotPassword}>{forgotPassword || signUp? "Sign In": "Forgot Password"}</div>
            <div onClick={userSignUp}>{forgotPassword? "Sign Up": signUp ? "" : "Sign Up"}</div>
        </div>
    </div>
    </>

    )
}