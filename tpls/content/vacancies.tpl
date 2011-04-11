<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" xmlns:umi="http://www.umi-cms.ru/TR/umi">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="%description%"></meta>
		<meta name="keywords" content="%keywords%"></meta>
		<title>%title%</title>
		<!--<link rel="shortcut icon" href="/favicon.ico" />-->
		<script type="text/javascript" src="/js/cross-domain.php"></script>
		<link rel="stylesheet" href="/css/constant.css" type="text/css" />
		<link rel="stylesheet" href="/css/template.css" type="text/css" />
		<link rel="stylesheet" href="/css%pre_lang%/lang.css" type="text/css" />
		<!--[if lt IE 8]>
			<link rel="stylesheet" href="/css/ie.css" type="text/css" />
		<![endif]-->
		<!--[if lt IE 8]>
			<link rel="stylesheet" href="/css/ie6.css" type="text/css" />
		<![endif]-->
		%system includeQuickEditJs()%
		%system includeEditInPlaceJs()%
		%data getRssMeta(%pid%)%
		%data getAtomMeta(%pid%)%
	</head>
	
	<body id="body">
		<div class="main">
			<div class="header">
				<h1 id="logo"><a href="%pre_lang%/" title="i-Gorod.com"><img title="i-Gorod.com" src="/images%pre_lang%/logo.gif" alt="i-Gorod.com" /></a></h1>
				%content menu()%
				<!--%search insert_form()%-->
				<div class="lang-selector" style="text-align:right;">
					<div style="float:right; height:31px; padding-top:10px;">
						<nobr>
							<span style="margin:10px; font-weight:bold; vertical-align:middle; background-color:#f1f1f1; padding:3px 7px;">РУС</span>
							<span style="margin:10px; font-weight:bold; vertical-align:middle;"><a href="/en%content get_page_url(%pid%,1)%" style="text-decoration:none; color:#6a6a6a;" title="English">ENG</a></span>
							<!--<span style="margin:10px; font-weight:bold; vertical-align:middle;"><a href="/de%content get_page_url(%pid%,1)%" style="text-decoration:none; color:#6a6a6a;" title="Deutsch">DEU</a></span>-->
						</nobr>
					</div>
				</div>
			</div>
			<div class="wrapper">
				<!--banner--><div xmlns:umi="umi" umi:element-id="16" umi:field-name="content">%content insert('16')%</div>
				<div class="clear1 pad">
					<div id="content">
						<div class="clear">
						<!--left-->
							<div id="left" class="equal">
								<div class="top_left_bg equal">
									<div class="bottom_left_bg equal">
										<div class="left-indent">
											<div class="wrapper-box module_menu">
												<div class="clear">
													<div class="boxIndent">
														<div><img style="margin-left:28px;" title="Вакансии рабочей группы" src="/images/h1_vacancies_%pre_lang%.gif" alt="Вакансии рабочей группы" /></div>
														<div><a id="rss" href="/data/rss/%id%/"><img title="RSS" src="/images/rss.gif" alt="RSS" style="margin-left:28px;" /></a></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						<!--right-->
						<!--center-->
							<div id="container" class="equal">
								<div class="clear">
									<div class="article-text-indent">
										<div class="clear">
											<table class="contentpaneopen">
												<tr><td valign="top">
													<div xmlns:umi="umi" umi:element-id="331%" umi:field-name="content">%content insert('331')%</div>
													%system listErrorMessages()%
													%content%
												</td></tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tail-footer clear">
				<div class="main">
					<div class="footer" xmlns:umi="umi" umi:element-id="23" umi:field-name="content"><!--copyrights-->%content insert('23')%</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
		var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
		document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
		try {
			var pageTracker = _gat._getTracker("UA-16088512-1");
			pageTracker._trackPageview();
			} catch(err) {}</script>
	</body>
</html>
