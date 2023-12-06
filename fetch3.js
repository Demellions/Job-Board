// ############                                       ######################
// ############             Add Annonces              ######################
// ############                                       ######################

const creer = document.getElementById('creer');
const form1 = document.getElementById('form1');

creer.addEventListener('click', async (e) => {
    e.preventDefault();


    let body1 = {
        "employeur": form1.employeur.value,
        "type_de_poste": form1.type_poste.value,
        "remuneration": form1.remuneration.value,
        "date_plubi": form1.date_publi.value,
        "details": form1.details.value,
        "adresse": form1.adresse.value,
        "contrat_type": form1.type_contrat.value,
        "duree_contrat": form1.duree_contrat.value,
        "teletravail": form1.teletravail.value,
    }
    
    try {
        let response = await fetch("http://127.0.0.1:8000/addadvertisement", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body1)
            });
            
        if (response.ok) {
            try {
                let datas = await response.json();
                console.log(datas);

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
