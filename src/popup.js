window.onload = function(){
	
	getServersInfo();
	if (getPlayers(0) > 0){
		var stat = '<h3>Статистика серверов:</h3>';
		var ets2mp_div = document.createElement("div");
		ets2mp_div.className = "servStat";
		stat += '<ul>';
		for(var index in json.response) {
			if (json.response[index].online){
				var	online = json.response[index].players + '/' + json.response[index].maxplayers;
			}
			else {
				var	online = 'Offline';
			}
			stat += '<li><strong>' + json.response[index].name + ':</strong> (' + online + ')</li>';
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