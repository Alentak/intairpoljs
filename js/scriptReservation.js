window.addEventListener('load', function (){
    var btnRechercher = document.querySelector('#btnRechercher');

    var depart = document.querySelector('#depart');
    var arrivee = document.querySelector('#arrivee');
    var dateSaisie = document.querySelector('#date');
    var nbPersonnes = document.querySelector('#personnes');

    //Si ya des params dans l'url appel de la fonction afficherVols avec ces derniers
    if(getUrlParameter("personnes") != null){
        depart.value = getUrlParameter("depart");
        arrivee.value = getUrlParameter("arrivee");
        dateSaisie.value = getUrlParameter("date");
        nbPersonnes.value = getUrlParameter("personnes");
        
        afficherVols(depart.value, arrivee.value, dateSaisie.value, nbPersonnes.value);
    }
    else {
        afficherTousLesVols();
    }

    btnRechercher.addEventListener('click', function(){
        //Récupérer les champs
        depart = depart.value;
        arrivee = arrivee.value;
        dateSaisie = dateSaisie.value;
        nbPersonnes = nbPersonnes.value;

        //Avoir le nombre de millisecondes entre le 1 janvier 1970 et la date, si la date est pas valide, cela ne fonctionnera pas
        let isValidDate = Date.parse(dateSaisie);
        //Transformer une string date en Objet de type Date pour pouvoir utiliser les methodes de la classe
        var date = new Date(dateSaisie);

        //Si les champs sont invalides on quitte
        if (isNaN(isValidDate) || depart == "" || arrivee == "" || isNaN(nbPersonnes) || nbPersonnes < 0 || isValidDate < 0 || date.getFullYear() > 2099) {
            return false;
        }
        //Si tout est bon on continue
        afficherVols(depart, arrivee, date, nbPersonnes);
    });
});

function getUrlParameter(name){
    //Récup un parametre de l'URL
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    return params.get(name);
}

function afficherVols(depart, arrivee, dateSaisie, nbPersonnes){
    //Aller chercher le json
    fetch("../db/vols.json").then(response => response.json()).then(json =>  {
        var lesVolsCorrespondants = [];
        //On ajoute dans le tableau les vols correspondants aux criteres
        for (let i = 0; i < json.length; i++) {
            var date = new Date(json[i].DateDep);
            if(json[i].AeroportDep == depart && json[i].AeroportArr == arrivee && date.toISOString().slice(0, 10) == dateSaisie) lesVolsCorrespondants.push(json[i]);
        }
        var parent = document.querySelector('#sectionVols');
        //Si aucun vol n'a été trouvé
        if(lesVolsCorrespondants.length == 0){
            parent.innerHTML = "Aucun vol trouvé";
            return false;
        }
        //On parcours ce tableau et on ajoute un article pour chaque vol
        for (let i = 0; i < lesVolsCorrespondants.length; i++) {
            parent.innerHTML = "<article><h3>" + lesVolsCorrespondants[i].AeroportDep + " --> " + lesVolsCorrespondants[i].AeroportArr + " - Départ : " + lesVolsCorrespondants[i].DateDep + "</h3>" +
            "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero odit dolorum soluta id sunt. Minus id accusantium illo corporis velit reprehenderit odit, voluptatem quas vel nam dolorum consectetur repudiandae officia.</p><p class='gras'>Prix : " + lesVolsCorrespondants[i].PrixEco + "€</p>" +
            "<a href='paiement.html?IdVol=" + lesVolsCorrespondants[i].IdVol + "'><button id='btnReserver'>Réserver</button></a></article>";   
        }
    });
}

function afficherTousLesVols(){
    //Aller chercher le json
    fetch("../db/vols.json").then(response => response.json()).then(json =>  {
        //Ajouter un article pour chaque vol
        var parent = document.querySelector('#sectionVols');
        parent.innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            parent.innerHTML = parent.innerHTML + "<article><h3>" + json[i].AeroportDep + " --> " + json[i].AeroportArr + " - Départ : " + json[i].DateDep + "</h3>" +
            "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero odit dolorum soluta id sunt. Minus id accusantium illo corporis velit reprehenderit odit, voluptatem quas vel nam dolorum consectetur repudiandae officia.</p><p class='gras'>Prix : " + json[i].PrixEco + "€</p>" +
            "<a href='paiement.html?IdVol=" + json[i].IdVol + "'><button id='btnReserver'>Réserver</button></a></article>";
        }
    });
}

function listeVilleDepart(){
    //Récupérer la liste des villes 
    fetch("../db/vols.json").then(response => response.json()).then(json =>  {
        var lesVilles = [];
        var parent = document.querySelector('#depart');
        //Ajoute les villes dans le tableau une fois
        for (let i = 0; i < json.length; i++) {
            if(lesVilles.includes(json[i].AeroportDep) == false) lesVilles.push(json[i].AeroportDep);
        }
        //Parcours ce tableau et ajoute les villes dans la liste des villes de départ possible
        for (let i = 0; i < lesVilles.length; i++) {
            parent.innerHTML = parent.innerHTML + "<option>" + lesVilles[i] + "</option>";
        }
    });
}

function listeVilleArrivee(){
    //Récupérer la liste des villes 
    fetch("../db/vols.json").then(response => response.json()).then(json =>  {
        var lesVilles = [];
        var parent = document.querySelector('#arrivee');
        //Ajoute les villes dans le tableau une fois
        for (let i = 0; i < json.length; i++) {
            if(lesVilles.includes(json[i].AeroportArr) == false) lesVilles.push(json[i].AeroportArr);
        }
        //Parcours ce tableau et ajoute les villes dans la liste des villes de départ possible
        for (let i = 0; i < lesVilles.length; i++) {
            parent.innerHTML = parent.innerHTML + "<option>" + lesVilles[i] + "</option>";
        }
    });
}