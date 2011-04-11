/**
* Filter
* Класс содержит параметры отбора сущностей dataSet-ом
* @author Игнат <Leeb> Толчанов
* @ver    1.0
*/
function filter() {
	/**
	* Параметры
	*/
	this.AllText = new Array();
	this.Props   = new Object();
	this.EntIDs  = new Array();
	this.Parents = new Array();
	this.Langs   = new Array();
	this.Domains = new Array();
	this.Orders  = new Object();
	this.Perms   = true;
	this.Full    = true;
	this.FldsOr  = false;     	
	this.Depth   = null;
	this.CheckVirtual = true;
	this.Page    = null;
	/**
	* @param _Value
	*/
	this.setAllTextSearch = function(_Value) {
		if(_Value instanceof Array) {
			if(this.AllText.length)
				this.AllText.splice(this.AllText.length, _Value.length, _Value);
			else
				this.AllText = _Value;
		} else {
			this.AllText.push(_Value);
		}
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на равентство
	* @param _PropName имя проверяемого свойства
	* @param _Value    значение для проверки
	*/
	this.setPropertyEqual    = function(_PropName, _Value) {
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['eq'] = _Value;
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на не равентство
	* @param _PropName имя проверяемого свойства
	* @param _Value    значение для проверки
	*/
	this.setPropertyNotEqual = function(_PropName, _Value) {
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['ne'] = _Value;
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на включение искомой строки
	* @param _PropName имя проверяемого свойства
	* @param _Value    искомая строка
	*/
	this.setPropertyLike     = function(_PropName, _Value) {		
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['like'] = _Value;
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на "меньше"
	* @param _PropName имя проверяемого свойства
	* @param _Value    значение для проверки
	*/
	this.setPropertyLess     = function(_PropName, _Value) {		
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['lt'] = _Value;
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на "больше"
	* @param _PropName имя проверяемого свойства
	* @param _Value    значение для проверки
	*/
	this.setPropertyGreater  = function(_PropName, _Value) {		
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['gt'] = _Value;
	};
	/**
	* Устанавливает проверку свойства объекта/элемента на попадание в интервал
	* @param _PropName имя проверяемого свойства
	* @param _Floor    нижняя граница интервала
	* @param _Ceil     верхняя граница интервала
	*/
	this.setPropertyBetween  = function(_PropName, _Floor, _Ceil) {
		if(this.Props[_PropName] == undefined) this.Props[_PropName] = new Object();
		this.Props[_PropName]['gt'] = _Floor;
		this.Props[_PropName]['lt'] = _Ceil;		
	};
	/**
	* Удаляет условие на какое-то поле
	* @param _PropName имя свойства
	*/
	this.removeProperty = function(_PropName) {
		this.Props[_PropName] = undefined;
	};
	/**
	* Добавляет сортировку по определенному свойству
	* @param _PropName  имя свойства
	* @param _Direction направление сортировки ('forward'/'asc'/true - в прямом порядке, 'backward'/'desc'/false - в обратном)
	*/
	this.addOrder = function(_PropName, _Direction) {
		var _Asc = true;
		if(_Direction != undefined && 
		   (_Direction === false ||
			_Direction.toUpperCase() == 'DESC' || 
			_Direction.toUpperCase() == 'BACKWARD')) {
			_Asc = false;
		}
		this.Orders[_PropName] = _Asc;		
	};
	/**
	* Устанавливает сортировку по определенному свойству (сбрасывая существующие)
	* @param _PropName  имя свойства
	* @param _Direction направление сортировки ('forward'/'asc'/true - в прямом порядке, 'backward'/'desc'/false - в обратном)
	*/
	this.setOrder = function(_PropName, _Direction) {
		var _Asc = true;
		if(_Direction != undefined && 
		   (_Direction === false ||
			_Direction.toUpperCase() == 'DESC' || 
			_Direction.toUpperCase() == 'BACKWARD')) {
			_Asc = false;
		}
		this.Orders = new Object();
		this.Orders[_PropName] = _Asc;
	};
	/**
	* Устанавливает филтрацию по правам
	*/
	this.setPermissions = function(_Use) {
		if(_Use == undefined) this.Perms = true;
		else this.Perms = _Use ? true : false;
	};
	/**
	* Устанавливает id возможных родителей родителей
	* @param _ParentElements одиночное значение или массив
	*/
	this.setParentElements = function(_ParentElements) {		
		if(_ParentElements instanceof Array) {
			this.Parents = _ParentElements;
		} else {
			this.Parents.push(_ParentElements);
		}
	};
	/**
	* Устанавливает глубину выборки
	* @param _iDepth глубина
	*/
	this.setDepth = function(_iDepth) {
		if (typeof(_iDepth) !== 'undefined') {
			this.Depth = parseInt(_iDepth);
		}
	};
	/**
	* Устанавливает возможные id сущностей
	* @param _ParentElements одиночное значение или массив
	*/
	this.setEntityIDs = function(_aIDs) {		
		if(_aIDs instanceof Array) {
			this.EntIDs = _aIDs;
		} else {
			this.EntIDs.push(_aIDs);
		}
	};
	/**
	* Устанавливает ограничение на просматриваемые домены
	* @param _Domain id домена, из которого выбираем элементы, или массив из id
	*/
	this.setDomain = function(_Domain) {
		if(_Domain instanceof Array) {
			this.Domains = _Domain;
		} else {
			this.Domains.push(_Domain);
		}	
	};
	/**
	* Устанавливает ограничение на просматриваемые языковые версии
	* @param _Domain id языка, из которого выбираем элементы, или массив из id
	*/
	this.setLang = function(_Lang) {
		if(_Lang instanceof Array) {
			this.Langs = _Lang;
		} else {
			this.Langs.push(_Lang);
		}		
	};
	/**
	* Устанавливает проверку на виртуальную копию
	*/
	this.setVirtualCopyChecking = function(_Check) {
		if (typeof(_Check) == 'undefined') {
			this.CheckVirtual = true;
		} else {
			this.CheckVirtual = _Check ? true : false;
		}
	};
	/**
	*
	*/
	this.setViewMode = function(_Full) {
		if (typeof(_Full) == 'undefined') {
			this.Full = true;
		} else {
			this.Full = _Full ? true : false;
		}
	};
	/**
	*
	*/	
	this.setConditionModeOr = function(_Or) {
		if (typeof(_Or) == 'undefined') {
			this.FldsOr = true;
		} else {
			this.FldsOr = _Or ? true : false;
		}
	};
	/**
	* Возвращает массив родителей
	* @return Array массив родителей
	*/
	this.getParents = function() {
		return this.Parents;
	};
	/**
	*
	*/
	this.setPage = function(_Page) {
		this.Page = parseInt(_Page);
	};	
	/**
	*
	*/
	this.getPage = function() {
		return this.Page;
	};
	/**
	* Возвращает сформированную по параметрам строку запроса 
	* @return строка запроса
	*/
	this.getQueryString = function(_MergeFilter) {	
		var QueryPieces = new Array();		
		var i=0;
		if(_MergeFilter instanceof Object) {
			var o = new Object();			
			for(i in _MergeFilter.Props) o[i] = _MergeFilter.Props[i];
			for(i in this.Props) 		 o[i] = this.Props[i];
			for(i in o) {
				for(var j in o[i]) {
					if(o[i][j] instanceof Array) {
						for(var k=0; k < o[i][j].length; k++)
							QueryPieces.push( 'fields_filter[' + i + '][' + j + '][]=' + encodeURIComponent(o[i][j][k]) );
					} else {
						QueryPieces.push( 'fields_filter[' + i + '][' + j + ']=' + encodeURIComponent(o[i][j]) );
					}
				}
			} // for(i in o)
			
			for(i=0; i<this.AllText.length; i++) {
				QueryPieces.push( 'search-all-text[]=' + encodeURIComponent(this.AllText[i]) );
			}
			for(i=0; i<_MergeFilter.AllText.length; i++) {
				QueryPieces.push( 'search-all-text[]=' + encodeURIComponent(_MergeFilter.AllText[i]) );
			}
				
			for(i=0; i<this.EntIDs.length; i++) {
				QueryPieces.push( 'id[]=' + this.EntIDs[i] );
			}
			for(i=0; i<_MergeFilter.EntIDs.length; i++) {
				QueryPieces.push( 'id[]=' + _MergeFilter.EntIDs[i] );
			}
			for(i=0; i<this.Parents.length; i++) {
				QueryPieces.push( 'rel[]=' + this.Parents[i] );
			}
			for(i=0; i<_MergeFilter.Parents.length; i++) {
				QueryPieces.push( 'rel[]=' + _MergeFilter.Parents[i] );
			}
			for(i=0; i<this.Domains.length; i++) {
				QueryPieces.push( 'domain_id[]=' + this.Domains[i] );
			}
			for(i=0; i<_MergeFilter.Domains.length; i++) {
				QueryPieces.push( 'domain_id[]=' + _MergeFilter.Domains[i] );
			}
			for(i=0; i<this.Langs.length; i++) {
				QueryPieces.push( 'lang_id[]=' + this.Langs[i] );
			}
			for(i=0; i<_MergeFilter.Langs.length; i++) {
				QueryPieces.push( 'lang_id[]=' + _MergeFilter.Langs[i] );
			}
			o = new Object();
			for(i in _MergeFilter.Orders) o[i] = _MergeFilter.Orders[i];
			for(i in this.Orders) 		  o[i] = this.Orders[i];
			for(i in o) QueryPieces.push( 'order_filter[' + i + ']=' + (o[i] ? 'asc' : 'desc') );
			
			if(this.Perms !== null)
				if(this.Perms) QueryPieces.push('permissions');
			else
				if(_MergeFilter.Perms) QueryPieces.push('permissions');
				
			if(this.CheckVirtual !== null)
				if(this.CheckVirtual) QueryPieces.push('virtuals');
			else
				if(_MergeFilter.CheckVirtual) QueryPieces.push('virtuals');		
			
			if(this.Depth !== null)
				QueryPieces.push('depth=' + this.Depth);
			else if(_MergeFilter.Depth !== null)
				QueryPieces.push('depth=' + _MergeFilter.Depth);
			
			if(this.Page !== null)
				QueryPieces.push('p=' + this.Page);
			else if(_MergeFilter.Page !== null)
				QueryPieces.push('p=' + _MergeFilter.Page);
			
			if(this.FldsOr || _MergeFilter.FldsOd) QueryPieces.push('or-mode');
			if(this.Full   || _MergeFilter.Full)   QueryPieces.push('viewMode=full'); // ToDo: Epic WTF, think about it
			
		} else {
			for(i in this.Props) {
				for(var j in this.Props[i]) {
					if(this.Props[i][j] instanceof Array) {
						for(var k=0; k < this.Props[i][j].length; k++)
							QueryPieces.push( 'fields_filter[' + i + '][' + j + '][]=' + encodeURIComponent(this.Props[i][j][k]) );
					} else {
						QueryPieces.push( 'fields_filter[' + i + '][' + j + ']=' + encodeURIComponent(this.Props[i][j]) );
					}
				}
			}
			for(i=0; i<this.AllText.length; i++) {
				QueryPieces.push( 'search-all-text[]=' + encodeURIComponent(this.AllText[i]) );
			}
			for(i=0; i<this.EntIDs.length; i++) {
				QueryPieces.push( 'id[]=' + this.EntIDs[i] );
			}
			for(i=0; i<this.Parents.length; i++) {
				QueryPieces.push( 'rel[]=' + this.Parents[i] );
			}
			for(i=0; i<this.Domains.length; i++) {
				QueryPieces.push( 'domain_id[]=' + this.Domains[i] );
			}
			for(i=0; i<this.Langs.length; i++) {
				QueryPieces.push( 'lang_id[]=' + this.Langs[i] );
			}
			for(i in this.Orders) {				
				QueryPieces.push( 'order_filter[' + i + ']=' + (this.Orders[i] ? 'asc' : 'desc') );
			}

			if(this.Perms) QueryPieces.push('permissions');
			if(this.CheckVirtual) QueryPieces.push('virtuals');

			if(this.Depth !== null) QueryPieces.push('depth=' + this.Depth);
			if(this.Page  !== null) QueryPieces.push('p='  + this.Page);
			if(this.FldsOr) QueryPieces.push('or-mode');
			if(this.Full)   QueryPieces.push('viewMode=full');  // ToDo: Epic WTF, think about it 
		}

		QueryPieces.push('childs');	
		QueryPieces.push('links');
		//QueryPieces.push('virtuals');
		QueryPieces.push('templates');

		return '?' + QueryPieces.join('&');
	};
	/**
	* Сбрасывает все установки
	*/
	this.clear = function() {
		this.AllText = new Array();
		this.Props   = new Object();
		this.EntIDs  = new Array();
		this.Parents = new Array();
		this.Langs   = new Array();
		this.Domains = new Array();
		this.Orders  = new Object();
		this.Perms   = true;
		this.Depth   = null;
		this.Page 	 = null;
		this.Full    = true;
		this.FldsOr  = false;
		this.CheckVirtual = null;		     	
	};
	/**
	* Проверяет, был ли фильтр изменен
	*/
	this.empty = function() {
		var propsCount  = 0;
		var ordersCount = 0;
		for(var i in this.Props)  { propsCount++;  if(propsCount)  break; }
		for(var i in this.Orders) { ordersCount++; if(ordersCount) break; }
		return !this.AllText.length && !this.EntIDs.length && !this.Parents.length && !this.Langs.length && !this.Domains.length &&
			   !propsCount && !ordersCount && this.Perms && this.Full && !this.Depth && !this.Page && !this.FldsOr && !this.CheckVirtual;
	};
	/**
	*
	*/
	var cloneObject = function(o) {
		if(!o || 'object' !== typeof o)  {
			return o;
		}
		var c = 'function' === typeof o.pop ? [] : {};
		var p, v;
		for(p in o) {
			if(o.hasOwnProperty(p)) {
				v = o[p];
				if(v && 'object' === typeof v) {
					c[p] = cloneObject(v);
				} else {
					c[p] = v;
				}
			}
		}
		return c;
	};
	/**
	* Создает копию фильтра
	*/	
	this.clone = function() {
		return cloneObject(this);		
	};
}