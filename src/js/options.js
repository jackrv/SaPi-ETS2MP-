// ======================== Нужно как-то убрать этот native js ===========================
document.getElementById('timeUpdate').addEventListener('change', timeUpd);
function timeUpd() {
	$('#timeOut').val(($('#timeUpdate').val() == 0 ? '1' : $('#timeUpdate').val()) + chrome.i18n.getMessage("optSecShort"));
}
// =======================================================================================

$(document).ready(function() {
	restore_options();
	localizePage();
	$('#save').click(save_options);
});

function save_options() {
	localStorage["setting:enableTick"] = $('#enableBadge').prop("checked") ? 1 : 0;
	localStorage["setting:updateTime"] = $('#timeUpdate').val();
	localStorage["setting:serverID"]   = $('#servers').val();
	
	$('#status').text(chrome.i18n.getMessage("optSaveOK"));
	startTimer();
	setTimeout(function() {$('#status').text('')}, 750);

	setTimeout(function() {window.close()}, 1000);
}

function restore_options() {
	$('#enableBadge').prop("checked", localStorage['setting:enableTick'] == 1 ? true : false);
	$('#timeUpdate').val(localStorage['setting:updateTime']);
	$('#timeOut').val((localStorage['setting:updateTime'] == 0 ? '1' : localStorage['setting:updateTime']) + chrome.i18n.getMessage("optSecShort"));
	$('#servers').append($('<option/>').text('Loading..'));

	getServerInfo(function() {
		$('#servers').text('');
		var id = 0;
		for(var index in this.response) {
			var option = $('<option/>');
			option.attr({ 'value': id}).text(this.response[index].name);
			$('#servers').append(option);
			id++;
		}
		$('#servers').val(localStorage['setting:serverID']);
	});
}

