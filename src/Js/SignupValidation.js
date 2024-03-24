function Validation(values) {
    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.username === ""){
        error.username = "Username should not be empty"
    }else {
        error.username = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)){
        error.email = "Email does not match"
    } else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Email should not be empty"
    } else if(!password_pattern.test(values.email)){
        error.password = "Email does not match"
    } else {
        error.password = ""
    }

    return error;

    
}

export default Validation;