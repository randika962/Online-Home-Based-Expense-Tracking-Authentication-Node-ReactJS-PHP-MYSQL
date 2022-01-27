import $ from 'jquery';
import DataTable from 'react-data-table-component';


const columns = [
    {
        name: 'Family member',
        selector: row => row.title,
    },
    {
        name: 'Net income',
        selector: row => row.amount,
    },

    {
        name: 'Total expences',
        selector: row => row.expence,
    },

    {
        name: 'Income to expense ratio',
        selector: row => row.precent,
    },
    {
      name:"Status",
      selector:row=>row.button
    }
];

 


class ViewFamily extends Component {
  constructor(props, context){
    super(props, context);
    this.GetExpences = this.GetExpences.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.changeState = this.changeState.bind(this);
    this.state = {
      show:false,
      width:500,
      data:[
      
      ],
      tableData:[

      ]
     
    };
    this.GetExpences(false);
  }

  handleBarClick(element){ 
    
    this.setState({
      tableData: [...this.state.tableData, element]
    });
    ;
    
      }

changeState(state){
  var myHeaders = new Headers();
  var token = localStorage.getItem('token');
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "MY_STATE",
  "state": state?1:0
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
   
  })
  .catch(error => console.log('error', error));
}
GetExpences(type){
  this.setState({
    data:[]})
    var token = localStorage.getItem('token');
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "FAMILY_EXPENCES",
  "type_of": type===1?"MONTH":"MONTHLY"
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
    let data = JSON.parse(result).data_set;
    
    data.forEach(element => {
      this.handleBarClick({
        title:element.user_name,
        amount:element.income,
        expence:element.total_spend,
        precent:((element.total_spend/element.income)*100).toFixed(2)+" %",
        button:<button onClick={()=>{this.changeState(!element.state)}} className={element.state?"btn btn-success":"btn btn-danger"}>{element.state?"Active":"Deactive"}</button>
      },0)
    });
  })
  .catch(error => console.log('error', error));
}  
render(){
    return (
       <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>My Family</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/#">Home</a></li>
            <li className="breadcrumb-item active">My Family</li>
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
          <h3 className="card-title">My Family</h3>
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
            <DataTable
            columns={columns}
            pagination
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

export default ViewFamily;