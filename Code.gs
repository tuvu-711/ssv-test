// 7-Eleven Vietnam Dashboard Server
// Serves HTML dashboards via ?page= parameter

var PAGE_REGISTRY = {
  'test': 'test-dashboard'
};

function doGet(e) {
  var page = e.parameter.page || 'index';

  if (page === 'index') {
    return buildIndex();
  }

  var filename = PAGE_REGISTRY[page];
  if (!filename) {
    return HtmlService.createHtmlOutput('<h1>404 — Page not found</h1><p><a href="?">← Back to index</a></p>')
      .setTitle('Not Found');
  }

  return HtmlService.createHtmlOutputFromFile(filename)
    .setTitle('7-Eleven VN — ' + page)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function buildIndex() {
  var baseUrl = ScriptApp.getService().getUrl();
  var pages = Object.keys(PAGE_REGISTRY);
  var html = '<h1>7-Eleven Vietnam Dashboards</h1><ul>';
  pages.forEach(function(key) {
    html += '<li><a href="' + baseUrl + '?page=' + key + '" target="_top">' + key + '</a></li>';
  });
  html += '</ul>';
  return HtmlService.createHtmlOutput(html)
    .setTitle('7-Eleven VN — Dashboard Index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
