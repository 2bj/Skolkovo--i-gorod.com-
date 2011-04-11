<?php

$i18n = Array(
	"header-config-main"		=> "Global settings",
	"group-globals"			=> "ite name",
	"option-admin_email"		=> "E-mail of administrator",
	"option-keycode"		=> "License key",
	"option-chache_browser"		=> "Allow browser cache",
	"option-disable_url_autocorrection"	=> "Disable URL autocorrection",
	"option-disable_captcha"	=> "Disable CAPTCHA",
	"option-show_macros_onerror" => "Show macros source on errors",
	"option-site_name"		=> "Site name",

	"header-config-mails"		=> "Outgoing mails settings",
	"option-email_from"		=> "Sender e-mail",
	"option-fio_from"		=> "Sender name",

	"header-config-memcached"	=> "Memcached connection settings",
	"group-memcached"		=> "Memcached",
	"option-host"			=> "Host",
	"option-port"			=> "Port",
	"option-is_enabled"		=> "Memcached enabled",
	"option-status"			=> "Status",
	"config-memcache-no-connection"	=> "No connection",
	"config-memcache-disabled"	=> "Disconnected",
	"config-memcache-used"		=> "Used",

	"label-modules-list"		=> "Installed modules list",

	"label-install-path"		=> "Installation file path",
	"label-install"			=> "Install",
	"label-langs-list"		=> "Languages list",
	"label-lang-prefix"		=> "Prefix",
	"header-config-langs"		=> "Languages",

	"header-config-domains"		=> "Domains settings",
	"label-domain-address"		=> "Domain host",
	"label-domain-mirror-address" => "Mirror domain host",
	"label-domain-lang"		=> "Default languages",
	"label-mirrows"			=> "Settings",

	"tabs-config-main"		=> "Globals",
	"tabs-config-modules"		=> "Modules",
	"tabs-config-langs"		=> "Languages",
	"tabs-config-domains"		=> "Domains",
	"tabs-config-memcached"		=> "Memcached",
	"tabs-config-mails"		=> "Mails",
	"tabs-config-watermark" => "Watemark",

	"header-config-modules"		=> "Modules",
	"header-config-domain_mirrows"	=> "Domain properties",
	"header-config-lang_del" => "Delete language version",
	"option-upload_max_filesize" => "Maximum upload filesize in PHP settings (Mb)",
	"option-max_img_filesize"	=> "Maximum upload filesize (Mb)",
	"header-config-del_module" => "Uninstall module",
	
	"group-static"				=> "Cache settings",
	"option-enabled"			=> "Enabled",
	"option-expire"				=> "Cache expire",
	"option-ignore-stat"		=> "Disable statistics when cache enabled",
	"cache-static-short"		=> "Short cache, max 10 mins",
	"cache-static-normal"		=> "Normal cache, max 1 day (recommended)",
	"cache-static-long"			=> "Long cache, max 1 year",
	"option-lock_duration"		=> "Lock duation (sec)",
	"option-ga-id"				=> "Google Analytics Id",
	"option-expiration_control"	=> "Enable expiration control",
	
	"header-config-branching"	=> "Data base optimization",
	"label-optimize-db"			=> "Optimize",
	"header-config-add_module_do"	=> "Install module",
	
	"label-watermark" => "Watermark",
	"header-config-watermark" => "Watermark settings",
	"option-image" => "Image",
	"option-scale" => "Scale",
	"option-alpha" => "Transparent (100 — untransparent)",
	"option-valign" => "Vertical align",
	"option-halign" => "Horisontal align",
	"watermark-valign-top" => "Top",
	"watermark-valign-bottom" => "Bottom",
	"watermark-halign-right" => "Right",
	"watermark-halign-left" => "Left",
	
	"header-config-cache" => "Performance",
	"tabs-config-cache" => "Performance",
	"group-engine" => "General cache",
	"option-current-engine" => "Current cache status",
	
	"option-engines" => "Cache engines",
	
	"cache-engine-apc" => "APC",
	"cache-engine-eaccelerator" => "eAccelerator",
	"cache-engine-xcache" => "XCache",
	"cache-engine-memcache" => "Memcache (TCP/IP, autodetect)",
	"cache-engine-shm" => "Shared memory (shm)",
	"cache-engine-fs" => "File system",
	"cache-engine-none" => "None",	

	"option-reset" => "Flush cache",
	"group-seo" => "SEO settings",
	"option-seo-title"			=> "TITLE prefix",
	"option-seo-keywords"			=> "Keywords (default)",
	"option-seo-description"		=> "Description (default)",
	
	"option-allow-alt-name-with-module-collision" => "Allow page url and module name collision",
	"cache-engine-none"		=> "Not selected",
	"group-branching"		=> "Database optimization",
	"option-branch"			=> "Optimize DB",
	"option-allow-redirects-watch" => "Redirect to moved pages",
	
	"js-config-optimize-db-header"     => "Optimizing DB",
	"js-config-optimize-db-content"    => "<p>Database is rebuilding.<br />Please, wait.</p>",
	
	"event-systemModifyElement-title" => "Page is modified",
	"event-systemModifyElement-content" => "Page \"<a href='%page-link%'>%page-name%</a>\" is modified",
	
	"event-systemCreateElement-title" => "Page is created",
	"event-systemCreateElement-content" => "New page \"<a href='%page-link%'>%page-name%</a>\" is created",
	
	"event-systemSwitchElementActivity-title" => "Activity is changed",
	"event-systemSwitchElementActivity-content" => "Activity of \"<a href='%page-link%'>%page-name%</a>\" is changed",
	
	"event-systemDeleteElement-title" => "Page is deleted",
	"event-systemDeleteElement-content" => "Page \"<a href='%page-link%'>%page-name%</a>\" is deleted",
	
	"event-systemMoveElement-title" => "Page is moved",
	"event-systemMoveElement-content" => "Page \"<a href='%page-link%'>%page-name%</a>\" is moved",
	
	"event-systemModifyObject-title" => "Object is modified",
	"event-systemModifyObject-content" => "Object \"%object-name%\" of type \"%object-type%\" is modified"
	
);

?>