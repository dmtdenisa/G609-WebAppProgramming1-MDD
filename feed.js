
function getUsers(){
    fetch("http://localhost:3004/api/v1/sign-in/completeProfile/feed", {headers:{"Authorization":"Bearer "+sessionStorage.token}})
    .then(userDetails => userDetails.json())
    .then(userDetails =>{ console.log(userDetails)
        const user1Name = document.getElementById("user1Name");
        const user1Description = document.getElementById("user1Description");
        const user1Faculty = document.getElementById("user1Faculty");
        const user1Skill = document.getElementById("user1Skill");
        const user1Email = document.getElementById("user1Email");
        user1Name.innerText=userDetails["profile1"]["first_name"];
        user1Description.innerText=userDetails["profile1"]["description"];
        user1Faculty.innerText=userDetails["profile1"]["faculty"];
        user1Skill.innerText=userDetails["profile1"]["skills"];
        user1Email.innerText=userDetails["profile1"]["email"];

        const user2Name = document.getElementById("user2Name");
        const user2Description = document.getElementById("user2Description");
        const user2Faculty = document.getElementById("user2Faculty");
        const user2Skill = document.getElementById("user2Skill");
        const user2Email = document.getElementById("user2Email");
        user2Name.innerText=userDetails["profile2"]["first_name"];
        user2Description.innerText=userDetails["profile2"]["description"];
        user2Faculty.innerText=userDetails["profile2"]["faculty"];
        user2Skill.innerText=userDetails["profile2"]["skills"];
        user2Email.innerText=userDetails["profile2"]["email"];

        const user3Name = document.getElementById("user3Name");
        const user3Description = document.getElementById("user3Description");
        const user3Faculty = document.getElementById("user3Faculty");
        const user3Skill = document.getElementById("user3Skill");
        const user3Email = document.getElementById("user3Email");
        user3Name.innerText=userDetails["profile3"]["first_name"];
        user3Description.innerText=userDetails["profile3"]["description"];
        user3Faculty.innerText=userDetails["profile3"]["faculty"];
        user3Skill.innerText=userDetails["profile3"]["skills"];
        user3Email.innerText=userDetails["profile3"]["email"];
    
    })
        .catch(error)
}

function error(response) {
    console.log(response);
    let html="<a href='#' class='close' data-bs-dismiss='alert' role='button'>&times;</a>"
    html+="<strong>"+response.error;
    html+="</strong";
    let errorDiv = document.createElement("div");
    const body = document.getElementsByTagName("body")[0];
    let errorDivC = null;

    if(!errorDivC) {
        errorDiv.setAttribute("name","alertaBootS");
        errorDivC = document.getElementsByName("alertaBootS")[0];
        errorDiv.setAttribute("role","alert");
        //errorDiv.setAttribute("id","alertaBootSID");
        errorDiv.setAttribute("class","alert alert-danger alert-dismissible");
        errorDiv.innerHTML=html;
        body.prepend(errorDiv);
    } else {
        errorDiv.innerHTML=html;
    }
}

function sendMail1() {
    const user1Email = document.getElementById("user1Email");
    const mail = user1Email.innerText
    window.open(`mailto:${mail}`);
    //console.log(mail);
}

function sendMail2() {
    const user2Email = document.getElementById("user2Email");
    const mail =  user2Email.innerText
    window.open(`mailto:${mail}`);
    //console.log(mail);
}

function sendMail3() {
    const user3Email = document.getElementById("user3Email");
    const mail = user3Email.innerText
    window.open(`mailto:${mail}`);
    //console.log(mail);
}

function logOut() {
    sessionStorage.removeItem("token");
    window.location.href = 'LogIn.html';
}