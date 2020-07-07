const config = `width=${screen.width}, height=${screen.height}, fullscreen=yes, titlebar=no, dialog=no, resizable=no, toolbar=no, menubar=no, frame=no`;
var gameWindow = window.location.href.includes("index.html") ? window.open("main.html", "", config) : window;
if (window.location.href.includes("index.html") && gameWindow.location.href != window.location.href) window.close();
