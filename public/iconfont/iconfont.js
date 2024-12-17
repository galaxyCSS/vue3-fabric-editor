;(window._iconfont_svg_string_4784801 =
  '<svg><symbol id="icon-shangyibu" viewBox="0 0 1024 1024"><path d="M886.99999991 886.99999991h-93.75000018v-93.75000018c0-182.81250027-145.31250037-328.12499981-328.12499982-328.12499982H183.87500019V371.37499973h281.24999972c234.37499963 0 421.875 187.50000037 421.875 421.875v93.75000018z"  ></path><path d="M427.625 718.24999991L132.3125 418.24999981 427.625 122.93749982l70.31249973 65.62500045-234.37499964 229.68749955 234.37499964 234.37500045z"  ></path></symbol><symbol id="icon-xiayibu" viewBox="0 0 1024 1024"><path d="M230.75000027 886.99999991H137.00000009v-93.75000018c0-234.37499963 187.50000037-421.875 421.875-421.875h281.24999973v93.75000018h-281.24999973c-182.81250027 0-328.12499981 145.31250037-328.12499982 328.12499982v93.75000018z"  ></path><path d="M596.375 718.24999991L526.06250027 652.62500027l234.37499964-234.37500045-234.37499964-229.68749955L596.375 122.93749982 891.6875 418.24999981z"  ></path></symbol></svg>'),
  ((n) => {
    var t = (e = (e = document.getElementsByTagName('script'))[e.length - 1]).getAttribute('data-injectcss'),
      e = e.getAttribute('data-disable-injectsvg')
    if (!e) {
      var i,
        o,
        d,
        c,
        a,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e)
        }
      if (t && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          )
        } catch (t) {
          console && console.log(t)
        }
      }
      ;(i = function () {
        var t,
          e = document.createElement('div')
        ;(e.innerHTML = n._iconfont_svg_string_4784801),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e))
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener('DOMContentLoaded', o, !1), i()
              }),
              document.addEventListener('DOMContentLoaded', o, !1))
          : document.attachEvent &&
            ((d = i),
            (c = n.document),
            (a = !1),
            r(),
            (c.onreadystatechange = function () {
              'complete' == c.readyState && ((c.onreadystatechange = null), l())
            }))
    }
    function l() {
      a || ((a = !0), d())
    }
    function r() {
      try {
        c.documentElement.doScroll('left')
      } catch (t) {
        return void setTimeout(r, 50)
      }
      l()
    }
  })(window)
