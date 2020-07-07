var gameWindow = window.location.href.includes("index.html")
	? window.open(
			"main.html",
			"",
			"width=" +
				screen.width +
				", height=" +
				screen.height +
				", fullscreen=yes, titlebar=no, dialog=no, resizable=no, toolbar=no, menubar=no, frame=no"
	  )
	: window;
if (window.location.href.includes("index.html") && gameWindow.location.href != window.location.href) window.close();
