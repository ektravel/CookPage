$(document).ready(function () {
    var recipes = [];

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var recipeSearchInput = $("#dish-input").val();

        if ($("#ingredient-input").val())
            recipeSearchInput += "%20" + $("#ingredient-input").val();

        if ($("#cuisine-input").val())
            recipeSearchInput += "%20" + $("#cuisine-input").val();

        console.log(recipeSearchInput);

        var queryURL = "https://food2fork.com/api/search?key=7cd47955dffd41deaec51a869580847a&q=" + recipeSearchInput;

        ///////////////////////////////////////////////////////
        // heroku workaround for Cors
        // Note: queryURL will be defined by the student.
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = queryURL;

        $.get(proxyUrl + targetUrl, function (response) {
        console.log(response);
        var response1 = JSON.parse(response);

        for (var i = 0; i < 5; i++) {
            console.log(response1.count);
            console.log(response1.recipes);
        var recipeTitle = response1.recipes[i].title;
        var recipeImage = response1.recipes[i].image_url;
        var recipeURL = response1.recipes[i].source_url; 
        var recipeSource = response1.recipes[i].publisher;  
        

        $("#recipeCard").append(
           "<div class='recipe-container'><img class='recipePhoto' src='" + recipeImage + "'/>" + "<br/><a href ='" + recipeSource + recipeURL + "' target='_blank'>" + recipeTitle + "</a>" + "<br/> Recipe Source: " + recipeSource + "<br/></div>")
        };

        });           
    });
});