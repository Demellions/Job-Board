// ############                                       ######################
// ############      Espace Super Admin               ######################
// ############          ADD USERS                    ######################

const valider = document.getElementById('Submit');
const form1 = document.getElementById('form_sa');

valider.addEventListener('click', async (e) => {
    e.preventDefault();


    let body1 = {
        "name_people": form1.name_people.value,
        "prenom": form1.prenom.value,
        "type_poste": form1.type_poste.value,
        "mail": form1.mail.value,
        "portable": form1.portable.value,
        "username": form1.user.value,
        "password": form1.password.value
    }
    console.log(body1)
    try {
        let response = await fetch("http://127.0.0.1:8000/adduser", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body1)
        });
        console.log(response);
        if (response.ok) {
            try {
                let datas = await response.json();
                console.log("data", datas);

                if (datas.errorMessage) {
                    const errorMessage = datas.errorMessage.msg;
                    const errorElement = document.getElementById("err");
                    errorElement.innerHTML = errorMessage;
                }
            } catch (jsonError) {
                console.error("JSON Parsing Error: " + jsonError);
            }
        } else {
            const errorMessage = "Error: " + response.status + " " + response.statusText;
            const errorElement = document.getElementById("err");
            errorElement.textContent = errorMessage;
        }
    } catch (error) {
        const errorMessage = "Error: " + error;
    }
})



// ############                                       ######################
// ############      Espace Super Admin               ######################
// ############          Show users                    ######################

let show_users = document.getElementById("table_users")
const formInput = document.getElementById("form_input")
 
window.addEventListener("load", async function () {
    try {
        let response = await fetch("http://127.0.0.1:8000/getusers", {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            let datas = await response.json()
            datas = JSON.parse(datas)
            for (let data of datas) {
                let divPrinc = document.createElement("div");
                let div2 = document.createElement("div");
                let div3 = document.createElement("div");
                let div4 = document.createElement("div");
                let divlabel = document.createElement("div");
                let divinput = document.createElement("div");
                let h2 = document.createElement("h2");
                let form_input = document.createElement("form");
                let labelname = document.createElement("label");
                let labelprenom = document.createElement("label");
                let labelposte = document.createElement("label");
                let labelmail = document.createElement("label");
                let labelpassword = document.createElement("label");
                let input1 = document.createElement("input");
                let input2 = document.createElement("input");
                let input3 = document.createElement("input");
                let input4 = document.createElement("input");
                let input5 = document.createElement("input");
                let p6 = document.createElement("p");
                let BtnSupp = document.createElement("button");
                let BtnMod = document.createElement("button");
                div2.classList.add("userAdmin");
                labelname.id = "name_people"
                labelprenom.id = "prenom"
                labelposte.id = "type_poste"
                labelmail.id = "mail"
                labelpassword.id = "password"
                form_input.classList.add("form")
                divlabel.classList.add("grid-left");
                divinput.classList.add("grid-right");
                input1.classList.add("showUsers");
                input2.classList.add("showUsers");
                input3.classList.add("showUsers");
                input4.classList.add("showUsers");
                input5.classList.add("showUsers");
                p6.classList.add("showUsers");
                BtnMod.classList.add("modifier");
                BtnSupp.classList.add("supprimer");
                labelmail.textContent = "Prenom :"
                labelname.textContent = "Name :"
                labelpassword.textContent = "Métier :"
                labelposte.textContent = "Mail :"
                labelprenom.textContent = "Portable :"
                BtnMod.id = data.id_people
                BtnSupp.id = data.id_people
                input1.id = "name_people";
                input2.id = "prenom";
                input3.id = "type_poste";
                input4.id = "mail";
                input5.id= "portable";
                p6.id = "password";
                BtnSupp.textContent = "Supprimer"
                BtnMod.textContent = "Modifier"
                console.log(data.name_people);
                input1.value = data.name_people
                input2.value = data.prenom
                input3.value = data.type_poste
                input4.value = data.mail
                input5.value = data.portable
                p6.textContent = data.password
                h2.textContent = data.id_people +" "+ data.user;
                divPrinc.append(div2);
                div4.append(BtnSupp, BtnMod); 
                div2.append(div3, div4);
                div3.append(h2, input1, input2, input3, input4, input5, p6, form_input);
                divlabel.append(labelname, labelmail, labelpassword, labelposte, labelprenom);
                divinput.append(input1, input2, input3, input4, input5)
                form_input.append(divlabel, divinput, p6);
            show_users.appendChild(divPrinc)



            BtnSupp.addEventListener("click", async (e) => {
                try {
                    e.preventDefault();
                    const userIdToDelete = parseInt(data.id_people)
                    let response1 = await fetch(`http://127.0.0.1:8000/suppuser/${userIdToDelete}`, {
                        method: "DELETE",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + document.cookie
                        },
                        body: JSON.stringify({"id_people": data.id})
                    });
            
                    if (response1.ok) {
                        console.log("Utilisateur supprimé avec succès");
                    } else {
                        console.log("Erreur lors de la suppression de l'utilisateur");
                    }
                } catch (error) {
                    console.error("Erreur : " + error);
                }
                window.location.reload()
            });
            


            BtnMod.addEventListener("click", async (e) => {
                e.preventDefault();
                const userId = data.id_people;
                const newName = input1.value;
                const newPrename = input2.value;
                const newPoste = input3.value;
                const newMail = input4.value;
                const newPortable = input5.value;
            
                try {
                    let response2 = await fetch(`http://127.0.0.1:8000/upuser/${userId}`, {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "id_people": userId,
                            "name_people": newName,
                            "prenom": newPrename,
                            "type_poste": newPoste,
                            "mail": newMail,
                            "portable": newPortable
                        })
                    });
            
                    if (response2.ok) {
                        console.log("Utilisateur modifié avec succès");
                        window.location.reload(); // Rafraîchit la page après la modification réussie
                    } else {
                        console.log("Erreur lors de la modification de l'utilisateur :", response2.status);
                    }
                } catch (error) {
                    console.error("Erreur :", error);
                }
            });
            
            }
        } else {
            console.log("Error:" + response.status + "" + response.statusText);
        }
    } catch (error) {
        console.log("Error:" + error);
    }
})
