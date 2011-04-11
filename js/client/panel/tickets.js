var tickets = function ($, data) {
	var tickets = new Array;
	var user = $('user', data);
	
	var ticket = function (params) {
		var self = this, params = params, node, messageNode;
		var x = params.x, y = params.y, width = params.width, height = params.height;
		
		var resetSelection = function () {
			var sel;
			if(document.selection && document.selection.empty) {
				document.selection.empty();
			} else if(window.getSelection) {
				sel = window.getSelection();
				if(sel && sel.removeAllRanges) {
					sel.removeAllRanges();
				}
			}
		};
		
		var createMessage = function () {
			messageNode = $('<div class="u-ticket-comment"><div /><textarea /><a /></div>');
			$(document.body).append(messageNode);
			
			if(params['message']) {
				$('div', messageNode).html(params.message.authorName + ' (' + params.message.authorLogin + ')');
				$('textarea', messageNode).attr('value', params.message.text);
			}
			
			$('a', messageNode).html(getLabel('js-ticket-delete'));
			
			$('textarea', messageNode).bind('change blur', function () {
				self.save();
			});
			
			$('a', messageNode).bind('click', function () {
				self.del();
			});			
		};
		
		self.del = function () {
			if(node) node.remove();
			if(messageNode) messageNode.remove();
			if(params.id) {
				var url = '/content/tickets/delete/' + params.id + '/';
				$.get(url);
			}
		};
		
		self.save = function () {
			var mode = params.id ? 'modify' : 'create';
			var url = '/content/tickets/' + mode + '/' + params.id + '/';
			url += '?ts=' + Math.round(Math.random() * 1000);
			$.ajax({
				url: url,
				dataType: 'json',
				data: {
					x: x,
					y: y,
					width: width,
					height: height,
					message: $('textarea', messageNode).attr('value'),
					referer: window.location.toString()
				},
				success: function (resp) {
					params.id = resp.id;
				}
			});
		};
		
		self.update = function () {
			node.css({
				top: y, left: x,
				width: width, height: height,
				opacity: 0.3
			});
			
			if(messageNode) {
				messageNode.css({
					top: parseInt(y) + parseInt(height),
					left: parseInt(x) + parseInt(width)
				});
			}
		};
		
		self.listen = function () {
			$(document).bind('mousemove', function (event) {
				resetSelection();
				width = event.clientX - x;
				height = event.clientY - y;
				self.update();
			});
			
			$(document).one('mouseup', function (event) {
				$(document).unbind('mousemove');
				self.update();
			});
		};
		
		(function init() {
			node = $('<div class="u-ticket" />');
			$(document.body).append(node);
			
			if(params.message) {
				createMessage();
			}
			
			self.update();
		})();
	};
	
	var initNewTicket = function () {
		changeClassName(jQuery('#u-quickpanel #note').get(0));
		$(document).one('mousedown', function (event) {
			var newTicket = new ticket({
				x: event.clientX,
				y: event.clientY,
				width: 1,
				height: 1,
				message: {
					authorName: user.attr('fname') + ' ' + user.attr('lname'),
					authorLogin: user.attr('login'),
					text: getLabel('js-ticket-empty')
				}
			});
			newTicket.listen();
			changeClassName(jQuery('#u-quickpanel #note').get(0));
		});
	};
	window.initNewTicket = initNewTicket;
	
	$(document).bind('keydown', function (event) {
		if(event.shiftKey && (event.keyCode == 67 || event.keyCode == 99)) {
			initNewTicket();
			return true;
		}
	});
	
	(function draw(data) {
		$('ticket', data).each(function (index, node) {
			var node = $(node);
			var pos = $('position', node);
			var author = $('author', node);
			var message = $('message', node);
			
			var t = new ticket({
				id: node.attr('id'),
				x: pos.attr('x'),
				y: pos.attr('y'),
				width: pos.attr('width'),
				height: pos.attr('height'),
				message: {
					authorName: author.attr('fname') + ' ' + author.attr('lname'),
					authorLogin: author.attr('login'),
					text: message.text()
				}
			});
			t.update();
		});
	})(data);
};
