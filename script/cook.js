$(document).ready(function () {
    var recipes = [];

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var recipeSearchInput = $("#dish-input").val();

        if ($("#ingredient-input").val())
            recipeSearchInput += "%20" + $("#ingredient-input").val();

        if ($("#cuisine-input").val())
            recipeSearchInput += "%20" + $("#cuisine-input").val();

        var queryURL = "https://food2fork.com/api/search?key=7cd47955dffd41deaec51a869580847a&q=" + recipeSearchInput;

        ///////////////////////////////////////////////////////
        // heroku workaround for Cors
        // Note: queryURL will be defined by the student.
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = queryURL;

        $.get(proxyUrl + targetUrl, function (response) {
        var response1 = JSON.parse(response);

        for (var i = 0; i < 5; i++) {
        var recipeTitle = response1.recipes[i].title;
        var recipeImage = response1.recipes[i].image_url;
        var recipeURL = response1.recipes[i].source_url; 
        var recipeSource = response1.recipes[i].publisher;  

        $("#recipeCard").append(
           "<div class='row recipe-container'><div class='col-md-3'><img class=' recipePhoto' src='" + recipeImage + "'/></div>" + "<div class = 'col-md-9'><a href ='" + recipeURL + "'target='_blank'>" + recipeTitle + "</a><br>" + " Recipe Source: " + recipeSource + "</div></div>")
        };

        });           
    });
});