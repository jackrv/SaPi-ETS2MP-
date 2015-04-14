/*!
 * Servers & Users Info [ETS2MP]
 * https://github.com/jackrv/Player-Info--ETS2MP-
 *
 * Copyright © jackrv (aka Красный) [special for ets2mp.ru]
 * Creative Commons «Attribution-ShareAlike (CC BY-SA)
 *
 * Last Edit: 14/04/2015
 */
// ==================================================================================
include(chrome.extension.getURL('/js/inject.js'));

placeHolder = document.getElementsByClassName("profile_header");
if (placeHolder[0] !== undefined) {
	var ets2mp_div = document.createElement("div");
	ets2mp_div.id = "containerSaPi";
	ets2mp_div.innerHTML = '<img src="http://cdn.steamcommunity.com/public/images/login/throbber.gif" width="18">';
	placeHolder[0].appendChild(ets2mp_div);
}
// ==================================================================================


var JSON, _URL, _STEAMID, _ETS2MPID, _PERSONALNAME;

/**
 * Include js-code to user-profile pages:
 *     http(s)://steamcommunity.com/profiles/*", "http(s)://steamcommunity.com/id/*"
 * For execute user steamID
 */
function include(url) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.head.appendChild(script);
}

/**
 * Add info about Steam or ETS2MP
 * 
 */
function addInfo() {
	setTimeout(function() {
		_URL = document.getElementById("urlSaPi").value;
		if (_URL.split('/')[2] == "steamcommunity.com") {
			_STEAMID = document.getElementById("steamidSaPi").value;
			_PERSONALNAME = document.getElementById("personanameSaPi").value;
			
			getJSON(_STEAMID);
			infoInSteam(_STEAMID);
		}
		else if (_URL == "ets2mp.com") {
			_ETS2MPID = document.getElementsByClassName('active')[0].toString().split("&")[1].split("=")[1];
			getJSON(_ETS2MPID);
			infoInEts2MP(_ETS2MPID);
		}
	}, 500);
}

/**
 * Function add info about player on Steam page!
 * append DIV-container(class "SaPi") to "profile_header"
 */
function infoInSteam(id) {
	setTimeout(function() {
		var steam_data = '<strong>STEAM ID:</strong> <a href="http://steamcommunity.com/profiles/' + id + '">' + id + '</a>';
		if (JSON.error)
			ets2mp_data = ' | ETS2MP: ' + JSON.descriptor;
		else{
			ets2mp_data = ' | <strong>ETS2MP ID:</strong> <a href="http://ets2mp.com/index.php?page=profile&id=' + JSON.response.id + '">' + JSON.response.id;
			if (getBans(JSON.response.id))
				ets2mp_data += " (Есть нарушения)";
			ets2mp_data += '</a> | <a id="getMoreInfo" href="#getMoreInfo" onclick="getMoreInfo();return false">Get more info</a>';
		}

		document.getElementById('containerSaPi').innerHTML = steam_data + ets2mp_data;
		document.getElementById('getMoreInfo').addEventListener('click', getMoreInfoSaPi);
	}, 750);
}

/**
 * Function add info about player on ETS2MP page!
 * append DIV-container(class "SaPi") to "thead"
 */
function infoInEts2MP(id) {
	setTimeout(function() {
		var steam_li = document.createElement("li");
		steam_li.innerHTML = '<a href="http://steamcommunity.com/profiles/' + JSON.response.steamID64 + '">Steam profile</a>';
		document.getElementsByClassName('navigation')[0].appendChild(steam_li);
	}, 500);
}

/**
 * Function to append modal window with full info about player
 * Call while user click on #getMoreInfo button
 */
function getMoreInfoSaPi()
{
	setTimeout(function() {
		document.getElementById('pInfo_full').innerHTML =
			'<table>' +
			'<tr><td width="160"><strong>Ссылка на профиль: </strong></td><td>' + _URL + '</td>' +
			'<tr><td><strong>Steam ID: </strong></td><td>' + _STEAMID + '</td>' +
			'<tr><td><strong>Имя (Steam): </strong></td><td>' + _PERSONALNAME + '</td>' +
			'<tr><td><strong>ETS2MP ID: </strong></td><td>' + JSON.response.id + '</td>' +
			'<tr><td><strong>Имя (на форуме): </strong></td><td>' + JSON.response.name + '</td>' +
			'<tr><td><strong>Дата регистрации: </strong></td><td>' + JSON.response.joinDate + '</td>' +
			'<tr><td><strong>Группа (на форуме): </strong></td><td>' + JSON.response.groupName + '</td>' +
			'<tr><td><strong>Группа (в игре): </strong></td><td>' + (JSON.response.permissions.isGameAdmin ? 'Admin' : 'Player') + '</td>' +
			'</table>';
	}, 750);
}

/**
 * Function load json-info about player
 *
 * @param {number} id Steam ID
 * @return {json} Load json-data into global variable JSON
 */
function getJSON(id){
	var url = "//api.ets2mp.com/player/" + id;
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var doc = xhr.responseText;
		if (doc) {
			JSON = JSON.parse(doc);
			JSON.response.steamID64 = doc.split("{")[2].split(",")[3].split(":")[1];
		}
	};
	xhr.open("GET", url, false);
	xhr.send(null);
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
	var isBan = false;
	var url = "//ets2mp.com/index.php?page=profile&id=" + id;
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var doc = xhr.responseText;
		if (doc) {
			if (doc.indexOf("No punishments to display") >= 0)
				isBan = false;
			else
				isBan = true;
		}
	};
	xhr.open("GET", url, false);
	xhr.send(null);
	return isBan;
}

/**
 * While all DOM loaded - run addInfo function
 * for add info about ETS2MP-user
*/
var state = window.document.readyState;
if((state == 'interactive')||(state == 'complete'))
	addInfo();
else
	window.addEventListener("DOMContentLoaded", addInfo,false);