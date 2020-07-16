const videoParameter = { 
    audio: false, 
    video:{ 
        width: 1280,
        height: 720
    } 
};
let video = document.querySelector("#video");

navigator.mediaDevices.getUserMedia(videoParameter).then((stream) =>{

    video.srcObject = stream;

}).catch(function(err){
    console.log("dommage" , err);
});