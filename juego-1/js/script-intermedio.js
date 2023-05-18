class Memorama{

    constructor(){
        this.canPlay = false;
        this.card1 = null;
        this.card2 = null;

        this.availableImagesp = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
        this.availableImagesr = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'];
        this.orderForThisRound = [];
        this.cards = Array.from(document.querySelectorAll(".board-game figure"));

        this.maxPairNumber = this.availableImagesp.length;

        var puntuacion = 0;
        document.getElementById("puntuacion").innerHTML = puntuacion;

        var intentos = 10;
        document.getElementById("intentos").innerHTML = intentos;

        this.startGame();

        this.setHref();
        
    }

    startGame() {
        this.foundPairs = 0;
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();
        this.puntuacion = 0;
        this.intentos = 10;
        

    }
    
    setNewOrder(){
        this.orderForThisRound = this.availableImagesp.concat(this.availableImagesr);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );
        }

    setImagesInCards(){
        for (const key in this.cards){
            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];
            imgLabel.src = `./img/intermedio/${image}.png`;

            const imgB = card.children[0];

            var strb = image.replace(/[0-9]/g, '');

            console.log(strb);

            imgB.src = `./img/intermedio/${strb}.png`;

            card.dataset.image = image;
        }
    }

    openCards() {

        this.cards.forEach(card => card.classList.add("opened"));

        setTimeout(() => {
            this.closeCards();
        }, 2000); //se muestran las cartas al principio por una cantidad de tiempo

    }

    closeCards() {

        this.cards.forEach(card => card.classList.remove("opened"));
        this.addClickEvents();
        this.canPlay = true;

    }

    addClickEvents() {

        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));

    }

    flipCard(e) {

        const clickedCard = e.target;

        if (this.canPlay && !clickedCard.classList.contains("opened")) {
            
            clickedCard.classList.add("opened");
            this.checkPair( clickedCard.dataset.image );

        }

    }

    checkPair(image) {

        if (!this.card1) this.card1 = image;
        else this.card2 = image;

        if (this.card1 && this.card2) {

            document.getElementById("respuesta").style.display = "block";
            this.canPlay = false;

        }

    }

    resetOpenedCards() {
        
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        this.card1 = null;
        this.card2 = null;

        document.getElementById("respuesta").style.display = "none";
        document.getElementById("msj").textContent = "";


        if(this.intentos == 0){
            this.canPlay = false;
        }else{
            this.canPlay = true;
        }

    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {
            document.getElementById("score").textContent = this.puntuacion;
            document.getElementById("game-over").style.display = "block";
            document.getElementById("gov").textContent = "¡Felicidades ganaste!";

            
            
        }

    }

    setNewGame() {

        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));

        setTimeout(this.startGame.bind(this), 1000);

    }

    GameOver(){
        this.canPlay=false;

        document.getElementById("game-over").style.display = "block"; //este hace visible el div con el id game-over
        document.getElementById("gov").textContent = "Suerte para la próxima";
        document.getElementById("score").textContent = this.puntuacion;

    }

    setHref(){
        document.getElementById("score").textContent = this.puntuacion;

        document.getElementById("play-again").addEventListener("click",function() {
            window.location.href = "nivel-intermedio.html";}); 

        document.getElementById("back-to-menu").addEventListener("click",function() {
            window.location.href = "#";});

        document.getElementById("Si").addEventListener("click",() =>{
            this.checkSi()
        });

        document.getElementById("No").addEventListener("click",() =>{
            this.checkNo()
        });
    }

    checkSi(){

        

        console.log('si');

        if (this.card1.replace(/[a-zA-Z]/g, "") == this.card2.replace(/[a-zA-Z]/g, "")) {

            this.intentos = this.intentos - 1;
            document.getElementById("intentos").innerHTML = this.intentos;
            this.canPlay = false;
            this.puntuacion = this.puntuacion + 100;
            document.getElementById("puntuacion").innerHTML = this.puntuacion;

            document.getElementById("msj").textContent = "Respuesta correcta, sigue asi";
            
            if(this.intentos == 0){
                this.GameOver();
                
            }else{
                setTimeout(this.checkIfWon.bind(this), 300)
            }

        }
        else {
            this.intentos = this.intentos - 1;
            document.getElementById("intentos").innerHTML = this.intentos;
            this.canPlay = false;

            document.getElementById("msj").textContent = "Intentalo de nuevo";
            
            
            if(this.intentos == 0){
                this.GameOver();
                setTimeout(this.resetOpenedCards.bind(this), 1500)
            }else{
                setTimeout(this.resetOpenedCards.bind(this), 1500)
            }
        }

        setTimeout(this.simsj.bind(this), 1500)

    }

    checkNo(){
        console.log('no');

        setTimeout(this.resetOpenedCards.bind(this), 800)
    }

    simsj(){
        document.getElementById("respuesta").style.display = "none";
        document.getElementById("msj").textContent = "";
    }

}

document.addEventListener("DOMContentLoaded", () => {

    new Memorama();

});