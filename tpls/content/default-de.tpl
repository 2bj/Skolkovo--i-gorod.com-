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
							<span style="margin:10px; font-weight:bold; vertical-align:middle;"><a href="/" style="text-decoration:none; color:#6a6a6a;" title="Русский">РУС</a></span>
							<span style="margin:10px; font-weight:bold; vertical-align:middle;"><a href="/en/" style="text-decoration:none; color:#6a6a6a;" title="English">ENG</a></span>
							<span style="margin:10px; font-weight:bold; vertical-align:middle; background-color:#f1f1f1; padding:3px 7px;">DEU</span>
						</nobr>
					</div>
				</div>
			</div>
			<div class="wrapper">
				<!--banner--><div xmlns:umi="umi" umi:element-id="324" umi:field-name="content">%content insert('324')%</div>
				<div class="clear1 pad">
					<div id="content">
						<div class="clear">
						%system listErrorMessages()%
						<div xmlns:umi="umi" umi:element-id="%pid%" umi:field-name="content">%content%</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tail-footer clear">
				<div class="main">
					<div class="footer" xmlns:umi="umi" umi:element-id="327" umi:field-name="content"><!--copyrights-->%content insert('327')%</div>
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
