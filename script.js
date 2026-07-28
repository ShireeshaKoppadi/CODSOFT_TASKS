// Dark Mode

const darkModeBtn = document.getElementById("darkModeBtn");


darkModeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

});




// Search Functionality

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");


searchInput.addEventListener("keyup", function(){

    let value = searchInput.value.toLowerCase();


    cards.forEach(function(card){

        let title = card.querySelector("h3").innerText.toLowerCase();


        if(title.includes(value)){

            card.style.display="block";

        }
        else{

            card.style.display="none";

        }

    });

});





// Load More Functionality

const loadBtn = document.querySelector(".load-btn");

const extraCards = document.querySelectorAll(".extra-card");


loadBtn.addEventListener("click", function(){


    extraCards.forEach(function(card){

        card.style.display="block";

    });


    loadBtn.style.display="none";


});