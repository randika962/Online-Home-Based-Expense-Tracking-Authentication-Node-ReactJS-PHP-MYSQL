import $ from 'jquery';
export default function Login() {
  
  const emailref = useRef();
  const passwordRef = useRef();
  const history = useHistory()


  function login(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "pwd": passwordRef.current.value,
      "user_name": emailref.current.value,
      "activity": "LOGIN"
    });
    console.log(raw)
    var requestOptions = {
      method: 'POST',
      mode:'no-cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost/expence/api/login.php", requestOptions)
      .then(response => response.text())
      .then(result =>{
        const data_set = JSON.parse(result);
        console.log(result);
        if(data_set.state){
          
        localStorage.setItem('token',JSON.parse(result).data_set.token);
        localStorage.setItem('account_type',JSON.parse(result).data_set.account_type);
        localStorage.setItem('user_name',JSON.parse(result).data_set.user_name);
        history.push('/dashboard')
        }else{
          $("#error").html(data_set.message);
          $("#error").show('slow');
          setTimeout(()=>{
          $("#error").hide('slow');
          },3000)


        }
      })
      .catch(error => console.log('error', error));
   
  }
    return (
        <div class="hold-transition login-page">
   <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Family</b>Expence Manager</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
        <div style={{display:'none'}} id="error" className="alert alert-danger">Please Correct Login Details</div>
        <div className="input-group mb-3">
          <input type="email" ref={emailref} className="form-control" placeholder="user name" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
          {/*  */}
        </div>
        <div className="input-group mb-3">
          <input type="password"  ref={passwordRef}  className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          
          {/* /.col */}
          <div className="col-12">
            <button onClick={login} type="submit" className="btn btn-primary btn-block">Sign In</button>
           
          </div>

          <div className="col-12">
           <Link to="/register">
              Create a account
            </Link>
          
          </div>
          {/* /.col */}
        </div>
  
      
      {/* /.social-auth-links */}
    </div>
    {/* /.login-card-body */}
  </div>
</div>
</div>
    )
}
