import QrcodeDecoder from 'qrcode-decoder';

let video = document.querySelector("#video");
let valueVisiteur = document.querySelector(".valueVisiteur");

let qr = new QrcodeDecoder();
qr.decodeFromCamera(video).then((res)=>{
  axios.get(`https://exerciceintegre.firebaseio.com/Visiteur/${res.data}.json`)
  .then(function (response) {
    valueVisiteur.innerHTML += `Bonjour  ${response.data.Prenom} ${response.data.Nom}, Bonne journée dans le centre :D `
    // console.log(response.data.Visite[0].Objet);
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