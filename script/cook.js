$(document).ready(function () {
    var recipes = [];
    var num_searches = 0;

    var config = {
        apiKey: "AIzaSyBF_HHzl2akTUZMDlIRo3uVyOXgG7lDa1g",
        authDomain: "recent-users-7f215.firebaseapp.com",
        databaseURL: "https://recent-users-7f215.firebaseio.com",
        projectId: "recent-users-7f215",
        storageBucket: "",
        messagingSenderId: "276872158507"
    };
    firebase.initializeApp(config);

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var recipeSearchInput = $("#dish-input").val();

        if ($("#ingredient-input").val())
            recipeSearchInput += "%20" + $("#ingredient-input").val();

        if ($("#cuisine-input").val())
            recipeSearchInput += "%20" + $("#cuisine-input").val();
        
        var recipeObject = {
            input1: $("#dish-input").val(),
            input2: $("#ingredient-input").val(),
            input3: $("#cuisine-input").val()
        }
        firebase.database().ref().push({
             recipeObject
        })

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
    firebase.database().ref().on("child_added",function(snapshot){
        var recipe1 = (snapshot.val().recipeObject.input1);
        recipes.push(recipe1);
          //num_searches += 1;
          //if (num_searches == 6){
              //num_searches = 5;
             // $("#recentresults").children().last().remove();
         // }
         // $("#recentresults").prepend("<p>Search Item:"+recipe1+"</p>");
    });
    $("#top-search-btn").on("click", function (event) {
        var max = 1,  currentMax;
            var mostTrending = recipes[0];
            var current = 0;
            for (var i = 0; i < (recipes.length - 1); i++)
            {
                current = recipes[i];
                currentMax = 0;
                for (var j = 1; j < recipes.length; j++)
                {
                if (current == recipes[j])
                    currentMax++;
                }
                if (currentMax > max)
                {
                mostTrending = current;
                max = currentMax;
                }
            }
            console.log("Recent Searches:")
            for (var i = recipes.length-1;i >= 0; i--){
                console.log(recipes[i]);
            }
            console.log("Most trending result is: " + mostTrending)
    })
});
