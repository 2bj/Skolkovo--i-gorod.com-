<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" xmlns:umi="http://www.umi-cms.ru/TR/umi">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="%description%"></meta>
		<meta name="keywords" content="%keywords%"></meta>

		<title>%title%</title>

		<link rel="shortcut icon" href="/favicon.ico" />

		<script type="text/javascript" src="/js/cross-domain.php"></script>
		%system includeQuickEditJs()%
		%system includeEditInPlaceJs()%

		%data getRssMeta(%pid%)%
		%data getAtomMeta(%pid%)%		
	</head>
	
	<body>
		%content menu()%
		%core navibar('default', 1, 0, 1)%
		<h1 umi:element-id="%pid%" umi:field-name="h1">%header%</h1>
		%system listErrorMessages()%
		%content%
	</body>
</html>
