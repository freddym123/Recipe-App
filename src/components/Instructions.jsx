export default function Instructions({lookingAtInstructions, closeInstruction, instructions}){
    
    return (<div className="instructionsWrapper" style={{display: lookingAtInstructions?"block":"none"}}>
        <div className="instructionHeader">
            <h2>Instructions</h2>
            <div className="closeInstructions" onClick={closeInstruction}><i className="fa-solid fa-arrow-left-long"></i></div>
        </div>

        {
            instructions.map(item=>{
                return(<div className="itemInstructionContainer">
                    <h2>{item.name == "" ? "":item.name}</h2>
                    {
                        item.steps.map(step=>{
                            return <div className="stepContainer">
                                <h3>Step: {step.number}</h3>
                                <p>{step.step}</p>
                            </div>
                        })
                    }
                </div>)
            })
        }


    </div>)
}