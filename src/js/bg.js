if(localStorage['setting:serverID'] == undefined)
	localStorage['setting:serverID'] = 0;
if(localStorage['setting:updateTime'] == undefined)
	localStorage['setting:updateTime'] = 5;
if(localStorage['setting:enableTick'] == undefined)
	localStorage['setting:enableTick'] = 1;

$(document).ready(function () {
	startTimer();
});