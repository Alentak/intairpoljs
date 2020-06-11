function header(refTitre, refMenu){
    document.write("<header></header><nav></nav>");
    //Récupération du header et de la navigation tout juste créés
    var header = document.getElementsByTagName("header");
    var nav = document.getElementsByTagName("nav");
    
    //Contenu en fonction de la page, pages/nomdelapage.html depuis la page index ou juste nomdelapage.html pour les autres
    var contenuHeader = "<a href='" + refTitre + "'><h1 id='intairpol'>1ntΛ°rPol</h1></a>";
    var contenuNav =    "<a href='" + refMenu + "contact.html'><button>Contact</button></a>" +
                        "<a href='" + refMenu + "reservation.html'><button>Réservation</button></a>" +
                        "<a href='" + refMenu + "forum.html'><button>Forum</button></a>" +
                        "<a href='" + refMenu + "espaceclient.html'><button>Espace client</button></a>" +
                        "<a href='" + refMenu + "guides.html'><button>Guides</button></a>" +
                        "<a href='" + refMenu + "informations.html'><button>Informations</button></a>" +
                        "<a href='" + refMenu + "conseils.html'><button>Conseils</button></a>";

    header[0].innerHTML = contenuHeader;
    nav[0].innerHTML = contenuNav;
}
function footer(){
    //Même fonctionnement que le header
    document.write("<footer></footer>");
    var footer = document.getElementsByTagName("footer");

    var contenu  = "2019 Copyright | Paul GUILLON";

    footer[0].innerHTML = contenu;
}
