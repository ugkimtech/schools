import "./assets/styles/StatCardsGrid.css"

export default function StatCardsGrid({data=[]}){
    // state = {positive, warning, & change}

    return (
        <>
            <div className="stats-grid">

                {
                    data.map((item, index)=> (
                        <div key={index} className="stat-card">
                            <div className="stat-icon students">{item.icon}</div>
                            <div className="stat-content">
                                {item.title}
                                <div className="stat-value">{item.value}</div>
                                <span className={`stat-change ${item.state}`}>{item.comment}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}