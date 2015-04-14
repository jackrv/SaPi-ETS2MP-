document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('timeUpdate').addEventListener('change', timeUpd);

function save_options() {
	localStorage["setting:enableTick"] = document.getElementById('enableBadge').checked ? 1 : 0;
	localStorage["setting:updateTime"] = document.getElementById('timeUpdate').value;
	localStorage["setting:serverID"]   = document.getElementById('servers').value;
	
	document.getElementById('status').textContent = 'Cохранено!';
	setTimeout(function() {document.getElementById('status').textContent = '';}, 750);

	setTimeout(function() {window.close()}, 1000);
}

function restore_options() {
	document.getElementById('enableBadge').checked = localStorage['setting:enableTick'] == 1 ? true : false;
	document.getElementById('timeUpdate').value = localStorage['setting:updateTime'];
	document.getElementById('timeOut').value = localStorage['setting:updateTime'] + 'с.';
	document.getElementById('servers').innerHTML = '<option disabled checked>Loading...</option>';
	jsonParse("http://api.ets2mp.com/servers/");
	if (_JSON.error == 'false'){
		var id = 0;
		var servList = '';
		for(var index in _JSON.response) {
			servList += '<option value="' + id + '">' + _JSON.response[index].name + '</option>';
			id++;
		}
		document.getElementById('servers').innerHTML = servList;
		document.getElementById('servers').value = localStorage['setting:serverID'];
	}
}

function timeUpd(time) {
	document.getElementById('timeOut').value = document.getElementById('timeUpdate').value + 'c.';
}