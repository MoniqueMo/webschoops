$(document).ready(function(){
    $.getJSON("/",function(data){
        for(var i = 0; i < data.lenght; i++){
            $("#scrapped-results").prepend("<div class='card'><h4 class='card-header'>" + data[i].title +"</4>"+"<div class='card-body'>" + "<h4 class='card-title'>" + data[i].description + "</h4>" +
            "<a href='#' class='btn  btn-primary save-article' data-id=" + data[i]._id + ">" + "<i class='fas fa-bookmark'></i> Save Article</a>" + "</div>");
        }
    });





    $(document).on("click", ".save-article", function() {
		event.preventDefault();
		// change icon to check mark.
		$(this).removeClass("btn-primary").addClass("btn-success");
		$(this).html("Article Saved " + "<i class='fas fa-exclamation'></i>")
		// Get article id.
		var articleID = $(this).attr("data-id");
		console.log(articleID);
		// Run a POST request to update the article to be saved.
	  $.ajax({
	    method: "POST",
	    url: "/save/" + articleID,
	    data: {
	      saved: true
	    }
	  }).done(function(data) {
      // Log the response.
      console.log("data: ", data);
		});
	});

});