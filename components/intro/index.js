var html = require('choo/html')
var Component = require('choo/component')
var { vw, vh } = require('../base')

var MOUNT = Date.now()

module.exports = class Intro extends Component {
  update () {
    return false
  }

  load (el) {
    if (vw() > 1000) return

    document.documentElement.style.setProperty('--vh', vh() + 'px')

    var performance = window.performance
    var last = el.querySelector('.js-last')
    var init = performance ? performance.timing.domInteractive : MOUNT

    // fallback in case animation is cancelled
    var timeout = setTimeout(detach, 6000 - (Date.now() - init))

    last.addEventListener('animationend', onanimationend)
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    function onanimationend (event) {
      if (event.target !== last) return
      clearTimeout(timeout)
      detach()
    }

    function detach () {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      last.removeEventListener('animationend', onanimationend)
    }

    function preventScroll (event) {
      event.preventDefault()
    }
  }

  createElement () {
    return html`
      <div class="Intro" id="intro">
        <div class="Intro-1">
          <svg class="Intro-figure" viewBox="0 0 458 312" preserveAspectRatio="none" width="458" height="312"><path d="M94.93 311.114v.326H0v-4.457h19V170.484H0v-4.457h190.417v62.957h38.305v77.999h17.765V170.484h-17.765v-4.457H456.89V311.44h-38.86V170.484h-26.093v78h-38.86v-78h-30.534V311.44H190.417v-79.114H95.056v78.788h-.125zm-37.625-83.245h57.056v-57.385H57.305v57.385zM438.57 4.457v136.499h18.32v4.457H228.722v-4.457h18.876V4.457h-18.876V31.2h-76.055V4.457H57.736v66.3h94.93v4.457h-57.18v70.199H0v-4.457h19.43V4.457H0V0h458v4.457h-19.43zm-38.86 0h-76.057v136.499h76.056V4.457z" fill="#FFF" fill-rule="evenodd"/></svg>
        </div>
        <div class="Intro-2 js-last">
          <h1 class="Intro-words">
            <span class="Intro-word">Form</span><span class="Intro-word">stipendiet</span> <span class="Intro-word Intro-word--year">2019</span>
          </h1>
          <svg class="Intro-logo" width="364" height="244" viewBox="0 0 364 244">
            <g fill="#FFF203" fill-rule="evenodd">
              <g class="Intro-slice">
                <path d="M119.5 43.4l-8.6-.2-9.8.2c-.2-.3-.2-.9 0-1 2-.2 3.5-.5 4.4-.7 2-.3 2.2-1.7 2.3-4.9.1-3-.2-22.3-.4-33.3 0-.2-.2-.5-.4-.5h-9.6c-1.2.1-2 .7-2.7 1.9-.9 1.3-1.7 3.8-2.5 6-.1.1-1 0-1.1-.2A94 94 0 0 0 92 .2s.2-.3.4-.2c1.3.6 3.6 1 5.4 1h25.4c2.5 0 4 0 6-.8.1 0 .3 0 .3.2-.6 2-1 6.7-1.2 10.3 0 .2-1.1.2-1.2 0-.2-1.8-.6-4.2-1.2-5.6-.5-1.3-1.3-1.8-2.7-2a171 171 0 0 0-10.1 0c-.2 0-.4.4-.4.6.2 9.8.7 29.8.9 33.3.3 4 1 4.4 2.5 4.8 1 .3 1.7.4 3.4.6.1.1 0 1-.1 1M208.4 33.2c-1 2.7-2.5 5.4-3.7 6.5-1 1-1.7 1.7-6 1.7-4.5 0-7-.1-8.4-.4-.8-.2-1.5-.8-1.6-2.4-.2-4.1-.5-13.4-.4-15.3 0 0 .1-.6.3-.6l10.7.1c2.2.2 2.6 1.6 2.8 2.4l.5 2.4c.2.3 1 .3 1.2 0l-.2-5.8c0-2.2.2-5 .4-6.2h-1.3c-.1.9-.3 1.7-.6 2.4-.4 1.3-.8 2.3-2.9 2.5-2 .1-9 .2-10.7 0-.1 0-.3-.2-.3-.5 0-1.5-.2-13-.1-16 0-.3.2-.9.6-1 1.1-.2 8.6 0 10.3 0 2.6.2 3.2 1.2 3.7 2.7.3.9.6 2.3.8 4.4h1.2c.1-2.6.5-7 1-9.1l-.1-.2c-1.3.2-4.7.3-7.3.3h-13.2c-3.7 0-6.2-.3-7.8-.3-.2.2-.3.9 0 1l3 .6c1.8.4 2.1 1 2.3 3.6a530.5 530.5 0 0 1 .5 31.8c-.1 2.7-.7 3.5-2.2 4-1.2.3-2.2.4-4.2.4s-2.7-.3-3.6-.6c-1.3-.4-1.6-1.2-1.8-3.2a440.6 440.6 0 0 1-.5-32.2c0-2.8.5-3.2 1.9-3.7.8-.3 1.8-.3 3-.6.2-.2.2-.8 0-1l-7.6.2c-3.6 0-6.5-.3-8-.3-.2.3-.1 1 0 1.1 1.3.1 2.3.3 3.5.6 1 .3 1.4 1.2 1.5 2.4.2 2.4.3 11.6.4 15.1l-.3.4h-22.7c-.2-.1-.4-.4-.4-.6 0-6.4-.2-11.2 0-14.2 0-2.3.5-2.8 1.9-3.2l2.7-.5c.2 0 .2-.8 0-1-1.9 0-3.5.2-7.5.2l-8.3-.3c-.2.3-.2 1 0 1.1 1.7.3 2.6.3 3.7.6 1 .3 1.6 1 1.8 3l.4 16c.1 6 .3 12.8.2 15 0 3.2-.2 4.6-2 5.2-1 .2-2 .5-3.4.6-.2.2-.2 1 0 1.1l8.4-.2 8 .2c.1 0 .3-.9.1-1.1-2-.2-2.7-.4-3.7-.7-1.6-.5-1.6-1.8-1.8-4.1l-.4-14.2s.1-.4.3-.4c.6-.2 6.3-.2 12-.2l10.7.1c.2 0 .3.2.3.5.1 4.3.3 12.8.2 15 0 2.5-.4 3.1-1.8 3.5-1.2.3-2.1.4-3.3.5-.1.2-.2.8 0 1.1a204.5 204.5 0 0 1 16.2-.2h9.1c9.6 0 12.7.2 16.8.2 3.4 0 3.7 0 4-.8a49 49 0 0 0 2.7-8.9l-1-.5"/>
              </g>
              <g class="Intro-slice">
                <path d="M37 52.5c-.3 0-.4.5-.4.8-.2 2 0 11.3.1 17.9l.3.3c2.5.3 6.6.4 8.3-.2 2.1-.9 4.8-3.2 4.7-8.8 0-6.4-3.7-10.3-11-10.3-.6 0-1.5 0-2 .3zm-11.4-2l7.2.2 10.7-.1c7.9 0 11.8 4.6 11.9 10.4.1 5.8-3.8 9.2-7.8 10.8a117.5 117.5 0 0 0 11.8 16.5c3.2 3.1 4.2 3.4 7.4 3.7 0 .2 0 1-.2 1-2.8.3-7.9 0-10.2-1-1-.4-2.1-1.3-3.2-2.5-2.7-3-7.4-11-10.1-14.7-.5-.8-1.2-1.2-1.7-1.2H37l-.2.5.3 13.5c.2 3 .7 3.4 2 3.8l3.5.6c.2.2.2.9 0 1l-8.2-.1c-4.6 0-7 .2-8 .2-.3 0-.3-1 0-1l3.1-.6c1.6-.4 2-1.3 2.1-3.9a979 979 0 0 0-.6-32.4c0-1.8-.6-2.9-2.2-3.1-.8-.3-2-.5-3.2-.5v-1z"/>
                <path d="M91.4 89.4c4.2-3.7 5.7-9.7 5.6-16.1-.1-7-2.6-14.8-8.3-18.8a14.8 14.8 0 0 0-15.9-1.3c-5 3-7 9.6-7 16.7.2 6.9 2.8 15.2 9 19.5 2.4 1.6 5.4 2.6 9 2.6 3 0 5.8-1 7.6-2.6zM66 87.7a24.5 24.5 0 0 1-2.6-29 22.5 22.5 0 0 1 18.1-9.2c13.8 0 21 10.1 21.3 21.5 0 5.7-1.2 10.1-3.9 14a21 21 0 0 1-17.6 9.1c-6.2 0-11.8-2.6-15.3-6.4z"/>
                <path d="M128.6 81.6c-.1-7.2-5-10.9-12.4-10.9l-3 .1-.2.3c0 4.4.2 14.4.5 17.3.1.7.6 1.4 1.1 1.9 1.3 1 4 1.3 5.2 1.3 6.3 0 9-3.5 8.8-10zm-15.2-29.1c-.3.1-.5.7-.5 1v15.1c0 .2.2.4.3.4.6.1 1.5.2 3.5.2 4 0 5.4-.4 6.2-1 2.2-1.4 3-3.9 3-6.7-.1-6-3.4-9.3-10.3-9.3-1 0-2 .1-2.2.3zm-11.6-2l7.8.2 10-.1c4 0 11.5 1 11.7 9.3 0 4-2.4 7.4-7 9.2-.1 0-.1.2 0 .2 5.8 1.3 10.1 4.7 10.2 10.7.1 5.4-2.8 9.5-8 11.7-3 1.3-6.7 1.6-10 1.6-3.1 0-10-.4-14.5-.2V92c1.5-.2 2.8-.2 4-.6 1.3-.3 1.8-1.1 1.9-3.7l-.1-16.1c-.2-9.8-.2-13.8-.4-16.5-.2-1.9-.8-2.6-1.7-3-1-.3-2.7-.4-3.8-.5-.3-.1-.3-1 0-1z"/>
                <path d="M133.6 50.5l7.9.2h13.2c2.5 0 5.9 0 7.2-.2l.2.2c-.6 2.2-1 6.5-1 9-.3.2-1 .2-1.2 0-.2-2-.6-3.4-.9-4.3-.5-1.6-1-2.5-3.6-2.7-1.8-.1-9.2-.2-10.3 0-.5.1-.7.7-.7 1l.1 16c0 .2.2.5.3.5 1.8.2 8.7 0 10.7 0 2.1-.2 2.6-1.2 3-2.5l.5-2.4h1.3c-.2 1.3-.4 4-.4 6.2 0 2.7.2 4.5.3 5.8-.2.2-1 .2-1.2 0l-.5-2.4c-.3-.8-.6-2.2-2.8-2.4h-10.8c-.2 0-.3.4-.3.5l.4 15.3c.1 1.5.9 2.2 1.6 2.4 1.4.2 4 .4 8.5.4 4.3 0 5-.8 6-1.7 1.1-1 2.6-3.8 3.6-6.5.2 0 .9.3 1 .5a49 49 0 0 1-2.6 9c-.4.6-.7.7-4 .7-4.2 0-7.2-.2-16.8-.2l-9.5.2c-.1-.2-.2-1 0-1.1 1.8-.2 3.2-.2 4.4-.6 1.6-.4 2.1-1.2 2.3-4a802.5 802.5 0 0 0-.6-31.7c-.2-2.5-.5-3.2-2.2-3.6a15 15 0 0 0-3.1-.5c-.2-.2-.2-1 0-1"/>
                <path d="M176.3 71.5l-.3-.3c-.1-6.6-.3-15.9 0-18-.1-.2 0-.7.2-.7.6-.2 1.5-.3 2.1-.3 7.3 0 11 4 11 10.3.1 5.6-2.6 8-4.7 8.8-1.7.6-5.8.5-8.3.2zM234 50c-2.1.7-3.6.8-6 .8h-25c-1.8 0-4.1-.4-5.5-1l-.3.1c0 2.7-.6 7.7-1 10.5 0 .2 1 .4 1.1.2.7-2 1.6-4.6 2.5-6 .6-1 1.5-1.7 2.7-1.8h9.2c.1 0 .4.2.4.5.2 11 .5 30.3.4 33.3 0 4.2-3.8 5.5-6.4 5.5-2.6 0-4.2-.6-7.4-3.7-3.4-3.2-9.5-12.2-11.9-16v-.5c4-1.6 8-5 7.9-10.8-.1-5.8-4-10.4-12-10.4l-10.6.1-7.2-.2v1c1.1.1 2.3.3 3.2.6 1.6.2 2.1 1.3 2.2 3a596.2 596.2 0 0 1 .6 32.5c0 2.6-.5 3.5-2 3.9l-3.2.6c-.3 0-.3 1 0 1 1 0 3.4-.2 8-.2l8.1.2c.3-.2.3-1 .1-1.1l-3.5-.6c-1.4-.4-1.8-.9-2-3.8a411 411 0 0 1-.3-13.5c0-.1 0-.4.2-.4 1 0 3.4-.2 4.4 0 .5 0 1.2.3 1.7 1 2.6 3.8 7.4 11.9 10.1 14.8 1 1.2 2.2 2 3.2 2.6 2.3 1 7.4 1.2 10.2 1l9.7-.2 8.5.2c.2 0 .3-1 .2-1-1.7-.3-2.4-.3-3.4-.6-1.5-.4-2.3-.9-2.5-4.8l-1-33.3c0-.2.2-.6.4-.7l10.2.1c1.4.1 2.1.7 2.7 2 .6 1.4 1 3.8 1.1 5.6.1.2 1.2.2 1.3 0a65 65 0 0 1 1.2-10.4h-.3z"/>
              </g>
              <g class="Intro-slice">
                <path d="M144.1 132.6c-1 2.7-2.5 5.4-3.6 6.4-1 1-1.7 1.7-6 1.7-4.5 0-7 0-8.5-.4-.7-.1-1.5-.8-1.6-2.4l-.4-15.3s.1-.5.3-.5h10.8c2.2.3 2.5 1.7 2.8 2.5l.5 2.4c.1.2 1 .2 1.2 0l-.3-5.8c0-2.3.2-5 .4-6.2-.1-.2-1-.2-1.3 0 0 .8-.3 1.6-.5 2.4-.4 1.2-.9 2.3-3 2.4-2 .2-9 .2-10.7 0l-.3-.5c0-1.5-.2-13 0-16-.1-.3.1-.8.6-.9 1-.2 8.5-.1 10.3 0 2.5.1 3.1 1.1 3.6 2.6.3 1 .7 2.4.9 4.5l1.1-.1c.2-2.6.5-6.9 1.1-9l-.2-.3c-1.3.2-4.7.3-7.3.3h-25.2l-7.5-.2c-.2.1-.1.8 0 1 2 .3 2.8.5 3.9.8 1.8.5 1.7 2.3 1.3 4.5a445 445 0 0 1-7.4 27.5l-.2.1c-2.4-5.6-10.4-27-11.7-32.2-.4 0-2.1.2-2.6 0a688 688 0 0 1-10.4 32c-2.5-7.8-7-22.2-8.7-29-.6-1.8-.3-2.6.6-3 .6-.3 1.1-.3 2.8-.7.2-.1.1-.9 0-1l-7.3.2c-3.6 0-5.8-.3-8.5-.3-.3.2-.3 1-.1 1.1 1.3.2 2 .4 3 .7 2 .5 2.7 1.4 4 5 2.4 6.5 8.7 27.7 10.8 36.1h2.9c1.6-5.8 8-25 10.4-32.2.1-.2.2-.2.3-.2 3.3 8.7 9.9 26.4 11.7 32.5h2.6c1.8-7.1 8-28.6 10.7-36.5.9-2.8 1.6-4 3-4.6 1.8-.8 3-.5 3.7-.3 1.2.3 2 1.1 2.2 3.7a533.8 533.8 0 0 1 .6 31.8c-.2 2.7-.7 3.5-2.3 3.9-1.2.3-2.6.4-4.4.5-.2.3-.1 1 0 1.2 2.9 0 5-.3 9.5-.3 9.6 0 12.6.3 16.7.3 3.4 0 3.7-.1 4.1-.8a49 49 0 0 0 2.6-9c-.1-.1-.8-.5-1-.4"/>
                <path d="M144 100.2l8.4.2 7.2-.2c.1.2.2.8.1 1l-2.9.5c-1.5.5-1.7 1.4-1.8 3.7V121l.5 16.4c.2 2 .3 3.3 2.2 3.8.9.3 2.1.4 3.4.5.2.3 0 1 0 1.2-2 0-4.4-.3-7.5-.3-4 0-5.4.3-8.8.3-.2-.3-.1-1 0-1.2 1 0 2.3-.2 3-.4 1.7-.4 2-1.3 2.1-3.2a610.6 610.6 0 0 0-.5-32.8c-.2-1.6-.3-3-1.8-3.3-.7-.3-2-.5-3.6-.7-.2-.1-.1-.9 0-1M163 100.2c1.7 0 3.9.2 8 .2l7.7-.2c.3 0 .3 1 0 1l-2.8.6c-1.6.4-1.7 1.3-1.7 3l.1 15.6c0 6.2.3 14.5.5 17.8 0 1.1.6 1.8 1.2 2 1.4.6 8.8.6 11.5.5 1.5 0 2.6-.6 3.8-2a29 29 0 0 0 4-7.5c.3-.1 1.1 0 1.2.4-.4 2.4-2 8.5-3 10.4-.4.5-1 .8-2.8.8l-19-.3c-3 0-6.7.3-8.4.3v-1.2l3.6-.4c1.4-.4 2-1 2.2-3.1.1-2 .1-4.3-.1-19l-.3-13.1c-.2-3-.4-3.7-2.4-4.2l-3.3-.6v-1"/>
              </g>
              <g class="Intro-slice">
                <path d="M95.8 149.9l7.8.2h15c3.3 0 5-.2 6.1-.5.2 0 .2.2.3.3-.5 1.7-.8 5.5-1 9.4 0 .1-1 .2-1.1 0a16 16 0 0 0-1.2-5c-.4-1.4-1.5-2-3-2.1-2-.2-10-.2-11.1 0-.6 0-.8.7-.8 1.1-.1 3 0 12 .1 16.7 0 .1.2.3.4.3 1.6 0 8.5 0 10.5-.2 2.5 0 3.1-.9 3.5-1.8.4-.9.7-2.1.9-3.1.1-.2 1-.1 1.2 0-.2 1.4-.5 4-.4 6.6l.2 5.7c0 .2-1 .2-1 .2l-.8-3c-.5-1.2-1.4-2-2.4-2-2.4-.2-10.4-.3-11.8-.2l-.2.4c0 4.2.2 10.7.4 13.8 0 2.6.4 3.7 2.3 4.2l3.7.4c.1.3.2 1 0 1.2-2.1 0-5-.3-8.6-.3-3.4 0-6 .3-8.3.3-.2-.2-.1-1 0-1.2 1.4 0 2.3-.2 3.1-.4 1.8-.4 2-1.3 2.2-4a721.9 721.9 0 0 0-.6-31.5c-.2-2.3-.2-3.2-1.7-3.8-1-.3-1.9-.5-3.7-.7v-1M142.5 172.4h-10.2c-.2 0-.3-.1-.3-.4 1-3 4-12.5 5.2-15.7h.2l5.3 15.7c0 .2 0 .4-.2.4zm66.8 19l-3.4-.5c-2-.5-2.5-1.7-2.7-4-.3-5-1.3-28-1.2-32.3 0-1.2 0-2.4 2-3 1-.2 1.9-.4 4-.6v-1.1c-3 0-4.8.2-10.9.2 0 1.3-.6 2.6-1.2 4a1271.7 1271.7 0 0 1-13.4 28.5c-1-1.8-8.9-18-13.7-28.6-.8-1.5-1.2-2.5-1.4-3.9-7 0-9.6-.2-11.5-.2-.2 0-.3.9 0 1 2 .3 3.2.6 4.3 1 1.7.6 2 2 2 3.2-.2 5.8-1.3 25.9-1.9 30.4-.4 3.8-.9 5.6-3 5.6-1.8 0-2.5-1.8-3.9-5-2.1-5.3-10.2-28.9-11.7-33l-.9-3H137c0 .8-.4 2-.8 3.2-1.5 4.4-7.6 22.4-11.4 32.1-2 4.8-2.7 5.3-7.4 6-.2 0-.2 1 0 1l6.5-.2c3 0 6.4.3 7.9.3.1-.2.2-1 0-1.2-1.4 0-2-.3-2.9-.5-2.2-.5-2.2-1.6-2-2.8.1-1.8 2.8-9.2 4-12.7 0-.2.4-.5.6-.5h11.7l.5.4c1.3 3.6 4 10.6 4.7 13.6.3.8.3 1.4-.7 1.9-.9.3-2 .4-3.4.6v1.2c1.7-.2 5.4-.3 8.2-.3H162c3.2 0 5.4.3 7 .3.1-.1.2-1 0-1.2-2-.2-2.7-.3-3.6-.6-2-.5-2.4-2-2.4-5a660.8 660.8 0 0 1 1.1-29.2c2 4.5 13.9 30.1 15.7 36.2h1.3c2-6.5 13.4-31 15.3-35.4h.3c.2 5.7.9 25.7.9 30.1 0 1.9-.3 3-1.8 3.3-.9.3-1.6.4-3.2.6-.2.2-.1 1 0 1.2 1.6-.1 4.5-.3 8.2-.3 3.8 0 7 .3 8.4.3v-1.2zM210 149.9l8.3.2 7.2-.2c.2.2.3.8.1 1l-2.9.5c-1.5.5-1.7 1.4-1.8 3.7l.1 15.5.4 16.4c.2 2 .4 3.3 2.2 3.8 1 .3 2.2.4 3.4.5.2.3.1 1 0 1.2-2 0-4.4-.3-7.5-.3-4 0-5.4.3-8.8.3-.2-.3-.1-1 0-1.2 1 0 2.3-.2 3-.4 1.8-.4 2-1.3 2.1-3.2V169l-.5-14c-.2-1.7-.2-3-1.8-3.4-.7-.3-1.9-.5-3.6-.7-.2-.1-.1-.9 0-1M228 149.9c1.5 0 3.8.2 8 .2l7.6-.2c.2 0 .3 1 0 1l-2.8.6c-1.6.4-1.7 1.3-1.7 3l.1 15.6c0 6.2.3 14.5.5 17.8 0 1.1.6 1.8 1.2 2 1.4.6 8.8.6 11.5.5 1.5 0 2.6-.6 3.8-2 1-1.3 2.9-4.4 4-7.5.3-.1 1.1 0 1.2.4-.5 2.4-2 8.5-3 10.4-.4.5-1.1.8-2.8.8l-19-.3c-3 0-6.7.3-8.4.3v-1.2l3.6-.4c1.4-.4 2-1 2.2-3.1.1-2 .1-4.3-.1-19l-.3-13.1c-.2-3-.4-3.7-2.4-4.2l-3.3-.6v-1"/>
                <path d="M250.6 149.9l8.4.2 6.7-.2c.3.1.3.9.1 1l-2.2.5c-1 .3-1.3.8-.5 2.4 1.9 3.8 8 15 9.4 17.4h.3c2.2-4.1 7-12.7 8.4-16.6.7-1.8.3-2.7-1.6-3.1l-3-.6c-.1-.2 0-1 .2-1l7 .2 6.7-.2c.2.1.2.9 0 1l-2.8.6c-2.2.5-3.1 2-4.3 4.1-2.8 4.7-8.2 14.7-9.3 17.4-.3.5-.5 1.6-.5 2.2l.4 11.1c.1 2.8.4 4.2 2.5 4.7l3.2.5v1c-1.6 0-5.4-.3-8.8-.3-4 0-6.5.3-8.6.3-.2-.2-.1-.9 0-1l3.9-.6c2-.4 2.2-1.9 2.2-4v-10c0-1.1-.2-2.6-.7-3.4-1.5-3.4-5.8-11.4-8.5-16-3-5.3-3.8-5.6-5.7-6-.9-.4-1.7-.4-3-.6l.1-1"/>
              </g>
              <g class="Intro-slice">
                <path d="M0 199.6l7.9.2h15c3.3 0 5-.2 6.1-.5.2 0 .2.1.3.3-.5 1.6-.8 5.4-1 9.4 0 .1-1 .2-1.1 0a16 16 0 0 0-1.2-5c-.4-1.4-1.5-2-3-2.1-2-.2-10-.3-11.1 0-.6 0-.8.6-.8 1.1-.1 3 0 12 .1 16.7 0 .1.2.3.4.3 1.6 0 8.5 0 10.5-.2 2.5 0 3.1-.9 3.5-1.8.4-.9.7-2.1.9-3.2.1-.1 1 0 1.2.1-.2 1.4-.5 4-.4 6.6l.2 5.6c0 .2-1 .3-1 .2l-.8-3c-.5-1.2-1.4-1.9-2.4-2-2.4-.1-10.4-.2-11.8-.1l-.2.4c0 4.2.2 10.7.4 13.8 0 2.5.4 3.7 2.3 4.1 1 .2 2 .4 3.7.5.1.2.2 1 0 1.1l-8.6-.2-8.3.2c-.2-.1-.1-1 0-1l3.1-.5c1.8-.4 2-1.4 2.2-4a717 717 0 0 0-.6-31.6c-.2-2.3-.2-3-1.7-3.8l-3.7-.6v-1M62.3 238.4c4.2-3.7 5.7-9.7 5.5-16.1 0-7-2.6-14.7-8.2-18.8a14.8 14.8 0 0 0-16-1.3c-5 3.1-7 9.6-6.9 16.7.1 7 2.8 15.2 9 19.5 2.4 1.7 5.3 2.6 9 2.6 3 0 5.7-1 7.6-2.6zm-25.5-1.7a24.5 24.5 0 0 1-2.6-29 22.5 22.5 0 0 1 18.2-9.2c13.7 0 21 10.2 21.2 21.6.1 5.7-1.2 10-3.8 14a21 21 0 0 1-17.7 9c-6.1 0-11.8-2.6-15.3-6.4zM188.4 236.7c-2.9 3-6.7 3.8-10 3.8-3.5 0-6.6-.4-8.2-1.5-1-.6-1.3-1.6-1.4-2.5-.2-2.2-.3-9.6-.4-16-.1-6.1-.3-15.5-.2-17.5 0-1 .5-1.3.8-1.5.6-.2 2.2-.3 3.6-.3 5.5 0 9.8.8 13 3 5.5 3.8 7.8 9.9 7.9 16.8.1 7.9-1.9 12.4-5 15.7zm4.5-32.5a22.1 22.1 0 0 0-14.8-4.7c-5.4 0-8.4.3-13 .3h-13l-8.1-.2c-.1.1-.2.9 0 1 1.6.2 3 .4 4.1.7 2 .6 2.4 1.8 2.6 3.8.5 4.5.6 20.3.7 29.4l-.2.2a3050.7 3050.7 0 0 1-28.7-35h-21.1c-.2 0-.2.8 0 1l2.8.4c1.8.4 3 1 3.2 5.1.4 7 .4 16 .2 21.2-.4 10.5-5.6 13-11.8 13-4.7 0-8.9-1.8-11-5.1-1.5-2-2.2-4.3-2.5-9-.2-3.7-.5-15.9-.4-21.3.1-2.7.5-3.4 1.7-3.8l3-.6v-1l-7.5.2-8-.2c-.1.1-.2.9 0 1l3.4.6c1.5.5 1.7 1.8 1.7 3.7.3 5.5.4 21.5 1 25.8 1 8 6.3 12.5 16.4 12.5 7.6 0 14.6-3.1 15.9-13.2.7-4.5.6-8.6.6-23.5.1-3.8.7-4.8 2.3-5.5l1.4-.2c1.4 0 2.7.6 3.9 1.7a5 5 0 0 1 1.6 3.3V236c-.2 3.4-1.2 4.1-2.7 4.5-.9.3-1.7.4-3 .5-.2.2-.2 1 0 1.1l7-.2 7.8.2c.2 0 .2-1 0-1l-3.7-.6c-1.5-.4-2.5-1.3-2.7-4.6-.2-3.7-.6-21.7-.6-28.7h.3c3 3.8 24.8 30 28.2 35h4c-.1-2.1-.3-6-.3-9.1 0-9-.4-22.8 0-28.2 0-1.7.4-3.2 2.2-3.7.7-.2 1.1-.4 2.1-.4s2 .2 2.6.4c1.7.5 2 1.2 2.2 3.8.2 2.5.3 10.3.4 14.6 0 7 .2 13.2 0 17.4 0 2.6-1 3-2 3.4-1 .3-2.4.5-3.8.6-.2 0-.2 1 0 1.1h5c6.1 0 8.8.3 13 .3 6.1 0 11-1.4 15.4-4.4 4.4-3 9-8.7 8.9-18.1a20.4 20.4 0 0 0-6.7-15.7z"/>
                <path d="M216.9 222c-.5.2-3 .2-4.7.2l-5.6-.1c-.2 0-.2-.1-.2-.4l5-15.7h.3l5.3 15.7-.1.4zm44-23c-2.1.6-3.6.8-6 .8h-25.5c-1.7 0-4-.4-5.4-1-.2-.1-.4 0-.4 0 0 2.8-.5 7.7-1 10.6.1.2 1 .3 1.2.2.7-2.2 1.5-4.6 2.4-6 .7-1.1 1.5-1.7 2.7-1.8 1.5-.2 8.3-.2 9.6 0 .2 0 .5.2.5.4.2 11 .4 30.3.3 33.4 0 3.1-.4 4.6-2 5-1.4.4-2 .3-3.3.3-4 0-4.4-1-6.3-5-2.1-5.4-10.1-29-11.7-33.2l-.8-3h-3.9c0 .8-.4 2-.8 3.3-1.5 4.4-7.5 22.4-11.4 32-2 5-2.7 5.4-7.4 6-.2.2-.2 1 0 1.1l6.5-.2 7.9.2.1-1-3-.6c-2.2-.5-2.1-1.6-2-2.8.2-1.9 2.8-9.2 4-12.7.1-.2.4-.5.6-.5h11.7l.5.4c1.3 3.6 4 10.6 4.7 13.6.3.8.3 1.3-.7 1.8-.9.4-2 .5-3.4.7v1.1l8.2-.2h15.6l8.6.2c.2 0 .3-.9.1-1-1.6-.2-2.3-.3-3.4-.6-1.4-.4-2.2-.9-2.5-4.7-.2-3.6-.7-23.6-.8-33.4 0-.2 0-.5.3-.6h10.2c1.3.2 2.1.7 2.7 2 .6 1.4 1 3.9 1.1 5.6 0 .3 1.2.3 1.3 0 .2-3.6.6-8.2 1.2-10.3l-.3-.2zM263.2 199.6l8.4.2 7.3-.2c.1.2.2.8 0 1l-2.9.5c-1.5.5-1.7 1.4-1.8 3.7l.1 15.5.4 16.4c.2 2 .4 3.3 2.2 3.8l3.4.5c.2.2.1 1 0 1.1l-7.5-.2-8.7.2c-.3-.2-.2-.9 0-1l3-.6c1.7-.3 2-1.3 2-3.1a610.5 610.5 0 0 0-.4-32.8c-.3-1.6-.3-3-1.8-3.4l-3.6-.6c-.2-.1-.2-.9 0-1"/>
                <path d="M309.7 238.4c4.2-3.7 5.7-9.7 5.6-16.1-.1-7-2.6-14.7-8.3-18.8a14.8 14.8 0 0 0-15.9-1.3c-5 3.1-7 9.6-7 16.7.2 7 2.8 15.2 9 19.5 2.4 1.7 5.4 2.6 9 2.6 3 0 5.8-1 7.6-2.6zm-25.4-1.7a24.5 24.5 0 0 1-2.6-29 22.5 22.5 0 0 1 18.1-9.2c13.8 0 21 10.2 21.3 21.6 0 5.7-1.2 10-3.9 14a21 21 0 0 1-17.6 9c-6.2 0-11.8-2.6-15.3-6.4z"/>
                <path d="M317.3 199.6l7 .2h3.2a3061.5 3061.5 0 0 0 28.7 35l.2-.3c-.1-9-.3-25-.8-29.4-.1-2-.6-3.2-2.5-3.8l-4.2-.7v-1l8 .2 6.5-.2c.1.1.2.9 0 1l-2.7.6c-1.7.5-2.1 2-2.2 3.7-.3 5.4 0 19.1 0 28.2l.3 9.2h-4c-3.4-5-25-31.3-28.2-35.1 0-.1-.2 0-.2 0 0 7 .3 25 .5 28.7.2 3.3 1.2 4.2 2.8 4.6l3.7.5c.2.2.1 1 0 1.1l-7.8-.2-7 .2c-.2-.1-.2-1 0-1l3-.6c1.5-.4 2.4-1.1 2.6-4.5.1-3.3.2-16 0-30.2a5 5 0 0 0-1.6-3.3c-1.4-1.4-2.9-1.5-5.4-1.9l.1-1"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    `
  }
}
