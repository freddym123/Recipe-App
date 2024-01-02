import Ingridients from "./Ingridients"
export default function RecipeIngridients({lookingAtRecipe, closeRecipe, ingredients, seeInstruction, recipeName}){
    return(
        <div className="recipeIngridientWrapper" style={{display: lookingAtRecipe?"block":"none"}}>
            <div className="recipeIngridientHeader">
                <div className="dishName">{recipeName}</div>
                <div className="recipeHeaderBtns">
                    <div className="closeIngridient"><i className="fa-solid fa-arrow-left-long" onClick={closeRecipe}></i></div>
                    <div className="startCooking" onClick={seeInstruction}>Start Cooking <i className="fa-solid fa-arrow-right-long"></i></div>
                </div>
                
            </div>
            
            <Ingridients ingridients={ingredients}></Ingridients>
            
        </div>
    )
}