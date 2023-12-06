let annonces = document.getElementById("a");
window.addEventListener("load", async function(){
    try {
        let response = await fetch("http://127.0.0.1:8000/getadvertisement");
        if (response.ok) {
            let datas = await response.json();
            datas = JSON.parse(datas)
            for (let data of datas){
                let section1 = document.createElement("section");
                let section2 = document.createElement("section");
                let div1 = document.createElement("div");
                let div2 = document.createElement("div");
                let div3 = document.createElement("div");
                let div4 = document.createElement("div");
                let div5 = document.createElement("div");
                let div6 = document.createElement("div");
                let div7 = document.createElement("div");
                let div8 = document.createElement("div");
                let BtnMod = document.createElement("button")
                let BtnSupp = document.createElement("button")
                let h2 = document.createElement("h2");
                let input1 = document.createElement("input");
                let input2 = document.createElement("input");
                let input3 = document.createElement("input");
                let input4 = document.createElement("input");
                let input5 = document.createElement("input");
                let button1 = document.createElement("button");
                div1.classList.add("borderannonce", "divprinc");
                div4.classList.add("flex");
                div2.classList.add("flex");
                div3.classList.add("flex");
                div3.style.flexDirection = "column"
                div5.classList.add("hidedetails");
                div6.classList.add("showdetails");
                div7.classList.add("btn");
                div1.id = "ann";
                div5.id = data.id_advertisement;
                button1.id = data.id_advertisement;
                h2.textContent = data.contrat_type;
                input1.value = data.type_de_poste;
                input2.value = data.employeur;
                input3.value = data.remuneration + "€";
                input4.value = data.details;
                input5.value = data.adresse;
                BtnMod.textContent = "Modifier"
                BtnSupp.textContent = "Supprimer"
                button1.textContent = "Learn More"
                div1.append(section1, section2)
                section1.append(div2, div3, div4)
                section2.append(div5, div8)
                div2.append(h2, BtnMod, BtnSupp)
                div3.append(input1, input2, input5)
                div4.append(input3)
                div5.append(div6)
                div6.append(input4)
                div7.append(button1)
                div8.append(div5, div7)
                annonces.appendChild(div1)
                button1.addEventListener("click", function(){
                if (div5.style.display == "block"){
                    div5.style.display = "none";
                }
                else {
                    div5.style.display = "block";
                }
            }
            );
            
            BtnSupp.addEventListener("click", async (e) => {  
                try{

                let response1 = await fetch (`http://127.0.0.1:8000/supadvertisement/${data.id_advertisement}`, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({"id_advertisement" : data.id_advertisement})
                })
                if (response1.ok) {
                    console.log("Utilisateur supprimé avec succès");
                } else {
                    console.log("Erreur lors de la suppression de l'utilisateur");
                }
            } catch (error) {
                console.error("Erreur : " + error);
            }
                
                window.location.reload()
            })

            BtnMod.addEventListener("click", async(e) =>{
                e.preventDefault()
                const adId = data.id_advertisement;
                const newType_de_poste = input1.value;
                const newEmployeur = input2.value;
                const newAdresse = input5.value;
                const newRemuneration = input3.value;
                const newDétails = input4.value;

                try{
                let response2 = await fetch (`http://127.0.0.1:8000/modad/${adId}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                body : JSON.stringify({"id_advertisement" : parseInt(adId),
                        "type_de_poste" : newType_de_poste,
                        "employeur" : newEmployeur,
                        "adresse" : newAdresse, 
                        "remuneration": parseInt(newRemuneration), 
                        "details" : newDétails,
                        })
                    },
                    
            )
            if (response2.ok) {
                console.log("Utilisateur modifié avec succès");
                window.location.reload(); // Rafraîchit la page après la modification réussie
            } else {
                console.log("Erreur lors de la modification de l'utilisateur :", response2.status);
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
        
        })
            
                

            }

            


        } else {
            console.log("Error: " + response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log("Error: " + error);
    }


    
    
})