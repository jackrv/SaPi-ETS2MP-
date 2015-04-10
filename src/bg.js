var json;

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

function getPlayers(serv){
	if (json.error == "false")
		return json.response[serv].players;
	else
		return 0;
}

function getServersInfo(){
	var url = "http://api.ets2mp.com/servers/";
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var doc = xhr.responseText;
		if (doc) {
			json = eval('(' + doc + ')');
		}
    };
	xhr.open("GET", url, false);
	xhr.send(null);
}