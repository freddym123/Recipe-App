import { useState } from "react"
import { Url } from "url"
export default function Recipe({recipeObj, seeRecipe, adjustSavedRecipes, savedRecipes}){
    const [save, setSave] = useState(false)
    
    function saveOrNotToSave(e){
        e.stopPropagation()
        setSave(!save)
        if(!save){
            adjustSavedRecipes([...savedRecipes, recipeObj])
        }else{
            const newList = savedRecipes.filter(recipe=>{
                return !(_.isEqual(recipe, recipeObj))
            })
            adjustSavedRecipes(newList)
        }
        console.log(recipeObj)
    }
    return(
        <div data-recipeid={recipeObj.id} className="recipe" onClick={seeRecipe} >
            <button className="save" style={{color: save?"rgb(204, 201, 22)":"white"}} onClick={saveOrNotToSave}><i className="fa-solid fa-bookmark fa"></i></button>
            <img src={`https://spoonacular.com/recipeImages/${recipeObj.id}-480x360.${recipeObj.imageType}`}></img>
            <div className="recipeDesc">
                <h3>{recipeObj.title}</h3>
                <p>{recipeObj.servings ? `${recipeObj.servings} Servings |` : ""} {recipeObj.readyInMinutes ? `${recipeObj.readyInMinutes} Min`:""}</p>
            </div>
        </div>
    )
}