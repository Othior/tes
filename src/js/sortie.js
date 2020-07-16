import QrcodeDecoder from 'qrcode-decoder';

let video = document.querySelector("#video");
let valueVisiteur = document.querySelector(".valueVisiteur");

let qr = new QrcodeDecoder();
qr.decodeFromCamera(video).then((res)=>{
    console.log(res.data);
    axios.get(`https://exerciceintegre.firebaseio.com/Visiteur/${res.data}.json`)
      .then(function (response) {
        valueVisiteur.innerHTML += `Aurevoir, ${response.data.Prenom} ${response.data.Nom} `
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 
})

const videoParameter = { 
    audio: false, 
    video:{ 
        width: 1280,
        height: 720
    } 
};

navigator.mediaDevices.getUserMedia(videoParameter).then((stream) =>{

    video.srcObject = stream;

}).catch(function(err){
    console.log("dommage" , err);
});