<?php
 header("Cache-Control: no-store, no-cache, must-revalidate");header("Cache-Control: post-check=0, pre-check=0", false);header("Pragma: no-cache");header("Date: " . gmdate("D, d M Y H:i:s") . " GMT");header("Expires: " . gmdate("D, d M Y H:i:s") . " GMT");header("X-XSS-Protection: 0");header("Content-type: text/html; charset=utf-8");?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" />
<html>
	<head>
		<title>Обновление UMI.CMS</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link type="text/css" rel="stylesheet" href="/smu/client/css/style.css" />
		<script type="text/javascript" src="/smu/client/prototype.js"></script>
		<script type="text/javascript" src="/smu/client/i18n.js"></script>
		<script type="text/javascript" src="/smu/client/clientUpdater.js"></script>

		<script type="text/javascript">
			var Updater = new clientUpdater();

			var PackagesInfo = {};
			var NotWritableList = "";
			function viewPackageInfo(packName) {
				var packInfo = PackagesInfo[packName] || "";
				$('win_pop_up_header').update(getLabel('lbl-pack-changes') + ' ' + packName);
				$('win_pop_up_text').update(packInfo);
				$('win_pop_up').style.display = 'block';

			}

			function selectStep(activeTab, label) {
				if (!activeTab || activeTab.className == 'act') return;
				var tabs = $('left');
				for (var i = 0; i < tabs.childNodes.length; i++) {
					var tab = tabs.childNodes[i];
					tab.className = '';
				}
				$('step_header_namber').innerHTML = activeTab.innerHTML;
				$('step_header').style.display = 'inline';

				$('step_header_text').innerHTML = label;
				activeTab.className = 'act';
			}

			Updater.addEventHandler("onWait", function() {
				$('updates_container').update('<div id="progres_bar"><img src="/smu/client/img/progres_speed.gif" alt="" /></div>');
			});

			Updater.addEventHandler("onConnectionError", function(errcode) {
				var msg = 'answer-error-' + errcode;
				var usr_msg = getLabel(msg);

				var html = '<h2 id="error_header">' + getLabel('answer-error-lbl') + ' #' + errcode + '</h2><p>' + usr_msg + '</p>';
				html += '<div class="button" onclick="Updater.needWait = true; Updater.run();"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';

				$('updates_container').update(html);

			});

			Updater.addEventHandler("onLoadComplete", function(stepName) {
				selectStep($(stepName), getLabel(stepName));
			});

			Updater.addEventHandler("onPrepareStep", function(stepName) {
				selectStep($(stepName), getLabel(stepName));
			});

			
			Updater.addEventHandler("onServerException", function(error) {
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

				html += '<div class="button" onclick="Updater.needWait = true; Updater.run();"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';

				c.update(html);
			});

			Updater.addEventHandler("onUpdaterException", function(error) {
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

				html += '<div class="button" onclick="Updater.needWait = true; Updater.run();"><span class="l"></span><span class="c">' + getLabel('lbl-repeat') + '</span><span class="r"></span></div>';

				c.update(html);
			});

			Updater.addEventHandler("onResponseFailed", function(response) {
				var c = $('updates_container');
				var html = '<h2 id="error_header">' + getLabel('error') + ' #001</h2><p>' + getLabel('error-response-failed') + '</p>';
				c.update(html);
				var pre = document.createElement('pre');
				pre.appendChild(document.createTextNode(response.responseText));
				c.appendChild(pre);
			});


			Updater.addEventHandler("onInitComplete", function(response) {
				var c = $('updates_container');
				c.update();
				// current version info
				var a_info = response.getElementsByTagName('license');
				if (a_info.length) {
					var info = a_info[0];
					var edition = getLabel(info.getAttribute('edition'));
					var version = getLabel(info.getAttribute('version'));
					var updtime = info.getAttribute('last-update-time');
					var build = info.getAttribute('build');
					var dbdriver = info.getAttribute('dbdriver');
					$('updates_container').innerHTML += '<table><tr><td class="left">' + getLabel('lbl-edition') + '</td><td>' + edition +'</td></tr><tr><td class="left">' + getLabel('lbl-updtime') + '</td><td>' + updtime + '</td></tr><tr><td class="left">' + getLabel('lbl-version') + '</td><td>' + version + '</td></tr><tr><td class="left">' + getLabel('lbl-build') + '</td><td>' + build + '</td></tr><tr><td class="left">' + getLabel('lbl-dbdriver') + '</td><td>' + dbdriver + '</td></tr></table>';
				}

				var packs = response.getElementsByTagName("package");
				
				// packs

				if (packs.length) {
					var html = '<table><tr><th>' + getLabel('lbl-pack-version') + '</th><th>' + getLabel('lbl-build') + '</th><th>' + getLabel('lbl-changes') + '</th><th>' + getLabel('lbl-install') + '</th></tr>';

					for (var i = 0; i < packs.length; i++) {
						var pack = packs[i];
						var version = pack.getAttribute('version');
						var date = pack.getAttribute('date');

						html += '<tr><td>' + date + '</td><td>' + version + '</td><td><div class="button" style="margin-top:0;" onclick="viewPackageInfo(\'' + version + '\');"><span class="l"></span><span class="c">' + getLabel('lbl-view-info') + '</span><span class="r"></span></a></td><td><div class="button" style="margin-top:0;" onclick="Updater.run(\'?package_version=' + version + '\');"><span class="l"></span><span class="c">' + getLabel('lbl-install') + '</span><span class="r"></span></div></td></tr>';

						PackagesInfo[version] = "<ul>";
						var components = pack.getElementsByTagName("component");
						for (var j = 0; j < components.length; j++) {
							var component = components[j];
							var cname = component.getAttribute('name');
							var ctype = component.getAttribute('type');
							var note_nl = component.getElementsByTagName('note');
							var note = (note_nl.length && note_nl[0].firstChild) ? note_nl[0].firstChild.nodeValue : "";

							PackagesInfo[version] += '<li><strong>' + cname + ' (' + ctype + ')</strong><br />' + note + '</li>';
						}
						PackagesInfo[version] += "</ul>";
					}

					html += '</table>';

					$('updates_container').innerHTML += html;
				} else {
					
				}
			});



			Updater.addEventHandler("onDownload", function(downloaded) {
				var total = parseInt(downloaded.getAttribute('total'));
				var recieved = parseInt(downloaded.getAttribute('recieved'));
				var percent = Math.round((recieved / total) * 100);
				var html =	'<div id="progres_bar">' + 
								'<div id="progres" style="width:' + percent + '%"></div>' + 
								'<div id="digits" style="color: ' + (percent > 50 ? '#FFF' : '#000') + '">' + percent + '%</div>' +
							'</div>' +
							'<p>Загрузка пакета (байт): <em>' + recieved + '</em> из <em>' +  total + '</em></p>';
				$('updates_container').update(html);
			});


			Updater.addEventHandler("onCheck", function(checking) {
				var result = checking.getAttribute('result');
				var files = checking.getElementsByTagName('file');
				var folders = checking.getElementsByTagName('folder');
				var need_recheck = false;
				if (folders) {
					for (var i = 0; i < folders.length; i++) {
						var folder = folders[i];
						NotWritableList += folder.firstChild.nodeValue + "\r\n";
					}
				}
				if (files) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						NotWritableList += file.firstChild.nodeValue + "\r\n";
					}
				}

				if (result == 'fail') {
					var html = "<p>" + getLabel("error-notwritable-files") + "</p>";
					$('updates_container').update(html);
					need_recheck = true;
				}

				if (NotWritableList.length) {
					var html = "<p>" + getLabel("error-list-notwritable-files") + "</p><pre>" + NotWritableList + "</pre>";
					$('updates_container').update(html);
					NotWritableList = "";
					need_recheck = true;
				}

				if (need_recheck) {
					var btn = document.createElement('div');
					btn.className = "button";
					btn.update('<span class="l"></span><span class="c">' + getLabel('lbl-recheck-btn') + '</span><span class="r"></span>');
					btn.onclick = function() {
						Updater.run('?recheck=1');
						this.onclick = function () {};
					}
					$('updates_container').appendChild(btn);
				}

			});




			Updater.addEventHandler("onUpdate", function(status) {
				var ready = status.getAttribute('ready');
				var percent = (ready == 'done') ? 100 : parseInt(ready);
				if (!percent) percent = 0;

				var component_name = '';
				var nl_component = status.getElementsByTagName('component');
				if (nl_component.length) {
					var c = nl_component[0];
					var cname = c.getAttribute('name');
					var cpart = c.getAttribute('part');
					component_name = cname + '-' + cpart;
				}
				component_name = getLabel(component_name);

				var html =	'<div id="progres_bar">' + 
								'<div id="progres" style="width:' + percent + '%"></div>' + 
								'<div id="digits" style="color: ' + (percent > 50 ? '#FFF' : '#000') + '">' + percent + '%</div>' +
							'</div>' +
							'<p>' + getLabel('lbl-component-installing') + ': <em>' + component_name + '</em></p>';
				$('updates_container').update(html);
			});

			Updater.addEventHandler("onUpdateFinish", function(response) {
				var nl_license = response.getElementsByTagName('license');
				if (nl_license.length) {
					var license = nl_license[0];
					var html = '<p><strong>' + getLabel('lbl-update-success') + ' ' + license.getAttribute('version') + ' (' + getLabel('lbl-build').toLowerCase() + ': ' + license.getAttribute('build') + ')</strong></p>';
					

					html += '<div class="button" onclick="document.location.href = \'/\'"><span class="l"></span><span class="c">' + getLabel('lbl-tosite') + '</span><span class="r"></span></div>';

					$('updates_container').update(html);
				}
			});


			window.onload = function() {
				Updater.run();
			}
		</script>


	</head>
	<body>
		<div id="page">
			<div id="left">
				<div id="update-init" class="-act">1</div>
				<div id="update-download">2</div>
				<div id="check-poll-response">3</div>
				<div id="poll-response">4</div>
				<div id="temp-cleanup">5</div>
				<div id="update-success">6</div>
			</div>
			<div id="content">
				<h1>Обновление <span class="umi">UMI.CMS</span>/ <span class="step" id="step_header">Шаг <span id="step_header_namber">1</span><span class="def"> - </span></span><span id="step_header_text">Инициализация</span></h1>
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