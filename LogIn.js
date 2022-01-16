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
        .then(onSuccess,onFailure)
        .catch(error)
}

function ifSuccess(response){
    if(!response.ok){
        throw response;
    }
    return response;
}

function onSuccess(r) {
    console.log(r);
    window.location.href = 'completeProfile.html';
    // TODO: implement what happens when I get a successful response from server
}

function onFailure(response){
    return response.json().then(error);
}

function error(response) {
    console.log(response);
    let html="<a href='#' class='close' data-bs-dismiss='alert'>&times;</a>"
    html+="<strong>"+response.error;
    html+="</strong";
    let errorDivC = document.getElementsByName("alertaBootS")[0];

    if(!errorDivC) {
        const body = document.getElementsByTagName("body")[0];
        const errorDiv = document.createElement("div");
        errorDiv.setAttribute("name","alertaBootS");
        errorDiv.setAttribute("role","alert");
        //errorDiv.setAttribute("id","alertaBootSID");
        errorDiv.setAttribute("class","alert alert-danger alert-dismissible");
        errorDiv.innerHTML=html;
        body.prepend(errorDiv);
    } else {
        errorDiv.innerHTML=html;
    }
}
