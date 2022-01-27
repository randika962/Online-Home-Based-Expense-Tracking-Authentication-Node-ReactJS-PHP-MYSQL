import $ from 'jquery';
import Notification from '../common/norification';
export class AddExpences extends Component {
 
  constructor(props, context){
    super(props, context);
    this.Requester = this.Requester.bind(this);
    this.ShowAndHide = this.ShowAndHide.bind(this);
  
    this.state = {
      inputValue: ''
    };

  }




  updateInputValue(evt) {
    let value = evt.target.value;
    if( value === "" || parseFloat(value)===0 || isNaN(value)){
      $("#update_sallery").prop('disabled',true); 
    }else{
      $("#update_sallery").prop('disabled',false); 
      this.setState({
        inputValue: evt.target.value
      });
      
    }
   
  }
  componentDidMount(){
    var myHeaders = new Headers();
    var data = localStorage.getItem('token');
  
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "MY_SALLERY"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result =>{
    const sallery = JSON.parse(result).data_set;
    console.log(sallery)
    this.setState({
      inputValue:sallery
    })
    $("#sallery").val(sallery);
    console.log(this.state.inputValue);
  })
  .catch(error => console.log('error', error));
  }

  Requester(){
     
    var data = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+data);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "activity": "UPDATE_SALLERY",
      "sallery": this.state.inputValue
    });
console.log(raw);
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
      this.ShowAndHide(JSON.parse(result).message_type,JSON.parse(result).state)
    
  })
  .catch(error => console.log('error', error));
    
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
              <h1>My Income Manager</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/#">Home</a></li>
                <li className="breadcrumb-item active">My Income Manager</li>
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
              <h3 className="card-title">My Income</h3>
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
                    <label>Primary income:</label>
                    <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} id="sallery" type="number" min="0" className="form-control select2" style={{width: '100%'}}/>
                  </div>
                  <div className="form-group">
                    <label>Secondary income:</label>
                    <input value="" onChange={evt => this.updateInputValue(evt)} id="sallery" type="number" min="0" className="form-control select2" style={{width: '100%'}}/>
                  </div>
                  <div className="form-group">
                    <label>Income form investments:</label>
                    <input value="" onChange={evt => this.updateInputValue(evt)} id="sallery" type="number" min="0" className="form-control select2" style={{width: '100%'}}/>
                  </div>
                  <div className="form-group">
                    <label>Rental income:</label>
                    <input value="" onChange={evt => this.updateInputValue(evt)} id="sallery" type="number" min="0" className="form-control select2" style={{width: '100%'}}/>
                  </div>
                
                <button id="update_sallery" onClick={this.Requester} className="btn btn-success">Save</button>
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
export default AddExpences



