import Recipe from "./Recipe"
export default function Recipes({recipes, seeRecipe, adjustSavedRecipes, savedRecipes, changeRecipeName, username}){
    return(
        <div className="recipesContainer">
            {
                recipes.map((recipe)=>{
                    return <Recipe recipeObj={recipe} key={recipe.id} seeRecipe={seeRecipe} adjustSavedRecipes={adjustSavedRecipes} savedRecipes={savedRecipes} changeRecipeName={changeRecipeName} username={username}></Recipe>
                })
            }
        </div>
    )
}