import $ from 'jquery';
export default function Register() {
  
  
 
  const first_name = useRef();
  const last_name = useRef();
  const emailref = useRef();
  const address = useRef();
  const user_name = useRef();
  const password = useRef();
  const passwordRef = useRef();
  const income = useRef();
  function isEmail(val) {
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regEmail.test(val));
    if(!regEmail.test(val)){
      return 'Invalid Email';
    }else{
      return true;
    }
}


  function Register(){
    let add = address.current.value;
    console.log(add);
    if(first_name.current.value.length>0){
      if(last_name.current.value.length>0){
        if(isEmail(emailref.current.value)){
          if(add.length>0){
            if(user_name.current.value.length>0){
              if(password.current.value===passwordRef.current.value){
                if(income.current.value >0){
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  
                  var raw = JSON.stringify({
                    "activity": "ADD_USER",
                    "first_name":first_name.current.value ,
                    "last_name":last_name.current.value ,
                    "email":emailref.current.value ,
                    "address":add,
                    "user_name": user_name.current.value,
                    "password":password.current.value ,
                    "income":income.current.value
                  });
                  
                  var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };
                  console.log({
                    "activity": "ADD_USER",
                    "first_name":first_name.current.value ,
                    "last_name":last_name.current.value ,
                    "email":emailref.current.value ,
                    "address": add,
                    "user_name": user_name.current.value,
                    "password":password.current.value ,
                    "income":income.current.value
                  })
                  fetch("http://localhost/expence/api/register.php", requestOptions)
                    .then(response => response.text())
                    .then(result =>{
                      result = JSON.parse(result);
                      if(result.state){
                        
                        $("#error").removeClass();
                        $("#error").addClass('alert alert-success');
                        $("#error").html(result.message_type);
                        $("#error").show('slow');
                        setTimeout(()=>{
                        $("#error").hide('slow');
                        $("#error").removeClass();
                        $("#error").addClass('alert alert-danger');
                        },3000)
                      }else{ 
                        $("#error").html(result.message_type);
                        $("#error").show('slow');
                        setTimeout(()=>{
                        $("#error").hide('slow');
                        },3000)
                      }
                    })
                    .catch(error => console.log('error', error));
                }else{
                  $("#error").html("Income should be greater than 0");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
                }
              }else{
                $("#error").html("Password don't match");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
              }
            }else{
              $("#error").html("User name can't be empty");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
            }
          }else{
            $("#error").html("Address can't be empty");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
          }
        }else{
          $("#error").html("Email is not valid");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
        }
      }else{
        $("#error").html("Last name can't be empty");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
      }
    }else{
      $("#error").html("First name can't be empty");
                  $("#error").show('slow');
                  setTimeout(()=>{
                  $("#error").hide('slow');
                  },3000)
    }
  }
    return (
        <div class="hold-transition login-page">
   <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Family</b>Expense Manager</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Please enter details</p>
        <div style={{display:'none'}} id="error" className="alert alert-danger"></div>
        <div className="input-group mb-3">
          <input type="text" ref={first_name} className="form-control" placeholder="First name" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
          {/*  */}
        </div>

        <div className="input-group mb-3">
          <input type="text" ref={last_name} className="form-control" placeholder="Last name" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
          {/*  */}
        </div>

        <div className="input-group mb-3">
          <input type="email" ref={emailref} className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
          {/*  */}
        </div>

        <div className="input-group mb-3">
          <input type="text" ref={address} className="form-control" placeholder="Address" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-map-marker" />
            </div>
          </div>
          {/*  */}
        </div>


        <div className="input-group mb-3">
          <input type="text" ref={user_name} className="form-control" placeholder="user name" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-at" />
            </div>
          </div>
          {/*  */}
        </div>

        <div className="input-group mb-3">
          <input type="password"  ref={password}  className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password"  ref={passwordRef}  className="form-control" placeholder="Please Re-enter" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>


        <div className="input-group mb-3">
          <input type="number"  ref={income}  className="form-control" placeholder="Primary Income" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-money" />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-12">
            <button onClick={Register} type="submit" className="btn btn-primary btn-block">Register</button>
           
          </div>

          <div className="col-12">
           <Link to="/">
            I have and account
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
