export default function Validation(values) {

    let error = {};
    if (values.username === "") {
      error.username = "Username should not be empty"
    } else {
      error.username = ""
    }
  
    if (values.password === "") {
      error.password = "Password should not be empty"
    } else {
      error.password = ""
    }
  
    return error;
  }
  export function SignUpValidation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.username === "") {
        error.username = "Username should not be empty";
    } else if (values.username.length < 6) {
        error.username = "Username must be at least 6 characters long";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (values.confirmPassword !== values.password) {
        error.confirmPassword = "Password and confirm password do not match";
    }

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email is not valid";
    }

    return error;
}
