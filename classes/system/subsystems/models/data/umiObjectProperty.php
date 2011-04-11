<?php
/**
 	* Этот класс служит для управления свойством объекта
*/
	abstract class umiObjectProperty extends umiEntinty implements iUmiEntinty, iUmiObjectProperty {
		protected
			$object_id, $field_id, $field, $field_type,
			$value = array(), $tableName = "cms3_object_content", $is_updated = false;
		protected static $dataCache = array();

		public	$store_type = "property";
		public static $USE_FORCE_OBJECTS_CREATION = false;
		public static $IGNORE_FILTER_INPUT_STRING = false;
		public static $IGNORE_FILTER_OUTPUT_STRING = false;
		public static $USE_TRANSACTIONS = true;

		/**
			* Конструктор класса
			* @param $id Integer id свойства
			* @param $id Integer id поля (umiField), с которым связано свойство
		*/
		public function __construct($id, $field_id, $type_id) {
			$this->tableName = umiBranch::getBranchedTableByTypeId($type_id);
			
			$this->setId($id);
			$this->object_id = (int) $id;

			$this->field = umiFieldsCollection::getInstance()->getField($field_id);
			$this->field_id = $field_id;
			
			$this->loadInfo();
		}

		/**
			* Получить класс свойства (umiObjectProperty) для объекта $id, поля $field_id, типа данных $type_id
			* @param Integer $id id объекта
			* @param Integer $field_id id поля (класс umiField)
			* @param Integer $type_id id типа данных (класс umiObjectType)
			* @return umiObjectProperty объект свойства
		*/
		public static function getProperty($id, $field_id, $type_id) {
			$className = self::getClassNameByFieldId($field_id);
			return new $className($id, $field_id, $type_id);
		}

		/**
			* Получить уникальный идентификатор свойства
			* @return Integer id свойства
		*/
		public function getId() {
			return $this->id . "." . $this->field_id;
		}

		/**
			* Получить значение свойства
			* @param Array $params = NULL дополнительные параметры (обычно не используется)
			* @return Mixed значение поля. Тип значения зависит от типа поля, связанного с этим свойством. Вернет NULL, если значение свойства не выставленно.
		*/
		public function getValue(array $params = NULL) {
			if($this->getIsMultiple() === false) {
				if(sizeof($this->value) > 0) {
					list($value) = $this->value;
				} else {
					return NULL;
				}
			} else {
				$value = $this->value;
			}
			if(!is_null($params)) {
				$value = $this->applyParams($value, $params);
			}
			
			if($restrictionId = $this->field->getRestrictionId()) {
				$restriction = baseRestriction::get($restrictionId);
				if($restriction instanceof iNormalizeOutRestriction) {
					$value = $restriction->normalizeOut($value);
				}
			}
			
			return $value;
		}

		/**
			* Получить имя свойсива
			* @return String имя свойства.
		*/
		public function getName() {
			return $this->field->getName();
		}

		/**
			* Получить описание свойсива
			* @return String описание свойства.
		*/
		public function getTitle() {
			return $this->field->getTitle();
		}
		
		/**
			* Провалидировать значение согласно настройкам поля
			* @param String $value проверяемое начение
			* @return String проверенное (возможно, модифицированное) значение поля
		*/
		public function validateValue($value) {
			if(!$value && $this->field->getIsRequired()) {
				throw new valueRequiredException(getLabel('error-value-required', null, $this->getTitle()));
			}
		
			if($value && $restrictionId = $this->field->getRestrictionId()) {
				$restriction = baseRestriction::get($restrictionId);
				if($restriction instanceof baseRestriction) {
					if($restriction instanceof iNormalizeInRestriction) {
						$value = $restriction->normalizeIn($value);
					}
					
					if($restriction->validate($value) == false) {
						throw new wrongValueException(getLabel($restriction->getErrorMessage(), null, $this->getTitle()));
					}
				}
			}
			return $value;
		}

		/**
			* Установить значение свойства.
			* Устанавливает флаг "Модифицирован".
			* Значение в БД изменится только когда на экземпляре umiObjectProperty будет вызван темод commit(), либо в деструкторе экземпляра
			* @param $value Mixed новое значение для поля. Зависит от типа поля, связанного с этим свойством
			* @return Boolean true если прошло успешно
		*/
		public function setValue($value) {
			$value = $this->validateValue($value);
		
			if(!is_array($value)) {
				$value = Array($value);
			}

			$data_type = $this->getDataType();
			if ($data_type === 'date') {
				foreach ($value as $vKey=>$vVal) {
					if (!($vVal instanceof umiDate)) {
						$value[$vKey] = new umiDate(intval($vVal));
					}
				}
			}
			
			$this->value = $value;
			return $this->setIsUpdated();
//			return $this->setObjectIsUpdated();
		}

		/**
			* Сбросить значение свойства.
			* Устанавливает флаг "Модифицирован".
			* Значение в БД изменится только когда на экземпляре umiObjectProperty будет вызван темод commit(), либо в деструкторе экземпляра
			* @return Boolean true если прошло успешно
		*/
		public function resetValue() {
			$this->value = Array();
			$this->setIsUpdated();
		}

		/**
			* Загружает необходимые данные для формирования объекта umiObjectProperty из БД.
			* @return Boolean true в случае успеха
		*/
		protected function loadInfo() {
			$field = $this->field;
			$field_types = umiFieldTypesCollection::getInstance();

			$field_type_id = $field->getFieldTypeId();

			$field_type = $field_types->getFieldType($field_type_id);
			$this->field_type = $field_type;

			$this->value = $this->loadValue();
		}
		
		protected function save() {
			$object = umiObjectsCollection::getInstance()->getObject($this->id);
			if($object instanceof umiObject) {
				if($object->checkSelf() == false) {
					cacheFrontend::getInstance()->del($object->getId(), "object");
					return false;
				}
			}
			
			cacheFrontend::getInstance()->del($this->getId(), "property");
			
			if(self::$USE_TRANSACTIONS) {
				l_mysql_query("START TRANSACTION /* Saving property for object {$this->id} */");
			}
			
			$result = $this->saveValue();
			
			if(self::$USE_TRANSACTIONS) {
				l_mysql_query("COMMIT");
			}
			
			if(isset(umiObjectProperty::$dataCache[$this->object_id])) {
				unset(umiObjectProperty::$dataCache[$this->object_id]);
			}
			
			$this->loadInfo();
			
			return $result;
		}

		/**
			* Узнать, может ли значение данного свойства состоять из массива значений (составной тип)
			* @return Boolean true, если тип составной
		*/
		public function getIsMultiple() {
			return $this->field_type->getIsMultiple();
		}

		/**
			* Узнать, может ли значение данного свойства иметь знак.
			* Зарезервировано и пока не используется
			* @return Boolean true, если значение свойства не будет иметь знак
		*/
		public function getIsUnsigned() {
			return $this->field_type->getIsUnsigned();
		}

		/**
			* Получить идентификатор типа поля, связанного с данным свойством
			* @return String идентификатор типа
		*/
		public function getDataType() {
			return $this->field_type->getDataType();
		}

		/**
			* Узнать, заблокировано ли свойство на изменение
			* @return Boolean true если свойство заблокировано
		*/
		public function getIsLocked() {
			return $this->field->getIsLocked();
		}

		/**
			* Узнать, наследуется ли значение свойства. Зарезервировано, но пока не используется.
			* @return Boolean true если свойство наследуется
		*/
		public function getIsInheritable() {
			return $this->field->getIsInheritable();
		}

		/**
			* Узнать видимость свойства для пользователя
			* @return Boolean true если свойство видимое для пользователя
		*/
		public function getIsVisible() {
			return $this->field->getIsVisible();
		}

		/**
			* Сохраняет значение свойства в БД, если тип свойства "Тэги"
		*/
		public static function filterInputString($string) {
			$string = l_mysql_real_escape_string($string);
			$string = umiObjectProperty::filterCDATA($string);
			
			if(isset($_SERVER['DOCUMENT_ROOT']) && cmsController::getInstance()->getCurrentMode() != "admin" && !umiObjectProperty::$IGNORE_FILTER_INPUT_STRING) {				
				$string = htmlspecialchars( htmlspecialchars_decode($string) );
				$string = str_replace("%", "&#37;", $string);
			}
			
			return $string;
		}

		/**
			* Заменяет в строке символ "%" на "&#037;" и обратно, в зависимости от режима работы cms.
			* Используется ядром для защиты от иньекций макросов на клинтской стороне
			* @param String $string фильтруемая строка
			* @return String отфильтрованная строка
		*/
		public static function filterOutputString($string) {
			if(!isset($_SERVER['DOCUMENT_ROOT']) || cmsController::getInstance()->getCurrentMode() == "admin" || self::$IGNORE_FILTER_OUTPUT_STRING) {
				$string = str_replace("%", "&#037;", $string);
			} else {
				//$string = stripslashes(str_replace(array("&#037;", "&#37;"), "%", $string));
				$string = str_replace(array("&#037;", "&#37;"), "%", $string);
			}			
			
			return $string;
		}
		
		/**
			* Заменяет в строке символ закрывающую последовательность для CDATA (]]>) на "]]&gt;"
			* Используется ядром поддержания валидности XML-документов
			* @param String $string фильтруемая строка
			* @return String отфильтрованная строка
		*/
		public static function filterCDATA($string) {
			$string = str_replace("]]>", "]]&gt;", $string);
			return $string;
		}
		
		/**
			* Устанавливает маркер "модифицирован" у связанного с этим свойством объекта
			* @return Boolean false, в случае неудачи
		*/
		protected function setObjectIsUpdated() {
			if($object = $this->getObject()) {
				$object->setIsUpdated();
				return true;
			} else {
				return false;
			}
		}
		
		protected function getPropData() {
			$cache = &umiObjectProperty::$dataCache;
			
			if(defined("DISABLE_GETVAL_OPT") && DISABLE_GETVAL_OPT) {
				return false;
			}
			
			$fieldId = $this->field_id;
			$objectId = $this->object_id;
			
			if(!isset($cache[$objectId])) {
				$data = array();
				
				$sql = "SELECT field_id, int_val, varchar_val, text_val, rel_val, tree_val, float_val FROM {$this->tableName} WHERE obj_id = '{$this->id}'";
				$result = l_mysql_query($sql);
				while($row = mysql_fetch_assoc($result)) {
					$data[$row['field_id']]['int_val'][] = $row['int_val'];
					$data[$row['field_id']]['varchar_val'][] = $row['varchar_val'];
					$data[$row['field_id']]['text_val'][] = $row['text_val'];
					$data[$row['field_id']]['rel_val'][] = $row['rel_val'];
					$data[$row['field_id']]['tree_val'][] = $row['tree_val'];
					$data[$row['field_id']]['float_val'][] = $row['float_val'];
				}
				$cache[$objectId] = $data;
				
				if(sizeof($cache) >= 3) {
					foreach($cache as $i => $d) {
						unset($cache[$i]);
						break;
					}
				}
			} else {
				$data = $cache[$objectId];
			}
			
			if(isset($data[$fieldId])) {
				$result = $data[$fieldId];
				unset($cache[$objectId][$fieldId]);
				if(sizeof($cache[$objectId]) == 0){
					unset($cache[$objectId]);
				}
				return $result;
			} else {
				return false;
			}
		}
		
		/**
			* Возвращает связанный с этим свойством объект (umiObject)
			* @return umiObject
			* @see umiObject
		*/
		public function getObject() {
			return umiObjectsCollection::getInstance()->getObject($this->object_id);
		}

		
		/**
			* Возвращает id объекта (umiObject), связанного с этим свойством
			* @return umiObject
			* @see umiObject
		*/
		public function getObjectId() {
			return $this->object_id;
		}
		
		/**
			* Возвращает тип свойства (umiFieldType)
			* @return umiFieldType
			* @see umiFieldType
		*/
		public function getField() {
			return $this->field;
		}
		
		protected static function unescapeFilePath($filepath) {
			return str_replace("\\\\", "/", $filepath);
		}
		
		protected function deleteCurrentRows() {
			$sql = "DELETE FROM {$this->tableName} WHERE obj_id = '{$this->object_id}' AND (field_id = '{$this->field_id}' OR field_id IS NULL)";
			l_mysql_query($sql);

			if($err = mysql_error()) {
				throw new coreException($err);
				return false;
			}
		}

		/**
			* Заполнить все столбцы значений таблицы БД, соответствующие данному свойству NULL'ами
		*/
		protected function fillNull() {
			$sql = "SELECT COUNT(*) FROM {$this->tableName} WHERE obj_id = '{$this->object_id}' AND field_id = '{$this->field_id}'";
			$result = l_mysql_query($sql);

			if($err = mysql_error()) {
				throw new coreException($err);
				return false;
			} else {
				list($c) = mysql_fetch_row($result);
			}

			if($c == 0) {
				$sql = "INSERT INTO {$this->tableName} (obj_id, field_id) VALUES('{$this->object_id}', '{$this->field_id}')";
				l_mysql_query($sql);

				if($err = mysql_error()) {
					throw new coreException($err);	//TODO: Ignore references, debug.
					return false;
				} else {
					return true;
				}
			}
			return true;
		}

		
		protected static function getClassNameByFieldId($field_id) {
			static $cache = Array();
			if(isset($cache[$field_id])) {
				return $cache[$field_id];
			}
			
			$field = umiFieldsCollection::getInstance()->getField($field_id);
			$fieldTypeId = $field->getFieldTypeId();
			$fieldType = umiFieldTypesCollection::getInstance()->getFieldType($fieldTypeId);
			$fieldDataType = $fieldType->getDataType();
			
			$propertyClasses = Array(
				'relation' => 'umiObjectPropertyRelation',
				'wysiwyg' => 'umiObjectPropertyWYSIWYG',
				'string' => 'umiObjectPropertyString',
				'file' => 'umiObjectPropertyFile',
				'img_file' => 'umiObjectPropertyImgFile',
				'swf_file' => 'umiObjectPropertyImgFile',
				'video_file' => 'umiObjectPropertyFile',
				'boolean' => 'umiObjectPropertyBoolean',
				'int' => 'umiObjectPropertyInt',
				'text' => 'umiObjectPropertyText',
				'date' => 'umiObjectPropertyDate',
				'symlink' => 'umiObjectPropertySymlink',
				'price' => 'umiObjectPropertyPrice',
				'float' => 'umiObjectPropertyFloat',
				'tags' => 'umiObjectPropertyTags',
				'password' => 'umiObjectPropertyPassword',
				'counter' => 'umiObjectPropertyCounter',
				'optioned' => 'umiObjectPropertyOptioned'
			);
			
			if(isset($propertyClasses[$fieldDataType])) {
				return $cache[$field_id] = $propertyClasses[$fieldDataType];
			} else {
				throw new coreException("Unhandled field of type \"{$fieldDataType}\"");
			}
		}

		/**
			* Не используйте этот метод, его поведение будет изменено в ближайших версиях
		*/
		public static function objectsByValue($i_field_id, $arr_value = NULL, $b_elements = false, $b_stat = true, $arr_domains = NULL) {
			$arr_answer = array();

			// ==== validate input : =======================

			if (!(is_null($arr_value) || is_array($arr_value) || intval($arr_value) === -1 || strval($arr_value) === 'all' || strval($arr_value) == 'Все')) {
				$arr_value = array($arr_value);
			}

			// h.domain_id
			$arr_domain_ids = NULL;
			if ($b_elements) {
				if (is_null($arr_domains)) { // current domain
					$arr_domain_ids = array(cmsController::getInstance()->getCurrentDomain()->getId());
				} elseif (intval($arr_domains) === -1 || strval($arr_domains) === 'all' || strval($arr_domains) == 'Все') {
					$arr_domain_ids = array();
				} elseif (is_array($arr_domains)) {
					$arr_domain_ids = array_map('intval', $arr_domains);
				} else {
					$arr_domain_ids = array(intval($arr_domains));
				}
			}
			
			$field = umiFieldsCollection::getInstance()->getField($i_field_id);
			if($field instanceof umiField) {
				$fieldDataType = $field->getFieldType()->getDataType();
				$s_col_name = umiFieldType::getDataTypeDB($fieldDataType);
			} else {
				throw new coreException("Field #{$fieldId} not found");
			}

			// ==== construct sql queries : ================
			
			$objectTypeId = umiSelectionsParser::getObjectTypeByFieldId($i_field_id);
			$tableName = umiBranch::getBranchedTableByTypeId($objectTypeId);

			$s_from = "{$tableName} `o`";
			if ($b_elements) $s_from .= ", cms3_hierarchy `h`";

			if ($b_elements) {
				$s_count_field = "h.id";
			} else {
				$s_count_field = "o.obj_id";
			}

			$s_where_tail = ($b_elements ? " AND h.obj_id = o.obj_id AND h.is_active=1 AND h.is_deleted=0" : "");

			if ($b_elements && is_array($arr_domain_ids) && count($arr_domain_ids)) {
				$s_where_tail .= " AND h.domain_id IN ('".implode("', '", $arr_domain_ids)."')";
			}

			$s_values_filter = "";
			if (!(intval($arr_value) === -1 || strval($arr_value) === 'all' || strval($arr_value) === 'Âñå')) {
				$s_values_filter = " AND o.{$s_col_name} ".(is_null($arr_value) ? "IS NULL" : "IN ('".implode("', '", $arr_value)."')");
			}

			if ($b_stat) {
				$s_query = "SELECT o.".$s_col_name." as `value`, COUNT(".$s_count_field.") as `items` FROM ".$s_from." WHERE o.field_id = ".$i_field_id.$s_values_filter.$s_where_tail." GROUP BY o.".$s_col_name." ORDER BY `items`";
			} else {
				$s_query = "SELECT DISTINCT ".$s_count_field." as `item` FROM ".$s_from." WHERE o.field_id = ".$i_field_id.$s_values_filter.$s_where_tail;
			}

			// ==== execute sql query : ====================

			$arr_query = array();
			$rs_query = l_mysql_query($s_query);
			$i_query_error = mysql_errno();
			$s_query_error = mysql_error();
			if ($rs_query === false || $i_query_error) {
				throw new coreException("Error executing db query (errno ".$i_query_error.", error ".$s_query_error.", query ".$s_query.")");
			} else {
				while ($arr_next_row = mysql_fetch_assoc($rs_query)) {
					$arr_query[] = $arr_next_row;
				}
			}

			// ==== construct returning answer : ===========

			if ($b_stat) {
				$arr_answer['values'] = array();
				$i_max = 0;
				$i_summ = 0;
				foreach ($arr_query as $arr_row) {
					$i_cnt = intval($arr_row['items']);

					$arr_answer['values'][] = array('value' => $arr_row['value'], 'cnt' => $i_cnt);
		
					if ($i_cnt > $i_max) $i_max = $i_cnt;
					$i_summ += $i_cnt;
				}
				$arr_answer['max'] = $i_max;
				$arr_answer['sum'] = $i_summ;
			} else {
				foreach ($arr_query as $arr_row) $arr_answer[] = $arr_row['item'];
			}

			// RETURN :
			return $arr_answer;

		}
		
		protected function applyParams($values, array $params = NULL) {
			return $values;
		}
		
		protected function prepareRelationValue($value) {
			if(!$value) {
				return false;
			}
			
			$objects = umiObjectsCollection::getInstance();
			$forceObjectsCreation = self::$USE_FORCE_OBJECTS_CREATION;
			
			if(is_object($value)) {
				return $value->getId();
			} else {
				if(is_numeric($value) && $objects->isExists($value) && !$forceObjectsCreation) {
					return (int) $value;
				} else {
					if($guide_id = $this->field->getGuideId()) {
						$val_name = self::filterInputString($value);

						$sql = "SELECT id FROM cms3_objects WHERE type_id = '{$guide_id}' AND name = '{$val_name}'";
						$result = l_mysql_query($sql);

						if(mysql_num_rows($result)) {
							list($value) = mysql_fetch_row($result);
							return $value;
						} else {
							if($value = $objects->addObject($value, $guide_id)) {
								return (int) $value;
							} else {
								throw new coreException("Can't create guide item");
							}
						}
					} else {
						return null;
					}
				}
			}
		}
	};
?>