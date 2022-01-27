import $ from 'jquery';


class Header extends Component{
  constructor(props, context){
    super(props, context);
   
    this.state = {
     value:false
    };
  }

  componentDidMount(){
    var myHeaders = new Headers();
    var token = localStorage.getItem('token');
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "activity": "GETFORNOTIFY"
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
    result = JSON.parse(result);
    console.log(result)
    let income = result.data_set[0]['income'];
    let expences = result.data_set[0]['total_expence']
    if(expences>income){
      this.setState({value:true})
    }else{
      this.setState({value:false})
      
    }
  })
  .catch(error => console.log('error', error));
  }

  render(){
    
  if (window.location.pathname === '/') return null;
  return (
     <nav className="main-header navbar navbar-expand navbar-white navbar-light">
{/* Left navbar links */}
<ul className="navbar-nav">
  <li className="nav-item">
    <a className="nav-link" data-widget="pushmenu" href role="button"><i className="fas fa-bars" /></a>
  </li>
 
</ul>
{/* Right navbar links */}
<ul className="navbar-nav ml-auto">
  {/* Navbar Search */}
  
 
  <li className="nav-item dropdown">
    <a className="nav-link" data-toggle="dropdown" href>
      <i className="far fa-bell" />
      <span className="badge badge-warning navbar-badge">
        {this.state.value?1:0}
      </span>
    </a>
    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
      <span className="dropdown-item dropdown-header">{this.state.value?1:0}</span>
      <div className="dropdown-divider" />
      {this.state.value?<Link  to="/ViweExpence" className="dropdown-item">
        <i className="fas fa-envelope mr-2" />Please reduce the expenses
      </Link>:<a  href className="dropdown-item">
        <i className="fas fa-money mr-2" />No overdue expenses
      </a>}
      </div>
  </li>
 
  
</ul>
</nav>

  )
  }
}
export default Header
