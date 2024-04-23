const lsLikesKey = 'likes';
let boolLike = false;

function getLikes() {
    const likes = localStorage.getItem(lsLikesKey);
    if (!likes) {
        return [];
    }
    return JSON.parse(likes);
};
function addLike(id, count, links) {
    const likes = getLikes();
    if (!likes.some(like => like.id === id)) {
        newImage(id, count, links);
    } else {
        changeInfo(id);
    }
}

function newImage(id, count, links) {
    const likes = getLikes();
    count += 1;
    boolLike = true;
    likes.push({ id, count, boolLike, links });
    localStorage.setItem(lsLikesKey, JSON.stringify(likes));
    alert('Сохранили');
}
function changeInfo(id) {
    const likes = getLikes();
    likes.forEach(like => {
        if (like.id === id) {
            if (like.boolLike === true) {
                like.boolLike = false;
                like.count -= 1;
                boolLike = false;
                localStorage.setItem(lsLikesKey, JSON.stringify(likes));
                alert('Изменили');
            } else {
                like.boolLike = true;
                like.count += 1;
                boolLike = true;
                localStorage.setItem(lsLikesKey, JSON.stringify(likes));
                alert('Изменили');
            }
        }
    });
}

function historyImage(id) {
    const likes = getLikes();
    let length = likes.length;
    let index = 0;
    likes.forEach(function (like, i) {
        if (like.id === id) {
            index = i - 1;
        } else {
            index = length - 1;
        }
    });
    console.log(index);
    if (index === -1) {
        return likes[length - 1].links;
    }
    return likes[index].links;

};

export { getLikes, addLike, historyImage };