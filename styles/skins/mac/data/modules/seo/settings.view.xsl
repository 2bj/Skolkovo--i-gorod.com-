<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "ulang://common/seo">

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="data[@type = 'settings' and @action = 'view']">
        <iframe style="border: 0px none; width: 770px; height: 700px;" border="0"
                src="/classes/modules/seo/seo.html"></iframe>
    </xsl:template>

</xsl:stylesheet>