$(document).ready(function() {
	getServerInfo(function() {
		var ets2mp_div = $('<div/>');
		ets2mp_div.addClass("servStat");
		ets2mp_div.append($('<h3/>').text(chrome.i18n.getMessage("popupStatsOfServers")));
		var list = $('<ul/>');
		for(var index in this.response) {
			var item = $('<li/>');
			item.append($('<strong/>').text(this.response[index].name + ': '));
			item.append(this.response[index].online ? this.response[index].players + '/' + this.response[index].maxplayers : 'Offline');
			ets2mp_div.append(item);
		}
		$('body').append(ets2mp_div);
	});
});