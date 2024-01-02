import axios from "axios"
import { useState } from "react"
import { Url } from "url"
export default function Recipe({recipeObj, seeRecipe, adjustSavedRecipes, savedRecipes, username}){
    const [save, setSave] = useState(false)
    const loggedIn = true

    
    function saveOrNotToSave(e){
        e.stopPropagation()

        if(!loggedIn){
            return;
        }

        let newList;


        if(savedRecipes.includes(recipeObj)){
            newList = savedRecipes.filter(recipe=>recipe.id!== recipeObj.id)
            adjustSavedRecipes(savedRecipes.filter(recipe=>recipe.id !== recipeObj.id))
        }else{
            adjustSavedRecipes([...savedRecipes, recipeObj])
            newList = [...savedRecipes, recipeObj]
        }
        console.log(newList)
        const query = {
            username: username,
            recipes: newList
        }
        console.log(query)
        axios.post("http://127.0.0.1:8000/userrecipe", {username: username, recipes: newList})


        console.log(recipeObj)
    }

    function findId(){
        for(let i = 0; i < savedRecipes.length; i++){
            if(savedRecipes[i].id == recipeObj.id){
                return true
            }
            
        }
        return false
    }

    return(
        <div data-recipeid={recipeObj.id} className="recipe" onClick={seeRecipe} data-recipename={recipeObj.title}>
            <button className="save" style={{color: findId()?"rgb(204, 201, 22)":"white"}} onClick={saveOrNotToSave}><i className="fa-solid fa-bookmark fa"></i></button>
            <img src={`https://spoonacular.com/recipeImages/${recipeObj.id}-480x360.${recipeObj.imageType}`}></img>
            <div className="recipeDesc">
                <h3>{recipeObj.title}</h3>
                <p>{recipeObj.servings ? `${recipeObj.servings} Servings |` : ""} {recipeObj.readyInMinutes ? `${recipeObj.readyInMinutes} Min`:""}</p>
            </div>
        </div>
    )
}