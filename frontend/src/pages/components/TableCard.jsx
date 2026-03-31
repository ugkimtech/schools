import { FaArrowRight } from "react-icons/fa";
import "./assets/styles/TableCard.css"

export default function TableCard({header={}, columns=[], data=[]}){

    // Example:
    // header={title:'Table', icon:<FaTable />, manage:true},
    // columns=[{header:'Col 1', accessor:'one'}, {header:'Col 2', accessor:'two'}], 
    // data=[{one:'Data 1', two:'Data 2'}, {one:'Data 3', two:'Data 4'}]

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
                                                <td key={colIndex}>
                                                    {
                                                        col.accessor === 'photo'?
                                                        <img src={row[col.accessor]} alt="photo"/>:
                                                        row[col.accessor]?row[col.accessor]:'N/A'
                                                    }
                                                </td>
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