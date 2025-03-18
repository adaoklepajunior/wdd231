// URL of the JSON data provided
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

//select the part of the html where the cards will be. (Select the div with id "cards")
const cards = document.querySelector("#cards");

//async function that select info from the json object
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "350");
        portrait.setAttribute("height", "450");

        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    })
};

getProphetData();
