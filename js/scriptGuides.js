window.addEventListener('load', function (){
    if(getUrlParameter("ville") == null) afficherToutesLesVilles();
    else afficherVille(getUrlParameter("ville"));
    
});

function getUrlParameter(name){
    //Récup un parametre de l'URL
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    return params.get(name);
}
function afficherToutesLesVilles(){
    //Récupérer la liste des villes 
    fetch("../db/villes.json").then(response => response.json()).then(json =>  {
        var parent = document.querySelector("#sectionVilles");
        for (let i = 0; i < json.length; i++) {
            //On affiche une partie de la description et quand on clique on affiche tout
            parent.innerHTML = parent.innerHTML +   "<article>" +
                                                        "<h3>" + json[i].Nom + "</h3><img src='../img/villes/" + json[i].Image + "' alt='une photo'/>" + 
                                                        "<p>" + (String)(json[i].Description).slice(0, 300) + "..." + "</p>" + 
                                                    "</article>"
        }
    });
}
function afficherVille(ville){
    fetch("../db/villes.json").then(response => response.json()).then(json =>  {
        var parent = document.querySelector("#sectionVilles");
        for (let i = 0; i < json.length; i++) {
            if(json[i].Nom == ville){
                //On affiche une partie de la description et quand on clique on affiche tout
                parent.innerHTML = "<article>" +
                                        "<h3>" + json[i].Nom + "</h3><img src='../img/villes/" + json[i].Image + "' alt='une photo'/>" + 
                                        "<p>" + (String)(json[i].Description).slice(0, 300) + "..." + "</p>" + 
                                    "</article>"
            }
        }
    });
}