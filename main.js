let start

let myEvents = [
  {seconds: "00:05", vibrationPattern: 200, text: "test2"},
  {seconds: "01:48", vibrationPattern: [400,200,400], text: "Proud to present, go to door 1"},
  {seconds: "02:01", vibrationPattern: [400,200,400], text: "get ready to exit 1"},
  {seconds: "02:04", vibrationPattern: 600, text: "exit 1"},
  {seconds: "02:59", vibrationPattern: [400,200,400], text: "get ready to enter 1"},
  {seconds: "03:02", vibrationPattern: 600, text: "enter 1"},
  {seconds: "03:38", vibrationPattern: [400,200,400], text: "walk to door 2"},
  {seconds: "03:46", vibrationPattern: [400,200,400], text: "exit 2"},
  {seconds: "04:19", vibrationPattern: 600, text: "enter 2"},
  {seconds: "05:12", vibrationPattern: [400,200,400], text: "walk to door 3"},
  {seconds: "05:18", vibrationPattern: [600], text: "exit 3"},
  {seconds: "07:10", vibrationPattern: 600, text: "enter 3"}
]

/*



*/

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
  let nextEvent = myEvents[currentEventIndex]
  let nextGoalInSeconds = timetringToSeconds(nextEvent.seconds)
  if (seconds >= nextGoalInSeconds) {
    window.navigator.vibrate(nextEvent.vibrationPattern)
    let textElm = document.querySelector(".text")
    if (textElm) textElm.innerText = nextEvent.text
    currentEventIndex++
  }
  // console.log("Tick! " + seconds);
}


function play() {
  start = document.timeline.currentTime
  frame(start)
  hideElm(".play-btn")
  showElm(".counter")
  showElm(".text")
}

function timetringToSeconds(timeString) {
  let timeArray = timeString.split(":")
  let minutes = +timeArray[0]
  let seconds = +timeArray[1]
  let totalSeconds = minutes*60 + seconds
  return totalSeconds
}

function hideElm(selector) {
  let elm = document.querySelector(selector)
  elm.classList.add("hidden")
}

function showElm(selector) {
  let elm = document.querySelector(selector)
  elm.classList.remove("hidden")
}