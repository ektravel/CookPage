// This .on("click") function will trigger the AJAX Call
var info = "";
var cityInfo = false;
$("#search-btn").on("click", function(event) {
  if (cityInfo == false) {
    $(".city").remove();
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    // Here we grab the text from the input box
    var cities = $("#cities-input").val();
    // Here we construct our URL
    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + cities;    

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
            JSON.stringify(response.location_suggestions[i].title).replace(/"/gi, "") +
            " </button></p>"
        );
      }
    });
  
  }

  else if (cityInfo === true){
    

    event.preventDefault();
    // Here we grab the text from the input box
    var cuisine = $("#cuisine-input").val();
    // Here we construct our URL
    if (cuisine === ""){
     var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + info.entity_id + "&entity_type=" + info.entity_type + "&count=100";
    }
    else{
      var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + info.entity_id + "&entity_type=" + info.entity_type + "&q="+ cuisine + "&count=100";
    }


    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
      }
    }).then(function(response) {
      $("#holder").html("<div id='accordion'>");
      for (i = 0; i < response.restaurants.length; i++){
        $("#accordion").append(
          '<h3>'+ response.restaurants[i].restaurant.name +'</h3>\
          <div>\
          <p>'+ JSON.stringify(response.restaurants[i].restaurant.location) +'<p>\
          </div>'   
        )
      }
      $( "#accordion" ).accordion();  
    });
  }
});


$("#holder").on("click", ".getCity",function(event){
  
  var cities = $("#cities-input").val();
  var position = $(this).val();

  var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + cities;

 
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "user-key": "b77bc3b6066b58fd02f4c97a8b61ee93"
    }
  }).then(function(response) {
    info = response.location_suggestions[position];
    $("#cities-input").replaceWith("<p>"+ response.location_suggestions[position].title +"</p>")
    $(".city").remove();
    cityInfo = true;
    
    
  });
});

