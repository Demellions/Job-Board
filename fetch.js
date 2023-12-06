const submit = document.getElementById('submit');
const form = document.getElementById('form');

submit.addEventListener('click', async (e)=>{
    e.preventDefault();

    
    let body = {
        "name_people" : form.name_people.value,
        "prenom" : form.prenom.value,
        "type_poste": form.type_poste.value,
        "mail": form.mail.value,
        "portable": form.portable.value,
        "username": form.username.value,
        "password": form.password.value
    }
    try {
        let response = await fetch("http://127.0.0.1:8000/adduser", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    
        if (response.ok) {
            let datas = await response.json();
            console.log("data" + datas);
        } else {
            console.log("Error: " + response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log("Error: " + error);
    }
});




