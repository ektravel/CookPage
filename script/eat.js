// This .on("click") function will trigger the AJAX Call
$("#find").on("click", function(event) {
  console.log("test");
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();
  // Here we grab the text from the input box
  var eatSearching = $("#cities-input").val();
  // Here we construct our URL
  var queryURL =
    "https://developers.zomato.com/api/v2.1/cities?q=" + eatSearching;

  // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
  // and display it in the div with an id of movie-view
  // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    for (i = 0; i < response.location_suggestions.length; i++) {
      console.log(response.location_suggestions[i].state_name);

      $("#holder").append(
        "<p><button>" +
          JSON.stringify(response.location_suggestions[i].name) +
          " </button></p>"
      );
    }
  });
  // -----------------------------------------------------------------------
});
