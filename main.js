const start = document.timeline.currentTime

let myEvents = [
  {seconds: 5, vibrationPattern: [200,200,200], text: "hey hey ho ho hopa hopa"},
  {seconds: 10, vibrationPattern: 200, text: "2"},
  {seconds: 15, vibrationPattern: 400, text: "3"},
  {seconds: 25, vibrationPattern: [200,200,200], text: "no no 4"}
]

let currentEventIndex = 0

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
  if (seconds === myEvents[currentEventIndex].seconds) {
    window.navigator.vibrate(myEvents[currentEventIndex].vibrationPattern)
    let textElm = document.querySelector(".text")
    if (textElm) textElm.innerText = myEvents[currentEventIndex].text
    currentEventIndex++
  }
  // let notification = new Notification("Secoonds: " + seconds, {
  //   vibrate: 200
  // });
  console.log("Tick! " + seconds);
}

frame(start)
