Notification.requestPermission()

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
  let counterElm = document.querySelector(".counter")
  if (counterElm) counterElm.innerText = seconds
  if (seconds%3 != 0) return
  // window.navigator.vibrate(200)
  let notification = new Notification("Hi there!", {
    vibrate: 200
  });
  console.log("Tick! " + seconds);
}

frame(start)
