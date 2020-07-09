const windowArgs =
	"width=" +
	screen.width +
	", height=" +
	screen.height +
	", fullscreen=yes, titlebar=no, dialog=no, resizable=no, toolbar=no, menubar=no, frame=no";
var gameWindow = !window.location.href.includes("main.html") ? window.open("main.html", "", windowArgs) : window;
if (!window.location.href.includes("main.html") && gameWindow.location.href != window.location.href) window.close();
