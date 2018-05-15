$(document).ready(function () {
    var results = [];
    var drinks = []
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB3Q5bof0seihi9umEMn1LSd13Zwr94bmU",
      authDomain: "recent-users-drink.firebaseapp.com",
      databaseURL: "https://recent-users-drink.firebaseio.com",
      projectId: "recent-users-drink",
      storageBucket: "",
      messagingSenderId: "912007044041"
    };
    firebase.initializeApp(config);

    // This .on("click") function will trigger the AJAX Call
    $("#search-btn").on("click", function (event) {
      event.preventDefault();

      // Here we grab the text from the input box      
      var barSearchInput = $("#zip-input").val(); 
      //attempting to add "next", "previous" button functionality
      var offset = 0;
      var limit = 5;

      $("#drinkNextButton").on("click", function (event) {
        event.preventDefault();
        offset + 5;
        limit + 5;

       // function (response);  
    }); 

    $("#drinkPreviousButton").on("click", function (event) {
        event.preventDefault();
        offset - 5;
        limit - 5;

       // $.get(proxyUrl + targetUrl, function (response));  
    }); 
      
      if ($("#inputGroupSelect01").val() && $("#inputGroupSelect01").val() !== 'none')
        barSearchInput += "&type=" + $("#inputGroupSelect01").val();
      
        firebase.database().ref().push({
          barSearchInput
     })
      // Here we construct our URL
      var queryURL = "https://api.barzz.net/api/search?zip=" + barSearchInput + "&offset=" + offset + "&limit=" + limit + "&user_key=8dd53e25d52b2fc98fb6a563b70feaaf";
      console.log(queryURL);

      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = queryURL;

      $.get(proxyUrl + targetUrl, function (response) {
        console.log(response);
        var response1 = JSON.parse(response);

        for (var i = offset; i < limit; i++) {
          console.log(response1.success.results[i]);
          var barTitle = response1.success.results[i].Name;
          var barImage = response1.success.results[i].Bar_Image;
          var barURL = response1.success.results[i].Bar_Url;
          var barAddress = response1.success.results[i].Address +", "+ response1.success.results[i].City +", "+ response1.success.results[i].State + ", " + response1.success.results[i].Zip + ", Phone: " + response1.success.results[i].Phone;
          var barWebsite = response1.success.results[i].Bar_Website;
          var barHours = response1.success.results[i].Hours;
          var barType = response1.success.results[i].Type;

          $("#barCard").append(
            "<div class='row bar-container'><div class='col-md-3'><img class='barPhoto'src='" + barImage + "'/></div>" + "<div class = 'col-md-9'><a id=barTitle href ='" +  barURL + "'target='_blank'>" + barTitle + "</a><br/>" + "Address: " + barAddress + "<br/>" + "Website: "  + barWebsite + "<br/>" + "Hours: " + barHours + "<br/>" + "Venue Type: " + barType + "</div></div>")
        };
      });
    });

// trying to add "next" and "previous" functionality

    firebase.database().ref().on("child_added",function(snapshot){
      var drink = (snapshot.val().barSearchInput);
      drinks.push(drink);
  });
  $("#top-search-btn").on("click", function (event) {
    event.preventDefault();
    var max = 1,  currentMax;
        var mostTrending = drinks[0];
        var current = 0;
        for (var i = 0; i < (drinks.length - 1); i++)
        {
            current = drinks[i];
            currentMax = 0;
            for (var j = 1; j < drinks.length; j++)
            {
            if (current == drinks[j])
                currentMax++;
            }
            if (currentMax > max)
            {
            mostTrending = current;
            max = currentMax;
            }
        }
        console.log("Recent Results");
          console.log(drinks);
        console.log("Most trending result: "+mostTrending)
        //$("#trendingresult").append("<p>The most searched item is.... "+mostTrending+" !!</p>")
})
  });
