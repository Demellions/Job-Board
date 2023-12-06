let annonces = document.getElementById("a");
window.addEventListener("load", async function(){
    try {
        let response = await fetch("http://127.0.0.1:8000/getadvertisement", {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
    
        })
        
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
                let h2 = document.createElement("h2");
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                let p3 = document.createElement("p");
                let p4 = document.createElement("p");
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
                button1.id = data.id_advertisement
                h2.textContent = data.employeur
                p1.textContent = data.type_de_poste
                p2.textContent = data.date_plubi + " " + data.contrat_type
                p3.textContent = data.remuneration + "€"
                p4.textContent = data.details
                button1.textContent = "Learn More"
                div1.append(section1, section2)
                section1.append(div2, div3, div4)
                section2.append(div5, div8)
                div2.append(h2)
                div3.append(p1, p2)
                div4.append(p3)
                div5.append(div6)
                div6.append(p4)
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
        }   
        } else {
            console.log("Error: " + response.status + " " + response.statusText);
        }
    } catch (error) {
        console.log("Error: " + error);
    } 
    
})