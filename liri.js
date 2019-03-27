var axios = require("axios");

// put arguments in an array
var nodeArgs = process.argv;
console.log(nodeArgs)

//capture the commandline "movie-this"
if (nodeArgs[2] === "movie-this") {
    searchMovie();
}

//capture the commandline "concert-this"
if (nodeArgs[2] === "concert-this") {
    searchConcerts();
}

if (nodeArgs[2] === "spotify-this") {
    searchSong();
}

// create a for loop function for the search input; this will add the "+" sign
function inputArgs() {
    var liriSearch = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3) {
            liriSearch = liriSearch + "+" + nodeArgs[i];
        }
        else {
            liriSearch += nodeArgs[i];
        }
    }
    return liriSearch
}
function searchMovie() {
    var movieName = inputArgs();
// empty variable for the movie name
    if(movieName === ""){
        movieName = "Mr. Nobody"
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //  console.log(response.data)
            console.log("Movie title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating of the movie is: " + response.data.imdbRating);
            console.log("Movie was produced in: " + response.data.Country);
            console.log("Language of the movie is in: " + response.data.Language);
            console.log("Plot of the movie is about: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);

            for (const i in response.data.Ratings) {
                if (response.data.Ratings.hasOwnProperty(i)) {
                    console.log("Rotten Tomatoes Rating of the movie is: " + response.data.Ratings[1].Value)
                    break
                }
            }
        }
    );
};

//function for the queryURL
function searchConcerts() {

    var artist = inputArgs();

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            for (var concert of response.data) {
                console.log("--------------------------");
                console.log(concert.venue.name)
                console.log(concert.datetime)
                console.log(concert.venue.country)
                console.log(concert.venue.city)
                console.log("--------------------------");
            }
        }
    );

}

function searchSong(){

var song = inputArgs();

if(song === ""){
    song = "the sign ace of base"
    console.log(song);
}
 var requireVar = require("dotenv").config();
 var keys = require("./keys.js");
 var Spotify = require('node-spotify-api');
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
 
 spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    console.log(response.tracks.items[0]);
 
    // for (const i in response) {
    //     console.log(response.artists)
    //     if (response.hasOwnProperty(i)) {
    //         const element = response[i];
    //         console.log(element)
    //     }
    // }
  })
  .catch(function(err) {
    console.log(err);
  });
 }