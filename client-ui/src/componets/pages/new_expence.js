import $ from 'jquery';
import Notification from "../common/norification";
class AddNewExpences extends Component {
  constructor(props, context){
    super(props, context);
    this.process =this.process.bind(this);
    this.Request = this.Request.bind(this);
    this.ShowAndHide = this.ShowAndHide.bind(this);
    this.state = {
      reason: '',
      amount: '',
      state:1,
      date: '',
      category:1,
      sendimage:''
    };

  }
  Request() {
    var myHeaders = new Headers();
    var data = localStorage.getItem('token');
    myHeaders.append(
      "Authorization",
      "Bearer "+data
    );

    var formdata = new FormData();
    formdata.append("reason",this.state.reason);
    formdata.append("amount",this.state.amount);
    formdata.append("state",this.state.state);
    formdata.append("date", this.state.date);
    formdata.append("category", this.state.category);
    formdata.append("activity", "ADD_EXPENCE");
    formdata.append(
      "sendimage",
      this.state.sendimage.files[0],
      this.state.sendimage.files[0].name
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    // console.log(formdata);
    fetch("http://localhost/expence/api/expence.php", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let data = JSON.parse(result);
        this.ShowAndHide(data.message_type,data.state)
      })
      .catch((error) => console.log("error", error));
  }

  process(){
    console.log(this.state.sendimage.files[0]);
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
                <h1>Add New Expense</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Add New Expense</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* SELECT2 EXAMPLE */}
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">Add New Expense</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                  >
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
                      <label>Expense Title:</label>
                      <input
                        type="text"
                        min="0"
                        onChange={(event)=>this.setState({reason:event.target.value})}
                        className="form-control "
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Expense Amount:</label>
                      <input
                        type="number"
                        min="0"
                        onChange={(event)=>this.setState({amount:event.target.value})}
                        className="form-control "
                        style={{ width: "100%" }}
                      />
                    </div>


                    <div className="form-group">
                      <label>Expense Category:</label>
                      <select
                        min="0"
                        onChange={(event)=>{this.setState({category:event.target.value})}}
                        className="form-control "
                        style={{ width: "100%" }}
                      >
                        <option value="1">Groceries</option>
                        <option value="2">Rentals</option>
                        <option value="3">Loan Installments</option>
                        <option value="4">Utilities</option>
                        <option value="5">Entertainment</option>
                        <option value="6">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                      <label>Expense Date:</label>
                      <input
                        type="date"
                        min="0"
                        onChange={(event)=>this.setState({date:event.target.value})}
                        className="form-control"
                        style={{ width: "100%" }}
                      />
                    </div>

                    
                    <div className="form-group">
                      <label>Upload Bills:</label>
                      <input
                        type="file"
                        min="0"
                        onChange={(event)=>this.setState({sendimage:event.target})}
                        className="form-control"
                        style={{ width: "100%" }}
                      />
                    </div>

                    <button onClick={this.Request} className="btn btn-success">Add New Expense</button>
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    );
  }
}

export default AddNewExpences;
