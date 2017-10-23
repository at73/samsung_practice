
window.onload = function () {
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";
};


function getFeed(){
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "visible";
    var width = screen.width;
	var FEED_URL = "http://www.3dnews.ru/news/rss/";

	$(document).ready(function () {
		$.ajax({
			type: "GET",
		    url: FEED_URL,
		    dataType: "xml",
		    success: xmlParser
		});
	});

	function xmlParser(xml) {
		indicator.style.display = "none";
		$(xml).find("item").each(function () {
			var url =  $(this).find("enclosure").attr('url')
			var str_date = $(this).find("pubDate").text()
			var split_date = str_date.split(' ')
			var date = split_date[4] + ' ' + split_date[1] + ' ' + split_date[2] + ' ' + split_date[3]
		    	  
			$("#rssContent").append('<div class="feed"><div class="title"><h1>' + $(this).find("title").text() 
					+ '</h1></div><div class="image"><img src=' + url + ' width=' + width + 'px /></div><div class="description">Desc: <i>' 
					+ $(this).find("description").text() + '</i></div><div id="date">' + date + '</div></div><br><br>');
		});
	}
}