window.addEventListener('load', function(){
    if(getUrlParameter("p") != null){
        alert('Paiement effectué');
        window.location.href = "index.html";
    }
});

function getUrlParameter(name){
    //Récup un parametre de l'URL
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    return params.get(name);
}