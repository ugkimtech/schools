import Form from "./components/Form";
import Page from "./components/Page";

export default function NewDepartment(){
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
    //     button:{text:'btn'} //dep_name = models.CharField(max_length=50)
    // dep_head
    // }

    const components = [
        <Form form={{
            title: 'Create A New Department', fields:[
                {field:'input', label:'Department Name', type:'text', name:'department_name', placeholder:'Enter name of department'},
                {field:'dropdown', label:'Head of Department', name:'head', options:[
                    {value:'', option:'Select From Staff'}
                ]}
            ],
            button:{text: 'Create'}
        }} />
    ]

    return (
        <Page
            sideBar={false}
            topBar={true} 
            components={components} 
        />
    );
}