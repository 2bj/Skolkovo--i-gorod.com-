basket = {
	get : function(callback) {
		basket.__request("/udata/emarket/basket.json", {}, callback);
	},	
	putElement : function(id, options, callback) {
		basket.__request("/udata/emarket/basket/put/element/" + id + ".json", options, callback);
	},
	modifyItem : function(id, options, callback) {
		if(options.amount == 0) {
			this.removeItem(id, callback);
			return;
		}
		basket.__request("/udata/emarket/basket/put/item/" + id + ".json", options, callback);
	},
	removeElement : function(id, callback) {
		basket.__request("/udata/emarket/basket/remove/element/" + id + ".json", {}, callback);
	},
	removeItem    : function(id, callback) {
		basket.__request("/udata/emarket/basket/remove/item/" + id + ".json", {}, callback);
	},
	__cleanupHash : function(input) {
		var output = {
			customer : input.customer.object.id,
			items    : input.items,
			summary  : input.summary
		};
		return output;
	},
	__transformOptions : function(options) {
		var o = {};
		for(var i in options) {
			var k;
			if(i.toLowerCase() != "amount") k = "options[" + i + "]";
			else k = i;
			o[k] = options[i];
		}
		return o;
	},
	__request : function(url, options, callback) {
		jsonp(url, basket.__transformOptions(options),
			  function(data){
				  if(callback) callback( basket.__cleanupHash(data) );
			  });
	}
};


