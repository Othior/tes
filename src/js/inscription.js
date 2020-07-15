let qrcode = document.querySelector("#qrcode");
function generateQrcode(){
    new QRCode(qrcode,);
}

// variable que l'on recupere
let valueFormation = document.querySelector("#formation");
let valuePersonnel = document.querySelector("#personnel");
let valueRdv = document.querySelector("#rdv");
let formationBlock = document.querySelector(".formationBlock");
let personnelBlock = document.querySelector(".personnelBlock");
let listInput = [
    document.querySelector("#nom"),
    document.querySelector("#prenom"),
    document.querySelector("#mail"),
    document.querySelector(".btnSubmit")
];
let dateMtn = new Date();
let perso = null;
let estRdvOuAutre = true;

//------------------------------------------------- GET -----------------------------------------------------//
    // recupere les donnees de l'api des formations
    axios.get('http://localhost/exoIntegre/wordpress/wp-json/wp/v2/formation')
    .then((response) => {

        let formation = response.data;

        formation.forEach(element => {
            valueFormation.innerHTML += `<option> ${element.acf.nom} </option>`;
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });  

    // recupere les donnees de l'api du personnel
    axios.get('http://localhost/exoIntegre/wordpress/wp-json/wp/v2/addpersonnel')
    .then((response) => {
    let personnel = response.data;
    perso = personnel;
    personnel.forEach(element => {
        valuePersonnel.innerHTML += `<option> ${element.acf.prenom} ${element.acf.nom}  </option>`;
    });
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    // always executed
    }); 


    let selectRdv = function(){
        valueRdv.addEventListener("change",e => {
            console.log(e.target.selectedOptions[0].dataset.id);
            if(e.target.selectedOptions[0].dataset.id === "1"){
                formationBlock.classList.add("active");
                personnelBlock.classList.remove("active");
                estRdvOuAutre = true;
            }else{
                formationBlock.classList.remove("active");
                personnelBlock.classList.add("active");
                estRdvOuAutre = false;
            }
        })
    };

    selectRdv();

    
    // ---------------------------------------------------------------------------------------------------------//
    // --------------------------------------------- POST ------------------------------------------------------//

    function envoyerDonne(){
        let url = "https://exerciceintegre.firebaseio.com/Visiteur.json";
        console.log(perso);
    axios.post(url, {
        Nom : listInput[0].value ,
        Prenom : listInput[1].value ,
        Mail : listInput[2].value ,
        derniereVisite :` ${dateMtn.getFullYear()} - ${dateMtn.getMonth()+1} -  ${dateMtn.getDate()}`,
        avatar: "",
        Visite : {
            nomVisite :` rdv `,
            Personnel : ``,
            Formation : "",
        }
      })
      .then(function (response) {
        console.log(response);
        let id = response.data.name;
      })
      .catch(function (error) {
        console.log(error);
      });
}
listInput[3].addEventListener("click",envoyerDonne);

// ---------------------------------------------------------------------------------------------------------//
