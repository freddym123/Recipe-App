import axios from "axios"
import apiKey from "../key"

export default function CommonRecipes({setShownRecipes, allIngredients, changeCurrentTab}){

    function setActive(e){
        console.log(e.target)
        if(e.target.classList.contains("commonRecipeBtn")){
            const commonRecipeBtn = document.querySelectorAll(".commonRecipeBtn")
            commonRecipeBtn.forEach((btn)=>{
                btn.classList.remove("active")
            })
            e.target.classList.add("active")
        }
        
    }

    function popularSearch(e){
        let id = e.currentTarget.dataset.similiarid
        let resp = localStorage.getItem(id)
        changeCurrentTab(id)
        if(resp){
            setShownRecipes(JSON.parse(resp))
        }else{
            axios.get(`https://api.spoonacular.com/recipes/${e.currentTarget.dataset.similiarid}/similar?apiKey=${apiKey}&number=50`).then(res=>{
                localStorage.setItem(id, JSON.stringify(res.data))
                setShownRecipes(res.data)
            })
        }

        
        
        
    }

    function setAllIngridient(){
        setShownRecipes(JSON.parse(localStorage.getItem("allItem")))
    }

    return(
    <div className="commonRecipesWrapper" onClick={setActive}>
        <div className="active commonRecipeBtn" data-similiarid="all" onClick={popularSearch}>All</div>
        <div className="commonRecipeBtn" data-similiarid="648506" onClick={popularSearch}>Sushi</div>
        <div className="commonRecipeBtn" data-similiarid="663050" onClick={popularSearch}>Burgers</div>
        <div className="commonRecipeBtn" data-similiarid="716300" onClick={popularSearch}>Pizza</div>
        <div className="commonRecipeBtn" data-similiarid="654928" onClick={popularSearch}>Pasta</div>
        <div className="commonRecipeBtn" data-similiarid="661531" onClick={popularSearch}>Steak</div>
    </div>)
}