class Signature {
  constructor(canvas){
    this.sign = false; 
    this.canvas = document.querySelector(canvas);
    this.ctx = this.canvas.getContext("2d"); // style du canvas : 2d
    this.ctx.strokeStyle = "black"; // couleur de la ligne
    this.ctx.lineWidth = 1; // taille ligne
    

    // Au clic de la souris sur le canvas :

    this.canvas.addEventListener("mousedown", (e) => {
      this.sign = true; // on commence à signer
      var pos = this.canvas.getBoundingClientRect(); 
      // retourne taille d'un élément et sa position relative par rapport à la zone d'affichage
      this.ctx.beginPath(); // On ouvre le chemin
      this.ctx.moveTo(e.clientX - pos.x, e.clientY - pos.y); // Partir de 
    })


    // Au déplacement de la souris sur le canvas :

    this.canvas.addEventListener("mousemove", (e) => {
      if(this.sign){ //Si je signe
        var pos = this.canvas.getBoundingClientRect(); // On reprend les infos du canvas
        this.ctx.lineTo(e.clientX - pos.x, e.clientY - pos.y); // Aller à :
        this.ctx.stroke(); // Faire un trait
      }
    })


    // Quand je relâche la souris, je ne dessine plus
    this.canvas.addEventListener("mouseup", () => {
      this.sign = false; 
    })


    // Quand je sors du cadre du canvas, je ne dessine plus
    this.canvas.addEventListener("mouseout", () => {
      this.sign = false; 
    })


    // Quand je clique sur le bouton "effacer", le canvas est effacé
    document.querySelector("#effacer").addEventListener("click", () => {
      this.effacer();
    }) 

  }


  // Effacer le canvas sur la hauteur/largeur en partant du coin 0/0
  effacer() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
}

let canvas1 = new Signature("#canvas");
