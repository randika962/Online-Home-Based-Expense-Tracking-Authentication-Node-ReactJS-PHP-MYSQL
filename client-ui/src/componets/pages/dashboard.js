import { Link } 
class Dashboard extends Component {
  constructor(props, context){
    super(props, context);
   
    this.GetDashboard = this.GetDashboard.bind(this)
    this.state = {
      sallery:0,
      total:0,
      count:0,
      precentage:0
    };
   
  
  }

  GetDashboard(){
    
        var data = localStorage.getItem('token');
      var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+data);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "activity": "GET_DASHBOARD",
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
        data = JSON.parse(result);
     
        this.setState({
          sallery:data.data_set[0].sallery,
          total:data.data_set[0].sum_of_expences,
          count:data.data_set[0].number_of,
          precentage:data.data_set[0].precentile.toFixed(2)
        })
        console.log(this.state.total);
       
      })
      .catch(error => console.log('error', error));
    
  }
  componentDidMount(){
    this.GetDashboard()

  
    const script = document.createElement("script");

    script.src = "../../../public/dist/js/adminlte.js";
    script.async = true;

    document.body.appendChild(script);
  }
  render(){
    return (
      <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">My Dashboard</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Dashboard v1</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Small boxes (Stat box) */}
      <div className="row">
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{this.state.total}</h3>
              <p>Total Expenses</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link to="/ViweExpence" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{this.state.sallery}</h3>
              <p>Net Income</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <a href="/my_sallery" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{this.state.count}</h3>
              <p>Expenses List</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <a href="/ViweExpence" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{this.state.precentage}<sup style={{fontSize: 20}}>%</sup></h3>
              <p>Income to Expense Ratio</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <a href="/ViweExpence" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
        </div>
        {/* ./col */}
      </div>
   
  
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>
    );
  }
}

export default Dashboard;
