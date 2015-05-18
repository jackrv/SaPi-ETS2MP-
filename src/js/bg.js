if(localStorage['setting:serverID'] == undefined)
	localStorage['setting:serverID'] = 0;
if(localStorage['setting:updateTime'] == undefined)
	localStorage['setting:updateTime'] = 30;
if(localStorage['setting:enableTick'] == undefined)
	localStorage['setting:enableTick'] = 1;
if (localStorage["setting:chckNewVersion"] == undefined)
	localStorage["setting:chckNewVersion"] = 1;

$(document).ready(function () {
	startTimer();
});