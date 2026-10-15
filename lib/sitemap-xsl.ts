export const SITEMAP_XSL = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap - Optimark</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #444444;
            background: #ffffff;
            font-size: 13px;
            line-height: 1.5;
          }
          a {
            color: #2271b1;
            text-decoration: none;
          }
          a:hover {
            color: #135e96;
            text-decoration: underline;
          }
          .header-banner {
            background-color: #3b71ca;
            color: #ffffff;
            padding: 32px 20px;
          }
          .header-banner-inner {
            max-width: 960px;
            margin: 0 auto;
          }
          .header-banner h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #ffffff;
          }
          .header-banner p {
            font-size: 13.5px;
            line-height: 1.5;
            color: #ffffff;
            margin-bottom: 4px;
            max-width: 900px;
          }
          .header-banner a {
            color: #ffffff;
            text-decoration: underline;
          }
          .header-banner a:hover {
            color: #e0e7ff;
          }
          .content-wrap {
            max-width: 960px;
            margin: 0 auto;
            padding: 24px 20px;
          }
          .back-nav-container {
            margin-bottom: 18px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px 16px;
          }
          .back-nav-links {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .back-nav-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 6px;
            background-color: #ffffff;
            border: 1px solid #cbd5e1;
            color: #1e293b;
            text-decoration: none;
            font-size: 12.5px;
            font-weight: 600;
            transition: all 0.15s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          }
          .back-nav-btn:hover {
            background-color: #3b71ca;
            border-color: #3b71ca;
            color: #ffffff;
            text-decoration: none;
          }
          .breadcrumbs {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #64748b;
            flex-wrap: wrap;
          }
          .breadcrumbs a {
            color: #2563eb;
            text-decoration: none;
          }
          .breadcrumbs a:hover {
            text-decoration: underline;
          }
          .breadcrumbs .sep {
            color: #94a3b8;
          }
          .breadcrumbs .current {
            color: #0f172a;
            font-weight: 600;
          }
          .expl {
            font-size: 13.5px;
            color: #444444;
            margin-bottom: 16px;
          }
          .expl strong {
            color: #111827;
            font-weight: 700;
          }
          .table-responsive {
            overflow-x: auto;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          thead th {
            background-color: #3b71ca;
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
            padding: 10px 14px;
            border: none;
          }
          thead th:last-child {
            width: 220px;
          }
          tbody tr {
            border-bottom: 1px solid #e5e7eb;
            transition: background-color 0.1s ease;
          }
          tbody tr:nth-child(even) {
            background-color: #f9fafb;
          }
          tbody tr:hover {
            background-color: #f3f4f6;
          }
          tbody td {
            padding: 10px 14px;
            font-size: 13px;
            color: #374151;
            vertical-align: middle;
          }
          tbody td.url-cell a {
            word-break: break-all;
          }
          tbody td.date-cell {
            color: #6b7280;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12.5px;
            white-space: nowrap;
          }
          .footer-note {
            margin-top: 24px;
            font-size: 12px;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <div class="header-banner-inner">
            <h1>XML Sitemap</h1>
            <p>This XML Sitemap is generated by Optimark. It is what search engines like Google use to crawl and re-crawl posts/pages/products/images/archives on your website.</p>
            <p><a href="https://sitemaps.org/" target="_blank" rel="noopener noreferrer">Learn more about XML Sitemaps.</a></p>
          </div>
        </div>

        <div class="content-wrap">
          <xsl:variable name="parent" select="(sitemap:sitemapindex/@parent | sitemap:urlset/@parent)[1]" />
          <xsl:if test="$parent">
            <xsl:variable name="parentTitle" select="(sitemap:sitemapindex/@parent-title | sitemap:urlset/@parent-title)[1]" />
            <xsl:variable name="bcParent" select="(sitemap:sitemapindex/@breadcrumb-parent | sitemap:urlset/@breadcrumb-parent)[1]" />
            <xsl:variable name="bcCurrent" select="(sitemap:sitemapindex/@breadcrumb-current | sitemap:urlset/@breadcrumb-current)[1]" />

            <div class="back-nav-container">
              <div class="back-nav-links">
                <a href="{$parent}" class="back-nav-btn">&#8592; Back to <xsl:value-of select="$parentTitle"/></a>
                <xsl:if test="$parent != '/sitemap.xml'">
                  <a href="/sitemap.xml" class="back-nav-btn" style="color:#64748b;">&#8593; Root Index</a>
                </xsl:if>
              </div>
              <div class="breadcrumbs">
                <a href="/sitemap.xml">Root Index</a>
                <xsl:if test="$bcParent">
                  <span class="sep">&#8250;</span>
                  <a href="{$parent}"><xsl:value-of select="$bcParent"/></a>
                </xsl:if>
                <xsl:if test="$bcCurrent">
                  <span class="sep">&#8250;</span>
                  <span class="current"><xsl:value-of select="$bcCurrent"/></span>
                </xsl:if>
              </div>
            </div>
          </xsl:if>
          <xsl:apply-templates />
          <p class="footer-note">Optimark AI — Dynamic XML Sitemap</p>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap Index Template -->
  <xsl:template match="sitemap:sitemapindex">
    <p class="expl">
      This XML Sitemap Index file contains <strong><xsl:value-of select="count(sitemap:sitemap)"/></strong> sitemaps.
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Sitemap</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:sitemap">
            <xsl:variable name="sitemapUrl">
              <xsl:value-of select="sitemap:loc"/>
            </xsl:variable>
            <tr>
              <td class="url-cell">
                <a href="{$sitemapUrl}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td class="date-cell">
                <xsl:choose>
                  <xsl:when test="sitemap:lastmod">
                    <xsl:choose>
                      <xsl:when test="contains(sitemap:lastmod, 'T')">
                        <xsl:value-of select="concat(substring(sitemap:lastmod, 1, 10), ' ', substring(sitemap:lastmod, 12, 5), ' +00:00')"/>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="sitemap:lastmod"/>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:otherwise>-</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- Urlset Template -->
  <xsl:template match="sitemap:urlset">
    <p class="expl">
      This XML Sitemap contains <strong><xsl:value-of select="count(sitemap:url)"/></strong> URLs.
    </p>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:url">
            <xsl:variable name="itemUrl">
              <xsl:value-of select="sitemap:loc"/>
            </xsl:variable>
            <tr>
              <td class="url-cell">
                <a href="{$itemUrl}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td class="date-cell">
                <xsl:choose>
                  <xsl:when test="sitemap:lastmod">
                    <xsl:choose>
                      <xsl:when test="contains(sitemap:lastmod, 'T')">
                        <xsl:value-of select="concat(substring(sitemap:lastmod, 1, 10), ' ', substring(sitemap:lastmod, 12, 5), ' +00:00')"/>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:value-of select="sitemap:lastmod"/>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:when>
                  <xsl:otherwise>-</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>
`;
