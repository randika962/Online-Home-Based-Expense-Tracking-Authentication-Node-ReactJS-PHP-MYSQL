import $ from 'jquery';
import Notification from '../common/norification';

export class AskQuetions extends Component {

  constructor(props, context){
    super(props, context);
    this.AddNewQuetions = this.AddNewQuetions.bind(this);
    this.ShowAndHide = this.ShowAndHide.bind(this);
    
    this.state = {
      quetions:"",
     
     
    };
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
  AddNewQuetions(){
    var data = localStorage.getItem('token');
    if(this.state.quetions.length>10){
      var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "ADD_QUETION",
  "quetion":this.state.quetions
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/quetions.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(JSON.parse(result));
    this.ShowAndHide(JSON.parse(result).message_type,JSON.parse(result).state)
  })
  .catch(error => console.log('error', error));
    }else{
      this.ShowAndHide("Discussion should contain atleast 10 characters",false)
    }
  }

  render() {
    return(
      <div className="content-wrapper">
      <section className="content-header">
       <div className="container-fluid">
         <div className="row mb-2">
           <div className="col-sm-6">
             <h1>Discussion forum</h1>
           </div>
           <div className="col-sm-6">
             <ol className="breadcrumb float-sm-right">
               <li className="breadcrumb-item"><a href="/#">Home</a></li>
               <li className="breadcrumb-item active">Discussion forum</li>
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
             <h3 className="card-title">Discussion forum enables to post discussions related to managing expenses in a better way.</h3>
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
                   <label>New discussion:</label>
                   <textarea onChange={(e)=>{this.setState({quetions:e.target.value})}} type="text" rows="15" min="0" className="form-control " style={{width: '100%'}}/>
                   
                 </div>
      
                 
               
               <button onClick={this.AddNewQuetions} className="btn btn-success">Post discussion</button>
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

export default AskQuetions

