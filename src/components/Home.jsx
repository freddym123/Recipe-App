import CommonRecipes from "./CommonRecipes"
import Recipes from "./Recipes"
import { useEffect, useState } from "react"
import axios from "axios";



export default function Home({seeRecipe, setShownRecipes, recipes, allIngredients, adjustSavedRecipes, savedRecipes, changeRecipeName, username}){
    
    const [searchVal, setSearchVal] = useState("");
    const [currentTab, setCurrentTab] = useState("all")

    function changeCurrentTab(id){
        setCurrentTab(id)
    }


    useEffect(()=>{

        if(recipes.length != 0 && searchVal.trim() == ""){
            setShownRecipes(JSON.parse(localStorage.getItem(currentTab)))
            return
        }
        const timeout = setTimeout(async ()=>{

            await axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=44f9733afe504aebb4d7524f3c90bc99&number=25&query=${searchVal}`).then(res=>{
                setShownRecipes(res.data)
            })
        }, 500)
        return ()=>{clearTimeout(timeout)}
    }, [searchVal])

    function inputChange(e){
        setSearchVal(e.currentTarget.value)
    }

    return(
        <div className="homeContentWrapper">
            <h2>Find the Best Recipe</h2>
            <h2>For Cooking</h2>
            <input type='text' className="search" placeholder="Search Recipe" value={searchVal} onChange={inputChange}></input>
            <CommonRecipes setShownRecipes={setShownRecipes} allIngredients={allIngredients} changeCurrentTab={changeCurrentTab}></CommonRecipes>
            <Recipes recipes={recipes} seeRecipe={seeRecipe} adjustSavedRecipes={adjustSavedRecipes} savedRecipes={savedRecipes} changeRecipeName={changeRecipeName} username={username}></Recipes>
        </div>
    )
}