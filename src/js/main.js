var _JSON;
var _enableTick = true;
var _updateTime = 5;
var _serverID	= 0;
var timerTick  	= 0;

function startTimer() {
	window.setInterval(function() {
		_enableTick = localStorage["setting:enableTick"] == 1 ? true : false;
		_updateTime = parseInt(localStorage["setting:updateTime"]);
		_serverID	= parseInt(localStorage["setting:serverID"]);
		if (timerTick >= _updateTime) {
			if (_enableTick) {
				servInfo = getServerInfo(_serverID);
				if (servInfo)
					setBadge(servInfo.players);
			}
			else setBadge('');
			timerTick = 0;
		} else timerTick++;
	}, 1000);
}

function setBadge(label){
	chrome.browserAction.setBadgeText({text: label.toString()});
}

function getServerInfo(id){
	if (id == undefined) id = 0;
	jsonParse('http://api.ets2mp.com/servers/');
	if (_JSON.error == 'false')
		return _JSON.response[id];
	else
		return !_JSON.error;
}

function getUserInfo(id){
	if (id == undefined) return 'Don\'t call function without parameters';
	jsonParse('http://api.ets2mp.com/player/' + id);
	if (!_JSON.error)
		return _JSON.response;
	else
		return false;
}

function jsonParse(url) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var doc = xhr.responseText;
		if (doc) {
			_JSON = JSON.parse(doc);
		}
    };
	xhr.open("GET", url, false);
	xhr.send(null);
}