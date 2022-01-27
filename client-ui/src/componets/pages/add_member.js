import $ from 'jquery';
import Notification from '../common/norification';

export class AddNewMember extends Component {

  constructor(props, context){
    super(props, context);
    this.RegisterUser = this.RegisterUser.bind(this);
    this.ShowAndHide = this.ShowAndHide.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.state = {
      pwd:"",
      user_name:"",
      income:"",
      repwd:""
     
    };
  }

  isEmail(val) {
   
       if(val.length ===0){
      return false;
    }else{
      return true;
    }
}

RegisterUser(){
  var data = localStorage.getItem('token');
  console.log(data)
  //const re = new RegExp("^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
  //const isOk = re.test(this.state.pwd);
  //const password_match = this.state.pwd===this.state.repwd;
  const isOk = true;
if(this.state.user_name){
  if(this.state.user_name){
  if(isOk){

    if(isOk){
    var myHeaders = new Headers();
    
    myHeaders.append("Authorization", "Bearer "+data);
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "REGISTER_FAMILY",
  "user_name":this.state.user_name,
  "pwd": "12345",
  "income":this.state.income
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};





fetch("http://localhost/expence/api/register.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    this.ShowAndHide(JSON.parse(result).message_type,JSON.parse(result).state)
  })
  .catch(error => console.log('error', error));
    }else{this.ShowAndHide('Please enter mathing passwords',false)}//repassword
}else{this.ShowAndHide('Password Should contain atleast 8 charactors and upper case and lower case latters',false)}//passowrd
  }else{this.ShowAndHide('Please enter valide income',false)}//passowrd
}else{this.ShowAndHide('User name can\'t be empty',false)}//user_name
}

  ShowAndHide=(message,type)=>{
    $("#notificiation_manager").removeClass();
    if(type){
      $("#notificiation_manager").addClass("alert alert-success");
      $("#notificiation_manager").html(message);
      $("#notificiation_manager").show('slow')
      setTimeout(()=>{
        $("#notificiation_manager").hide('slow')
      },3000)
    }else{
      $("#notificiation_manager").addClass("alert alert-danger");
      $("#notificiation_manager").html(message);
      $("#notificiation_manager").show('slow')
      setTimeout(()=>{
        $("#notificiation_manager").hide('slow')
      },3000)
    }
  }


  render() {
    return (
      <div className="content-wrapper">
        
 <section className="content-header">
   <div className="container-fluid">
     <div className="row mb-2">
       <div className="col-sm-6">
         <h1>Add Family Member</h1>
       </div>
       <div className="col-sm-6">
         <ol className="breadcrumb float-sm-right">
           <li className="breadcrumb-item"><a href="/#">Home</a></li>
           <li className="breadcrumb-item active">Add family member</li>
         </ol>
       </div>
     </div>
   </div>{/* /.container-fluid */}
 </section>
 {/* Main content */}
 <section className="content">
   <div className="container-fluid">
     {/* SELECT2 EXAMPLE */}
     <div className="card card-default">
       <div className="card-header">
         <h3 className="card-title">Add family memeber</h3>
         <div className="card-tools">
           <button type="button" className="btn btn-tool" data-card-widget="collapse">
             <i className="fas fa-minus" />
           </button>
           <button type="button" className="btn btn-tool" data-card-widget="remove">
             <i className="fas fa-times" />
           </button>
         </div>
       </div>
       {/* /.card-header */}
       <div className="card-body">
         <div className="row">
           <div className="col-md-12">
            <Notification/>
           <div className="form-group">
               <label>Name:</label>
               <input onChange={(event)=>this.setState({user_name:event.target.value})} type="text" min="0" className="form-control " style={{width: '100%'}}/>
               
             </div>
             <div className="form-group">
               <label>Net income:</label>
               <input  onChange={(event)=>this.setState({income:event.target.value})}  type="number" min="0" className="form-control " style={{width: '100%'}}/> 
             </div>

            <div className="form-group">
               <label>Relationship to the primary member:</label>
               <select
              min="0"
              className="form-control "
              style={{ width: "100%" }}
            >
              <option value="1">Spouse</option>
              <option value="2">Child</option>
              <option value="3">Parent</option>
              <option value="4">Grandparent</option>
              <option value="5">Grandchild</option>
              </select>
             </div>
           
           <button onClick={this.RegisterUser} className="btn btn-success">Add family member</button>
           </div>
        
         </div>
         
       </div>
       {/* /.card-body */}
        
     </div>
    
     
  
   </div>
   {/* /.container-fluid */}
 </section>
</div>

 
   )
  }
}

export default AddNewMember

