import { FaArrowRight } from "react-icons/fa";
import "./assets/styles/TableCard.css"

export default function TableCard({header, columns=[], data=[]}){

    return (
        <>
            <div className="dashboard-card">
                <div className="card-header">
                    <h3>{header.icon} {header.title}</h3>
                    {header.manage ? <button className="view-all-btn">
                        Manage <FaArrowRight />
                    </button> :''}
                </div>
                <div className="table-responsive">
                    <table className="department-table">
                        <thead>
                            <tr>
                                {columns.map((item, headerIndex)=> (
                                    <th key={headerIndex}>{item.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index)=> (
                                    <tr key={index}>
                                        {
                                            columns.map((col, colIndex)=> (
                                                <td key={colIndex}>{row[col.accessor]}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}