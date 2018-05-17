// This .on("click") function will trigger the AJAX Call
var start = 0;
var topLimit = 0;
var info = "";
var items = []
var config = {
  apiKey: "AIzaSyAt95XfGpqgMHAtRLA8X2E5zw1HuZuViOg",
  authDomain: "recent-users-eat.firebaseapp.com",
  databaseURL: "https://recent-users-eat.firebaseio.com",
  projectId: "recent-users-eat",
  storageBucket: "recent-users-eat.appspot.com",
  messagingSenderId: "1074501443447"
};
firebase.initializeApp(config);

var cityInfo = false;

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  start = 0
  loadResults(event);
  
});

$("#drinkNextButton").on("click", function (event) {
  event.preventDefault();
  start += 10   
 loadResults(event);  
}); 

$("#drinkPreviousButton").on("click", function (event) {
  event.preventDefault();
  if ((start-10) >= 0) {

   start -= 10
  }

 loadResults(event);  
}); 




function loadResults(event) {
      $(".city").remove();
      // event.preventDefault() can be used to prevent an event's default behavior.
      // Here, it prevents the submit button from trying to submit a form when clicked
      // Here we grab the text from the input box
      var cities = $("#cities-input").val();
      firebase.database().ref().push({
        cities
      })
      // Here we construct our URL
      var queryURL =
        "https://developers.zomato.com/api/v2.1/locations?query=" + cities;

      $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
        }
      }).then(function (response) {

        info = response.location_suggestions[0]
      // Here we grab the text from the input box
      var cuisine = $("#cuisine-input").val();
      // Here we construct our URL
      if (cuisine === "") {
        var queryURL =
          "https://developers.zomato.com/api/v2.1/search?entity_id=" +
          info.entity_id + "&entity_type=" + info.entity_type +"&start="+start+ "&count=10";
      } else {
        var queryURL =
          "https://developers.zomato.com/api/v2.1/search?entity_id=" + info.entity_id +
          "&entity_type=" + info.entity_type + "&q=" + cuisine +"&start="+start+ "&count=10";;
      }

      $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
          "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
        }
      }).then(function (response) {
        var resultsArr = response.restaurants;
        top = response.results_found;
        $("#holder").html("<div id='accordion'>");
        for (i = 0; i < resultsArr.length; i++) {
            var title = resultsArr[i].restaurant.name;
            var resImage = resultsArr[i].restaurant.thumb;
            var url = resultsArr[i].restaurant.url;
            var address = resultsArr[i].restaurant.location.address;
            var cuisine = resultsArr[i].restaurant.cuisines;
            var cost = resultsArr[i].restaurant.average_cost_for_two;
            var rating = resultsArr[i].restaurant.user_rating.aggregate_rating;
            var ratingCount = resultsArr[i].restaurant.user_rating.votes
            var menu = resultsArr[i].restaurant.menu_url
            
            
            $("#accordion").append("<h3 class = acordHeader>" + title + "</h3>\<div>" + 
            "<div class='row bar-container'><div class='col-md-3'><img class='barPhoto'src='" + resImage + "'/></div>" + "<div class = 'col-md-9'><a id=barTitle href ='" +  url + "'target='_blank'>" + title + "</a><br/>" + "Address: " + address + "<br/>" + "Cusine Type: "  + cuisine + "<br/>" + "Estimated price of two: " + cost + "<br/>" + "Rating: "+ rating +"/5 based on " + ratingCount + " votes" +"<br/>" + "<a href ='" +  menu + "'target='_blank'> Click here for the Menu!" + "</a></div></div>" +"</div>")
        };
        $("#accordion").accordion();
      });
    });
  }



$("#holder").on("click", ".getCity", function (event) {
  var cities = $("#cities-input").val();
  var position = $(this).val();
  var queryURL =
    "https://developers.zomato.com/api/v2.1/locations?query=" + cities;

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function (response) {
    info = response.location_suggestions[position];

    $("#cities-input").replaceWith(
      "<p>" + response.location_suggestions[position].title + "</p>"
      
    );
    $(".city").remove();
    cityInfo = true;
  });
});

firebase.database().ref().on("child_added",function(snapshot){
  var item = (snapshot.val().cities);
  items.push(item);
    //num_searches += 1;
    //if (num_searches == 6){
        //num_searches = 5;
       // $("#recentresults").children().last().remove();
   // }
   // $("#recentresults").prepend("<p>Search Item:"+recipe1+"</p>");
});
$("#top-search-btn").on("click", function (event) {
  event.preventDefault();
  var max = 1,  currentMax;
      var mostTrending = items[0];
      var current = 0;
      for (var i = 0; i < (items.length - 1); i++)
      {
          current = items[i];
          currentMax = 0;
          for (var j = 1; j < items.length; j++)
          {
          if (current == items[j])
              currentMax++;
          }
          if (currentMax > max)
          {
          mostTrending = current;
          max = currentMax;
          }
      }
      $("#trendingresults").html("Most trending result is: " + mostTrending);
})
