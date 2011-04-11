<?php
	header("Cache-Control: no-store, no-cache, must-revalidate");	// HTTP/1.1
	header("Cache-Control: post-check=0, pre-check=0", false);	// HTTP/1.1
	header("Pragma: no-cache");	// HTTP/1.0
	header("Date: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Expires: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("X-XSS-Protection: 0"); //Disable new IE8 XSS filter
	header("Content-type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" />
<html>
	<head>
		<title>Установка UMI.CMS</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link type="text/css" rel="stylesheet" href="/install-static/css/style.css" />
		<script type="text/javascript" src="/install-static/clientInstaller.js"></script>
		<script type="text/javascript" src="/install-static/prototype.js"></script>
		<script type="text/javascript" src="/install-static/i18n.js"></script>

		<script type="text/javascript">
			var Installer = new clientInstaller;
		
			function selectStep(activeTab, label) {
				if (!activeTab) return;
				
				var tabs = $$('#left div');
				for (var i = 0; i < tabs.length; i++) {
					var tab = tabs[i];
					tab.removeClassName('act');
				}
				
				$('step_header_namber').update(activeTab.innerHTML);
				$('step_header').style.display = 'inline';

				$('step_header_text').update(label);
				activeTab.addClassName('act');
			}
			
			Installer.addEventHandler("onWait", function() {
				$('updates_container').update('<div id="progres_bar"><img src="/install-static/img/progres_speed.gif" alt="" /></div>');
			});

			Installer.addEventHandler("onConnectionError", function(errcode) {
				var msg = 'answer-error-' + errcode;
				var usr_msg = getLabel(msg);

				var html = '<h2 id="error_header">' + getLabel('answer-error-lbl') + ' #' + errcode + '</h2><p>' + usr_msg + '</p>';
				html += '<div class="button" onclick="Installer.needWait = true; Installer.run(); this.onclick = function () {};"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';

				$('updates_container').update(html);

			});
			
			Installer.addEventHandler("onResponseFailed", function(response) {
				var c = $('updates_container');
				var html = '<h2 id="error_header">' + getLabel('error') + ' #001</h2><p>' + getLabel('error-response-failed') + '</p>';
				html += '<div class="button" onclick="Installer.run(); this.onclick = function () {};"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';
				
				c.update(html);
				var pre = document.createElement('pre');
				pre.appendChild(document.createTextNode(response.responseText));
				c.appendChild(pre);
			});
			
			Installer.addEventHandler("onLoadComplete", function(stepName) {
				selectStep($(stepName), getLabel(stepName));
			});

			Installer.addEventHandler("onPrepareStep", function(stepName) {
				selectStep($(stepName), getLabel(stepName));
			});
			
			Installer.addEventHandler("onException", function(error) {
				var c = $('updates_container');
				var code = error.getAttribute('code');
				var sys_msg = error.firstChild.nodeValue;
				var lbl = getLabel('error-' + code);
				var usr_msg = (lbl == 'error-' + code) ? sys_msg : lbl;
				var html = '<h2 id="error_header">' + getLabel('error') + ' #' + code + '</h2><p>' + usr_msg + '</p>';
				var nl_trace = error.getElementsByTagName('trace');
				if (nl_trace.length) {
					html += '<p>Следующая информация может быть полезна службе заботы о клиентах для решения проблемы:</p>';
					html += '<pre>' + nl_trace[0].firstChild.nodeValue + '</pre>';
				}
				html += '<div class="button" onclick="Installer.run(); this.onclick = function () {};"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';
				c.update(html);
			});

			Installer.addEventHandler("showLicenseAgreement", function() {
				selectStep($('license-agreement'), getLabel('step-license-agreement'));
				var html = "<textarea>" + getLabel('license-agreement') + "</textarea>" + 
					"<div class='buttons'>" +
					"<div class='button' onclick='window.location=\"/\"; this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-not-agree') + "</span><span class='r'></span></div>" + 
					"<div class='button' onclick='Installer.run(); this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-agree') + "</span><span class='r'></span></div>" + 
					"</div>"
				;
				$('updates_container').update(html);
				Installer.currentStep++;
			});

			
			Installer.addEventHandler("checkSettings", function(params) {
				selectStep($('settings-check'), getLabel('step-settings-check'));
				if(params) {
					if(params.length) {
						var html = "<p>" + getLabel('error-settings-failed') + ":</p>";
						html += "<ol>";
						for(var i = 0; i < params.length; i++) {
							html += "<li>" + getLabel('settings-error-' + params[i]) + "</li>";
						}
						html += "</ol>";
						$('updates_container').update(html);
					} else {
						Installer.currentStep++;
						Installer.run();
					}
				}
			});
			
			Installer.addEventHandler("checkLicenseKey", function (params) {
				selectStep($('license-check'), getLabel('step-license-check'));
				var html = "";
				
				<?php
					if(isset($_SERVER['SERVER_ADDR']) && $_SERVER['SERVER_ADDR'] == "127.0.0.1" && $_SERVER['HTTP_HOST'] == "localhost") {
						echo <<<JS
Installer.currentStep++;
Installer.run();

JS;
					}
				?>
				
				if(params) {
					if(params['status'] == "FAILED") {
						html += "<h2 id='error_header'>" + params['msg'] + "</h2>";
					} else {
						Installer.setLicenseInfo(params);
						Installer.currentStep++;
						Installer.run();
						return;
					}
				}
				
				html += "<label for='license-key'>" + getLabel('input-license-key') + ":</label>";
				html += "<input type='text' size='50' id='license-key' style='display:block;' />";
				html += "<a href='http://www.umi-cms.ru/buy/free_license/?licence=free' target='_blank'>" + getLabel('get-free-key') + "</a><br/>";
				html += "<a href='http://www.umi-cms.ru/buy/free_license/?licence=trial' target='_blank'>" + getLabel('get-trial-key') + "</a>";
				html += "<div class='buttons'><div class='button' onclick='Installer.checkLicenseKey($(\"license-key\").value, \"<?php echo $_SERVER['HTTP_HOST']; ?>\", \"<?php echo (isset($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : str_replace("\\", "", $_SERVER['DOCUMENT_ROOT'])); ?>\"); this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-next') + "</span><span class='r'></span></div></div>";
				$('updates_container').update(html);
			});
			
			Installer.addEventHandler('choosePackage', function (params) {
				selectStep($('packet-choose'), getLabel('step-packet-choose'));
				if(params) {
					var html = "<label for='packages-list'>" + getLabel('packages-list') + ": </label>";
					html += "<select id='packages-list'>";
					for(var i = 0; i < params.length; i++) {
						html += "<option value=\"" + params[i] + "\">" + params[i] + "</option>";
					}
					html += "</select>";
					html += "<div class='buttons'><div class='button' onclick='Installer.choosePackage($(\"packages-list\").value); this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-next') + "</span><span class='r'></span></div></div>";
					$('updates_container').update(html);
				} else {
					Installer.getPackagesList();
				}
			});
			
			Installer.addEventHandler('databaseSettings', function (param) {
				selectStep($('database-settings'), getLabel('step-database-settings'));
				
				var html = getLabel('desc-mysql');
				
				var disabled = (param == 'xmldriver') ? " disabled='disabled'" : "";
				
				html += "<div id='form'>";
				html += "<p><label for='mysql-host'>" + getLabel('mysql-host') + ": </label>";
				html += "<input type='text' id='mysql-host' " + disabled + " value='" + Installer.mysqlHost + "' /></p>";
				html += "<p><label for='mysql-login'>" + getLabel('mysql-login') + ": </label>";
				html += "<input type='text' id='mysql-login' " + disabled + " value='" + Installer.mysqlLogin + "' /></p>";
				html += "<p><label for='mysql-password'>" + getLabel('mysql-password') + ": </label>";
				html += "<input type='text' id='mysql-password' " + disabled + " value='" + Installer.mysqlPassword + "' /></p>";
				html += "<p><label for='mysql-dbname'>" + getLabel('mysql-dbname') + ": </label>";
				html += "<input type='text' id='mysql-dbname' " + disabled + " value='" + Installer.mysqlDbname + "' /></p>";
				
				
				//html += "<p class='checkbox'><input type='checkbox' id='use-xmldriver' onclick='switchDriver(this.checked);' ";
				//if(param == 'xmldriver') {
				//	html += " checked='checked' ";
				//}
				//html += "/>";
				//html += "<label for='use-xmldriver'>" + getLabel('use-xmldriver') + "</label></p>";
				html += "</div>";
				
				if(param == 'xmldriver') {
					html += "<p>" + getLabel('desc-xmldriver') + "</p>";
				}
				
				html += "<div class='buttons'><div class='button' onclick='checkDB(); this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-next') + "</span><span class='r'></span></div></div>";
				
				$('updates_container').update(html);
			});
			
			Installer.addEventHandler('installSystem', function (param) {
				selectStep($('install-system'), getLabel('step-install-system'));
				var total = parseInt(param['total']);
				var recieved = parseInt(param['recieved']);
				
				if(!total) {
					Installer.processEvents("onWait");
					return;
				}
				
				var percent = Math.round((recieved / total) * 100);
				
				var html =	'<div id="progres_bar">' + 
								'<div id="progres" style="width:' + percent + '%"></div>' + 
								'<div id="digits" style="color: ' + (percent > 50 ? '#FFF' : '#000') + '">' + percent + '%</div>' +
							'</div>' +
							'<p>Устанавливается: ' + param['descr'] + '</p>';
				$('updates_container').update(html);
			});
			
			Installer.addEventHandler('choosePassword', function (param) {
				selectStep($('password-settings'), getLabel('step-password-settings'));
				
				var html = getLabel('desc-choose-password');
				html += "<div id='form'>";
				html += "<p><label for='login'>" + getLabel('choose-login') + ": </label>";
				html += "<input type='text' id='login' value='' /></p>";
				
				html += "<p><label for='password'>" + getLabel('choose-password') + ": </label>";
				html += "<input type='password' id='password' value='' /></p>";
				
				html += "<p><label for='password_again'>" + getLabel('choose-password-again') + ": </label>";
				html += "<input type='password' id='password_again' value='' /></p>";
				
				
				html += "<div class='buttons'><div class='button' onclick='if(checkPasswords()) this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-next') + "</span><span class='r'></span></div></div>";
				
				html += "</div>";
				
				$('updates_container').update(html);
			});
			
			Installer.addEventHandler('chooseDemoSite', function (param) {
				selectStep($('demosite-choose'), getLabel('step-demosite-choose'));
				
				if(param) {
					if(param['proc']) {
						var percent = param['proc'];
				
						var html =	'<div id="progres_bar">' + 
										'<div id="progres" style="width:' + percent + '%"></div>' + 
										'<div id="digits" style="color: ' + (percent > 50 ? '#FFF' : '#000') + '">' + percent + '%</div>' +
									'</div>' +
									'<p>Устанавливается: ' + param['descr'] + '</p>';
						$('updates_container').update(html);
						Installer.installDemoSite(param['sitename']);
						return;
					}
					
					var html = "";
					
					html += "<div id=\"demosite\" style=\"display: block;\">";
					
					for(var i = 0; i < param.length; i++) {
						var site = param[i];
						
						if(Installer.useXMLDriver && site['name'] == "demomarket.zip") {
							continue;
						}
						
						html += "<div class='demo'>";
						
						html += "<div class='img'>";
						html += "<img src='" + site['photo'] + "' />";
						html += "<div class='button button_demo' onclick='installDemoSite(\"" + site['name'] + "\"); this.onclick = function () {};'><span class='l'></span><span class='c'>" + getLabel('button-install') + "</span><span class='r'></span></div>";
						html += "</div>";
						
						html += "<div class='descr'>" + site['descr'] + "</div>";
						html += "<div class='clear'></div>";
						html += "</div>";
					}
										
					html += "</div>";
					$('updates_container').update(html);
				}
			});
			
			
			Installer.addEventHandler('cleanupPages', function (param) {
				selectStep($('demosite-choose'), getLabel('step-demosite-choose'));
				
				if(!param) {
					var param = {'proc': '0'};
				}
				var percent = param['proc'];
				
				var html =	'<div id="progres_bar">' + 
								'<div id="progres" style="width:' + percent + '%"></div>' + 
								'<div id="digits" style="color: ' + (percent > 50 ? '#FFF' : '#000') + '">' + percent + '%</div>' +
							'</div>';
				$('updates_container').update(html);
				Installer.cleanupPages();
			});
			
			function switchDriver(isChecked) {
				Installer.useXMLDriver = isChecked;
				Installer.processEvents('databaseSettings', (isChecked ? 'xmldriver' : ''));
			}
			
			function checkDB() {
				if(Installer.useXMLDriver) {
					Installer.mysqlHost = '';
					Installer.mysqlLogin = '';
					Installer.mysqlPassword = '';
					Installer.mysqlDbname = '';
					Installer.useXMLDriver = true;
					
					Installer.currentStep++;
					Installer.run();
				} else {
					Installer.mysqlHost = $('mysql-host').value;
					Installer.mysqlLogin = $('mysql-login').value;
					Installer.mysqlPassword = $('mysql-password').value;
					Installer.mysqlDbname = $('mysql-dbname').value;
					Installer.tryMysql();
				}
			}
			
			function installDemoSite(sitename) {
				Installer.processEvents("onWait");
				Installer.installDemoSite(sitename);
			}
			
			function checkPasswords() {
				var login = $('login').value;
				var password = $('password').value;
				
				if(!login) {
					alert(getLabel('empty-login'));
					return false;
				}
				
				if(!password) {
					alert(getLabel('empty-password'));
					return false;
				}
				
				if(password != $('password_again').value) {
					alert(getLabel('different-passwords'));
					return false;
				}
				
				Installer.saveSv(login, password);
				return true;
			}
			
			var requestsController = function () {
				this.reportRequest = function (requestId, params) {
					Installer.processEvents('checkLicenseKey', params);
				}
			};
			requestsController.self = false;
			requestsController.getSelf = function () {
				if(!requestsController.self) {
					requestsController.self = new requestsController;
				}
				return requestsController.self;
			}
			
			window.onload = function () {
				Installer.run();
			}
		</script>


	</head>
	<body>
		<div id="page">
			<div id="left">
				<div id="license-agreement" class="act first">1</div>
				<div id="settings-check">2</div>
				<div id="license-check">3</div>
				<div id="packet-choose">4</div>
				<div id="database-settings">5</div>
				<div id="install-system">6</div>
				<div id="password-settings">7</div>
				<div id="demosite-choose">8</div>
			</div>
			<div id="content">
				<h1>Установка <span class="umi">UMI.CMS</span>/ <span class="step" id="step_header">Шаг <span id="step_header_namber">1</span><span class="def"> - </span></span><span id="step_header_text">Лицензионное соглашение</span></h1>
				<div id="updates_container">
					
				</div>
			</div>
			<div class="clear"></div>
		</div>

		<div id="win_pop_up">
			<h2 id="win_pop_up_header"></h2>
			<div id="win_pop_up_text">
				
			</div>
			<div id="win_pop_up_button" class="button" onclick="this.parentNode.style.display = 'none'; return false;">
				<span class="r"></span>
				<span class="c">закрыть</span>
				<span class="l"></span>
			</div>
		</div>
	</body>
</html>