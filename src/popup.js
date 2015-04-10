window.onload = function(){
	
	getServersInfo();
	if (getPlayers(0) > 0){
		var stat = '<h3>Статистика серверов:</h3>';
		var ets2mp_div = document.createElement("div");
		ets2mp_div.className = "servStat";
		for(var index in json.response) {
			stat += '<strong>' + json.response[index].name + ':</strong> (' + json.response[index].players + '/' + json.response[index].maxplayers + ')<br />'; 
		}
		ets2mp_div.innerHTML = stat;
		document.body.appendChild(ets2mp_div);
	}
}