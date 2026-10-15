<?xml version="1.0" encoding="UTF-8"?>
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
            text-decoration: underline;
          }
          .header-banner {
            background-color: #3b71ca;
            color: #ffffff;
            padding: 28px 20px;
            margin-bottom: 24px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
            font-size: 13px;
            color: #f0f4f8;
            margin-bottom: 6px;
            max-width: 800px;
          }
          .header-banner a {
            color: #ffffff;
            text-decoration: underline;
            font-weight: 600;
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
          .table-responsive {
            width: 100%;
            overflow-x: auto;
            margin-bottom: 24px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }
          thead th {
            background-color: #3b71ca;
            color: #ffffff;
            font-weight: 600;
            padding: 10px 14px;
            border: none;
          }
          tbody td {
            padding: 9px 14px;
            border-bottom: 1px solid #eef2f6;
          }
          tbody tr:nth-child(even) {
            background-color: #f8fafc;
          }
          tbody tr:hover {
            background-color: #f1f5f9;
          }
          .url-cell {
            word-break: break-all;
          }
          .date-cell {
            white-space: nowrap;
            color: #64748b;
            font-size: 12px;
          }
          .footer-note {
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #eef2f6;
            color: #94a3b8;
            font-size: 12px;
            text-align: center;
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
          <div id="sitemap-navigation" class="back-nav-container">
            <div class="back-nav-links">
              <a href="/sitemap.xml" id="sitemap-back-btn" class="back-nav-btn">&#8592; Back to Sitemap Index</a>
            </div>
            <div class="breadcrumbs" id="sitemap-breadcrumbs">
              <a href="/sitemap.xml">Sitemap Index</a>
            </div>
          </div>
          <xsl:apply-templates />
          <p class="footer-note">Optimark AI — Dynamic XML Sitemap</p>
        </div>
        <script type="text/javascript">
          <![CDATA[
          (function() {
            function initNav() {
              var path = window.location.pathname || '';
              var nav = document.getElementById('sitemap-navigation');
              if (!nav) return;

              var isRoot = path === '/sitemap.xml' || path === '' || path === '/';
              var parentUrl = '/sitemap.xml';
              var parentLabel = 'Main Sitemap Index';
              var crumbs = [{ label: 'Root Index', url: '/sitemap.xml' }];

              if (isRoot) {
                nav.innerHTML = '<div class="back-nav-links">' +
                  '<a href="/" class="back-nav-btn">&#8592; Back to Optimark Home</a>' +
                '</div>' +
                '<div class="breadcrumbs"><span class="current">Root Sitemap Index (/sitemap.xml)</span></div>';
                return;
              }

              if (path.indexOf('category-sitemap') !== -1) {
                if (path === '/category-sitemap.xml') {
                  parentUrl = '/sitemap.xml';
                  parentLabel = 'Main Sitemap Index';
                  crumbs.push({ label: 'Category Sitemaps', url: '/category-sitemap.xml' });
                } else {
                  parentUrl = '/category-sitemap.xml';
                  parentLabel = 'Category Sitemap Index';
                  crumbs.push({ label: 'Category Sitemaps', url: '/category-sitemap.xml' });
                  var isEn = path.indexOf('en-') !== -1;
                  crumbs.push({ label: isEn ? 'English Category Sitemap' : 'Indonesian Category Sitemap', url: path });
                }
              } else if (path.indexOf('article-sitemap') !== -1 || path.indexOf('blog-sitemap') !== -1) {
                if (path === '/article-sitemap.xml' || path === '/blog-sitemap.xml') {
                  parentUrl = '/sitemap.xml';
                  parentLabel = 'Main Sitemap Index';
                  crumbs.push({ label: 'Article Sitemaps', url: '/article-sitemap.xml' });
                } else {
                  parentUrl = '/article-sitemap.xml';
                  parentLabel = 'Article Sitemap Index';
                  crumbs.push({ label: 'Article Sitemaps', url: '/article-sitemap.xml' });
                  var isEn = path.indexOf('en-') !== -1;
                  crumbs.push({ label: isEn ? 'English Article Sitemap' : 'Indonesian Article Sitemap', url: path });
                }
              } else if (path.indexOf('page-sitemap') !== -1) {
                if (path === '/page-sitemap.xml') {
                  parentUrl = '/sitemap.xml';
                  parentLabel = 'Main Sitemap Index';
                  crumbs.push({ label: 'Page Sitemaps', url: '/page-sitemap.xml' });
                } else {
                  parentUrl = '/page-sitemap.xml';
                  parentLabel = 'Page Sitemap Index';
                  crumbs.push({ label: 'Page Sitemaps', url: '/page-sitemap.xml' });
                  var isEn = path.indexOf('en-') !== -1;
                  crumbs.push({ label: isEn ? 'English Page Sitemap' : 'Indonesian Page Sitemap', url: path });
                }
              } else if (path.indexOf('tag-sitemap') !== -1) {
                parentUrl = '/sitemap.xml';
                parentLabel = 'Main Sitemap Index';
                crumbs.push({ label: 'Tag Sitemap', url: '/tag-sitemap.xml' });
              }

              var crumbHtml = crumbs.map(function(c, i) {
                if (i === crumbs.length - 1) {
                  return '<span class="current">' + c.label + '</span>';
                }
                return '<a href="' + c.url + '">' + c.label + '</a><span class="sep">&#8250;</span>';
              }).join(' ');

              nav.innerHTML = '<div class="back-nav-links">' +
                '<a href="' + parentUrl + '" class="back-nav-btn">&#8592; Back to ' + parentLabel + '</a>' +
                (parentUrl !== '/sitemap.xml' ? '<a href="/sitemap.xml" class="back-nav-btn" style="color:#64748b;">&#8593; Root Index</a>' : '') +
              '</div>' +
              '<div class="breadcrumbs">' + crumbHtml + '</div>';
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initNav);
            } else {
              initNav();
            }
          })();
          ]]>
        </script>
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
