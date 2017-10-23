window.onload = function() {

	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";

};

var baseName = "WebBase";
var storeName = "WebBaseStore";

function toDataURL(src, callback, outputFormat) {
	  var img = new Image();
	  img.crossOrigin = 'Anonymous';
	  img.onload = function() {
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    var dataURL;
	    canvas.height = this.naturalHeight;
	    canvas.width = this.naturalWidth;
	    ctx.drawImage(this, 0, 0);
	    dataURL = canvas.toDataURL(outputFormat);
	    callback(dataURL);
	  };
	  img.src = src;
	  if (img.complete || img.complete === undefined) {
	    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	    img.src = src;
	  }
}

	toDataURL(url, function(dataUrl) {
		console.log('RESULT:', dataUrl)
	  }
	)

function getFeed() {
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "visible";
	var width = screen.width;
	var arr = [];
	var i = 0;
	var FEED_URL = "http://www.3dnews.ru/news/rss/";

	$(document).ready(function() {
		$.ajax({
			type : "GET",
			url : FEED_URL,
			dataType : "xml",
			error : getStorage,
			success : xmlParser
		});
	});

	function xmlParser(xml) {
		indicator.style.display = "none";
		$(xml).find("item").each(function() {
			var url = $(this).find("enclosure").attr('url')
			var str_date = $(this).find("pubDate").text()
			var split_date = str_date.split(' ')
			var date = split_date[4] + ' ' + split_date[1] + ' ' + split_date[2] + ' ' + split_date[3]
			$("#rssContent").append('<div class="feed"><div class="title"><h1>' + $(this).find("title").text()
					+ '</h1></div><div class="image"><img src=' + url + ' width=' + width
					+ 'px/></div><div class="description">Desc: <i>'+ $(this).find("description").text()
					+ '</i></div><div id="date">' + date +'</div></div><br><br>');

			setData($(this).find("title").text(), $(this).find("description").text(), url, date); 
			// чем плоха данная схема?
			// переделать на  передачу массива.
			i++;
		});

		getStorage();
	}

	var db = openDatabase(baseName, '1.0', 'Test DB', 2 * 1024 * 1024);
	if (!db) {
		alert("Failed to connect to database.");
	}
	var msg;

	function onError(err) {
		console.log(err)
	}

	function setData(title_, description_, image_) {
		db.transaction(function(tx) {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS ' + storeName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT, date TEXT)',
				[], null, null);

			tx.executeSql('INSERT INTO ' + storeName + ' (title, description, image, date) VALUES (?, ?, ?, ?)',
				[ title_, description_, image_, date_ ], null, onError);
		});
	};

	function getStorage() {
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM ' + storeName, [], function(tx, results) {
				var len = results.rows.length, i;
				msg = "<p>Found rows: " + len + "</p>";
				$("#rssContent").append(msg);

				for (i = 0; i < len; i++) {
					msg = "<p><b>" + results.rows.item(i).title + "</b></p>";
					$("#rssContent").append(msg);
				}
			}, onError);
		});
	};
}
