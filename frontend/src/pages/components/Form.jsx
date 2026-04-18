import { useEffect, useState } from "react";
import "./assets/styles/Form.css"
import Spiner from "./Spiner";
import { FaAngleUp, FaTimesCircle } from "react-icons/fa";
import { FaAngleDown, FaTurnDown } from "react-icons/fa6";

export var formElement;

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

    const [openGroups, setOpenGroups] = useState({});

    const toggleGroup = (name) => {
        setOpenGroups((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };
    
    const formToggle = () => toggleForm === 'on' ? setToggleForm('off'): setToggleForm('on');

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
                if(element.checked) {
                    data.append(element.name, element.value);
                }

            }else if(element.type === 'radio'){
                if(element.checked){
                    data.append(element.name, element.value);
                }
            }
            else {
                if(element.value.trim() !== ""){
                    data.append(element.name, element.value);
                }
            } 
        });

        await onSubmit(data);
        setSpin(false);
    }

    useEffect(()=>{
        const form = document.getElementsByTagName('form');
        formElement = form;
    })

    if(form) return (
        <div className={`form-main ${toggleForm}`}>
            <div className="form-card">
                <button className={`formToggle-btn`} onClick={formToggle}><FaTimesCircle /> Close</button>
                <h1>{form.title}</h1>
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

                                    field.field === "checkbox"?
                                        <>
                                        <div className={`check-parent`}>
                                            <label> {field.label} </label>
                                            <div onClick={() => toggleGroup(field.name)} style={{ cursor: "pointer" }} >
                                                {openGroups[field.name] ? <FaAngleUp className="check-ico" /> : <FaAngleDown className="check-ico" />}
                                            </div>
                                        </div>
                                        <div className={`checkbox-group ${openGroups[field.name] ? "open":"closed"}`}>
                                            {field.options.map((option, ind)=>(
                                                <div key={ind} className='check-items'>
                                                    <input type='checkbox'
                                                        name={field.name}
                                                        value={option.value}
                                                        checked={option.checked} 
                                                        required={option.required} />

                                                    <span>{option.text}</span>
                                                </div>
                                            ))}
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