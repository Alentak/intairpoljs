window.addEventListener('load', function (){
    var articles = document.querySelectorAll('article');
    var sectionSujets = document.querySelector('#sectionSujets');
    var sectionReponses = document.querySelector('#sectionReponses');
    
    for (let i = 0; i < articles.length; i++) {
        articles[i].addEventListener('click', function(){
            sectionSujets.style.display = "none";
            sectionReponses.style.display = "block";
        });
    }
});