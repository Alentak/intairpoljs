window.addEventListener('load', function (){
    var IdVol = getUrlParameter("IdVol");
    if(IdVol != null && IdVol > 0) getVolById(IdVol);
});

function getUrlParameter(name){
    //Récup un parametre de l'URL
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    return params.get(name);
}

function getVolById(IdVol){
    fetch("../db/vols.json").then(response => response.json()).then(json =>  {
        var sectionInfos = document.querySelector('#sectionInfos');
        for (let i = 0; i < json.length; i++) {
            if(json[i].IdVol == IdVol){
                sectionInfos.innerHTML =    "<p>Numéro de vol : " + json[i].IdVol + "</p>" +  
                                            "<p>De " + json[i].AeroportDep + " à " + json[i].AeroportArr + "</p>" + 
                                            "<p>Départ le " + json[i].DateDep + "</p>" + 
                                            "<p class='gras'>Prix " + json[i].PrixEco + "€" + "</p>"
            }            
        }
    });
}