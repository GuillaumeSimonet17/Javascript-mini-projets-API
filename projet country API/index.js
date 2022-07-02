// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

// ---------------------------------------------
// ce que j'avais fait avant correction pour .sort =>
// let btnCroiss = document.getElementById("minToMax");
// let btnDecroiss = document.getElementById("maxToMin");
// let btnAlpha = document.getElementById("alpha");
// let minToMax;
// let maxToMin;
// ---------------------------------------------

const container = document.querySelector(".countries-container");

let btnSort = document.querySelectorAll(".btnSort");
let sortMethod = "maxToMin";
let countries = [];

async function fetchData() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => (countries = data));
  displayData();
}

function displayData() {
  console.log("yes");
  container.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    // ---------------------------------------------
    // ce que j'avais fait avant correction =>
    // .sort((a, b) => {
    //   if(minToMax === true) {
    //     console.log('croissant');
    //     return a.population - b.population
    //   } else if(maxToMin === true) {
    //     console.log('decroissant');
    //     return b.population - a.population
    //   }
    // })
    // ---------------------------------------------
    .sort((a, b) => {
      if (sortMethod === "maxToMin") return b.population - a.population;
      else if (sortMethod === "minToMax") return a.population - b.population;
      else if (sortMethod === "alpha")
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `<div class="card">
    <img src="${country.flags.svg}" alt="drapeau de ${
          country.translations.fra.common
        }"></img>
    <h2>${country.translations.fra.common}</h2>
    <h4>${country.capital}</h4>
    <p>${country.population.toLocaleString()} khey onboard</p>
    </div>`
    )
    .join("");
}

inputSearch.addEventListener("input", displayData);

inputRange.addEventListener("input", () => {
  rangeValue.innerHTML = inputRange.value;
  displayData();
});

//------------------------------------------------------
// btnCroiss.addEventListener('click', () => {
//   minToMax = true;
//   maxToMin = false;
//   displayData();
// })
// btnDecroiss.addEventListener('click', () => {
//   maxToMin = true;
//   minToMax = false
//   displayData();
// })
//-------------------------------------------------------

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    displayData();
  });
});

window.addEventListener("load", fetchData());
