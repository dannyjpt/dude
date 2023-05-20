var socket = io();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

var txt = "";

recognition.addEventListener("result", (e) => {

  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
    txt = text.toLocaleLowerCase();
});

recognition.addEventListener("end", () => {
  console.log(txt);

if (txt.includes("lili") || txt.includes("lily")) {
  console.log("Listening");
    //socket.emit("voicetochat", txt.replace("lili", "").replace("lily", ""));
    //socket.emit("voicetochat", "tell me what is six times twelve?");
}else
if (txt.includes("open my youtube")) {
  responsiveVoice.speak("opening youtube");
  console.log("opening youtube");
  //window.open("https://www.youtube.com/channel/UCdxaLo9ALJgXgOUDURRPGiQ");
}
  txt = "";
  recognition.start();
});

recognition.start();

socket.on('voiceinit', (data) => {
  responsiveVoice.speak(data);
});