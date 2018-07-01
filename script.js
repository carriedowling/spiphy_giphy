$(document).ready(function () {
  var animals = ["dog", "cat", "hedgehog", "pig", "monkey", "wolf", "tamarin"];
  console.log('why am I here')
  // function to make buttons and add to page
  function populateButtons(arrayToUse) {
    $("#animal-buttons").empty();
    //iterate through the animals array and dynamically create elements with button classes and append to the document
    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");
      a.addClass("animal"); // Added a class
      a.addClass("btn btn-primary btn-xs");
      a.attr("data-name", animals[i]); // Added a data-attribute
      a.attr("src", $(this).data("animate"));
      a.attr("data-state"), $(this).attr("data-state", "animate");
      a.text(animals[i]); // Provided the initial button text
      $("#animal-buttons").append(a); // Added the button to the HTML
    }
  }

  populateButtons(animals);

  $(document).on("click", ".animal", function () {
    $("#animals").empty();
    $(".animal").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating:" + rating);
        var still = results[i].images.fixed_height_still.url;
        var animated = results[i].images.fixed_height.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);


        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }

      $(document).on("click", ".animal-image", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      })
    })
  })

  $("#add-animal").on("click", function (e) {
    e.preventDefault();
    var userInput = $("input").val();
    console.log(userInput);
    animals.push(userInput);
    console.log(animals);
    populateButtons(animals);
    $("#animal-input").val("");
  })

});



