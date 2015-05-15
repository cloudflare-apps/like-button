(function(d){
  if (!document.addEventListener) return;

  var options, init, initFacebook;

  options = INSTALL_OPTIONS;

  init = function() {
    var el, url, button, previewStyle;

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

    if (Eager.installs.preview) {
      previewStyle = document.createElement('style');
      el.setAttribute('eager-app', 'like-button');
      previewStyle.innerHTML = '[eager-app="like-button"] .fb-like > span, [eager-app="like-button"] .fb-like > span > iframe { height: auto !important; width: auto !important }';
      el.appendChild(previewStyle);
    }

    el.appendChild(button);

    initFacebook();
  };

  getCanonicalURL = function() {
    var url, head, link;

    if (Eager.installs.preview && Eager.proxy && Eager.proxy.originalURL && Eager.proxy.originalURL.raw)
      url = Eager.proxy.originalURL.raw;
    else
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
    script.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0&appId=819140248140343";

    firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else
    init();
})();
