let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));

  console.log(userData);
};

// Ou =>

// const fetchUser = () => {
//     fetch("https://randomuser.me/api/?results=24")
//     .then((res) => res.json())
//     .then((data) => userData = data.results).then(() => console.log(userData));
// }

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
      year: "numeric",
      month: "long",
      day:'numeric'
    });
    return newDate;
  }

  const dateCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);
    let nbrJour = todayTimestamp - timestamp;


    return Math.floor(nbrJour / 8.64e7);
  }

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
        <div class = "card">
          <img src=${user.picture.large} alt="photo de ${user.name.first}"></img>
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>${user.location.city} ${user.location.country}</p>
          <p>Né le : ${dateParser(user.dob.date)}</p>
          <b>${user.email}</b>
          <em>Membre depuis ${dateCalc(user.registered.date)} jours</em>
        </div>
    `
    )
    .join("");
  // différence innerHTML - textContent => TC on écrit dans une balise, innerH on peut créer une balise et écrire dedans
};

userDisplay();
