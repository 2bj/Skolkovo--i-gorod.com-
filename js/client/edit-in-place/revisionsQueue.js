var uRevisionsQueue = function (editor) {
	var queue = new Array, index = -1, editorInstance = editor;
	
	this.submit = function () {
		var submitQueue = new Array();
		
		for(var i = index; i >= 0; i--) {
			var revision = queue[i];
			if(!revision) continue;
			
			//Delete all previsous revisions for same id
			for(var j = i; j >= 0; j--) {
				if(queue[j] && queue[j].id() == revision.id()) {
					queue[j] = undefined;
				}
			}
			
			submitQueue.push(revision);
		}
		
		if(submitQueue.length == 0) {
			uPageEditor.message('Нет изменений, которые можно было бы сохранить.');
			return;
		}
		
		//Save each revision
		for(var i = 0; i < submitQueue.length; i++) {
			submitQueue[i].save(function () {
				if(editorInstance.isEnabled()) {
					editorInstance.highlight();
				}
			});
		}
		reset();
		uPageEditor.onStep(index, queue.length);
		uPageEditor.message('Изменения сохранены.');
		uPageEditor.normalizeBoxes();
	};


	/**
		* Очистить очередь изменений
	*/
	this.cancel = function () {
		this.back(this.length());
		reset();
	};


	/**
		* Открутить изменения на steps шагов назад
	*/
	this.back = function (steps) {
		steps = parseInt(steps);
		
		var s = 0;
		while(steps-- && index >= 0) {
			this.get(index--).cancel();
			s++;
		}
		
		uPageEditor.normalizeBoxes();
		uPageEditor.onStep(index, queue.length);
		return (s > 0);
	};


	/**
		* Прокрутить изменения на steps шагов вперед
	*/
	this.forward = function (steps) {
		steps = parseInt(steps);

		var s = 0;
		while(steps-- && index < (queue.length - 1)) {
			this.get(++index).apply();
			s++;
		}
		
		uPageEditor.normalizeBoxes();
		uPageEditor.onStep(index, queue.length);
		return (s > 0);
	};


	/**
		* Добавить новое изменение
	*/
	this.add = function (info) {
		if(this.length() - 1 > index) {
			//Truncate queue tail
			for(var i = index; i < queue.length; i++) {
				queue[i] = undefined;
			}
		}
		
		var result = queue[++index] = new uRevision(info);
		uPageEditor.onStep(index, queue.length);
		return result;
	};


	/**
		* Получить ревизию по индексу
	*/
	this.get = function (i) {
		return queue[i] ? queue[i] : null;
	};


	/**
		* Найти нужную ревизию
	*/
	this.searchByInfo = function (info) {
		for(var i = index; i >= 0; i--) {
			var revision = this.get(i);
			if(revision && revision.matchByInfo(info)) {
				return revision;
			}
		}
		return null;
	};


	/**
		* Получить текущее значение поля
	*/
	this.getValue = function (info, callback) {
		var revision = this.searchByInfo(info);
		var dt = new Date;
		var qSuffix = "?qt=" + dt.getTime();

		if(revision) {
			callback(revision.value(), revision.fieldType(), revision.fieldParams());
		} else {
			var uri = uRevisionsQueue.getEditUri(info['field-name'], 'load');
			jQuery.get(uri + qSuffix, info, function (data) {
				var params = {};
				var prop = jQuery('property', data);
				var error = jQuery('error', data);
				
				if(error.size()) {
					uPageEditor.message(error.text());
					return false;
				}
				
				var userType = jQuery('user', data);
				if(userType.size() && userType.attr('type') == 'guest') {
					uPageEditor.message(getLabel('error-auth-required'));
					return false;
				}
				
				value = prop.text();
				fieldType = jQuery(prop).attr('type');
				
				if(fieldType == 'relation') {
					var items = jQuery('item', prop), value = {};
					
					for(var i = 0; i < items.length; i++) {
						var id = jQuery(items[i]).attr('id');
						var name = jQuery(items[i]).attr('name');
						value[id] = name;
					}
					
					params['guide-id'] = jQuery(prop).attr('guide-id');
					params['multiple'] = (jQuery(prop).attr('multiple') == 'multiple');
					params['public'] = (jQuery(prop).attr('public') == 'public');
				}

				callback(value, fieldType, params);
			},
			'xml');
		}
	};

	/**
		* Получить количество изменений
	*/
	this.length = function () {
		return queue.length;
	};
	
	this.index = function () {
		return index;
	};
	
	this.isModified = function () {
		return (this.length() > 0) && (this.index() >= 0);
	};
	
	
	var reset = function () {
		queue = new Array();
		index = -1;
	};

};

uRevisionsQueue.customHandlers = {};
uRevisionsQueue.getEditUri = function (fieldName, key) {
	var desc = uRevisionsQueue.customHandlers[fieldName];
	if((typeof desc != 'undefined') && (typeof desc[key] != 'undefined')) {
		return desc[key];
	}
	
	if(key == 'guides') {
		return '/admin/data/guide_items_all/';
	}
	return '/content/editValue/' + key + '.xml';
};

uPageEditor.get();