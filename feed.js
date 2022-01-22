function getUsers(){
    fetch("http://localhost:3004/api/v1/sign-in/completeProfile/feed", {headers:{"Authorization":"Bearer "+sessionStorage.token}})
    .then(userDetails => userDetails.json())
    .then(userDetails =>{ console.log(userDetails)
        const user1Name = document.getElementById("user1Name");
        const user1Description = document.getElementById("user1Description");
        const user1Faculty = document.getElementById("user1Faculty");
        const user1Skill = document.getElementById("user1Skill");
        user1Name.innerText=userDetails["profile1"]["first_name"];
        user1Description.innerText=userDetails["profile1"]["description"];
        user1Faculty.innerText=userDetails["profile1"]["faculty"];
        user1Skill.innerText=userDetails["profile1"]["skills"];})
        .catch(error)
}

function error(response) {
    console.log(response);
    let html="<a href='#' class='close' data-bs-dismiss='alert' role='button'>&times;</a>"
    html+="<strong>"+response.error;
    html+="</strong";
    let errorDiv = document.createElement("div");
    const body = document.getElementsByTagName("body")[0];

    if(!errorDivC) {
        errorDiv.setAttribute("name","alertaBootS");
        let errorDivC = document.getElementsByName("alertaBootS")[0];
        errorDiv.setAttribute("role","alert");
        //errorDiv.setAttribute("id","alertaBootSID");
        errorDiv.setAttribute("class","alert alert-danger alert-dismissible");
        errorDiv.innerHTML=html;
        body.prepend(errorDiv);
    } else {
        errorDiv.innerHTML=html;
    }
}