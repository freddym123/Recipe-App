import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './components/Title'
import BottomNav from './components/BottomNav'
import Home from './components/Home'
import Saves from './components/Saves'
import RecipeIngridients from './components/RecipeIngredients'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import axios from "axios"
import Instructions from './components/Instructions'

function App() {
  const [loginForm, setLoginForm] = useState(false);
  const [lookingAtRecipe, setLookingAtRecipe] = useState(false)
  const [lookingAtInstructions, setLookingAtInstructions] = useState(false);
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [recipeId, setRecipeId] = useState("")
  const [instructions, setInstructions] = useState([])
  const [username, setUsername] = useState("The Goat")
  const [recipeName, setRecipeName] = useState("")

  async function getRecipes(){
    await axios.get("https://api.spoonacular.com/recipes/random?apiKey=44f9733afe504aebb4d7524f3c90bc99&number=50").then(res=>{
      setShownRecipes(res.data.recipes);
      localStorage.setItem("all", JSON.stringify(res.data.recipes));
      console.log(JSON.parse(localStorage.getItem("all")));
    }).catch(err=>{console.log(err)})

    console.log("g");
  
  
  }

  async function getSavedRecipes(){
    if(sessionStorage.getItem("loggedIn")){
      setUsername(sessionStorage.getItem("loggedIn"))
      await axios.post("http://127.0.0.1:8000/getsaves", {username:sessionStorage.getItem("loggedIn")}).then(res=>{console.log(res); adjustSavedRecipes(res.data.recipes)}).catch(err=>{console.log(err)})
    }
  }

  useEffect(()=>{
    getRecipes()
    getSavedRecipes()
  }, [])

  function changeRecipeName(string){
    setRecipeName(string)
  }

  function setShownRecipes(recipes){

    setRecipes(recipes)
  }

  function displayUsername(username){
    setUsername(username)
  }
  

  async function seeRecipe(e){
    setRecipeId(e.currentTarget.dataset.recipeid)
    setRecipeName(e.currentTarget.dataset.recipename)
    e.currentTarget.dataset.recipeid == recipeId ? "" :await axios.get(`https://api.spoonacular.com/recipes/${e.currentTarget.dataset.recipeid}/ingredientWidget.json?apiKey=44f9733afe504aebb4d7524f3c90bc99`).then(res=>{setIngredients(res.data.ingredients)})
    
    setLookingAtRecipe(true)
  }

  function adjustSavedRecipes(newList){
    setSavedRecipes(newList);
  }

  function closeRecipe(){
    setLookingAtRecipe(false)
  }

  async function seeInstruction(){
    await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=44f9733afe504aebb4d7524f3c90bc99`).then(res=>{
      setInstructions(res.data)
    })
    setLookingAtInstructions(true)
  }

  function closeInstruction(){
    setLookingAtInstructions(false)
  }

  function showForm(){
    setLoginForm(true)
  }

  function closeForm(){
    setLoginForm(false)
  }



  return (
    <>
      <Login show={loginForm} closeForm={closeForm} displayUsername={displayUsername} adjustSavedRecipes={adjustSavedRecipes}></Login>
      <RecipeIngridients lookingAtRecipe={lookingAtRecipe} closeRecipe={closeRecipe} ingredients={ingredients} seeInstruction={seeInstruction} recipeName={recipeName}></RecipeIngridients>
      <Instructions lookingAtInstructions={lookingAtInstructions} closeInstruction={closeInstruction} instructions={instructions}></Instructions>
      <Title showForm={showForm} username={username}></Title>
      <Routes>
          <Route path="/" element={<Home seeRecipe={seeRecipe} setShownRecipes={setShownRecipes} recipes={recipes} adjustSavedRecipes={adjustSavedRecipes} savedRecipes={savedRecipes} changeRecipeName={changeRecipeName} username={username}/>}></Route>
          <Route path="/saves" element={<Saves seeRecipe={seeRecipe} savedRecipes={savedRecipes} adjustSavedRecipes={adjustSavedRecipes} username={username}/>}></Route>
          <Route path="/profile" element={<Profile displayUsername={displayUsername}></Profile>}></Route>
      </Routes>
      <BottomNav></BottomNav>
    </>
  )
}

export default App
