const http = require('http');
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const SocketIO = require('socket.io');
var os = require('os');
var ifaces = os.networkInterfaces();
const request = require("request");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = SocketIO.listen(server);

const configuration = new Configuration({
    apiKey: "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",
  });

const openai = new OpenAIApi(configuration);


  
///////
// Requiring the module


//const admin = require('firebase-admin');

//var serviceAccount = require("./primera-bd-d9a7b-firebase-adminsdk-cirpb-537f2b0a78.json");

/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://primera-bd-d9a7b.firebaseio.com',
});*/

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));

//const db = admin.database();



io.sockets.on('connection', function(socket){

    /*socket.on('sendlights', function (data) {
        var casas = 
        {
            silla1:data[0],
            silla2:data[1],
            silla3:data[2],
            silla4:data[3]
        }

        var newPostKey = db.ref().child('casas').key;
        var updates = {};
        updates[newPostKey] = casas;
    
        db.ref().update(updates);
        

        socket.emit('sended', "ok");
    });*/

    socket.on('sendUsers', function (data) {

        const reader = require('xlsx');
        
        const file = reader.readFile('./test.xlsx');

        const sheets = file.SheetNames;

        let oldData = [];
  
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
            oldData.push(res);
            });
        }
        console.log(data);
        for (let j = 0; j < data.length; j++) {
            oldData.push(data[j]);
        }
  
        reader.utils.sheet_add_json(file.Sheets["Hoja1"],oldData);
  
        // Writing to our file
        reader.writeFile(file,'./test.xlsx');
        socket.emit('sendedr', "okis");
    });
    
    socket.on('voicetochat', function (data) {
        getData(data);
        //socket.emit('voiceinit', "okis");
    });

    async function getData(data){
        try {
          const prompt = data;
      
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 100, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });
      
          console.log(response.data.choices[0].text);
          socket.emit('voiceinit', response.data.choices[0].text);
        } catch (error) {
          console.error(error)
        }
      }

});


/*
delete
const ref = db.ref('1b');
ref.orderByChild('carneguie').limitToFirst(50000).once('value', snapshot => {
     const updates = {};
     snapshot.forEach(child => updates[child.key] = null);
     ref.update(updates);
});
function guardar()
{
    const weather = 
        {
            prediction:"clear sky",
            temp: 180,
            temp_min: 90,
            temp_max:90,
            pressure: 270,
            sea_level:40,
            grnd_level:89,
            humidity:78,
            temp_kf:9
    }

    db.ref('weather').push(weather);
}


function mostrar()
{
    db.ref('brazo').once('value',(snapshot)=>
    {
        const data = snapshot.val();
        console.log(data);
    });
}


function actualizar(d1,d2,d3,d4,d5,d6,d7,d8,d9)
{
    var weather = 
        {
            prediction:d1,
            temp: d2,
            temp_min: d3,
            temp_max:d4,
            pressure: d5,
            sea_level:d6,
            grnd_level:d7,
            humidity:d8,
            temp_kf:d9
        }
    var newPostKey = db.ref().child('weather').key;
    var updates = {};
    updates[newPostKey] = weather;

    return db.ref().update(updates);
}
*/
//guardar();
//actualizar(45,190,270);
//mostrar();
/*datos del tiempo
app.get("/", (req, res) => {
    var request = require('request');
    //setInterval(myTimer, 1000);
    request('https://samples.openweathermap.org/data/2.5/forecast?q=Bayunca&appid=6dad36c32dd009daa6217d1362930fab',function(error, response, body){
        let data = JSON.parse(body);
        if(response.statusCode === 200){
            res.send("the weather is "+data.list[0].weather[0].description+"<br>"+
                    data.list[0].main.temp+"<br>"+
                     data.list[0].main.temp_min+"<br>"+
                     data.list[0].main.temp_max+"<br>"+
                     data.list[0].main.pressure+"<br>"+
                     data.list[0].main.sea_level+"<br>"+
                     data.list[0].main.grnd_level+"<br>"+
                     data.list[0].main.humidity+"<br>"+
                     data.list[0].main.temp_kf
                    )
            actualizar(data.list[0].weather[0].description,data.list[0].main.temp,data.list[0].main.temp_min,data.list[0].main.temp_max,data.list[0].main.pressure,data.list[0].main.sea_level,data.list[0].main.grnd_level,data.list[0].main.humidity,data.list[0].main.temp_kf);
        }
    });
});
*/




//<a href="#" id="btni"><img src="ab.jpg" id="imgi"></a>
//socket.emit('ultrasonico', centimeters);