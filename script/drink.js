$(document).ready(function () {
    var results = [];
    // This .on("click") function will trigger the AJAX Call
    $("#search-btn").on("click", function (event) {
      event.preventDefault();

      // Here we grab the text from the input box
      var city = $("#city-input").val() + "&state=" + $("#state-input").val();
      

      // Here we construct our URL
      var queryURL = "https://api.barzz.net/api/search?city=" + city + "&user_key=8dd53e25d52b2fc98fb6a563b70feaaf";


      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = queryURL;



      $.get(proxyUrl + targetUrl, function (response) {
        console.log(response);
        var response1 = JSON.parse(response);

        for (var i = 0; i < 5; i++) {
          console.log(response1.success.results[i].Name);
          var barTitle = response1.success.results[i].Name;
          var barImage = response1.success.results[i].Bar_Image;
          var barURL = response1.success.results[i].Bar_Url;
          $("#barCard").append(
            "<div class='bar-container'><img src='" + barImage + "'/><a href ='" +  barURL + "' target='_blank'>" + barTitle + "</a><br/></div>"
          )
        };



      });

      

    });
  });