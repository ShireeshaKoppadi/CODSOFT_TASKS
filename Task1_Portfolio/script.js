const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thank You! Your message has been sent successfully.");

    form.reset();

});

const links=document.querySelectorAll("nav a");

links.forEach(link=>{

link.addEventListener("click",function(){

links.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});

});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Message Sent Successfully!");

    form.reset();

});