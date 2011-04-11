<?php
// Set correct site timezone                                                                                                                                                                                                                                                        
ini_set('date.timezone','Europe/Moscow');
echo 'date.timezone = ' . ini_get('date.timezone') . "\n";

echo 'date.sunset_zenith = ' . ini_get('date.sunset_zenith') ."\n";
//$timezone = $ini->variable("TimeZoneSettings", "TimeZone");
//if ( $timezone )
//{
//    putenv( "TZ=$timezone" );
//}
?>
