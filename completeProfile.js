const url="http://localhost:3004/api/v1/sign-in/completeProfile"

function complete_profile(){
    const facultate = document.getElementsByName("facultateID")[0].value;
    const skills = document.getElementsByName("skillInpName")[0].value;
    const telefon = document.getElementsByName("telefonInpName")[0].value;
    const descriere = document.getElementsByName("descriptionInpName")[0].value;

    const body = {
        "faculty": facultate,
        "skills":skills,
        "phone": telefon,
        "description": descriere
    }; 
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.token}`,
        //"Access-Control-Allow-Origin": "*"
    }
    // if (sessionStorage.token) {
    //     headers = { "Authorization": `Bearer ${localStorage.token}` }
    // }else {
    //     headers = { "Content-Type": "application/json"}
    // }
    const options = {
        "body": JSON.stringify(body),
        "method": "PUT",
        "mode": "cors",
        "headers": headers
    }

    fetch(url,options).then(ifSuccess).then(onSuccess,onFailure).catch(error)

}

function ifSuccess(response){
    if(!response.ok){
        throw response;
    }
    return response;
}

function onSuccess(r) {
    console.log(r);
    window.location.href = 'feed.html';
    
}

function onFailure(response){
    return response.json().then(error);
}

function error(response) {
    console.log(response);
    let html="<a href='#' class='close' data-bs-dismiss='alert' role='button'>&times;</a>"
    html+="<strong>"+response.error;
    html+="</strong";
    let errorDivC = document.getElementsByName("alertaBootS")[0];
    let errorDiv = document.createElement("div");
    const body = document.getElementsByTagName("body")[0];

    if(!errorDivC) {
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