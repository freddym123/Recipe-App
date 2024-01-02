export default function Ingridient({ingridientObj}){
    return <div className="ingridientListItem">
        <div className="image-name">
            <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingridientObj.image}`}></img>
            <div className="ingridientName">{ingridientObj.name}</div>
        </div>
        
        <div className="ingridientAmount">{`${ingridientObj.amount.metric.value} ${ingridientObj.amount.metric.unit}`}</div>
    </div>
}