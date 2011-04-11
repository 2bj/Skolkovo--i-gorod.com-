<?php
	$FORMS = Array();

	$FORMS['body'] = <<<END
<html>
	<head>
		<style type="text/css">
			body {
				background-color:	#FFF;

				margin-top:		42px;
				margin-bottom:		42px;
				margin-left:		57px;
				margin-right:		157px;
			}

			body, p, td {
				font-family:		Arial;
				font-size:		13px;

			}

			h1, h2 {
				font-family:		Trebuchet MS;
				color:			#004F9C;
				font-weight:		normal;
			}

			h1 {
				font-size:		20px;
			}

			h2 {
				margin-top:		30px;
				font-size:		17px;
			}

			hr {
				border:			0px;
				height:			1px;

				background-color:	#D1D1D1;
			}

			a, a:visited, a:hover {
				color:			#0072E1;
				text-decoration:	underline;
			}

			div.notice {
				background-color:	#FFE7D6;

				padding-left:		17px;
				padding-right:		17px;
				padding-top:		13px;
				padding-bottom:		14px;

				margin-left:		1px;
			}


			table {
				border:			#D1D1D1 1px solid;
			}

			tr.header {
				background-color:	#E8F1FA;
				color:			#004F9C;
			}

			td.header {
				border:			0px;
			}

			td {
				padding:		8px;
				border-top:		#D1D1D1 1px solid;
			}


			ul {
				padding-left:		22px;
			}

		</style>
	</head>

	<body>
		<h2>%header%</h2>
		%content%
	</body>
</html>

END;
?>
