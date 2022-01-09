function login(){
    const email = document.getElementsByName("emailLI")[0].value;
    const password = document.getElementsByName("parolaLI")[0].value;

    const body = {
        "email": email,
        "password":password
    };

    const options = {
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json",
        }
    };

    fetch("http://localhost:3004/api/v1/sign-in", options)  //http://127.0.0.1:3004/  http://localhost:3004/api/v1/sign-up
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