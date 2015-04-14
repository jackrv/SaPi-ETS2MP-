window.onload = function(){
	
	jsonParse('http://api.ets2mp.com/servers/');
	if (_JSON.error == 'false'){
		var stat = '<h3>Статистика серверов:</h3>';
		var ets2mp_div = document.createElement("div");
		ets2mp_div.className = "servStat";
		stat += '<ul>';
		for(var index in _JSON.response) {
			if (_JSON.response[index].online){
				var	online = _JSON.response[index].players + '/' + _JSON.response[index].maxplayers;
			}
			else {
				var	online = 'Offline';
			}
			stat += '<li><strong>' + _JSON.response[index].name + ':</strong> (' + online + ')</li>';
		}
		stat += '</ul>';
		ets2mp_div.innerHTML = stat;
		document.body.appendChild(ets2mp_div);
	}
	else{
		var stat = '<h3>Статистика не доступна!</h3>';
		var ets2mp_div = document.createElement("div");
		ets2mp_div.className = "servStat";
		ets2mp_div.innerHTML = stat;
		document.body.appendChild(ets2mp_div);
	}
}