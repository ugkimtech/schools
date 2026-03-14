import "./assets/styles/Spiner.css"

export default function Spiner({state}){
    return (
        <>
            {
                state == "start" ?
                <div className="main-container">
                    <div className="spiner-container">
                        <div className="spiner"></div>
                    </div>
                </div> :''
            }
        </>
    );
}