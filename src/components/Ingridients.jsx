import Ingridient from "./Ingridient"
export default function Ingridients({ingridients}){
    return(
        <div className="ingridientsList">
            <div>
                <h4>Ingridients ({ingridients.length})</h4>
                <div className="ingridientListWrapper">
                    {
                        ingridients.map(ingridient=>{
                            return <Ingridient ingridientObj={ingridient} key={ingridient.id}></Ingridient>
                        })
                    }
                </div>
            </div>
        </div>
    )
}