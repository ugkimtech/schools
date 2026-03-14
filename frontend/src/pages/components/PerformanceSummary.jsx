import "./assets/styles/PerformanceSummary.css";
import { FaArrowRight } from "react-icons/fa";

export default function PerformanceSummary({header={}, performance=[]}){
    // metric is a list inside a performance object eg:
    //  { classname:'S.3', classTeacher:'Kimera', title:'End of term 2', 
    //   metrics: [{title:'Attendence', value:1470, percentage:50}] }
    const setIndicator = (percentage)=> {
        if(percentage > 60){
            return 'success';
        }else if(percentage < 60 && percentage > 40){
            return 'warning';
        }else {
            return 'danger';
        }
    }

    return (
        <>
        <div className="dashboard-card">
            <div className="card-header">
                <h3> {header.icon} {header.title}</h3>
                {
                    header.details ?
                    <button className="view-all-btn">
                        Details <FaArrowRight />
                    </button>:''
                }
            </div>

            <div className="class-stats">
                {
                    performance.map((item, index) => (
                        <div key={index} className="class-stat-item">
                            <div className="class-info">
                                <span className="class-name">{item.classname}</span>
                                <span className="class-teacher">{item.classTeacher}</span>
                            </div>

                            <div className="class-metrics">
                            {
                                item.metrics.map((metric, metricIndex) => (
                                    <div key={metricIndex} className="metric">
                                        <span className="metric-label">{metric.title}</span>
                                        <div className="progress-bar">
                                            <div className={`progress ${setIndicator(metric.percentage)}`} style={{ width: `${metric.percentage}%` }}></div>
                                        </div>
                                        <span className="metric-value">{metric.value} - {metric.percentage}%</span>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    );
}