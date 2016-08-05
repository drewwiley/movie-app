$(document).ready(function(){
    // this is the base URL for all our API calls
    var apiBaseUrl = 'http://api.themoviedb.org/3/';
    // this is the base URL for all images ---- after the / comes the width; e.g. imageBaseUrl + 'w300' + poster_path
    var imageBaseUrl = 'http://image.tmdb.org/t/p/';
    // the query string, including the API key
    var apiKey = 'api_key=fec8b5ab27b292a68294261bb21b04a5';
    var npUrl = apiBaseUrl + 'movie/now_playing' + '?' + apiKey;

    function displayNowPlaying(){
        $.getJSON(npUrl, function(nowPlayingData){
            console.log(nowPlayingData);
            var npHTML = '';
            for(var i = 0; i < nowPlayingData.results.length; i++){
                npHTML += '<div class="col">';
                    npHTML += nowPlayingData.results[i].title;
                    var posterUrl = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
                    npHTML += '<img src="' + posterUrl + '">';
                npHTML += '</div>';
            }
            $('.shelf').html(npHTML);
        });
    }
    displayNowPlaying();


    $('.search-form').submit(function(){ // listens for search-form to be submitted
        event.preventDefault();

        var userInput = $('.user-input').val(); // get user input
        var searchUrl = apiBaseUrl + 'search/movie?query=' + userInput + '&' + apiKey; // create URL for retrieving results
        console.log(userInput);
        console.log(searchUrl);

        $('.title').html('results for: ' + userInput); // change text of results title

        $.getJSON(searchUrl, function(searchData){
            console.log(searchData);
            var searchHTML = '';
            for(var i = 0; i < searchData.results.length; i++){ // loop through results and create HTML
                searchHTML += '<div class="col">';
                    // searchHTML += searchData.results[i].title;
                    var posterUrl = imageBaseUrl + 'w300' + searchData.results[i].poster_path;
                    searchHTML += '<img src="' + posterUrl + '">';
                searchHTML += '</div>';
            }
            $('.shelf').html(searchHTML); // load constructed HTML into poster grid
        });

    });

    $('.search-form').click(function(){
        displayNowPlaying();
        $('.title').html('<h1>Now Playing</h1>'); // change text of results title
    });
});