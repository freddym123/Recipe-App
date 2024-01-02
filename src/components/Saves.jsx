import Recipes from "./Recipes";

export default function Saves({seeRecipe, savedRecipes, adjustSavedRecipes, username}){
   
    if(!sessionStorage.getItem("loggedIn")){
        return <div className="notLoggedInWrapper">
            <div>
            <h2>Log In</h2>
            <p>to see saved Recipes...</p>
            </div>
            
        </div>
    }

    return(
        <div className="savedRecipeWrapper">
            <h2>Saved Recipes</h2>
            {
                savedRecipes.length == 0 ? <div>
                    <p>Saved Recipes</p>
                    <p>will be shown here...</p>
                </div>
                : <Recipes recipes={savedRecipes} seeRecipe={seeRecipe} savedRecipes={savedRecipes} adjustSavedRecipes={adjustSavedRecipes} username={username}></Recipes>
            }
           
        </div>
    )
}