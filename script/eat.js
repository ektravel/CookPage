// This .on("click") function will trigger the AJAX Call
var start = 0
var info = "";

var cityInfo = false;
$("#search-btn").on("click", function (event) {
  if (cityInfo == false) {
    $(".city").remove();
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    // Here we grab the text from the input box
    var cities = $("#cities-input").val();
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
      for (i = 0; i < response.location_suggestions.length; i++) {
        $("#holder").append("<p class = 'city'><button class = 'getCity' value = " + i + " >" +
          JSON.stringify(response.location_suggestions[i].title).replace(/"/gi, "") + " </button></p>"
        );
        
      }
    });
  } else if (cityInfo === true) {

    
    event.preventDefault();
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
        "&entity_type=" + info.entity_type + "&q=" + cuisine + "&count=10";
    }

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
      }
    }).then(function (response) {
      var resultsArr = response.restaurants;
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
      console.log(resultsArr[0])
      $("#accordion").accordion();
    });
  }
});

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