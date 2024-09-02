//Login Password Encrypted
exports.crypt = function () {

    // (B1) GET PASSWORD + ENCRYPT
    let password = document.getElementById("yourPassword");
   // alert("PASSWORD"+password )
   //  let cipher = CryptoJS.AES.encrypt(password.value, "<%=Constants.P2_LOGIN_SECRET_KEY_ID%>");
   let CryptoJS = require("crypto-js");
    let cipher = CryptoJS.AES.encrypt(password.value, 'ikgd7WQa8pwN2r3s').toString();
   //  console.log("password encypted one:"+cipher)
   
   
   
   // let bytes  = CryptoJS.AES.decrypt(cipher, 'ikgd7WQa8pwN2r3s');
   // let originalText = bytes.toString(CryptoJS.enc.Utf8);
   
   // console.log("decrypt"+ originalText);
   
   
    // 'my message
    // (B2) SET ENCRYPTED PASSWORD TO HIDDEN FIELD
   //  if(($("#login_name").val() != null && $("#login_name").val() != "") && ($("#password").val() != null && $("#password").val() != ""))
   //  {
   // // 	   document.getElementById("password").value = cipher;
   //  $('#password').val(cipher);
   //  }
    // (B3) REMOVE CLEAR TEXT PASSWORD
   //	 	  password.value = "";
   
    // (B4) SUBMIT FORM
    return cipher;
   
   }
   
   
   // exports.changePasswordEncrypt = function () {
   
   //     // (B1) GET PASSWORD + ENCRYPT
   //     let currentpassword = document.getElementById("oldPassword");
   //     alert("PASSWORD"+currentpassword )
   //    //  let cipher = CryptoJS.AES.encrypt(password.value, "<%=Constants.P2_LOGIN_SECRET_KEY_ID%>");
   //    let CryptoJS = require("crypto-js");
   //     let cipher = CryptoJS.AES.encrypt(password.value, 'ikgd7WQa8pwN2r3s').toString();
   //     console.log("password encypted one:"+cipher)
       
   //     return cipher;
      
   //    }




     
exports.cryptData = function(message){

    let CryptoJS = require("crypto-js");
    let cipher = CryptoJS.AES.encrypt(message, 'ikgd7WQa8pwN2r3s').toString();
    return cipher;

}
   
   
   