if (window.g_rgProfileData !== undefined) {
	$ = window.$J;
	var placeHolder = $(".profile_header");
	if (placeHolder !== undefined) {
		var ets2mp_div = $('<div/>', {"id": 'containerSaPi'}).append($('<img/>', {"src": 'http://cdn.steamcommunity.com/public/images/login/throbber.gif', "width": '18'}));
		placeHolder.append(ets2mp_div);
	}

	var divSaPi = $('<div/>', {"id": 'divSaPi'});
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'urlSaPi', "id": 'urlSaPi', "value": window.g_rgProfileData.url}));
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'steamidSaPi', "id": 'steamidSaPi', "value": window.g_rgProfileData.steamid}));
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'summarySaPi', "id": 'summarySaPi', "value": window.g_rgProfileData.summary}));
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'personanameSaPi', "id": 'personanameSaPi', "value": window.g_rgProfileData.personaname}));
	$('body').append(divSaPi);

	window.getMoreInfo = function() {
		var Modal = window.ShowDialog('Extended Info', '<div id="pInfo_full"><img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif"></div>');
		window.setTimeout(function(){Modal.AdjustSizing();},1);
	};
	window.getAllBans = function() {
		var Modal = window.ShowDialog('Bans history', '<div id="bInfo_full"><img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif"></div>');
		window.setTimeout(function(){Modal.AdjustSizing();},1);
	};
}
else {
	$('.navigation').append($('<li/>', {"class": 'SaPiSteam'}).append($('<a/>').append($('<img/>', {"src": 'http://cdn.steamcommunity.com/public/images/login/throbber.gif', "width": '20'}))));
	var divSaPi = $('<div/>', {"id": 'divSaPi'});
	divSaPi.append($('<input/>', {"type": 'hidden', "name": 'urlSaPi', "id": 'urlSaPi', "value": "ets2mp.com"}));
	$('body').append(divSaPi);
}