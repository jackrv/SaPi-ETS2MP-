function startTimer() {
	(function timer(){
		if (localStorage["setting:enableTick"] == 1) {
			getServerInfo(function() {
				if (this.response[parseInt(localStorage["setting:serverID"])].online)
					setBadge(this.response[parseInt(localStorage["setting:serverID"])].players);
				else
					setBadge('Offline');
			});
		} else setBadge();
		if (localStorage["setting:chckNewVersion"] == 1)
			getVersion();
		clearTimeout(timer.id);
		var interval = parseInt(localStorage["setting:updateTime"]); 
    	timer.id = setTimeout(timer, (interval == 0 ? 1 : interval) * 1000);
	})();
}

function getVersion() {
	$.ajax({
	    url: "http://ets2mp.com/",
	    success: function (data) {
	    	try {
		    	var sVer = localStorage['sapi:gameVersion'];
		    	var gVer = data.split('<div class="version">')[1].split(':')[1].split('<a href')[0].trim();
		    	if (gVer != undefined) {
		    		if(sVer === undefined)
		    			localStorage['sapi:gameVersion'] = gVer;
		    		else {
		    			if(gVer != sVer) {
		    				var opt = {
								type: "basic",
								title: chrome.i18n.getMessage('ntfk_NewVersionTitle'),
								message: chrome.i18n.getMessage('ntfk_NewVersionContent').f(gVer),
								iconUrl: "./img/128x128.png"
							}
		    				chrome.notifications.create(gVer, opt, function (){});
		    				chrome.notifications.clear(gVer, function (){});
		    			}
		    		}
		    	}
	    	} catch (e){console.log(e)}
		}
	});
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

chrome.notifications.onClicked.addListener(function(notificationId) {
	if (notificationId != 'dwnl') {
		chrome.tabs.create({url: 'http://ets2mp.com/index.php?action=getMod'});
		localStorage['sapi:gameVersion'] = notificationId;
		var opt = {
			type: "basic",
			title: chrome.i18n.getMessage('ntfk_DwnldVersionTitle'),
			message: chrome.i18n.getMessage('ntfk_DwnldVersionContent').f(notificationId),
			iconUrl: "./img/128x128.png"
		}
		chrome.notifications.create('dwnl', opt, function (){});
		chrome.notifications.clear('dwnl', function (){});
	}
});

String.prototype.format = String.prototype.f = function () {
    var args = arguments;
    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return args[n];
    });
};