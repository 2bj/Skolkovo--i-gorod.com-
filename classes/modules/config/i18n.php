<?php

$i18n = Array(
	"header-config-main"		=> "Основные настройки",
	"group-globals"			=> "Название сайта",
	"option-admin_email"		=> "E-mail администратора",
	"option-keycode"		=> "Лицензионный ключ",
	"option-chache_browser"		=> "Разрешить браузерам кешировать страницы",
	"option-disable_url_autocorrection"	=> "Отключить автокоррекцию адресов",
	"option-disable_captcha"	=> "Отключить CAPTCHA",
	"option-show_macros_onerror" => "Показывать текст макроса при ошибке",
	"option-site_name"		=> "Название сайта",

	"header-config-mails"		=> "Настройки исходящих писем",
	"option-email_from"		=> "E-mail отправителя",
	"option-fio_from"		=> "Имя отправителя",

	"header-config-memcached"	=> "Настройки подключения к memcached",
	"group-memcached"		=> "Memcached",
	"option-host"			=> "Хост",
	"option-port"			=> "Порт",
	"option-is_enabled"		=> "Использовать memcached",
	"option-status"			=> "Статус",
	"config-memcache-no-connection"	=> "Нет подключения",
	"config-memcache-disabled"	=> "Отключено",
	"config-memcache-used"		=> "Используется",

	"label-modules-list"		=> "Список установленных модулей",

	"label-install-path"		=> "Путь до инсталляционного файла",
	"label-install"			=> "Установить",
	"label-langs-list"		=> "Список языков",
	"label-lang-prefix"		=> "Префикс",
	"header-config-langs"		=> "Языки",

	"header-config-domains"		=> "Настройка доменов",
	"label-domain-address"		=> "Адрес домена",
	"label-domain-mirror-address" => "Адрес зеркала домена",
	"label-domain-lang"		=> "Язык по умолчанию",
	"label-mirrows"			=> "Свойства",

	"tabs-config-main"		=> "Глобальные",
	"tabs-config-modules"		=> "Модули",
	"tabs-config-langs"		=> "Языки",
	"tabs-config-domains"		=> "Домены",
	"tabs-config-memcached"		=> "Memcached",
	"tabs-config-mails"		=> "Почта",
	"tabs-config-watermark" => "Водяной знак",

	"header-config-modules"		=> "Модули",
	"header-config-domain_mirrows"	=> "Свойства домена",
	"header-config-lang_del" => "Удаление языка",
	"option-upload_max_filesize" => "Максимальный размер загружаемого файла в PHP (Мб)",
	"option-max_img_filesize"	=> "Максимальный размер загружаемой фотографии (Мб)",
	"header-config-del_module" => "Удаление модуля",
	
	"group-static"				=> "Настройки статического кеширования",
	"option-enabled"			=> "Включено",
	"option-expire"				=> "Время хранения кеша (обычно не имеет значения)",
	"option-ignore-stat"		=> "Не вести статистику при кешировании",
	"cache-static-short"		=> "Короткий кеш, не более 10 минут",
	"cache-static-normal"		=> "Нормальный кеш, не более суток (рекомендуется)",
	"cache-static-long"			=> "Длинный кеш, не более года",
	"option-lock_duration"		=> "Продолжительность блокировки страницы (с)",
	"option-ga-id"				=> "Google Analytics Id",
	"option-expiration_control"	=> "Разрешить контроль актуальности контента",
	
	"header-config-branching"	=> "Оптимизация базы данных",
	"label-optimize-db"			=> "Оптимизировать",
	"header-config-add_module_do"	=> "Установка модуля",
	
	"label-watermark" => "Водяной знак",
	"header-config-watermark" => "Настройки водяного знака",
	"option-image" => "Путь до накладываемого изображения (от корня сайта)",
	"option-scale" => "Относительный размер (например, 80)",
	"option-alpha" => "Прозрачность (100 — непрозрачный)",
	"option-valign" => "Вертикальное положение",
	"option-halign" => "Горизонтальное положение",
	"watermark-valign-top" => "Вверху",
	"watermark-valign-bottom" => "Внизу",
	"watermark-halign-right" => "Справа",
	"watermark-halign-left" => "Слева",
	
	"header-config-cache" => "Производительность",
	"tabs-config-cache" => "Производительность",
	"group-engine" => "Обычное кеширование",
	"option-current-engine" => "Текущее состояние кеша",
	
	"option-engines" => "Список доступных кеширующих механизмов",
	
	"cache-engine-apc" => "APC",
	"cache-engine-eaccelerator" => "eAccelerator",
	"cache-engine-xcache" => "XCache",
	"cache-engine-memcache" => "Memcache (TCP/IP, автоопределение)",
	"cache-engine-shm" => "Shared memory (shm)",
	"cache-engine-fs" => "Файловая система",
	"cache-engine-none" => "Недоступно",
	
	"option-reset" => "Сбросить кеш",
	"group-seo" => "Настройки SEO",
	"option-seo-title" => "Префикс для TITLE",
	"option-seo-keywords" => "Keywords (по умолчанию)",
	"option-seo-description" => "Description (по умолчанию)",
	
	"option-allow-alt-name-with-module-collision" => "Разрешить совпадение адреса страницы с названием модуля",
	"cache-engine-none"		=> "Не выбрано",
	"group-branching"		=> "Оптимизация базы данных",
	"option-branch"			=> "Оптимизировать БД",
	"option-allow-redirects-watch" => "Перенаправлять на перемещенные страницы",

	"js-config-optimize-db-header"     => "Оптимизация базы данных",
	"js-config-optimize-db-content"    => "<p>Перестраивается база данных для более оптимальной работы.<br />Это может занять некоторое время.</p>",
	
	"event-systemModifyElement-title" => "Отредактирована страница",
	"event-systemModifyElement-content" => "В страницу \"<a href='%page-link%'>%page-name%</a>\" внесены изменения",
	
	"event-systemCreateElement-title" => "Создана страница",
	"event-systemCreateElement-content" => "Создана новая страница \"<a href='%page-link%'>%page-name%</a>\"",
	
	"event-systemSwitchElementActivity-title" => "Изменена активность",
	"event-systemSwitchElementActivity-content" => "Изменена активность страницы \"<a href='%page-link%'>%page-name%</a>\"",
	
	"event-systemDeleteElement-title" => "Удалена страница",
	"event-systemDeleteElement-content" => "Удалена страница \"<a href='%page-link%'>%page-name%</a>\"",
	
	"event-systemMoveElement-title" => "Перемещена страница",
	"event-systemMoveElement-content" => "Перемещена страница \"<a href='%page-link%'>%page-name%</a>\"",
	
	"event-systemModifyObject-title" => "Отредактирован объект",
	"event-systemModifyObject-content" => "Отредактирован объект \"%object-name%\" типа \"%object-type%\""
	
	
);
?>