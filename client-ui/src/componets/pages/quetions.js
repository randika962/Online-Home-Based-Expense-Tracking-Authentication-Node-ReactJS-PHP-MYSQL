import $ from 'jquery';
import Notification from "../common/norification";
class ViewQuetions extends Component {
  constructor(props, context){
    super(props, context);
    this.handleBarClick = this.handleBarClick.bind(this)
    this.BecomeATeacher = this.BecomeATeacher.bind(this)
    this.state = {
      
      quetions:[
       
      ]
     
    };
  }

  BecomeATeacher(value){
    var myHeaders = new Headers();
    var token = localStorage.getItem('token');
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "BECOME_TEACHER"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/register.php", requestOptions)
  .then(response => response.text())
  .then(result =>{
    result = JSON.parse(result);
    var account_type = localStorage.getItem('account_type');
    console.log(result)
    if(result.state){
      localStorage.setItem('account_type',account_type==="1"?"3":"4");
      $("#quetions_info").removeClass();
      $("#quetions_info").addClass("alert alert-success");
      $("#quetions_info").html("You have become a teacher please refresh the page");
      $("#quetions_info").show("slow");
      setTimeout(()=>{
      $("#quetions_info").hide("slow");
      $("#quetions_info").removeClass();
     



      },3000)
    }else{
      $("#quetions_info").removeClass();
      $("#quetions_info").addClass("alert alert-danger");
      $("#quetions_info").html("Becoming a teacher failed please try again latter");
      $("#quetions_info").show("slow");
      setTimeout(()=>{
      $("#quetions_info").hide("slow");
      $("#quetions_info").removeClass();
      


      },3000)
    }
  })
  .catch(error => console.log('error', error));
  }

  handleBarClick(element, id){ 
  
    
    this.setState({
      quetions: [...this.state.quetions, element]
    });
    ;
    
      }
  componentDidMount(){
    this.setState({
      data:[]})
      var token = localStorage.getItem('token');
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "GET_QEUTIONS",
  "answer": "Who am i?",
  "quetion_id": 1
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
   
    let data_set = JSON.parse(result).data_set;
    console.log(data_set)
    data_set.forEach(element => {
          
    this.setState({
      quetions: [...this.state.quetions, element]
    });
    });
   
  })
  .catch(error => console.log('error', error));
  }

   render(){
    var account_type = localStorage.getItem('account_type');
    var toggle_btn = <input type="checkbox"  class="custom-control-input" id="customSwitch1"/>
    
    if(account_type==="3" || account_type==="4"){
      toggle_btn = <input type="checkbox" disabled checked  class="custom-control-input" id="customSwitch1"/>
    }else{
      toggle_btn = <input type="checkbox" onChange={(event)=>{
        this.BecomeATeacher(event.target.value)
      }}  class="custom-control-input" id="customSwitch1"/>
    }
    
    return (
    
      <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>All Quetions</h1>
            <div class="custom-control custom-switch">
  {
     toggle_btn
  }
  <label class="custom-control-label" for="customSwitch1">{account_type==="4"|| account_type==="3" ?"View and contribute":"View and contribute"}</label>
</div>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/#">Home</a></li>
              <li className="breadcrumb-item active">All Quetions</li>
            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              
              <div className="card-body">
                <div id="quetions_info" style={{display:'none'}} className=""></div>
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                    {this.state.quetions.map((e)=>{
                      return <Posts quetion={e}/>
                      })}
                  
                    
                  </div>
           
                </div>
                {/* /.tab-content */}
              </div>{/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>
  
      )

      function AnswerQuetions(quetion_id){
      
        var data = localStorage.getItem('account_type');
        if(data=== "1" || data==="3"){
          return <div className="form-horizontal">
          <div className="input-group input-group-sm mb-0">
            <input className="form-control form-control-sm" id={quetion_id.quetion_id+"_answer"} placeholder="Response" />
            <div className="input-group-append">
              <button onClick={()=>{SendAnswer(quetion_id)}} type="submit" className="btn btn-danger">Send</button>
            </div>
          </div>
        </div>
        }else{
          return <div>Your not a teacher </div>
        }
       }

     
      function SendAnswer(quetion_id){
        
        let answer = $("#"+quetion_id.quetion_id+"_answer").val();
        var token = localStorage.getItem('token');
        var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "ANSWER_QUETION",
  "answer": answer,
  "quetion_id": quetion_id.quetion_id
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
    console.log(result)
    let json = JSON.parse(result);
    if(json.state){
      $("#quetions_info").addClass('alert alert-success');
            $("#quetions_info").html("New answer recorded");
            $("#quetions_info").show("slow");
            setTimeout(()=>{
            $("#quetions_info").hide("slow");
            

            },3000)
    }
  })
  .catch(error => console.log('error', error));
            
          
  

      }

     function Posts(props) {
    var account_type = localStorage.getItem('account_type');
       return <div className="post">
         
         <div className="user-block">
           <img className="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.gif" alt="" />
           <span className="username">
             <a href="/#">{props.quetion.quetion.user_name}</a>
             <a href="/#" className="float-right btn-tool"><i className="fas fa-times" /></a>
           </span>
           <span className="description">Shared publicly - {props.quetion.quetion.date}</span>
         </div>
         {/* /.user-block */}
         <p>
          {props.quetion.quetion.quetion}
          <br/>
           
         </p>
         
         
        {account_type==="3"||account_type==="4"?<AnswerQuetions quetion_id={props.quetion.quetion.fourm_id} />:null}
      
        <br/>
        {
        
        props.quetion.answers.map(function (n, index) {
          console.log();
      return (
        <React.Fragment key={index}>
           
           <div style={{border:"1px solid #F5F5F5"}} className="container border-5">
             <div style={{fontSize:14}} className="container">{n.date}</div>
            <p>{n.answer}</p>
          </div>
        </React.Fragment>
      )
    })
  }
       </div>;
     }

 

     
   }

   
}

export default ViewQuetions;

