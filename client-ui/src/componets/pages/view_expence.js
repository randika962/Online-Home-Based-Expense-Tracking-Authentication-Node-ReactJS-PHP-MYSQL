import $ from 'jquery';
import DataTable from 'data-table-component';
import BarChart from 'bar-chart';
import { Button,Modal} from 'bootstrap';  



function ButtonElement(props){
  
  return(
    <div>
      <button onClick={()=>{props.open();props.update(props.img);}} className="btn btn-success">View</button>
    </div>
  )
}



 
const columns = [
    {
        name: 'Expense title',
        selector: row => row.title,
    },
    {
        name: 'Expense amount',
        selector: row => row.amount,
    },

    {
        name: 'Expense date',
        selector: row => row.date,
    },

    {
      name: 'View',
      selector: row => row.more,
  },
];




 
const margin = {top: 20, right: 20, bottom: 30, left: 70};
 


class ViweExpence extends Component {

  constructor(props, context){
    super(props, context);
    this.handleBarClick = this.handleBarClick.bind(this)
    this.updateAPi = this.updateAPi.bind(this);
    this.openModal = this.openModal.bind(this);
    this.CallDailyExpences = this.CallDailyExpences.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.imageUpdate = this.imageUpdate.bind(this);
    this.state = {
      show:false,
      width:500,
      category:0,
      image:"",
      data:[
      
      ],
      tableData:[

      ]
     
    };
    this.CallMonthlyExpences()
    this.GetTableFillers()

  }
 
  getInitialState() {
    return { width: 250 };
  }
  handleBarClick(element, id){ 
  
let newdetails = {text:element.name, value: element.amount};
this.setState({
  data: [...this.state.data, newdetails]
});
;

  }
componentDidMount(){
  window.onresize = () => {
    this.setState({width: this.refs.root.offsetWidth}); 
    
   };

}


CallMonthlyExpences(){
  this.setState({
    data:[]})
    var data = localStorage.getItem('token');
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "GET_EXPENCES",
  "type_of": "MONTHLY"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    let data = JSON.parse(result).data_set;
    data.forEach(element => {
      console.log(element);
      this.handleBarClick({
        name:element.date_spend,
        amount:element.month_total
      },0)
    });
  })
  .catch(error => console.log('error', error));
}


CallCategory(){
  this.setState({
    data:[]})
    var data = localStorage.getItem('token');
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "GET_EXPENCES",
  "type_of": "MONTHLY"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    let data = JSON.parse(result).data_set;
    data.forEach(element => {
      console.log(element);
      this.handleBarClick({
        name:element.date_spend,
        amount:element.month_total
      },0)
    });
  })
  .catch(error => console.log('error', error));
}

CallDailyExpences(){
  this.setState({
    data:[]})
  var myHeaders = new Headers();
  var data = localStorage.getItem('token');
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "GET_EXPENCES",
  "type_of": "MONTH"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result)
    let data = JSON.parse(result).data_set;
    data.forEach(element => {
      this.handleBarClick({
        name:element.date_spend,
        amount:element.day_total
      },0)
    });
  })
  .catch(error => console.log('error', error));
}

updateAPi(e){
  if(e==="1"){
    this.CallMonthlyExpences()
  }else{
    this.CallDailyExpences()
  }
}

updateCateogry(e){
 
    this.CallCategory(e)
 
}

GetTableFillers(){
var data = localStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+data);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "VIEW_MY_EXPENCES"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/expence/api/expence.php", requestOptions)
  .then(response => response.text())
  .then(result => {
    let table_data = JSON.parse(result).data_set.expences;
    console.log(table_data)
    table_data.forEach(element => {
      console.log(element)
      let newdetails = {
        title:element.reason,
        amount:element.amount_spend,
        date:element.date_spend,
        more:<ButtonElement img={element.location} update={this.imageUpdate}  open={this.handleShow}/>,
      };
this.setState({
  tableData: [...this.state.tableData, newdetails]
});
    });
  })
  .catch(error => console.log('error', error));
}

openModal(call){
  call()
}

 handleClose = () => {
   
  this.setState({show:false})
 }
 handleShow = () =>{
 
  this.setState({show:true})
 };

imageUpdate(src){
 
  this.setState({image:src});
}

render(){
    return (
<div ref="root" className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Expenses Overview</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/#">Home</a></li>
            <li className="breadcrumb-item active">Expense duration:</li>
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
          <h3 className="card-title">Expense duration:</h3>

          <select onChange={(e)=>this.updateAPi(e.target.value)} className="form-control">
            <option value="1">Monthly</option>
            <option value="2">Daily</option>
          </select>


          <div className="form-group">
                      <label>Expence Category:</label>
                      <select
                        min="0"
                        onChange={(event)=>{this.setState({category:event.target.value})}}
                        className="form-control "
                        style={{ width: "100%" }}
                      >
                        <option value="0">All</option>
                        <option value="1">Groceries</option>
                        <option value="2">Rentals</option>
                        <option value="3">Loan Installments</option>
                        <option value="4">Utilities</option>
                        <option value="5">Entertainment</option>
                        <option value="6">Other</option>
                        </select>
                    </div>
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

 <div>

<Modal show={this.state.show} onHide={this.handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Bill Image</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <img id="img1" src={this.state.image} style={{width:"100%"}} alt="Testing"/>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={this.handleClose}>
      Close
    </Button>
    
  </Modal.Footer>
</Modal>

  
</div>  
<button className="btn btn-danger" onClick={this.openModal}/>

              {/* <BarCharBuilder data={this.state.data} width={this.state.width} handleBarClick={this.handleBarClick}/> */}
              <BarChart  ylabel='Total'
      width={this.state.width}
      height={500}
      margin={margin}
      data={this.state.data}
      />
            <DataTable
            columns={columns}
            data={this.state.tableData}
            
        />
            
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


export class BarCharBuilder extends Component {
  constructor(props, context){
    super(props, context);
    this.state={
      width:this.props.width,
      handleBarClick:this.props.handleBarClick,
      data:this.props.data
    }
  }
  
  render() {
    return (
      <div>
         <BarChart ylabel='Quantity'
      width={this.state.width}
      height={500}
      margin={margin}
      data={this.state.data}
      onBarClick={this.state.handleBarClick}/>
      </div>
    )
  }
}



 



export default ViweExpence;