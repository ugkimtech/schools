import { useEffect, useState } from "react";
import "./assets/styles/Form.css"
import Spiner from "./Spiner";
import { FaAngleUp, FaTimesCircle } from "react-icons/fa";
import { FaAngleDown, FaTurnDown } from "react-icons/fa6";


export default function Form({form, onSubmit}){
    // Example
    // form={
    //     title:'D-Form', fields:[
    //         {field:'input', label:'Label1',type:'text',name:'name1',placeholder:'Place holder1'},
    //         {field:'checkbox', label:'Check',type:'checkbox',name:'name2', checked:true},
    //         {field:'radio', label:'Label3',type:'radio',name:'name1', value:'value'},
    //         {field:'dropdown', label:'Dropdown', name:'drop', options:[
    //             {value:'',option:'opt1'},
    //             {value:'',option:'opt2'},
    //         ]},
    //     ],
    //     button:{text:'btn'}
    // }

    const [spin, setSpin] = useState(false);
    const [error, setError] = useState('');
    const [toggleForm, setToggleForm] = useState('on');
    const [clicked, setClicked] = useState(false);
    
    const formToggle = () => toggleForm === 'on' ? setToggleForm('off'): setToggleForm('on');

    const checkClick =()=>{
        setClicked(!clicked);
    };

    let departments = [];
    const addDepartment = (e)=> {
        var option = e.target;
        if(option.checked){
            departments.push(option.value);
        }else {
            departments.splice(departments.indexOf(e.target.value),1);
        }
    }

    const getData = async (e) => {
        setSpin(true);
        e.preventDefault();

        const formEl = e.target;
        const data = new FormData();
        const elements = formEl.querySelectorAll("input, select");
        elements.forEach(element => {
            if(!element.name) return;
            if(element.type === 'file'){
                if(element.files.length > 0){
                    data.append(element.name, element.files[0]);
                }
            }else if(element.type === 'checkbox'){
                if(element.checked){
                    data.append(element.name, element.value);
                }
            }else if(element.type === 'radio'){
                if(element.checked){
                    data.append(element.name, element.value);
                }
            }
            else {
                if(element.value != ""){
                    data.append(element.name, element.value);
                }
            } 
        });

        for(let pair of data.entries()){
            console.log(pair[0], pair[1]);
        }

        await onSubmit(data);
        setSpin(false);
    }

    if(form) return (
        <div className={`form-main ${toggleForm}`}>
            <div className="form-card">
                <h1>{form.title}</h1>
                <button className={`formToggle-btn`} onClick={formToggle}><FaTimesCircle /> Close</button>
                {error && <p>{error}</p>}
                <form onSubmit={getData} className="form">
                    {
                        form.fields.map((field, index) => (
                            <div key={index} className="form-item">
                                {
                                    field.field === 'dropdown' ?
                                    <>
                                        <label>{field.label}</label>
                                        <select name={field.name} required={field.required}>
                                            <option value={''}>-select-</option>
                                            {field.options.map((option, index) => (
                                                option.option != 'super_admin' ? 
                                                    <option key={index} 
                                                            value={option.value}>
                                                                {option.option}
                                                    </option>:''
                                            ))}
                                        </select>
                                    </>:
                                    field.field === 'radio' ?
                                    <>
                                        <label>{field.label}</label>
                                        <input type="radio" 
                                                name={field.name} 
                                                value={field.value} 
                                                required={field.required} />
                                    </>:

                                    field.field === 'checkbox' ?<>
                                    <div className={`check-parent ${clicked?'on':'off'}`}>
                                        <label> {field.label} </label>
                                        <button type="button" onClick={checkClick} className="select">{clicked? <FaAngleUp className="check-ico" /> : <FaAngleDown className="check-ico" /> } </button>
                                        {
                                            field.options.map((option, ind)=>(
                                                <div key={ind} className={`check-items ${clicked?'on':'off'}`}>
                                                    <input type='checkbox'
                                                        name={option.name}
                                                        value={option.value}
                                                        checked={option.checked} 
                                                        onChange={(e)=> addDepartment(e)} 
                                                        required={option.required} />

                                                    <span>{option.text}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    </>:

                                    field.field === 'file' ?
                                    <>
                                        <label>{field.label}</label>
                                        <input type={'file'} 
                                                name={field.name} 
                                                required={field.required} />
                                    </>:
                                    <>
                                        <label>{field.label}</label>
                                        <input type={field.type} 
                                                name={field.name} 
                                                placeholder={field.placeholder}
                                                required={field.required} />
                                    </>
                                }
                            </div>
                        ))
                    }
                    <div className="form-item">
                    <button type="submit">{form.button.text}</button>
                    </div>
                </form>
                {spin ? <Spiner state={'start'} />:''}
            </div>
        </div>
    );
}