class Slider {
    constructor(id, slides) {
        this.idSlider = id; //conteneur
        this.slides = slides; //contenu

        this.conteneur = document.getElementById(this.idSlider);
        this.prev = this.conteneur.querySelector("#prev");
        this.next = this.conteneur.querySelector("#next");
        this.pause = this.conteneur.querySelector("#pause");
        this.diapoActive = this.conteneur.querySelector("#diapoActive");
        this.compteur = 0;
        this.timer = null;


    //Evenements

    //sur les flèches
    this.next.addEventListener("click", () => {
        this.slideNext()
    })
    this.prev.addEventListener("click", () => {
        this.slidePrev()
    })

    //sur le bouton pause
    this.pause.addEventListener("click", () => {
        this.pauseSlide()
    })

    //sur le clavier 
    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 39) {
            this.slideNext();
        }
        if (e.keyCode == 37) {
            this.slidePrev();
        }
    })

    //lancement automatique
    this.autoPlay();
}


    //Méthodes
    
    slideNext() {
        this.compteur++;
        if(this.compteur == this.slides.length) {
            this.compteur = 0;
        }
        this.diapoActive.src = this.slides[this.compteur];
    }

    slidePrev() {
        this.compteur--;
        if(this.compteur < 0) {
            this.compteur = this.slides.length -1;
        }
        this.diapoActive.src = this.slides[this.compteur];
    }

    pauseSlide() {
        if (this.playing == true) {
            this.pause.innerHTML = "&#9655;";
            clearInterval(this.timer);
            this.playing = false;
        }
        else {
            this.pause.innerHTML = "ll";
            this.autoPlay();
        }
    }

    autoPlay() {
        this.timer = setInterval( () => {
            this.slideNext()
        }, 5000);
        this.playing = true;
    }

};



var sliderP3 = new Slider("slider", ["images/img1.jpg","images/img2.jpg","images/img3.jpg","images/img4.jpg"]);
