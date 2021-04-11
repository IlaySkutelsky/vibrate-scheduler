const start = document.timeline.currentTime

let myEvents = [
  {seconds: 5, vibrationPattern: [200,200,200], text: "hey hey ho ho hopa hopa"},
  {seconds: 10, vibrationPattern: 200, text: "2"},
  {seconds: 15, vibrationPattern: 400, text: "3"},
  {seconds: 25, vibrationPattern: [200,200,200], text: "no no 4"},
  {seconds: 30, vibrationPattern: 400, text: "mmm 5"}
]

let currentEventIndex = 0

function frame(time) {
  const elapsed = time - start
  const seconds = Math.round(elapsed / 1000)
  updateTime(seconds)
  handleEvent(seconds)
  const targetNext = (seconds + 1) * 1000 + start
  setTimeout(
    _=> requestAnimationFrame(frame),
    targetNext - performance.now()
  )
}

function updateTime(seconds) {
  let counterElm = document.querySelector(".counter")
  let minutesText = Math.floor(seconds/60).toString().padStart(2, 0)
  let secondsText = (seconds%60).toString().padStart(2, 0)
  if (counterElm) counterElm.innerText = minutesText + ":" + secondsText
}

function handleEvent(seconds) {
  if (currentEventIndex >= myEvents.length) return
  let myEvent = myEvents[currentEventIndex]
  if (seconds === myEvent.seconds) {
    window.navigator.vibrate(myEvent.vibrationPattern)
    let textElm = document.querySelector(".text")
    if (textElm) textElm.innerText = myEvent.text
    currentEventIndex++
  }
  // let notification = new Notification("Secoonds: " + seconds, {
  //   vibrate: 200
  // });
  console.log("Tick! " + seconds);
}

frame(start)
