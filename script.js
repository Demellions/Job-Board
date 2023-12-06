// ############                                       ######################
// ############               POPUP S'INSCRIRE        ######################
// ############                                       ######################


const popup=document.getElementById("popupfilter")
const popupchild = document.getElementById("popup")
const btn = document.getElementById("inscription");

btn.addEventListener("click", function(){
    if (popup.style.display == ""){
        popup.style.display = "block";
    }
    else {
        popup.style.display = "";
    }
}
);

popup.addEventListener("click", function(){
    popup.style.display = "";
})

popupchild.addEventListener("click", function(e){
    e.stopPropagation()
})


// ############                                       ######################
// ############               POPUP SE CONNECTER      ######################
// ############                                       ######################

const btn1 = document.getElementById("connexion");
const popup1 = document.getElementById("popupfilter1");
const popup1child = document.getElementById("popup1");

btn1.addEventListener("click", function(){
    if (popup1.style.display == ""){
        popup1.style.display = "block";
    }
    else {
        popup1.style.display = "";
    }
}
);

popup1.addEventListener("click", function(){
    popup1.style.display = "";
})

popup1child.addEventListener("click", function(e){
    e.stopPropagation()
})


// ############                                       ######################
// ############      ENCRYPTION DU MOT DE PASSE       ######################
// ############                                       ######################


var pass=document.getElementById("password").value;

if(pass==="")
{
    document.getElementById('err').innerHTML='Error:Password is missing';
} else {
    document.getElementById('err').innerHTML='';
}

