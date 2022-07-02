const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

async function fetchMeals(aliment) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${aliment}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

    console.log(meals);
}

function mealsDisplay() {
  if(meals === null){
    result.innerHTML = `<h2>Aucun résultat trouvé</h2>`
  } else {
    meals.length = 24;
    result.innerHTML = meals
    .map(
      (meal) => {
        let ingredients = [];

        for(i=0; i < 21; i++){
          if(meal[`strIngredient${i}`]){
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            ingredients.push(`<li>- ${ingredient} : ${measure}</li>`);
            
          }
        }

        return`
        <li class="card">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strArea}</p>
          <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}"></img>
          <ul>${ingredients.join("")}</ul>
        </li>
        `
      }
      )
      .join("");
    }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value).then(() =>
  mealsDisplay());
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    input.value = "";
})



//---------------------------------------------
// Ou...
//---------------------------------------------



// const result = document.getElementById("result");
// const form = document.querySelector("form");
// const input = document.querySelector("input");
// let meals = [];

// async function fetchMeals() {
//   let aliment = input.value;
//   await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${aliment}`)
//     .then((res) => res.json())
//     .then((data) => (meals = data.meals));
// }

// function mealsDisplay() {
//   meals.length = 12;
//   result.innerHTML = meals
//     .map(
//       (meal) =>
//         `
//             <li class="card">
//                 <h2>${meal.strMeal}</h2>
//                 <p>${meal.strArea}</p>
//                 <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}"></img>
//                 <ul></ul>
//             </li>
//         `
//     )
//     .join("");
// }

// input.addEventListener("input", (e) => {
//   fetchMeals(e.target.value);
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   mealsDisplay();
//   input.value = "";
// });
//
