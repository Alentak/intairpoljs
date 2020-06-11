window.addEventListener('load', function(){
    var btn = document.querySelector('#btnEnvoyer');

    btn.addEventListener('click', function(){
        var liste = document.querySelector('#selDest');
        var mail = liste.value;
        var sujet = liste[liste.selectedIndex].innerText;
        var corps = document.querySelector('#taMail').value;

        var a = document.createElement("a");
        a.href = "mailto:" + mail + "?subject=Problème avec " + sujet + "&body=" + corps;
        a.click();
    });
});