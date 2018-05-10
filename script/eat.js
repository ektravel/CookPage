// This .on("click") function will trigger the AJAX Call

var info = "";
$("#restaurant-input").val("papa johns");
$("#cities-input").val("austin TX");

$("#search-btn").on("click", function(event) {
  $(".city").remove();
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();
  // Here we grab the text from the input box
  var eatSearching =
    $("#restaurant-input").val() +
    " " +
    $("#cuisine-input").val() +
    " " +
    $("#cities-input").val();
  // Here we construct our URL
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=austin";

  // heroku workaround for Cors
  // Note: queryURL will be defined by the student.

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    console.log(response);
    for (i = 0; i < response.location_suggestions.length; i++) {
      $("#holder").append(
        "<p class = 'city'><button class = 'getCity' value = '" +
          i +
          "' data-city-id = '" +
          JSON.stringify(response.location_suggestions[i].id) +
          "'>" +
          JSON.stringify(response.location_suggestions[i].name).replace(
            /"/gi,
            ""
          ) +
          " </button></p>"
      );
    }
  });
});

$("#holder").on("click", ".getCity", function(event) {
  var cities = $("#cities-input").val();
  var position = $(this).val();

  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cities;

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    info = response.location_suggestions[position];
    $("#cities-input").replaceWith(
      "<p>" + response.location_suggestions[position].name + "</p>"
    );
    $(".city").remove();
  });
});
$("#search-btn").on("click", function(event) {
  var cuisineSearching = $("#cuisine-input").val();
  var queryURL2 = "https://developers.zomato.com/api/v2.1/cuisines?q=italian";
  $.ajax({
    url: queryURL2,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    for (i = 0; i < response.cuisines.length; i++) {
      $("#holder").append(
        "<p>" + JSON.stringify(response.cuisines[i].cuisine_name) + "</p>"
      );
    }
    console.log(response);
  });
});
