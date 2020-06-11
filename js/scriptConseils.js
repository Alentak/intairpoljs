window.addEventListener('load', function (){
    if(getUrlParameter("budget") == null) afficherToutesLesVilles();
    else afficherVille(getUrlParameter("budget"));
});

function getUrlParameter(name){
    //Récup un parametre de l'URL
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    return params.get(name);
}
function afficherToutesLesVilles(){
    var titreSection = document.querySelector('#titreSection');
    titreSection.innerText = "Destinations conseillées";

    //Récupérer la liste des villes 
    fetch("../db/villes.json").then(response => response.json()).then(json =>  {
        var parent = document.querySelector("#content");
        for (let i = 0; i < json.length; i++) {
            //On affiche une partie de la description et quand on clique on renvoi vers le guide associé
            parent.innerHTML = parent.innerHTML +   "<article>" +
                                                        "<h3>" + json[i].Nom + "</h3><img src='../img/villes/" + json[i].Image + "' alt='une photo'/>" + 
                                                        "<p>" + (String)(json[i].Description).slice(0, 300) + "..." + "</p>" +
                                                        "<p class='gras'>Prix : " + json[i].Prix + "€" + "</p>" +
                                                    "</article>"
        }
    });
}
function afficherVille(budget){
    //Vérif
    if(isNaN(budget) || budget < 0)
        return false;

    var titreSection = document.querySelector('#titreSection');
    titreSection.innerText = "Destinations à moins de " + budget + "€ conseillées";

    fetch("../db/villes.json").then(response => response.json()).then(json =>  {
        var parent = document.querySelector("#content");
        var nbVillesTrouvees = 0;
        for (let i = 0; i < json.length; i++) {
            if(json[i].Prix <= budget) nbVillesTrouvees++;
        }
        if(nbVillesTrouvees == 0) parent.innerHTML = parent.innerHTML + "Aucune ville trouvée pour ce budget";
        else{
            for (let i = 0; i < json.length; i++) {
                if(json[i].Prix <= budget){
                    //On affiche une partie de la description et quand on clique on renvoi vers le guide complet associé
                    parent.innerHTML =  parent.innerHTML +  "<article>" +
                                                                "<h3>" + json[i].Nom + "</h3><img src='../img/villes/" + json[i].Image + "' alt='une photo'/>" + 
                                                                "<p>" + (String)(json[i].Description).slice(0, 300) + "..." + "</p>" + 
                                                                "<p class='gras'>Prix : " + json[i].Prix + "€" + "</p>" +
                                                            "</article>"
                }
            }
        }
    });
}