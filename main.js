let start

let myEvents = [
  {seconds: "00:05", vibrationPattern: 200, text: "test4"},
  {seconds: "02:20", vibrationPattern: [400,200,400], text: "go to door 1"},
  {seconds: "02:28", vibrationPattern: 600, text: "ilay gets out 1"},
  {seconds: "02:49", vibrationPattern: [400,200,400], text: "get ready"},
  {seconds: "02:53", vibrationPattern: 600, text: "ilay gets in 1"},
  {seconds: "04:00", vibrationPattern: [400,200,400], text: "say look at me"},
  {seconds: "04:06", vibrationPattern: [400,200,400], text: "go to door 2"},
  {seconds: "04:13", vibrationPattern: 600, text: "ilay gets out 2, dies"},
  {seconds: "05:47", vibrationPattern: [400,200,400], text: "get ready"},
  {seconds: "06:01", vibrationPattern: 600, text: "open door, ilay gets in 2"}
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
  let nextEvent = myEvents[currentEventIndex]
  let nextGoalInSeconds = timetringToSeconds(nextEvent.seconds)
  if (seconds >= nextGoalInSeconds) {
    window.navigator.vibrate(nextEvent.vibrationPattern)
    let textElm = document.querySelector(".text")
    if (textElm) textElm.innerText = nextEvent.text
    currentEventIndex++
  }
  // let notification = new Notification("Secoonds: " + seconds, {
  //   vibrate: 200
  // });
  console.log("Tick! " + seconds);
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