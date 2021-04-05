const start = document.timeline.currentTime

function frame(time) {
  const elapsed = time - start
  const seconds = Math.round(elapsed / 1000)
  updateUI(seconds)
  const targetNext = (seconds + 1) * 1000 + start
  setTimeout(
    _=> requestAnimationFrame(frame),
    targetNext - performance.now()
  )
}

function updateUI(seconds) {
  if (seconds%3 != 0) return
  window.navigator.vibrate(200)
  console.log("Tick! " + seconds);
}

frame(start)