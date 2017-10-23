function writeTestFile(){

	var documentsDir;
	var dir = tizen.filesystem;
	var file1 = "wifi.txt", file2 = "input.txt";
	document.getElementById('info_files').innerHTML="Files: " + file1 + " and " + file2;
	  
	function onsuccess(files) {
		for(var i = 0; i < files.length; i++) {
			console.log("File Name is " + files[i].name); // displays file name
		}
 
	    var input1 = document.getElementById('info_wifi')[0].innerHTML;
	    alert(input1);
	   
	    var testFile1 = documentsDir.createFile(file1);
	    if (testFile1 !== null) {
	    	testFile1.openStream(
	    			"w",
	    			function(fs){
	    				fs.write(input1);
	    				fs.close();
	    			}, function(e){
	    				console.log("Error " + e.message);
	    			}, "UTF-8"
	    	);
	    }
	 }
	 
	 var input2 = document.getElementById('input');
	   
	 var testFile2 = documentsDir.createFile(file2);
	 if (testFile2 !== null) {
	     testFile2.openStream(
	         "w",
	         function(fs){
	           fs.write(input2.value);
	           fs.close();
	         }, function(e){
	           console.log("Error " + e.message);
	         }, "UTF-8"
	     );
	   }


	function onerror(error) {
	   console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	 }
	 
	 tizen.filesystem.resolve(
	     'documents',
	     function(dir){
	       documentsDir = dir; 
	       dir.listFiles(onsuccess,onerror);
	     }, function(e) {
	       console.log("Error " + e.message);
	     }, "rw"
	 );
}
