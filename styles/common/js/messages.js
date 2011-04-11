(function () {
	var checkPrivateMessages = function () {
		jQuery.get('/umess/inbox/?mark-as-opened=1', function (xml) {
			jQuery('message', xml).each(function (index, node) {
				var title = jQuery(node).attr('title');
				var content = jQuery('content', node).text();
				var date = jQuery('date', node).text();
				var sender = jQuery('sender', node).attr('name');
				
				content = '<p>' + content + '</p><div class="header">' + date + ', ' + sender + '</div>';
				jQuery.jGrowl(content, {
					'header': title,
					'life': 10000
				});
			});
		});
		setTimeout(checkPrivateMessages, 15000);
	};
	checkPrivateMessages();
})();