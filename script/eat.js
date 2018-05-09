// This .on("click") function will trigger the AJAX Call
var info = "";
$("#find").on("click", function(event) {
  $(".city").remove();
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();
  // Here we grab the text from the input box
  var cities = $("#cities-input").val();
  // Here we construct our URL
  var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cities;


  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    for (i = 0; i < response.location_suggestions.length; i++) {
      $("#holder").append(
        "<p class = 'city'><button class = 'getCity' value = " + i+" >" +
          JSON.stringify(response.location_suggestions[i].name).replace(/"/gi,"") +
          " </button></p>"
      );
    }
  });
});

$("#holder").on("click", ".getCity",function(event){
  
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
    $("#cities-input").replaceWith("<p>"+response.location_suggestions[position].name +"</p>")
    $(".city").remove();
    
  });
});
