<?php
/**
	* Предоставляет досуп к свойствам языка. Язык в системе в основном обозначает языковую версию.
*/
	class lang extends umiEntinty implements iUmiEntinty, iLang {
		private $prefix, $is_default, $title;
		protected $store_type = "lang";

		/**
			* Загрузить информацию о свойствах языка из БД
			* @return Boolean true, если не возникло никаких ошибок
		*/
		protected function loadInfo($row = false) {
			if($row === false) {
				$sql = "SELECT SQL_CACHE id, prefix, is_default, title FROM cms3_langs WHERE id = '{$this->id}'";
				$result = l_mysql_query($sql);
				
				$row = mysql_fetch_row($result);
			}

			if(list($id, $prefix, $is_default, $title) = $row) {
				$this->prefix = $prefix;
				$this->title = $title;
				$this->is_default = (bool) $is_default;

				return true;
			} else {
				return false;
			}
		}

		/**
			* Получить название языка
			* @return String название языка
		*/
		public function getTitle() {
			return $this->title;
		}

		/**
			* Получить префикс языка (его 2х или 3х символьный код)
			* @return String префикс языка
		*/
		public function getPrefix() {
			return $this->prefix;
		}

		/**
			* Узнать, является ли этот язык языком по умолчанию (больше не используется)
		*/
		public function getIsDefault() {
			return $this->is_default;
		}

		/**
			* Установить новое название языка
			* @param String $title название языка
		*/
		public function setTitle($title) {
			$this->title = $title;
			$this->setIsUpdated();
		}

		/**
			* Установить новый префикс для языка
			* @param $prefix префикс языка
		*/
		public function setPrefix($prefix) {
			$this->prefix = $prefix;
			$this->setIsUpdated();
		}

		/**
			* Установить флаг "по умолчанию" (больше не используется)
			* @param Boolean $is_default флаг "по умолчанию"
		*/
		public function setIsDefault($is_default) {
			$this->is_default = (bool) $is_default;
			$this->setIsUpdated();
		}

		/**
			* Сохранить изменения в БД
			* @return Boolean true, если не произошло ошибок
		*/
		protected function save() {
			$title = self::filterInputString($this->title);
			$prefix = self::filterInputString($this->prefix);
			$prefix = $this->filterPrefix($prefix);
			$is_default = (int) $this->is_default;

			$sql = "UPDATE cms3_langs SET prefix = '{$prefix}', is_default = '{$is_default}', title = '{$title}' WHERE id = '{$this->id}'";
			l_mysql_query($sql);
			return true;
		}
		
		/**
			* Убрать символы, недопустимые в префиксе языка
			* @param String $prefix префикс языка
			* @return String отфильтрованный результат
		*/
		protected function filterPrefix($prefix) {
			return preg_replace("/[^A-z0-9_\-]+/", "", $prefix);
		}
	}
?>