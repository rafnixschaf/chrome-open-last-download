/*
 * Author: Wolf Scholle (Obstc0rp)
 * 
 */
 
/**
 * Add a listener to chrome commands.
 */
chrome.commands.onCommand.addListener(function(command) {

	switch (command) {
		case 'open-last-download':
			chrome.downloads.search({}, function (results) {
				chrome.downloads.open(results[results.length - 1].id);
			});
			break;
		case 'open-file-explorer':
			chrome.downloads.search({}, function (results) {
				chrome.downloads.show(results[results.length - 1].id);
			});
			break;
		case 'show-last-download':
			chrome.downloads.search({}, function (results) {

				var object = {};
				object['results'] = results;

				chrome.storage.local.set(object);

				openSummary(results);
			});
			break;
		default:
			break;
	}
});

function openSummary(results) {

	chrome.tabs.create({
		url: chrome.extension.getURL('assets/popup.html'),
		active: false

	}, function(tab) {
		// After the tab has been created, open a window to inject the tab
		chrome.windows.create({
			tabId: tab.id,
			type: 'popup',
			width: 300,
			height: 150,
			focused: true

		});

	});

}