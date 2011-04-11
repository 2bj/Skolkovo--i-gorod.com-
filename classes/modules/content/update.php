<?php
 $vd45153f50c9ab174af98d76093f238bf = "./tinymce/jscripts/tiny_mce/tinymce_custom.js";if (!is_file($vd45153f50c9ab174af98d76093f238bf)) {$v4a5a0fbc6000431e1ecfa16269b3a556 = <<<END

			// index/reference page for all available core configuration options in TinyMCE:
			// http://wiki.moxiecode.com/index.php/TinyMCE:Configuration

			window.mceCustomSettings = {
				convert_fonts_to_spans : false,	// convert <font ..> tags to <span style="color:red,...">
				cleanup : true,					// remove all unknown tags and attributes

				extended_valid_elements : "script[type=text/javascript|src|languge|lang],map[*],area[*],umi:*[*],input[*]", // extend tags and atributes
				content_css : "/css/cms/style.css", // enable custom CSS
				theme_advanced_styles : "Table=my-table;Table Cell=my-table-cell;Table Row=my-table-row" // custom css classes
			}

END;  file_put_contents($vd45153f50c9ab174af98d76093f238bf, $v4a5a0fbc6000431e1ecfa16269b3a556);}?>