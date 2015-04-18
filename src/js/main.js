function startTimer() {
	(function timer(){
		if (localStorage["setting:enableTick"] == 1) {
			getServerInfo(function() {
				setBadge(this.response[parseInt(localStorage["setting:serverID"])].players);
			});
		} else setBadge();
		clearTimeout(timer.id);
		var interval = parseInt(localStorage["setting:updateTime"]); 
    	timer.id = setTimeout(timer, (interval == 0 ? 1 : interval) * 1000);
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