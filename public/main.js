//const socket = io.connect("http://localhost:3000", { forceNew: true });;

//var participante = document.getElementById("participante").textContent;
var participante = "x";

var data;
const house_names = ["Carnegie", "Disney", "Ford", "Jobs"];
var lista_participantes = [{"chair":"CHAIR 1","name":"","color":"","logo":"","light":"0"},{"chair":"CHAIR 2","name":"","color":"","logo":"","light":"0"},{"chair":"CHAIR 3","name":"","color":"","logo":"","light":"0"},{"chair":"CHAIR 4","name":"","color":"","logo":"","light":"0"}];
var counter_participante = 0;

var houses = [[[{x:6,y:9},{x:11,y:10},{x:10,y:8},{x:12,y:8}],[{tope:0,total:0}],[]],[[{x:10,y:5},{x:11,y:7},{x:11,y:11},{x:6,y:6}],[{tope:0,total:0}],[]],[[{x:10,y:6},{x:11,y:8},{x:10,y:9},{x:11,y:8}],[{tope:0,total:0}],[]],[[{x:9,y:8},{x:7,y:10},{x:7,y:8},{x:9,y:8}],[{tope:0,total:0}],[]]];

let xx = Math.floor(Math.random() * 4);
let yy = Math.floor(Math.random() * 4);
var rposXR = houses[xx][0][yy].x;
var rposYR = houses[xx][0][yy].y;
var randomCasa;

var audio = document.createElement("audio"); 
var audio2 = document.createElement("audio"); 
audio.src = "ruleta.mp3";
audio2.src = "wl.mp3";


//send_initial_ligths();

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  console.log(transcript);
  participante = transcript;
  if(lista_participantes[0].name == ""){
    lista_participantes[0].name = participante;
    document.getElementById("ic1").value = participante.toUpperCase();
    counter_participante = 1;
  }else if(lista_participantes[1].name == ""){
    lista_participantes[1].name = participante;
    document.getElementById("ic2").value = participante.toUpperCase();
    counter_participante = 2;
  }else if(lista_participantes[2].name == ""){
    lista_participantes[2].name = participante;
    document.getElementById("ic3").value = participante.toUpperCase();
    counter_participante = 3;
  }else if(lista_participantes[3].name == ""){
    lista_participantes[3].name = participante;
    document.getElementById("ic4").value = participante.toUpperCase();
    counter_participante = 4;
  }
  
  
}



$('#start-record-btn').on('click', function(e) {
  //socket.emit('apagar', 1);
  recognition.start();
});

$('#pause-record-btn').on('click', function(e) {
  location.reload();
});

$('#canvas').on('click', function(e) {
  recognition.stop();
  house_names.sort(()=> Math.random() - 0.5);
  asignar_casas();
  Girar();
});


$("#ic1").focusout(function(){
  lista_participantes[0].name = $(this).val().toUpperCase();
});

$("#ic2").focusout(function(){
  lista_participantes[1].name = $(this).val().toUpperCase();
});

$("#ic3").focusout(function(){
  lista_participantes[2].name = $(this).val().toUpperCase();
});

$("#ic4").focusout(function(){
  lista_participantes[3].name = $(this).val().toUpperCase();
});




//const options = ["Silla 3","Silla 4","Silla 1","Silla 2"]

// Initialize Variables
var inicioAngulo = -3.14159;
var tiemoutGirar = null;
var optRuleta;
var GirarArcStart = 10;
var GirarTime = 0;
var GirarTimeTotal = 0;
var arc = Math.PI / 2;


function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

const isPlaying = (audio) => {
  return !audio.paused;
};

dibujarRuletaInicial();
// Dibujamos la ruleta.
function dibujarRuletaInicial() {

  // Obtenemos el canvas desde el Id Canvas.
  var canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 0;
    optRuleta = canvas.getContext("2d");
    optRuleta.clearRect(0,0,500,500);
    //optRuleta.strokeStyle = "red";
    //optRuleta.lineWidth = 8;
    optRuleta.font = '16px Verdana, Arial';
    for(var i = 0; i < 4; i++) {
      var angle = inicioAngulo + i * arc;
      if(i == 0){
         optRuleta.fillStyle = "#162239";
      }else if(i == 1){
         optRuleta.fillStyle = "#2b3d5f";
      }else if(i == 2){
         optRuleta.fillStyle = "#162239";
      }else if(i == 3){
         optRuleta.fillStyle = "#2b3d5f";
      }
      optRuleta.beginPath();
      optRuleta.arc(250, 250, outsideRadius, angle, angle + arc, false);
      optRuleta.arc(250, 250, insideRadius, angle + arc, angle, true);
      optRuleta.stroke();
      optRuleta.fill();
      optRuleta.save();
      optRuleta.shadowOffsetX = -1;
      optRuleta.shadowOffsetY = -1;
      optRuleta.fillStyle = "white";
      optRuleta.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      optRuleta.rotate(angle + arc / 2 + Math.PI / 2);
      var text = lista_participantes[i].chair;
      optRuleta.fillText(text, - optRuleta.measureText(text).width / 2, 0);
      optRuleta.restore();
    }

    optRuleta.lineWidth = 25;
    optRuleta.strokeStyle = "white";
    optRuleta.beginPath();
    optRuleta.arc(250, 250, 208, angle, 3* (angle + arc));
    optRuleta.stroke();
    optRuleta.lineWidth = 0.1;
    optRuleta.stroke();
   
    /*/ Flecha, color y "movimiento".
    optRuleta.fillStyle = "white";
    optRuleta.beginPath();
    
    optRuleta.lineTo(250 + 8, 235 - (outsideRadius - 10));
    optRuleta.lineTo(250 + 18, 235 - (outsideRadius - 10));
    optRuleta.lineTo(250 + 0, 235 - (outsideRadius - 26));
    optRuleta.lineTo(250 - 18, 235 - (outsideRadius - 10));
    optRuleta.fill();*/
  }

}

function Girar() { 
  inicioAngulo = 0;
  dibujarRuletaInicial();
  GirarAngleStart = rposXR;
  GirarTime = 0;
  GirarTimeTotal = rposYR * 1000;
  rotarRuleta();
}

// Dibujamos la ruleta.
function dibujarRuleta() {
  // Obtenemos el canvas desde el Id Canvas.
  var canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 0;
    optRuleta = canvas.getContext("2d");
    optRuleta.clearRect(0,0,500,500);
    //optRuleta.strokeStyle = "white";
    optRuleta.lineWidth = 0;
    optRuleta.font = '16px Verdana, Arial';
    for(var i = 0; i < 4; i++) {
      var angle = inicioAngulo + i * arc;
      
      optRuleta.fillStyle = house_color(house_names[i]);
 
      optRuleta.beginPath();
      optRuleta.arc(250, 250, outsideRadius, angle, angle + arc, false);
      optRuleta.arc(250, 250, insideRadius, angle + arc, angle, true);
      optRuleta.stroke();
      optRuleta.fill();
      optRuleta.save();
      optRuleta.shadowOffsetX = -1;
      optRuleta.shadowOffsetY = -1;
      optRuleta.fillStyle = "white";
      optRuleta.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      optRuleta.rotate(angle + arc / 2 + Math.PI / 2);
      var text = lista_participantes[i].name;
      optRuleta.fillText(text, - optRuleta.measureText(text).width / 2, 0);
      optRuleta.font = '20px Verdana, Arial';
      text = house_names[i].toUpperCase();
      optRuleta.fillText(text, - optRuleta.measureText(text).width / 2, 50);
      optRuleta.restore();
    }

    optRuleta.lineWidth = 25;
    optRuleta.strokeStyle = "white";
    optRuleta.beginPath();
    optRuleta.arc(250, 250, 208, angle, 3* (angle + arc));
    optRuleta.stroke();
    optRuleta.lineWidth = 0.1;
    optRuleta.stroke();
    /*/ Flecha, color y "movimiento".
    optRuleta.fillStyle = "white";
    optRuleta.beginPath();
    
    optRuleta.lineTo(250 + 8, 235 - (outsideRadius - 10));
    optRuleta.lineTo(250 + 18, 235 - (outsideRadius - 10));
    optRuleta.lineTo(250 + 0, 235 - (outsideRadius - 26));
    optRuleta.lineTo(250 - 18, 235 - (outsideRadius - 10));
    optRuleta.fill();*/
  }
  console.log(house_names);
  console.log(lista_participantes);
  document.getElementById("lc1").style.backgroundImage = lista_participantes[0].logo;
  document.getElementById("lc1").style.visibility = "visible";
  document.getElementById("cc1").style.backgroundColor = lista_participantes[0].color;

  document.getElementById("lc2").style.backgroundImage = lista_participantes[1].logo;
  document.getElementById("lc2").style.visibility = "visible";
  document.getElementById("cc2").style.backgroundColor = lista_participantes[1].color;

  document.getElementById("lc3").style.backgroundImage = lista_participantes[2].logo;
  document.getElementById("lc3").style.visibility = "visible";
  document.getElementById("cc3").style.backgroundColor = lista_participantes[2].color;

  document.getElementById("lc4").style.backgroundImage = lista_participantes[3].logo;
  document.getElementById("lc4").style.visibility = "visible";
  document.getElementById("cc4").style.backgroundColor = lista_participantes[3].color;

  
  send_initial_users();

}
var aux = 1;
// Función que realiza el giro de la ruleta.
function rotarRuleta() {
   
  GirarTime =  GirarTime + 10;
  if(GirarTime >= GirarTimeTotal) {
    detenerRotacionRuleta();
    return;
  }
  
  var GirarAngle = GirarAngleStart - mathOperations(GirarTime, 0, GirarAngleStart, GirarTimeTotal);
  inicioAngulo += (GirarAngle * Math.PI / 180);
  console.log(inicioAngulo);
  
  if(inicioAngulo.toFixed() == aux){
    audio.play();
    aux = aux + 1;
  }
  //console.log(aux);
  dibujarRuletaInicial();
  tiemoutGirar = setTimeout('rotarRuleta()', 10);
}

// Detener la ruleta.
function detenerRotacionRuleta() {
  clearTimeout(tiemoutGirar);
  var degrees = inicioAngulo * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  optRuleta.save();
  //optRuleta.font = 'bold 20px Verdana, Arial';
  var text = house_names[index];
  //optRuleta.fillText(text, 250 - optRuleta.measureText(text).width / 2, 250 + 10);
  //lucesYDatos(text);
  dibujarRuleta();
  audio2.play();

}

function mathOperations(GirarTime, b, GirarAngleStart, GirarTimeTotal) {
  var ts = (GirarTime/=GirarTimeTotal)*GirarTime;
  var tc = ts*GirarTime;
  return b+GirarAngleStart*(tc + -3*ts + 3*GirarTime);
}



var imagen = document.getElementById("bg");
var cassa = document.getElementById("selectCasa");


function house_color(house){
  let color;
  if(house == "Carnegie"){
    color = "#39a935";
  }else if(house == "Ford"){
    color = "#312782";
  }else if(house == "Disney"){
    color = "#f29100";
  }else if(house == "Jobs"){
    color = "#71257c";
  }
  return color;
}

function asignar_casas(){
  for (let index = 0; index < house_names.length; index++) {
    if(house_names[index] == "Carnegie"){
      lista_participantes[index].logo = "url(lc.png)";
      lista_participantes[index].color = "#39a935";
      lista_participantes[index].light = "3";
    }else if(house_names[index] == "Ford"){
      lista_participantes[index].logo = "url(lf.png)";
      lista_participantes[index].color = "#312782";
      lista_participantes[index].light = "2";
    }else if(house_names[index] == "Disney"){
      lista_participantes[index].logo = "url(ld.png)";
      lista_participantes[index].color = "#f29100";
      lista_participantes[index].light = "4";
    }else if(house_names[index] == "Jobs"){
      lista_participantes[index].logo = "url(lj.png)";
      lista_participantes[index].color = "#71257c";
      lista_participantes[index].light = "1";
    }
    
  }
}

function send_initial_users(){
  let grade = document.getElementById('grades').value;
  const datausers = [];

  for (let i = 0; i < 4; i++) {
    datausers.push({
      nombre:lista_participantes[i].name,
      grado:grade,
      casa:house_names[i]
    });
  }
  //console.log(datausers);

  let results = document.getElementById('results');

  let html1 = '<table class="table" id="tabla"><thead><tr><th>Name</th><th>Grade</th><th>House</th></tr></thead><tbody>';
  for (let i = 0; i < datausers.length; i++) {
    
    html1 += '<tr><td>'+datausers[i].nombre+'</td><td>'+datausers[i].grado+'</td><td>'+datausers[i].casa+'</td></tr>';
    
  }

  html1+='</tbody></table>';
  results.innerHTML=html1;
  $tabla = document.querySelector("#tabla");

  let tableExport = new TableExport($tabla, {
    exportButtons: false, // No queremos botones
    filename: "Reporte de prueba", //Nombre del archivo de Excel
    sheetname: "Reporte de prueba", //Título de la hoja
  });
  let datos = tableExport.getExportData();
  let preferenciasDocumento = datos.tabla.xlsx;
  tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);

}

/*function send_initial_ligths(){
  const dataligths = [];
  console.log(lista_participantes);

  for (let i = 0; i < lista_participantes.length; i++) {
     if(lista_participantes[i].chair == "CHAIR 1"){
      dataligths[0] = lista_participantes[i].light;
     }else if(lista_participantes[i].chair == "CHAIR 2"){
      dataligths[1] = lista_participantes[i].light;
     }else if(lista_participantes[i].chair == "CHAIR 3"){
      dataligths[2] = lista_participantes[i].light;
     }else if(lista_participantes[i].chair == "CHAIR 4"){
      dataligths[3] = lista_participantes[i].light;
     }
  }

  socket.emit("sendlights", dataligths);
}*/

//