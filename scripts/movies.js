// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page


// const url = 'https://api.themoviedb.org/3/search/movie?api_key=b3d7513e669169551c86a221bb67c912&language=en-US&query=avengers&page=1&include_adult=true'

// fetch(url).then(function (res) {
//     return res.json();
// }).then(function (res) {
//     console.log(res.results);
// }).catch(function (err) {
//     console.log(err);
// })

let id;

async function searchMovies() {
    try {
        let query = document.querySelector("#search").value;
        let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b3d7513e669169551c86a221bb67c912&language=en-US&query=${query}&page=1&include_adult=true`);
        let data = await res.json();
        // console.log(data.results);
        const movies = data.results;
        return movies;
    }
    catch (err) {
        console.log(err);
    }
}

function appendMovies(data) {
    document.querySelector("#movies").innerHTML = null;

    data.forEach(function (elem) {
        let div = document.createElement("div");

        let poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/original/${elem.poster_path}`;

        let title = document.createElement("h3");
        title.innerHTML = elem.original_title;

        let btn = document.createElement("button");
        btn.innerText = 'Book Now';
        btn.setAttribute('class', 'book_now');
        btn.addEventListener('click', function() {
            let arr = [];
            arr.push(elem);
            localStorage.setItem("movie", JSON.stringify(arr));
            window.location.href = 'checkout.html';
        })

        div.append(poster, title, btn);
        document.querySelector('#movies').append(div);
    })
}

async function main() {
    let data = await searchMovies();

    if(data === undefined) {
        document.querySelector("#movies").innerHTML = null;
        return false;
    }
    appendMovies(data);
}

function debounce(func, delay) {
    if (id) {
        clearTimeout(id);
    }

    id = setTimeout(function () {
        func();
    }, delay);
}