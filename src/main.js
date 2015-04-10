var json;

function getPlayers(serv){
	if (json.error == "false")
		return json.response[serv].players;
	else
		return 0;
}

function getServersInfo(){
	var url = "http://api.ets2mp.com/servers/";
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