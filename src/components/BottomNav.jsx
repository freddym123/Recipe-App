import { Link } from "react-router-dom"
export default function BottomNav(){
    function setActive(e){
        const btns = document.querySelectorAll(".navBtn")
        btns.forEach(btn=>{
            btn.classList.remove("active");
        })
        e.currentTarget.classList.add("active")

    }
    return (
        <nav>
            <Link to="/"><button className="navBtn active" onClick={setActive}><i className="fa-solid fa-house fa"></i></button></Link>
            <Link to="/saves"><button className="navBtn" onClick={setActive}><i className="fa-solid fa-bookmark fa"></i></button></Link>
            <Link to="/profile"><button className="navBtn" onClick={setActive}><i className="fa-solid fa-user fa"></i></button></Link>
        </nav>
    )
}