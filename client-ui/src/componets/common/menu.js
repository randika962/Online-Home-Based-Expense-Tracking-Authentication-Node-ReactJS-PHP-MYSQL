import $ from 'jquery';

export default function Menu() {
  if (window.location.pathname === '/') return null;
  return (
      
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
      <span className="brand-text font-weight-light">Family Expense Manager</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <i className="fa fa-user" style={{fontSize:"30px",color:"white"}}/>
      </div>
      <div className="info">
        <a href className="d-block">{ localStorage.getItem('user_name')}</a>
      </div>
    </div>
   
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}


{/* <li className="nav-header">EXAMPLES</li> */}
<li className="nav-item menu-open">
          <Link to="/dashboard" className="nav-link">
            <i className="nav-icon fa fa-tachometer-alt" />
            <p>
              Dashboard
            
            </p>
          </Link>
          </li>
        <li className="nav-item">
          <Link to="/my_sallery" className="nav-link">
            <i className="nav-icon fa fa-money-bill" />
            <p>
              My Income
             
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/new_expence" className="nav-link">
            <i className="nav-icon fa fa-plus" />
            <p>
              Add New Expense
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ViweExpence" className="nav-link">
            <i className="nav-icon fa fa-chart-bar" />
            <p>
              Expenses Overview
            </p>
          </Link>
        </li>
        {
         localStorage.getItem('account_type')==="1" || localStorage.getItem('account_type')==="3"?
        <li className="nav-item">
          <Link to="/newmember" className="nav-link">
            <i className="nav-icon fa fa-user-plus" />
            <p>
              Add Family Member
            </p>
          </Link>
        </li>:""
      }
        {
          localStorage.getItem('account_type')==="1" || localStorage.getItem('account_type')==="3"?
          <li className="nav-item">
          <Link to="/family" className="nav-link">
            <i className="nav-icon fa fa-users" />
            <p>
              View Family Members
            </p>
          </Link>
        </li>:""
        }

        <li className="nav-item">
          <a href className="nav-link">
            <i className="nav-icon fas fa-question-circle" />
            <p>
              Discussion Forum
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link to="/viewquetions" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>View Discussions</p>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/askquetion" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>New Discussion</p>
              </Link>
            </li>
            
          </ul>
        </li>
      
     
        
      
       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

    )
}
