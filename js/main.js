// document.addEventListener('DOMContentLoaded', function () {
    function ValidationEvent() {
        event.preventDefault();
        let searchText = document.getElementById('searchText').value;
        getMovies(searchText);
      };
// });

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=a2477788'+'&s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            for ( var i = 0, l = movies.length; i<l; i++){
                output +=`
                    <div class="container">
                    <div class="well text-center">
                        <img src="${movies[i].Poster}">
                        <h5>${movies[i].Title}"</h5>
                        <a onClick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                    </div>
                `;
                let elem = document.getElementById("movies")
                console.log(elem.innerHTML)
                elem.innerHTML = output;
                console.log(elem)
            };
           // console.log("output",output)

            // function displayResult(){
            //     let elem = document.getElementById("movies")
            //     console.log(elem.innerHTML)
            // elem.innerHTML = output;
            // console.log(elem)
            // }
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    console.log("ddd", movieId);
    axios.get('http://www.omdbapi.com/?apikey=a2477788'+'&i='+movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            `;
            let elem = document.getElementById("movie")
                console.log(elem.innerHTML)
                elem.innerHTML = output;
                console.log(elem)

        })
        .catch((err) => {
            console.log(err);
        });

}