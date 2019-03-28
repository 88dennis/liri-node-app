var axios = require("axios");
var fs = require("fs")
// put arguments in an array
var nodeArgs = process.argv;
// console.log(nodeArgs)
var input = inputArgs();

function decideWhatToDo(command, query) {
    // console.log(command + query);
    //capture the commandline "movie-this"
    if (command === "movie-this") {
        searchMovie(query);
    }
    //capture the commandline "concert-this"
    if (command === "concert-this") {
        searchConcerts(query);
    }
    if (command === "spotify-this-song") {
        searchSong(query);
    }
    if (command === "do-what-it-says") {
        doWhatItSays();
    }
}

decideWhatToDo(nodeArgs[2], input);

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

function searchMovie(movieName) {
    // empty variable for the movie name
    if (movieName === "") {
        movieName = "Mr. Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            //  console.log(response.data)
            console.log("--------------------------");
            console.log("Movie title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating of the movie is: " + response.data.imdbRating);
            console.log("Movie was produced in: " + response.data.Country);
            console.log("Language of the movie is in: " + response.data.Language);
            console.log("Plot of the movie is about: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
            console.log("--------------------------");
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
function searchConcerts(artist) {
    if (artist === "") {
        artist = "Lauv"
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
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

function searchSong(song) {
    if (song === "") {
        song = "the sign ace of base"
        console.log(song);
    }
    var requireVar = require("dotenv").config();
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var getArtistsName = function (artist) {
        return artist.name
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            // console.log(response.tracks)
            //   console.log( response.tracks.item)
            var songs = response.tracks.items
            for (let i = 0; i < songs.length; i++) {
                //   const element = info[i];
                console.log("--------------------------");
                console.log(songs[i].name);
                console.log(songs[i].artists.map(getArtistsName))
                console.log(songs[i].preview_url)
                console.log(songs[i].album.name)
                console.log("--------------------------");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        decideWhatToDo(output[0], output[1]);

    });
}
