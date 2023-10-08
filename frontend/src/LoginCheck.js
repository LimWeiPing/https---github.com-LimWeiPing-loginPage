function LoginCheck(values) {
    let error = {}
    const Email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    //const Password_pattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ 
   //const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

    if(values.Email === "") {
        error.Email = "Email is missing"
    }
    else if(!Email_pattern.test(values.Email)) {
        error.Email = "Email not match"
    }else {
        error.Email = ""
    }

    if(values.Password === "") {
        error.Password = "Password is missing"
    // else if(!Password_pattern.test(values.Password)) {
    //     error.Password = "Password not match"
    }else {
        error.Password = ""
    }
    return error;
}

export default LoginCheck;