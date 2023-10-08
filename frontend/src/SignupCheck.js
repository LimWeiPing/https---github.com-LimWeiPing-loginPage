function SignupCheck(values) {
    let error = {}

    const Email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //const Password_pattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ 
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    const Phone_pattern = /^\d+$/

    if(values.Name === "") {
        error.Name = "Name is missing"
    }else {
        error.Name = ""
    }

    if(values.Email === "") {
        error.Email = "Email is missing"
    }
    else if(!Email_pattern.test(values.Email)) {
        error.Email = "Wrong email format"
    }else {
        error.Email = ""
    }

    if(values.Password === "") {
        error.Password = "Password is missing"
    }
    else if(!Password_pattern.test(values.Password)) {
        error.Password = "Password does not fulfil requirements."
    }else {
        error.Password = ""
    }

    if(values.Phone === "") {
        error.Phone = "Phone number is missing"
    }
    else if(!Phone_pattern.test(values.Phone)) {
        error.Phone = "Wrong phone number format"
    }else {
        error.Phone = ""
    }

    if(values.Country === "") {
        error.Country = "Country is not stated"
    }else {
        error.Country = ""
    }

    if(values.Gender === "") {
        error.Gender = "Gender is not stated"
    }else {
        error.Gender = ""
    }

    if(values.Qualification === "") {
        error.Qualification = "Qualification is not stated"
    }else {
        error.Qualification = ""
    }

    return error;
}

export default SignupCheck;