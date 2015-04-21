$(document).ready(function() {
	getServerInfo(function() {
		$('.main').append($('<h3/>', {"class": 'ui header'})
					.append($('<i/>', {"class": 'bar chart icon'}))
					.append($('<div/>', {"class": 'content', "text": chrome.i18n.getMessage('popupStatsOfServers')})
						.append($('<div/>', {"class": 'sub header', "text": chrome.i18n.getMessage('popupSubStatsOfServers')}))));
		for(var index in this.response) {
			var item = $('<div/>', {"class": 'ui segment'})
							.append($('<div/>', {"class": 'ui top teal attached progress', "data-percent": parseInt(this.response[index].players * 100 / this.response[index].maxplayers)})
								.append($('<div/>', {"class": 'bar'})))
							.append($('<span/>').append($('<strong/>').text(this.response[index].name))
								.append(": ({0} / {1})".f(this.response[index].players, this.response[index].maxplayers)))
							.append($('<div/>', {"class": 'ui bottom teal attached progress', "data-percent": parseInt(this.response[index].players * 100 / this.response[index].maxplayers)})
								.append($('<div/>', {"class": 'bar'})));


			$('.main').append(item);
		}
		$('.progress').progress();
	});
	localizePage();
	$('a').click(function(e) {
		chrome.tabs.create({url: $(e)[0].toElement.href});
    });
});