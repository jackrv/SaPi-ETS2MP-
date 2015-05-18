/*!
 * Servers & Users Info [ETS2MP]
 * https://github.com/jackrv/Player-Info--ETS2MP-
 *
 * Copyright © jackrv (aka Красный) [special for ets2mp.ru]
 * Creative Commons «Attribution-ShareAlike (CC BY-SA)
 *
 * Last Edit: 17/04/2015
 */
// ==================================================================================
include(chrome.extension.getURL('/js/inject.js'));


var $tElement, JSON, _URL, _STEAMID, _ETS2MPID, _PERSONALNAME;

/**
 * Include js-code to user-profile pages:
 *     http(s)://steamcommunity.com/profiles/*", "http(s)://steamcommunity.com/id/*"
 * For execute user steamID
 */
function include(url) {
	var script = $('<script/>', {'src': url, 'type': 'text/javascript'});
	$('head').append(script);
}

/**
 * While all DOM loaded - run addInfo function
 * for add info about ETS2MP-user
*/
$(document).ready(function() {
	addInfo();
});

/**
 * Function load json-info about player
 *
 * @param {number} id Steam ID
 * @return {json} Load json-data into global variable JSON
 */
function getUserInfo(id, callback){
	var url = "http://api.ets2mp.com/player/" + id;
	$.getJSON(url, function (data) {
		callback.call(data);
		JSON = data.response;
	});
}

/**
 * This function load user page (example: http://ets2mp.com/index.php?page=profile&id=114711)
 * and search text "No punishments to display"  on it
 * Return False if text is found and True otherwise
 *
 * Warning!!! If fail load page - function return False also!
 *
 * @param {number} id ETS2MP ID
 * @return {boolean} Presence of bans
*/
function getBans(id) {
	var url = "http://ets2mp.com/index.php?page=profile&id=" + id;
	$.get(url, function (data) {
		if ($(data).find('.info').length == 0) {
			$('#SaPi_ETS2MP').append($('<a/>', {"id": 'getAllBans', "href": '#getAllBans', "onclick": "getAllBans();return false"}).text(' (' + chrome.i18n.getMessage('injHaveBans') + ')'));
			$tElement = $(data).find("#bans").find('tr');
			
			$('#getAllBans').click(getAllBansSaPi);
		}
	});
	
}

/**
 * Function to append modal window with All player bans
 * Call while user click on #getAllBans button
 */
function getAllBansSaPi() {
	setTimeout(function() {
		$('#bInfo_full').text('');
		var table = $('<table/>', {"id": 'SaPi_Bans'});
		$.each($tElement, function(row, value) {
			var newRow = $('<tr/>');
			if (row == 0){
				$.each($(value).find('td'), function(cell, value) {
					newRow.append($('<th/>').text(chrome.i18n.getMessage('injBanModal_' + cell)));
				});
			}
			else {
				$.each($(value).find('td'), function(cell, value) {
					newRow.append($('<td/>').text($(value).text()));
				});
			}
			table.append(newRow);
		});
		$('#bInfo_full').append(table);
	}, 500);
}

/**
 * Function to append modal window with full info about player
 * Call while user click on #getMoreInfo button
 */
function getMoreInfoSaPi()
{
	setTimeout(function() {
		$('#pInfo_full').text('');
		var rows =[
			[chrome.i18n.getMessage('injInfModal_SteamLink'),	_URL],
			[chrome.i18n.getMessage('injInfModal_SteamID'),		_STEAMID],
			[chrome.i18n.getMessage('injInfModal_SteamName'),	_PERSONALNAME],
			[chrome.i18n.getMessage('injInfModal_ETS2MPID'),	JSON.id],
			[chrome.i18n.getMessage('injInfModal_ForumName'),	JSON.name],
			[chrome.i18n.getMessage('injInfModal_JoinDate'),	JSON.joinDate],
			[chrome.i18n.getMessage('injInfModal_ForumGroup'),	JSON.groupName],
			[chrome.i18n.getMessage('injInfModal_GameGroup'),	JSON.permissions.isGameAdmin ? 'Admin' : 'Player']
		];

		(function table(){
			var table = $('<table/>', {"id": 'SaPi_fInfo'});
			$.each(rows, function (row, value) {
				var newRow = $('<tr/>');
				newRow.append($('<td/>').append($('<strong/>').text(value[0] + ': ')));
				newRow.append($('<td/>').text(value[1]));
				table.append(newRow);
			})
			$('#pInfo_full').append(table);
		})();
	}, 750);
}

/**
 * Add info about Steam or ETS2MP
 * 
 */
function addInfo() {
	setTimeout(function() {
		_URL = $("#urlSaPi").val();
		if (_URL.split('/')[2] == "steamcommunity.com") {
			_STEAMID = $("#steamidSaPi").val();
			_PERSONALNAME = $("#personanameSaPi").val();
			infoInSteam(_STEAMID);
		}
		else if (_URL == "ets2mp.com") {
			_ETS2MPID = getURLParam('id');
			infoInEts2MP(_ETS2MPID);
		}
	}, 50);
}

function getURLParam(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}

/**
 * Function add info about player on Steam page!
 * append DIV-container(class "SaPi") to "profile_header"
 */
function infoInSteam(id) {
	getUserInfo(id, function () {
		$('#containerSaPi').text('')
							.append($('<strong/>').text('STEAM ID: '))
							.append($('<a/>', {"href": 'http://steamcommunity.com/profiles/' + id}).text(id))
							.append(' | ')
							.append(this.error ? this.descriptor :
								$('<strong/>').text('ETS2MP ID: '))
							.append(this.response.error ? '' :
								$('<a/>', {"id": 'SaPi_ETS2MP', "href": 'http://ets2mp.com/index.php?page=profile&id=' + this.response.id})
									.text(this.response.id))
							.append(' | ')
							.append($('<a/>', {"id": 'getMoreInfo', "href": '#getMoreInfo', "onclick": "getMoreInfo();return false"}).text(chrome.i18n.getMessage('injGetMoreInf')));
		getBans(this.response.id);
		$('#getMoreInfo').click(getMoreInfoSaPi);
	})
}

/**
 * Function add info about player on ETS2MP page!
 * append DIV-container(class "SaPi") to "thead"
 */
function infoInEts2MP(id) {
	$.ajax({
	    url: "http://api.ets2mp.com/player/" + id,
	    dataType : "text",
	    success: function (data) {
			steamID = data.split("{")[2].split(",")[3].split(":")[1];
			$('.SaPiSteam').text('');
			$('.SaPiSteam').append($('<a/>', {"href": 'http://steamcommunity.com/profiles/' + steamID, "text": 'Steam'}));
		}
	});
}