// ======================== Нужно как-то убрать этот native js ===========================
document.getElementById('timeUpdate').addEventListener('change', timeUpd);
function timeUpd() {
	$('#timeOut').text(($('#timeUpdate').val() == 0 ? '1' : $('#timeUpdate').val()) + chrome.i18n.getMessage("optSecShort"));
}
// =======================================================================================

$(document).ready(function() {
	$('#save').click(save_options);
	localizePage();
	// Semantic UI
	$('select.dropdown').dropdown();
	$('.ui.checkbox').checkbox();;
	// End Semantic UI

	restore_options();
	
	
});

function save_options() {
	$('.form').addClass('loading');
	localStorage["setting:enableTick"] = $('#enableBadge').prop("checked") ? 1 : 0;
	localStorage["setting:chckNewVersion"] = $('#chckNewVer').prop("checked") ? 1 : 0;
	localStorage["setting:updateTime"] = $('#timeUpdate').val();
	localStorage["setting:serverID"]   = $('#servers').val();

	startTimer();

	setTimeout(function() {window.close()}, 1000);
}

function restore_options() {
	$('#enableBadge').prop("checked", localStorage['setting:enableTick'] == 1 ? true : false);
	$('#chckNewVer').prop("checked",  localStorage["setting:chckNewVersion"] == 1 ? true : false);
	$('#timeUpdate').val(localStorage['setting:updateTime']);
	$('#timeOut').text((localStorage['setting:updateTime'] == 0 ? '1' : localStorage['setting:updateTime']) + chrome.i18n.getMessage("optSecShort"));

	getServerInfo(function() {
		$('#servers').text('');
		var id = 0;
		for(var index in this.response) {
			if (localStorage['setting:serverID'] == id)
				$('.text').text(this.response[index].name);
			var option = $('<option/>', { 'value': id}).text(this.response[index].name);
			$('#servers').append(option);
			id++;
		}
		$('#servers').val(localStorage['setting:serverID']);
	});
}