$(document).ready(function(){

  var topics = ['dog', 'cat', 'bird', 'elephent', 'hamster','rabbit', 'goldfish', 'skunk'];

  function createButton(arrList){
    for (var i=0; i<arrList.length; i++){
      $('#anlimalButtons').append('<button class="btns"  data-animal="'+ topics[i] + '">' + topics[i] +'</button>');
    }
  }
  createButton(topics);

  $('#addButton').on("click", function(){
    var inputName = $('#exampleInputAnimal').val();
    topics = [];
    topics.push(inputName);
    createButton(topics);
  });

  $('#anlimalButtons').on("click", '.btns', function() {

    APIKey = "5dfa0f379e20427eb33be234d76c55cb";
    var limit = '10';
    var animalName = $(this).attr("data-animal");
    var offSet = '0';
    var rating = 'G';
    var offSet = '0';
    var lang = 'en';

    var queryURL= "https://api.giphy.com/v1/stickers/search" + "?api_key=" + APIKey+ "&q=" + animalName + "&limit=" + limit + "&offset=" + offSet + "&rating=" + rating + "&lang=" + lang;

    $('#animal').empty();

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      console.log(response.data);

      var results = response.data

      for (var i=0; i<results.length; i++){
        var p = $("<p>").text("Rating: " + results[i].rating);
        p.addClass('rating');

        var animalDiv = $("<div>");
        animalDiv.addClass('animalDiv');

        var animalImage = $("<img>");
        animalImage.addClass("gif");
        animalImage.attr('data-state', "still");
        animalImage.attr('data-still', results[i].images.fixed_height_still.url);
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalImage.attr('data-animate', results[i].images.fixed_height.url);

        animalDiv.append(p);
        animalDiv.append(animalImage);
        $('#animal').prepend(animalDiv);
      }
    });
  });

  $("#animal").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});
