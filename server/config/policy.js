BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.framing.allowAll();

var trusted = [
  'http://*.octonary.com'
];

_.each(trusted, function (origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});