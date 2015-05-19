//alert(window.location.indexOf("steamcommunity.com") != -1);
if (window.g_rgProfileData !== undefined) {
	var placeHolder = $J(".profile_header");
	if (placeHolder !== undefined) {
		var ets2mp_div = $J('<div/>', {"id": 'containerSaPi'}).append($J('<img/>', {"src": 'http://cdn.steamcommunity.com/public/images/login/throbber.gif', "width": '18'}));
		placeHolder.append(ets2mp_div);
	}

	var divSaPi = $J('<div/>', {"id": 'divSaPi'});
	divSaPi.append($J('<input/>', {"type": 'hidden', "name": 'urlSaPi', "id": 'urlSaPi', "value": window.g_rgProfileData.url}));
	divSaPi.append($J('<input/>', {"type": 'hidden', "name": 'steamidSaPi', "id": 'steamidSaPi', "value": window.g_rgProfileData.steamid}));
	divSaPi.append($J('<input/>', {"type": 'hidden', "name": 'summarySaPi', "id": 'summarySaPi', "value": window.g_rgProfileData.summary}));
	divSaPi.append($J('<input/>', {"type": 'hidden', "name": 'personanameSaPi', "id": 'personanameSaPi', "value": window.g_rgProfileData.personaname}));
	$J('body').append(divSaPi);

	window.getMoreInfo = function() {
		var Modal = window.ShowDialog('Extended Info', '<div id="pInfo_full"><img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif"></div>');
		window.setTimeout(function(){Modal.AdjustSizing();},1);
	};
	window.getAllBans = function() {
		var Modal = window.ShowDialog('Bans history', '<div id="bInfo_full"><img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif"></div>');
		window.setTimeout(function(){Modal.AdjustSizing();},1);
	};
}
else if(getURLParam("page") == "profile") {
	$('.navigation').append($('<li/>', {"class": 'SaPiSteam'}).append($('<a/>').append($('<img/>', {"src": 'http://cdn.steamcommunity.com/public/images/login/throbber.gif', "width": '20'}))));
	var divSaPi = $('<div/>', {"id": 'divSaPi'});
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'urlSaPi', "id": 'urlSaPi', "value": window.location}));
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'idSaPi', "id": 'idSaPi', "value": getURLParam("id")}));
	$('body').append(divSaPi);
}

function getURLParam(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}