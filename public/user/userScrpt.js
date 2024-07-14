$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
    if(allredyloginuserID){
      getUserprofile(allredyloginuserID);
        
    }else{
        loginClick();
    }
   
})

function loginClick(){
    $("#view").html('<div class="row mb-3">\
    <div style="text-align: center; margin-top: 15vh;" class="col">\
      <div style="font-size: 35px; font-weight:bold;">Log in</div>\
      <span>Fill the form to log in</span>\
    </div>\
  </div>\
  <div class="card mb-3" style="background-color: #ccdbe6;">\
    <div class="card-body">\
      <div class="mb-3">\
        <label for="loginEmail" class="form-label">Email address</label>\
        <input style=" text-decoration: none;"  type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp">\
      </div>\
      <div class="mb-3">\
        <label for="loginPassword" class="form-label ">Password</label>\
        <input type="password" class="form-control" id="loginPassword">\
      </div>\
    </div>\
  </div>\
  <p onclick="regClick()" class="float-start">Register</p>\
  <p onclick="forgetpassword()" class="float-end">Forget Password</p>\
  <div class="fixed-bottom">\
      <div class="container-fluid mb-3">\
        <div id="loginBtn" class="d-grid gap-2">\
          <button onclick="loginProcess()" class="btn btn-primary " type="button">Login</button>\
        </div>\
      </div>\
  </div>');
}

function regClick(){
    $("#view").html('<p onclick="loginClick()" class="mt-2 float-end">Login</p>\
    <div class="row mb-3">\
      <div style="text-align: center; margin-top: 15vh;" class="col">\
        <div style="font-size: 35px; font-weight:bold;">Register Now</div>\
        <span>Create an account</span>\
      </div>\
    </div>\
    <div class="card" style="background-color: #ccdbe6;">\
      <div class="card-body">\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Email address</label>\
          <input style=" text-decoration: none;"  type="email" class="form-control" id="email" aria-describedby="emailHelp">\
\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Mobile Number</label>\
          <div id="mobileGroup" class="input-group mb-3">\
          <span onclick="changeCountry()" class="input-group-text" id="basic-addon1">+91  <i style="font-size: xx-small;" class="fa fa-chevron-down" aria-hidden="true"></i></span>\
            <input type="number" class="form-control" id="mobileNo">\
            <input type="hidden" id="countryCode" value="+91" class="form-control">\
            <input type="hidden" id="currency" value="INR" class="form-control">\
            <input type="hidden" id="currencySymbol" value="&#8377" class="form-control">\
            <input type="hidden" id="country" value="India" class="form-control">\
          </div>\
          <ul id="countryList" style="display: none; height: 20vh; overflow-y: auto;" class="list-group">\
        </ul>\
        </div>\
\
        <div class="mb-3">\
          <label for="exampleInputPassword1" class="form-label">Password</label>\
          <input type="password" class="form-control" id="password">\
        </div>\
        \
      </div>\
    </div>\
      <div class="fixed-bottom">\
        <div class="container-fluid mb-3">\
          <div id="registerBtn" class="d-grid gap-2">\
            <button onclick="newRegister()" class="btn btn-primary " type="button">Register</button>\
          </div>\
        </div>\
    </div>');
}






function newRegister(){
  var email=$("#email").val().replace(/\s/g, '');
  var mobileNo=$("#mobileNo").val().trim();
  var country=$("#country").val().trim();
  var countryCode=$("#countryCode").val().trim();
  var currency=$("#currency").val().trim();
  var currencySymbol=$("#currencySymbol").val().trim();
  var password=$("#password").val();

  

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    if (reg.test(email) == false) 
        {
            alert('Invalid Email Address');
            $("#email").focus();
            return 
        }

        if(mobileNo.length != 10){
          alert('Enter Valid Mobile Number');
          $("#mobileNo").focus()
          return
       }

        if(password.length < 8){
          alert('Password Must be 8 to 18 charecter Capital, small, spacial charc');
          $("#password").focus()
          return
      } 

      $("#registerBtn").attr('disabled','disabled');
      
      ////////Check Exist user///////
      $.post('/user/checkExistuser',{mobileNo:mobileNo,email:email},function(data){
        if(!data){
            //////Register///////////////
            $.post('/user/newregister',{
              email: email,
              mobileNo:mobileNo,
              country:country,
              countryCode:countryCode,
              currency:currency,
              currencySymbol:currencySymbol,
              password:password
            },function(data){
              
              if(data){
                alert("Registration Success")
                 location.replace("/user");
              }else{
                alert("Technical Error Try Again")
              }
          })
           
            }else{
              alert("You Id / Number is register with us")
            }
        })


     


}


function forgetpassword(){
  var loginEmail=$("#loginEmail").val().replace(/\s/g, '');
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
  if (reg.test(loginEmail) == false) 
      {
          alert('Invalid Email Address');
          $("#loginEmail").focus();
          return 
      }
     var newPasw = prompt("Enter New Password");

     if(newPasw.length < 6){
          alert('Password Must be 6 to 18 charecter');
          return
          
      } 
      $.post('/user/newPasswordRequest',{loginEmail:loginEmail,newPasw:newPasw},function(data){
          if(data){
              alert("Your Request to set New Password is successfully send to Admin Our executive call you soon" )
          }else{
              alert("User Id Not Match / Allredy has pending Request");
          }
      })


  
}

function logout(){
    $.post('/user/logout',{},function(data){
        if(data){
            location.replace("/user");
           
        }
    })

  }

 

  function loginProcess(){
    //protectButton('loginBtn');
    var loginEmail=$("#loginEmail").val().replace(/\s/g, '');
    var loginPassword=$("#loginPassword").val().trim();

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
      if (reg.test(loginEmail) == false) 
          {
              alert('Invalid Email Address');
              $("#loginEmail").focus();
              return 
          }
          if(loginPassword < 6){
            alert('Password Must be 6 to 18 charecter');
            $("#loginPassword").focus()
            return
        } 

        $.post('/user/loginUser',{loginPassword:loginPassword,loginEmail:loginEmail},function(user){
            if(user){
                location.replace("/user");
            }else{
                alert("Worng Credential")
            }
        })

  }

 async function getUserprofile(userID){
    
        
    $("#topBacground").css({"display":"block"});

    


}


