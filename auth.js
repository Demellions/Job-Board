let forme = document.getElementById("form_connect");
let sub = document.getElementById("submit_co");

sub.addEventListener("click", async(e)=>{
    e.preventDefault()
    let user = {
        "username" : forme.username_co.value,
        "password" : forme.password_co.value
    };
    try {
        let response = await fetch("http://127.0.0.1:8000/token", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    
        if (response.ok) {
            let data = await response.json();
            document.cookie = data.access_token;
            document.location.href="user.html";
            console.log(document.cookie);

        } else {
            console.log("Error: " + response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
})

function delog(){
    localStorage.removeItem("token");
    document.location.href="annonces.html";
    alert("Au revoir !!");
}