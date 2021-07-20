


console.log('started');
let showall = document.getElementById('showall');
let filterbtn = document.getElementById('filterbtn');
let mountain = document.getElementById('mountain');
let river = document.getElementById('river');
let road = document.getElementById('road');
let trees = document.getElementById('trees');
let city = document.getElementById('city');
let valley = document.getElementById('valley');
let beach = document.getElementById('beach');

let gallery = document.getElementById('gallery')
let i;

fetch('/travells/image/item')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        for (i = 0; i < data.length; i++) {

            gallery.innerHTML += `<div class="img-responsive">
                                          <img src="${data[i].Cloudinary_secure_url}">
                                          <span class="imgdetail text-info" id="typename">${data[i].Type} in ${data[i].City} ${data[i].State} ${data[i].Country} (Date:${data[i].Date})</span> 
                                      </div>`


        }
    })



