$(document).ready(function () {
    var results = [];
    var drinks = [];
    var barSearchInput;
    var offset;
    var limit;
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
      barSearchInput = $("#zip-input").val(); 
      //attempting to add "next", "previous" button functionality
      offset = 0;
      limit = 5;

      loadResults();
      
    });

      $("#drinkNextButton").on("click", function (event) {
        event.preventDefault();
        offset += 5;
        limit += 5;

       loadResults();  
    }); 

    $("#drinkPreviousButton").on("click", function (event) {
        event.preventDefault();
        offset -= 5;
        limit -= 5;

       loadResults();  
    }); 

    function loadResults() {
      $("#barCard").empty();
      console.log(offset);
      console.log(limit);
      if ($("#inputGroupSelect01").val() && $("#inputGroupSelect01").val() !== 'none')
        barSearchInput += "&type=" + $("#inputGroupSelect01").val();
      
        firebase.database().ref().push({
          barSearchInput
     });
      // Here we construct our URL
      var queryURL = "https://api.barzz.net/api/search?zip=" + barSearchInput + "&offset=" + offset + "&limit=" + limit + "&user_key=8dd53e25d52b2fc98fb6a563b70feaaf";
      console.log(queryURL);

      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = queryURL;

      $.get(proxyUrl + targetUrl, function (response) {
        var response1 = JSON.parse(response);
        console.log(response1);
        var resultsArr = response1.success.results;
        
        for (var i = 0; i < resultsArr.length; i++) {
          console.log(resultsArr[i]);
          var barTitle = resultsArr[i].Name;
          var barImage = resultsArr[i].Bar_Image;
          var barURL = resultsArr[i].Bar_Url;
          var barAddress = resultsArr[i].Address +", "+ resultsArr[i].City +", "+ resultsArr[i].State + ", " + resultsArr[i].Zip + ", Phone: " + resultsArr[i].Phone;
          var barWebsite = resultsArr[i].Bar_Website;
          var barHours = resultsArr[i].Hours;
          var barType = resultsArr[i].Type;

          $("#barCard").append(
            "<div class='row bar-container' id='barContainer'><div class='col-md-3'><img class='barPhoto'src='" + barImage + "'/></div>" + "<div class = 'col-md-9'><a id=barTitle href ='" +  barURL + "'target='_blank'>" + barTitle + "</a><br/>" + "Address: " + barAddress + "<br/>" + "Website: "  + barWebsite + "<br/>" + "Hours: " + barHours + "<br/>" + "Venue Type: " + barType + "</div></div>")
        };
      });
    };
  
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
