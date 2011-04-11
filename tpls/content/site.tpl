<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" xmlns:umi="http://www.umi-cms.ru/TR/umi">
	<head>
		%system includeQuickEditJs()%
		%system includeEditInPlaceJs()%
		%data getRssMeta(%pid%)%
		%data getAtomMeta(%pid%)%
	</head>
	
	<body id="body">
		<div class="main">
			<div class="wrapper">
				
				<div class="clear1 pad">
					<div id="content">
						<div class="clear">
						%system listErrorMessages()%
						<div xmlns:umi="umi" umi:element-id="%pid%" umi:field-name="content">%content%</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	
	</body>
</html>
