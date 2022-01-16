const url="http://localhost:3004/api/v1/completeProfile"

function complete_profile(){
    const facultate = document.getElementsByName("facultateID")[0].value;
    const skill = document.getElementsByName("skillInpName")[0].value;

    const body = {
        "facultate": facultate,
        "skill":skill
    };

    const options = {
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json",
        }
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