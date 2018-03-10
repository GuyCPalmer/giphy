$(document).ready(function(){

var topics = ["Bo Jackson", "Brett Favre", "Joe Montana", "Michael Jordan", "Roger Clemens", "Tiger Woods", "John McEnroe", "Kelly Slater"];
    
   function renderButtons () {
        console.log(topics);
        $("#athlete-button").empty();
        for (var i = 0; i<topics.length; i++) {
            var a = $("<button>");
            a.attr("class", "athleteButton btn btn-primary");
            a.attr("data-athlete", topics[i]);
            a.text(topics[i]);
            $("#athlete-button").append(a);
        }
    }

    $("form").on("submit", function(event) {
        event.preventDefault();

        var athlete = $("#action-input").val().trim();
        console.log(athlete);
        topics.push(athlete);
        renderButtons();
        $("#action-input").val("");
    });

$(document).on('click', "button", function(){
    var athlete = $(this).attr("data-athlete");


// constructing a queryURL using athlete name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=HKhysyIQ7IRQnwMRD4PU5u6FWNj22TxJ&limit=10";
    console.log(queryURL);
 
        // perform an AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
// after data comes back
        .then(function(response) {

            //storing data from AJAX request
            var results = response.data;

            // loop through results
            for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                // creating div with the class Athletes pictures
                var gifDiv = $("<div class='athletePicture'>");

                //storing the results rating
                var rating = results[i].rating;

                //creating a p tag with the results 
                var p = $('<p>').text("Rating: " + rating);

                //creating an image tag
                var athleteImage = $("<img>");

                //image src tag to make it dance
                athleteImage.attr("src", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
                athleteImage.attr("data-animate", results[i].images.fixed_height.url);
              
                //appending the things to gifDiv
                gifDiv.append(p);
                gifDiv.append(athleteImage);

                $("#gifsView").prepend(gifDiv);
             athleteImage.on("click", function() {
    
    // set the value of attribute
    var state = $(this).attr("data-state");
    // if clicked image is still, update to animate
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log('still');
    }   else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log('animate');
    };
})
}
};

console.log("after");
});
});
});