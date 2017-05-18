(function () {
  if (!document.addEventListener) return

  var options = INSTALL_OPTIONS
  var isPreview = INSTALL_ID === 'preview'
  var element

  function fbAsyncInit () {
    window.FB.init({
      appId: '819140248140343',
      xfbml: false,
      version: 'v2.9'
    })
    window.FB.AppEvents.logPageView()

    updateElement()
  }

  function loadFacebookScript () {
    var rootId = 'fb-root'
    var sdkId = 'facebook-jssdk'

    if (document.getElementById(rootId) && document.getElementById(sdkId)) return

    var root = document.createElement('div')
    root.id = rootId
    document.body.appendChild(root)

    var script = document.createElement('script')
    script.id = sdkId
    script.src = '//connect.facebook.net/en_US/sdk.js'

    var firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)

    window.fbAsyncInit = fbAsyncInit
  }

  function getCanonicalURL () {
    var url = isPreview ? INSTALL.proxy.originalURL.raw : document.location.href
    if (!document.head) return url

    var link = document.head.querySelector('link[rel="canonical"][href]')
    if (!link) return url

    return link.getAttribute('href')
  }

  function updateElement () {
    element = INSTALL.createElement(options.location, element)

    if (!element || !element.parentNode) return

    var attributes = {
      class: 'fb-like',
      app: 'like-button',
      'cf-env': isPreview ? 'preview' : 'production',
      'data-href': options.advanced.urlType === 'automatic' ? getCanonicalURL() : options.advanced.url,
      'data-layout': options.layout,
      'data-action': options.advanced.action,
      'data-share': options.advanced.share,
      'data-show-faces': options.advanced.showFaces
    }

    Object.keys(attributes).forEach(function (key) {
      element.setAttribute(key, attributes[key])
    })

    window.FB.XFBML.parse()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFacebookScript)
  } else {
    loadFacebookScript()
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      if (element && element.parentNode) {
        element.parentNode.removeChild(element)
        element = null
      }

      updateElement()
    }
  }
}())
