const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var NodeWebcam = require( "node-webcam" );


var opts = {

    //Picture related
    width: 300,
    height: 300,
    quality: 50,
    frames: 10,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "base64",
    verbose: false,
};
var Webcam = NodeWebcam.create( opts );

app.get('/' , (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    NodeWebcam.capture( "test_picture", opts, function( err, data ) {  
        io.emit('image', data);
    });   
},1500)

// server.listen(3000)
server.listen(3000, () => {
    console.log("Listening at port 3000....");
});