function include(url) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript')
	script.setAttribute('src', url);
	document.head.appendChild(script);
}
include(chrome.extension.getURL('/inject.js'));

var json;
var STEAMID;

var state = window.document.readyState;
if((state == 'interactive')||(state == 'complete'))
	addInfo();
else
	window.addEventListener("DOMContentLoaded", addInfo,false);

function addInfo(){
	STEAMID = getCookie("steamid_jackrv");
	getJSON(STEAMID);
	var ets2mp_div = document.createElement("div");
	ets2mp_div.className = "ets2mp_info";
	if (json.error)
		ets2mp_data = ' | ETS2MP: ' + json.descriptor;
	else{
		ets2mp_data = ' | <strong>ETS2MP ID:</strong> <a href="http://ets2mp.com/index.php?page=profile&id=' + json.response.id + '">' + json.response.id + '</a>';
		if (getBans(json.response.id))
			ets2mp_data += " (Есть нарушения)";
	}
	ets2mp_div.innerHTML = '<strong>STEAM ID:</strong> <a href="http://steamcommunity.com/profiles/' + STEAMID + '">' + STEAMID + '</a>' + ets2mp_data;
	
	placeHolder = document.getElementsByClassName("profile_header");
	placeHolder[0].appendChild(ets2mp_div);
}

function getJSON(id){
	var url = "//api.ets2mp.com/player/" + id;
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var doc = xhr.responseText;
		if (doc) {
			json = eval('(' + doc + ')');
		}
    };
	xhr.open("GET", url, false);
	xhr.send(null);
}

function getBans(id){
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

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}