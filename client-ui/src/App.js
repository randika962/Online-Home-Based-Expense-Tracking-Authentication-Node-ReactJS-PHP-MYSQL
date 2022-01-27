import { Switch,Redirect  } 



import Footer from './componets/common/footer'
import Header from './componets/common/header'
import Menu from './componets/common/menu'
import Dashboard from './componets/pages/dashboard'
import Login from './componets/pages/login';
import Post from './componets/pages/post';
import AddExpences from './componets/pages/update_expences';
import AddNewExpences from './componets/pages/new_expence';
import ViweExpence from './componets/pages/view_expence';
import AddNewMember from './componets/pages/add_member';
import ViewFamily from './componets/pages/view_family';
import ViewQuetions from './componets/pages/quetions';
import MyQuetions from './componets/pages/myquetions';
import AskQuetions from './componets/pages/askquetions';
import Register from './componets/pages/register';

export default function App() {
  const apps = ({ component: Component, ...props }) => (
    <app
      {...props}
      render={routeProps => {
        const item = localStorage.getItem("token");
        
      
        return item !== null ? (
          <Component {...appsProps} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );


  const LevelChecker = ({ component: Component, ...props }) => (
    
    <app
      {...props}
      render={routeProps => {
        
        return  localStorage.getItem('token') && (localStorage.getItem('account_type')==="1" ||localStorage.getItem('account_type')==="3")? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
  
    
 
}
