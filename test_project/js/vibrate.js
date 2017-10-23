	// Starts vibration at passed in level
	function startVibrate() {
		navigator.vibrate(5000);
	}

    // Stops vibration
    function stopVibrate() {
    	navigator.vibrate(0);
    }

    function patternVibrate() {
    	navigator.vibrate([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]);
    }