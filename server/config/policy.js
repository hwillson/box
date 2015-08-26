BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.framing.allowAll();

var trusted = [
  'http://*.octonary.com',
  'http://*.thefeed.com',
  'https://*.thefeed.com',
  'http://*.googleapis.com',
  'https://*.googleapis.com',
  'http://fonts.gstatic.com',
  'https://fonts.gstatic.com'
];

_.each(trusted, function (origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
