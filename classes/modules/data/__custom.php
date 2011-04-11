<?php
	abstract class __custom_data {
        /**
        * @desc Format the number in desired way
        * @param Number  $_Number    Number to format
        * @param Integer $_Decimals	 Number of decimal signs
        * @param Char    $_DecPoint  Delimiter of the decimals
        * @param Char    $_Separator Separator between thousand groups
        * @return String Formatted number	
        */
        function numberformat($_Number, $_Decimals = 2, $_DecPoint = '.', $_Separator = ' ') {
            die( strval($_Number) );
            return number_format($_Number, $_Decimals, $_DecPoint, $_Separator);
        }
	};
?>