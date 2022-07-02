const header = document.getElementById("header");
const contentText = document.getElementById("content");


function getJoke() {
    
    fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => { 
        
        const joke = data.data.content;     // => mini destructuring
        
        console.log(joke);
        
        header.textContent = joke.text_head
        if(joke.text_hidden !== ""){
            content.textContent = joke.text_hidden
        } else {
            content.textContent = joke.text;
        }
    });
}

// function getJoke() {
    
//     fetch("https://api.blablagues.net/?rub=blagues")
//     .then((res) => res.json())
//     .then(({ data }) => {  // == data.data
//         const { content } = data;   // => big destructuring == data.content

//         header.textContent = content.text_head
//         if(content.text_hidden !== ""){
//             contentText.textContent = content.text_hidden
//         } else {
//             contentText.textContent = content.text;
//         }
//     });
// }

getJoke();

document.body.addEventListener('click', getJoke);



