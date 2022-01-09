function signup() {
    //extract input data from all 5 inputs 
    const firstName = document.getElementsByName("firstName")[0].value;
    const lastName = document.getElementsByName("lastName")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    const secondPassword = document.getElementsByName("secondPassword")[0].value;

    //const firstName = document.forms["formSignUp"]["firstName"].value;
    //const lastName = document.forms["formSignUp"]["lastName"].value;
    //const email = document.forms["formSignUp"]["email"].value;
    //const password = document.forms["formSignUp"]["password"].value;
    //const secondPassword = document.forms["formSignUp"]["secondPassword"].value;

    // create a request body with the following fields firstName, lastName, email, password, secondPassword
    const body = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email, 
        "password": password,
        "secondPassword": secondPassword
    };

    // make a POST request to http://localhost:3004/api/v1/users using Fetch API
    const options = {
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json",
        }
    }
    fetch("http://localhost:3004/api/v1/sign-up", options)  //http://127.0.0.1:3004/  http://localhost:3004/api/v1/sign-up
        .then(ifSuccess)
        .catch(ifError)
}

function ifSuccess(r) {
    console.log(r);
    // TODO: implement what happens when I get a successful response from server
}

function ifError(e) {
    console.log(e);
    // TODO: implement what happens when I get an error
}