var json;
var serv = 0;
var time = 5000;
var needBadge = false;
var timerId;

function startTimer() {
	loadData();
	setETSBadge(serv);
    timerId = window.setTimeout(startTimer, time);
}

function stopTimer() {
    window.clearTimeout(timerId);
	chrome.browserAction.setBadgeText({text: ''});
}

function loadData() {
	chrome.storage.sync.get({server: 0, time: 5, needBadge: false}, function(items) {
			serv = items.server;
			time = items.time * 1000;
			needBadge = items.needBadge;
		});
}

function setETSBadge(server){
	getServersInfo();
	if ((json.response[server].online) && (needBadge))
		chrome.browserAction.setBadgeText({text: getPlayers(server).toString( )});
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