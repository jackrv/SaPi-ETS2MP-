
if(localStorage['setting:serverID'] == undefined)
	localStorage['setting:serverID'] = 0;
if(localStorage['setting:updateTime'] == undefined)
	localStorage['setting:updateTime'] = 5;
if(localStorage['setting:enableTick'] == undefined)
	localStorage['setting:enableTick'] = 1;

_updateTime = parseInt(localStorage['setting:updateTime']);
_serverID	= parseInt(localStorage['setting:serverID']);
_enableTick	= localStorage['setting:enableTick'] == '1' ? true : false;

window.onload = function(){
	init();
};

function init() {
	if (_enableTick)
		startTimer();
}