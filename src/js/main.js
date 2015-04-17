var _enableTick, _updateTime, _serverID;
var timerTick  	= 0;

function startTimer() {
	(function timer(){
		_updateTime = parseInt(localStorage["setting:updateTime"]);
		if (timerTick >= _updateTime) {
			_enableTick = localStorage["setting:enableTick"] == 1 ? true : false;
			if (_enableTick) {
				_serverID	= parseInt(localStorage["setting:serverID"]);
				getServerInfo(function() {
					setBadge(this.response[_serverID].players);
				});
			}
			else setBadge();
			timerTick = 0;
		} else timerTick++;

		clearTimeout(timer.id);
    	timer.id = setTimeout(timer, 1000);
	})();
}

function setBadge(label){
	if (label == undefined)
		chrome.browserAction.setBadgeText({text: ''});
	else
		chrome.browserAction.setBadgeText({text: label.toString()});
}

function getServerInfo(callback){
	$.getJSON('http://api.ets2mp.com/servers/', function (data) {
		if (data.error == 'false') {
			callback.call(data);
			return true;
		}
		else {
			return false;
		}
	});
}

function localizePage () {
	$('[data-resource]').each(function() {
		var el = $(this);
		var resourceName = el.data('resource');
		var resourceText = chrome.i18n.getMessage(resourceName);
		el.text(resourceText);
	});
}