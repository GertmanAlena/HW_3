import { getLikes, addLike, historyImage } from "./storage.js";
import { APIkey } from "./app.js";
// const APIkey = APIkey;
const url = `https://api.unsplash.com/photos/random`;

async function getImages(url) {
    const response = await fetch(url, {
        headers: { Authorization: `Client-ID ` + APIkey }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const json = await response.json();
    return json;
};

(async function () {
    try {
        const result = await getImages(url);
        console.log(result);
        newImages(result);
    } catch (error) {
        alert(error);
    }
})();

function newImages(photo) {
    const photoContEl = document.querySelector('#photo-container');
    photoContEl.insertAdjacentHTML('beforeend', `
    <img class="photo" src="${photo.urls.regular}">`);

    const photoInfoEl = document.querySelector('#photo-info');
    photoInfoEl.insertAdjacentHTML('beforeend', `
    <p class="authorPhoto" src="photo ${photo.user.first_name}">${photo.user.first_name}</p>
    <button class="like"></button>
    `);
    const buttonLike = document.querySelector('.like');
    buttonLike.addEventListener('click', () => {
        addLike(photo.id, photo.likes, photo.links.download);
    });

    const btnPrevEl = document.querySelector('.prev-btn');
    btnPrevEl.addEventListener('click', () => {
        let storageUrl = historyImage(photo.id);
        const imageHover = document.querySelector('.photo');
        imageHover.classList.add('hover');
        const photoContEl = document.querySelector('#photo-container');
        const imageEl = document.createElement('img');
        imageEl.classList.add('history-image');
        imageEl.src = storageUrl;
        photoContEl.appendChild(imageEl);
    });
};