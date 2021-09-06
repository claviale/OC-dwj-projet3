
class Reservation {
    constructor() {
        this.form = document.getElementById("form");
        this.button = document.getElementById("button");
        this.canvas = document.getElementById("canvas");
        this.nom = document.getElementById("nom");
        this.prenom = document.getElementById("prenom");
        this.nomStation = document.getElementById("nomStation");
        this.confirmation = document.getElementById("confirmation");
        this.minuteur = document.getElementById("timer");
        this.timer;
        this.count = 1200;
        this.initialCount = this.count;
        this.seconds;
        this.minutes;
        
        this.keepTimer();
        this.recupererInformations();
        this.submitForm();
        
    }

    
    // FORMULAIRE ------------------------------------------------------------------------------------
    
    submitForm() {
        this.button.addEventListener("click", e => {
            e.preventDefault(); 

            if(document.getElementById("velosDisponibles").innerText == "Nombre de vélos disponibles : 0") {
                alert("Cette station ne possède pas de vélo disponible");
            } else if (document.getElementById("nomStation").textContent == "") {
                alert("Veuillez choisir une station sur la carte.");
            } else if ((document.getElementById("nom").value == "") || (document.getElementById("prenom").value == "")) {
                alert("Veuillez remplir tous les champs du formulaire.");
            } else if (this.canvas.toDataURL() == document.getElementById("blank").toDataURL()) { 
                alert("Veuillez signer dans l'encadré prévu à cet effet.");
            } else if (sessionStorage.getItem("confirmation")) {
                if(confirm("Vous avez déjà une réservation en cours. Voulez-vous vraiment la remplacer ?")) {  
                    clearInterval(this.timer);
                    this.count = this.initialCount;
                    this.confirmerReservation(); 
                    this.definirStockage(); 
                } 
            }
            else  { 
                this.confirmerReservation();
                this.definirStockage();
            }  
        });
    }


    // WEBSTORAGE ------------------------------------------------------------------------------------

    definirStockage() {
        sessionStorage.setItem("localStation", this.nomStation.textContent);
        sessionStorage.setItem("confirmation", this.confirmation.textContent);
    }

    recupererInformations() {
        this.nom.value = localStorage.getItem("localNom");
        this.prenom.value = localStorage.getItem("localPrenom");
        this.nomStation.textContent = sessionStorage.getItem("localStation");
        this.confirmation.textContent = sessionStorage.getItem("confirmation");
    }   

    confirmerReservation() {
        localStorage.setItem("localNom", this.nom.value);
        localStorage.setItem("localPrenom", this.prenom.value);
        this.confirmation.innerHTML = "Vélo réservé par " + localStorage.getItem("localPrenom") + " " + localStorage.getItem("localNom") + ". " + this.nomStation.textContent + ".";
        this.initializeTimer();
    }


    // TIMER ---------------------------------------------------------------------------------------
    
    initializeTimer() {
        this.timer = setInterval(() => {
            this.decrementTimer();
        }, 1000);
    }

    decrementTimer() {
        if(this.count > 0) {
            this.seconds = this.count % 60;
            this.minutes = Math.floor(this.count / 60);
            this.minutes %= 60;
            this.count--;
            sessionStorage.setItem("timer", this.count);
            this.minuteur.textContent = "Vélo réservé pendant : " + this.minutes + " min " + this.seconds + " s";
        } 
        else {
            this.minuteur.textContent = "Votre réservation a expirée !"
            sessionStorage.clear();
            clearInterval(this.timer);
            this.count = this.initialCount;  
        }
    }

    keepTimer() {
        if(sessionStorage.getItem("timer")) {
            this.count = sessionStorage.getItem("timer");
            this.initializeTimer();
        }
    }
}


let reservation1 = new Reservation();
