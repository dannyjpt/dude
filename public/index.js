var options = ["Carnegie", "Disney", "Ford", "Jobs"];

// Initialize Variables
var inicioAngulo = 0;
var tiemoutGirar = null;
var optRuleta;
var GirarArcStart = 10;
var GirarTime = 0;
var GirarTimeTotal = 0;
var arc = Math.PI / (options.length / 2);

// Evento de girar del index principal.
document.getElementById("Girar").addEventListener("click", Girar);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}


// Dibujamos la ruleta.
function dibujarRuleta() {
  // Obtenemos el canvas desde el Id Canvas.
  var canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 50;
    optRuleta = canvas.getContext("2d");
    optRuleta.clearRect(0,0,500,500);
    optRuleta.strokeStyle = "white";
    optRuleta.lineWidth = 0;
    optRuleta.font = '16px Verdana, Arial';
    for(var i = 0; i < options.length; i++) {
      var angle = inicioAngulo + i * arc;
      
      if(i == 0){
         optRuleta.fillStyle = "orange";
      }else if(i == 1){
         optRuleta.fillStyle = "green";
      }else if(i == 2){
         optRuleta.fillStyle = "blue";
      }else if(i == 3){
         optRuleta.fillStyle = "purple";
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
      var text = options[i];
      optRuleta.fillText(text, - optRuleta.measureText(text).width / 2, 0);
      optRuleta.restore();
    }

    // Flecha, color y "movimiento".
    optRuleta.fillStyle = "red";
    optRuleta.beginPath();
    optRuleta.moveTo(250 - 4, 250 - (outsideRadius + 5));
    optRuleta.lineTo(250 + 4, 250 - (outsideRadius + 5));
    optRuleta.lineTo(250 + 4, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 + 9, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 + 0, 250 - (outsideRadius - 13));
    optRuleta.lineTo(250 - 9, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 - 4, 250 - (outsideRadius - 5));
    optRuleta.lineTo(250 - 4, 250 - (outsideRadius + 5));
    optRuleta.fill();
  }
}

function Girar() {
    inicioAngulo = 0;
  dibujarRuleta();
  GirarAngleStart = 12;
  GirarTime = 0;
  GirarTimeTotal = 9 * 1000;
  rotarRuleta();
}

// Función que realiza el giro de la ruleta.
function rotarRuleta() {
  GirarTime =  GirarTime + 10;
  if(GirarTime >= GirarTimeTotal) {
    detenerRotacionRuleta();
    return;
  }
  var GirarAngle = GirarAngleStart - mathOperations(GirarTime, 0, GirarAngleStart, GirarTimeTotal);
  inicioAngulo += (GirarAngle * Math.PI / 180);
  dibujarRuleta();
  tiemoutGirar = setTimeout('rotarRuleta()', 10);
}

// Detener la ruleta.
function detenerRotacionRuleta() {
  clearTimeout(tiemoutGirar);
  var degrees = inicioAngulo * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  optRuleta.save();
  optRuleta.font = 'bold 20px Verdana, Arial';
  var text = options[index]
  optRuleta.fillText(text, 250 - optRuleta.measureText(text).width / 2, 250 + 10);

}

function mathOperations(GirarTime, b, GirarAngleStart, GirarTimeTotal) {
  var ts = (GirarTime/=GirarTimeTotal)*GirarTime;
  var tc = ts*GirarTime;
  return b+GirarAngleStart*(tc + -3*ts + 3*GirarTime);
}

// Llamamos nuestra función que invocará las demás.
dibujarRuleta();
