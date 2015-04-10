window.onload = function(){
	setETSBadge();
	window.setInterval( function() {
		setETSBadge();
	}, 5000);
}

function setETSBadge(){
	getServersInfo();
	if (getPlayers(0) > 0)
		chrome.browserAction.setBadgeText({text: getPlayers(0).toString( )});
}