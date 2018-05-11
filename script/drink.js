$(document).ready(function () {
    var results = [];
    // This .on("click") function will trigger the AJAX Call
    $("#search-btn").on("click", function (event) {
      event.preventDefault();

      // Here we grab the text from the input box      
      var barSearchInput = $("#zip-input").val();   
      if ($("#inputGroupSelect01").val() && $("#inputGroupSelect01").val() !== 'none')
        barSearchInput += "&type=" + $("#inputGroupSelect01").val();
      

      // Here we construct our URL
      var queryURL = "https://api.barzz.net/api/search?zip=" + barSearchInput + "&user_key=8dd53e25d52b2fc98fb6a563b70feaaf";
      console.log(queryURL);

      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = queryURL;

      $.get(proxyUrl + targetUrl, function (response) {
        console.log(response);
        var response1 = JSON.parse(response);

        for (var i = 0; i < 5; i++) {
          console.log(response1.success.results[i]);
          var barTitle = response1.success.results[i].Name;
          var barImage = response1.success.results[i].Bar_Image;
          var barURL = response1.success.results[i].Bar_Url;
          var barAddress = response1.success.results[i].Address +", "+ response1.success.results[i].City +", "+ response1.success.results[i].State + ", " + response1.success.results[i].Zip + ", Phone: " + response1.success.results[i].Phone;
          var barWebsite = response1.success.results[i].Bar_Website;
          var barHours = response1.success.results[i].Hours;
          var barType = response1.success.results[i].Type;

          $("#barCard").append(
            "<div class='row bar-container'><div class='col-md-3'><img class='barPhoto'src='" + barImage + "'/></div>" + "<div class = 'col-md-9'><a href ='" +  barURL + "'target='_blank'>" + barTitle + "</a><br/>" + "Address: " + barAddress + "<br/>" + "Website: "  + barWebsite + "<br/>" + "Hours: " + barHours + "<br/>" + "Venue Type: " + barType + "</div></div>")
        };
      });
    });
  });

