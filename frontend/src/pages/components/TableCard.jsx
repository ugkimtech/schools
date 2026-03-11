import { FaBell } from "react-icons/fa";
import "./assets/styles/TableCard.css"
import { useEffect } from "react";

export default function TableCard({header, th=[], td=[]}){
    useEffect(()=>{
        console.log('td',td)
    })
    return (
        <>
            <div className="dashboard-card">
                <div className="card-header">
                    <h3>{header.icon} {header.title}</h3>
                    {/* <button className="view-all-btn">
                        Manage <FaArrowRight />
                    </button> */}
                </div>
                <div className="table-responsive">
                    <table className="department-table">
                        <thead>
                            <tr>
                                {th.map((item)=> (
                                    <th>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {td.map((data, index) => (
                            <tr key={index}>
                                <td className="dept-name">{data.name}</td>
                                <td className="dept-name">{data.age}</td>
                                <td className="dept-name">{data.dob}</td>
                                <td>
                                    <span className={`badge ${45 >= 90 ? 'success' : 'warning'}`}>
                                        z
                                    </span>
                                </td>
                            </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}