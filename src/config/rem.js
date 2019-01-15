(function(doc, win) {
  var docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function() {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }
    docEl.style.fontSize = 10 * (clientWidth / 320) + 'px'
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
