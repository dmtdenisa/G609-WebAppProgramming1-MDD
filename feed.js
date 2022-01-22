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