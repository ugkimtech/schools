import { useState } from "react";
import "./assets/styles/Form.css"
import Spiner from "./Spiner";


export default function Form({form}){
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
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');

    const getData = (e) => {
        setSpin(true);
        e.preventDefault();

        const form = e.target;
        const elements = form.querySelectorAll("input");
        const data = new FormData();
        elements.forEach(element => {
            if(!element.name) return;
            if(element.type === 'file'){
                if(element.files.length > 0){
                    data.append(element.name, element.files[0]);
                }
            }else {
                data.append(element.name, element.value);
            }
        });
        setFormData(data);
        setSpin(false);
    }

    if(form) return (
        <div className="form-card">
            <h1>{form.title}</h1>
            {error && <p>{error}</p>}
            <form onSubmit={getData} encType="multipart/form-data" className="form">
                {
                    form.fields.map((field, index) => (
                        <div key={index} className="form-item">
                            {
                                field.field === 'dropdown' ?
                                <>
                                    <label>{field.label}</label>
                                    <select name={field.name} required={field.required}>
                                        {field.options.map((option, index) => (
                                            <option key={index} 
                                                    value={option.value}
                                            >{option.option}</option>
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
                                field.field === 'checkbox' ?
                                <>
                                    <label>{field.label}</label>
                                    <input type={field.type} 
                                            checked={field.checked} 
                                            onChange={(e)=> console.log(e.target.checked)} 
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
    );
}