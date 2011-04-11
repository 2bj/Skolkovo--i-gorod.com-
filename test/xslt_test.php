<?php

   $xslDoc = new DOMDocument();
   $xslDoc->load("collection.xsl");

   $xmlDoc = new DOMDocument();
   $xmlDoc->load("collection.xml");

   $proc = new XSLTProcessor();
   $proc->importStylesheet($xslDoc);
   echo $proc->transformToXML($xmlDoc);

?>

