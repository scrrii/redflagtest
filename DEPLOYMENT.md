# Deployment Guide

## Routing Configuration for Single Page Applications

This application uses client-side routing to handle different URL paths. When deploying to various hosting platforms, you need to ensure that all routes redirect to the main `index.html` file so that the client-side router can handle them properly.

We've included configuration files for various hosting platforms:

### Vercel

The `vercel.json` file contains the necessary configuration for Vercel deployments:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify

For Netlify, you can use either:

1. The `_redirects` file:
   ```
   /* /index.html 200
   ```

2. Or the `netlify.toml` file:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Apache Server

The `.htaccess` file contains the necessary configuration for Apache servers:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### IIS (Windows Server)

The `web.config` file contains the necessary configuration for IIS:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Firebase Hosting

The `firebase.json` file contains the necessary configuration for Firebase hosting:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Heroku

The `static.json` file contains the necessary configuration for Heroku deployments:

```json
{
  "root": "./",
  "clean_urls": false,
  "routes": {
    "/**": "index.html"
  }
}
```

## Troubleshooting Mobile App Webviews

When sharing links that open in mobile apps like Instagram, TikTok, or WhatsApp, the webview might not properly handle client-side routing. Here are some additional steps you can take:

1. **Use meta tags for proper redirects**:
   
   Add the following meta tags to your `index.html` file's `<head>` section:
   
   ```html
   <meta name="fragment" content="!">
   <meta name="robots" content="all">
   ```

2. **Test with different URL formats**:
   
   Some mobile apps handle URLs differently. Try using:
   - Clean URLs without hash fragments
   - URLs with query parameters instead of path segments

3. **Consider server-side rendering**:
   
   For more complex applications, consider using a framework that supports server-side rendering (SSR) like Next.js or Nuxt.js.

4. **Use a service worker**:
   
   Implement a service worker to handle navigation requests and ensure they're properly routed to your application.

## Contact Support

If you continue to experience issues with routing on specific platforms, contact the platform's support team for assistance with SPA (Single Page Application) routing configuration.