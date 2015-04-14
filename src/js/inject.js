/*!
 * Servers & Users Info [ETS2MP]
 * https://github.com/jackrv/Player-Info--ETS2MP-
 *
 * Copyright © jackrv (aka Красный) [special for ets2mp.ru]
 * Creative Commons «Attribution-ShareAlike (CC BY-SA)
 *
 * Last Edit: 13/04/2015
 */


/**
 * Add new div element and new hidden inputs
 */
if (window.g_rgProfileData !== undefined) {
	divSaPi = document.createElement("div");
	divSaPi.id = "divSaPi";

	urlHiddenSaPi = document.createElement("input");
	urlHiddenSaPi.type = "hidden";
	urlHiddenSaPi.name = "urlSaPi";
	urlHiddenSaPi.id = "urlSaPi";
	urlHiddenSaPi.value = window.g_rgProfileData.url;
	divSaPi.appendChild(urlHiddenSaPi);

	steamidHiddenSaPi = document.createElement("input");
	steamidHiddenSaPi.type = "hidden";
	steamidHiddenSaPi.name = "steamidSaPi";
	steamidHiddenSaPi.id = "steamidSaPi";
	steamidHiddenSaPi.value = window.g_rgProfileData.steamid;
	divSaPi.appendChild(steamidHiddenSaPi);

	summaryHiddenSaPi = document.createElement("input");
	summaryHiddenSaPi.type = "hidden";
	summaryHiddenSaPi.name = "summarySaPi";
	summaryHiddenSaPi.id = "summarySaPi";
	summaryHiddenSaPi.value = window.g_rgProfileData.summary;
	divSaPi.appendChild(summaryHiddenSaPi);

	personanameHiddenSaPi = document.createElement("input");
	personanameHiddenSaPi.type = "hidden";
	personanameHiddenSaPi.name = "personanameSaPi";
	personanameHiddenSaPi.id = "personanameSaPi";
	personanameHiddenSaPi.value = window.g_rgProfileData.personaname;
	divSaPi.appendChild(personanameHiddenSaPi);
	
	document.body.appendChild(divSaPi);
	
	/**
	 * Function to show Steam modal with waiting pic
	 */
	window.getMoreInfo = function() {
		var Modal = window.ShowDialog('Дополнительная информация', '<div id="pInfo_full"><img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif"></div>');
		window.setTimeout(function(){Modal.AdjustSizing();},1);
	};
}
else {
	divSaPi = document.createElement("div");
	divSaPi.id = "divSaPi";
	urlHiddenSaPi = document.createElement("input");
	urlHiddenSaPi.type = "hidden";
	urlHiddenSaPi.name = "urlSaPi";
	urlHiddenSaPi.id = "urlSaPi";
	urlHiddenSaPi.value = "ets2mp.com";
	divSaPi.appendChild(urlHiddenSaPi);
		
	document.body.appendChild(divSaPi);
}