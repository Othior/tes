// variable que l'on recupere
let qrcode = document.querySelector("#qrcode");
let valueFormation = document.querySelector("#formation");
let valuePersonnel = document.querySelector("#personnel");
let valueRdv = document.querySelector("#rdv");
let inputNom = document.querySelector("#nom");
let inputPrenom = document.querySelector("#prenom");
let inputMail =  document.querySelector("#mail");
let formationBlock = document.querySelector(".formationBlock");
let personnelBlock = document.querySelector(".personnelBlock");
let qrcodeBlock = document.querySelector(".qrcodeBlock");
let container = document.querySelector(".yes");
let perso = document.querySelector(".perso");
let forma = document.querySelector(".forma");
let messageEror = [
    document.querySelector(".messageNom"),
    document.querySelector(".messagePrenom"),
    document.querySelector(".messageMail")
];
let listInput = [
    document.querySelector("#nom"),
    document.querySelector("#prenom"),
    document.querySelector("#mail"),
    document.querySelector(".btnSubmit")
];
let dateMtn = new Date();
let message = " Champ obligatoire veuillez le remplir * ";

//------------------------------------------------- GET -----------------------------------------------------//
    // recupere les donnees de l'api des formations
    axios.get('https://cepegra-frontend.xyz/marvyn/wp-json/acf/v3/formation')
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
    axios.get('https://cepegra-frontend.xyz/marvyn/wp-json/acf/v3/addpersonnel')
    .then((response) => {
    let personnel = response.data;
    personnel.forEach(element => {
        valuePersonnel.innerHTML += `<option> ${element.acf.prenom} ${element.acf.nom}  </option>`;
        // forma.innerHTML +=`
        // <ul> 
        //     <li>${element.acf.prenom} ${element.acf.nom}</li> 
        //     <li>${element.acf.mail}</li>
        //     <li>${element.acf.local}</li>
        // </ul> `;
        // console.log(forma);
    });
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    // always executed
    }); 



    console.log(formation.value);

    


    let selectRdv = function(){
        valueRdv.addEventListener("change",e => {
            console.log(e.target.selectedOptions[0].dataset.id);
            if(e.target.selectedOptions[0].dataset.id === "1"){
                formationBlock.classList.add("active");
                console.log(e.target)
                personnelBlock.classList.remove("active");
            }else{
                formationBlock.classList.remove("active");
                personnelBlock.classList.add("active");
            }
        })
    };

    selectRdv();


    // ---------------------------------------------------------------------------------------------------------//
    // --------------------------------------------- POST ------------------------------------------------------//
    
    function envoyerDonne(){
        let url = "https://exerciceintegre.firebaseio.com/Visiteur.json";
        if(inputNom.value != "" && inputPrenom.value != "" && inputMail.value != ""){
            axios.post(url, {
            Nom : listInput[0].value ,
            Prenom : listInput[1].value ,
            Mail : listInput[2].value ,
            derniereVisite :` ${dateMtn.getFullYear()} - ${dateMtn.getMonth()+1} -  ${dateMtn.getDate()}`,
            avatar: "",
            Visite : [
                {
                    nomVisite :` rdv `,
                    Objet : ""
                }
            ]
            
        }
    )
        .then(function (response) {
            console.log(response);
            let id = response.data.name;
            console.log(generateQrcode(id));
            
            if(response.status == 200){
                container.classList.add("enabled");
                qrcodeBlock.classList.add("active");
                qrcodeBlock.classList.remove("qrcodeBlock");
            }else{
                container.classList.remove("enabled");
                qrcodeBlock.classList.remove("active");
            }
        
      })
    
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
        messageEror.forEach(element => {
            element.innerHTML += `${message}`;
        });
    }
}
listInput[3].addEventListener("click",envoyerDonne);

function generateQrcode(id){
    new QRCode(qrcode,id);
}


