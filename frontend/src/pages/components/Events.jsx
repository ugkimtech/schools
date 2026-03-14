import { useEffect, useState } from "react";
import "./assets/styles/Events.css";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";

export default function Events({events=[{item:'football', date:'2/03', details:'sports'},{item:'football', date:'2/03', details:'sports'}]}){
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

                {
                    events ?
                    <div className="events-mini-list"> 
                        {
                            events.map((item, index) => (
                                <div key={index} className="mini-event">
                                    <div className="event-date-mini">
                                        <span className="day">{item.date.split('/')[0]}</span>
                                        <span className="month">{item.date.split('/')[1]}</span>
                                    </div>
                                    <div className="event-info">
                                        <div className="event-title">{item.item}</div>
                                        <div className="event-details">{item.details}</div>
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