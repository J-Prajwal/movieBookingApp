let movies = JSON.parse(localStorage.getItem("movie"));
let walletBalance = localStorage.getItem("amount");
document.querySelector("#wallet").innerHTML = "₹ " + walletBalance;

function checkout() {
    let numSeats = document.querySelector('#number_of_seats').value;

    let net = numSeats * 100;

    if(net <= walletBalance) {
        alert('Booking successfull!');
        localStorage.setItem("amount", walletBalance-net);
        document.querySelector("#wallet").innerHTML = walletBalance-net;
        window.location.href = 'index.html';
    } else {
        alert('Insufficient Balance!');
        window.location.href = 'index.html';
    }
}



movies.map(function(elem) {
    let div = document.createElement("div");

    let poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/original/${elem.poster_path}`;

    let title = document.createElement("h3");
    title.innerHTML = elem.original_title;

    div.append(poster, title);
    document.querySelector('#movie').append(div);
})