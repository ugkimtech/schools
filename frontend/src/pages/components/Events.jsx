import { useEffect, useState } from "react";
import "./assets/styles/Events.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function Events({events=[]}){
    
    // Example:
    // events=[{date:'DD/MM', item:'Event1', details:'details'},
    //          {date:'DD/MM', item:'Event2', details:'details'}]
                
    const [eventCount, setEventCount] = useState(0);

    useEffect(()=>{
        var total = 0;
        events.forEach(() => {
            total += 1;
        });
        setEventCount(total);
    });


    return(
        <>
            <div className="dashboard-card">
                <div className="card-header">
                    <h3><FaCalendarAlt /> Upcoming Events</h3>
                    <span className="event-count">{eventCount}</span>
                </div>

                {eventCount===0?'No Events':''}

                {
                    events ?
                    <div className="events-mini-list"> 
                        {
                            events.map((event, index) => (
                                <div key={index} className="mini-event">
                                    <div className="event-date-mini">
                                        <span className="day">{event.date.split('/')[0]}</span>
                                        <span className="month">{event.date.split('/')[1]}</span>
                                    </div>
                                    <div className="event-info">
                                        <div className="event-title">{event.item}</div>
                                        <div className="event-details">{event.details}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div> : ''
                }
            </div>
        </>
    );
}