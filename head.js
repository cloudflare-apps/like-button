(function(d){
  if (!document.addEventListener) return;

  var options, init, initFacebook;

  options = INSTALL_OPTIONS;

  init = function() {
    var el, url, button;

    el = Eager.createElement(options.location);

    if (!el || !el.parentNode) return;

    if (options.advanced.urlType === 'automatic')
      url = getCanonicalURL();
    else
      url = options.advanced.url

    button = document.createElement('div');
    button.className = 'fb-like';
    button.setAttribute('data-href', url);
    button.setAttribute('data-layout', options.layout);
    button.setAttribute('data-action', options.advanced.action);
    button.setAttribute('data-share', options.advanced.share);
    button.setAttribute('data-show-faces', options.advanced.showFaces);

    el.appendChild(button);

    initFacebook();
  };

  getCanonicalURL = function() {
    var url, head, link;

    url = document.location.href;

    head = document.getElementsByTagName('head')[0];
    if (!head) return url;

    link = head.querySelector('link[rel="canonical"][href]');
    if (!link) return url;

    return link.getAttribute('href');
  };

  initFacebook = function() {
    var rootId, sdkId, root, firstScript, script;

    rootId = 'fb-root'
    sdkId = 'facebook-jssdk';
    if (document.getElementById(rootId) && document.getElementById(sdkId)) return;

    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);

    script = document.createElement('script');
    script.id = sdkId;
    script.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";

    firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();
})();
