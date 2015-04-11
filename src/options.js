document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('timeUpdate').addEventListener('change', timeUpd);


function save_options() {
	var serverID = document.getElementById('servers').value;
	var timeUpdate = document.getElementById('timeUpdate').value;
	var badge = document.getElementById('needBadge').checked;
  
	chrome.storage.sync.set({server: serverID, time: timeUpdate, needBadge: badge}, function() {
			var status = document.getElementById('status');
			status.textContent = 'Ваши уподобания были сохранены, сударь!.';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
	});
	
	stopTimer();
	if (document.getElementById('needBadge').checked)
		startTimer();
	setTimeout(function() {window.close()}, 1000);
}

function restore_options() {
	getServersInfo();
		
	chrome.storage.sync.get({server: 0, time: 5, needBadge: false}, function(items) {
			var id = 0;
			var servList = '';

			for(var index in json.response) {
				servList += '<option value="' + id + '">' + json.response[index].name + '</option>';
				id++;
			}

			document.getElementById('servers').innerHTML = servList;
			document.getElementById('servers').value = items.server;
			document.getElementById('needBadge').checked = items.needBadge;
	});
}

function timeUpd(time) {
	document.getElementById('timeOut').value = document.getElementById('timeUpdate').value + 'c.';
}