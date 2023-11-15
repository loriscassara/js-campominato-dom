/*************** 
    CODE MINEFIELD GRID
***************/

const playBtn = document.querySelector('#btn-play'); //dichiarazione variabile per indicare il bottone di play
//console.log('Tasto di play:', playBtn);
const delateBtn = document.querySelector('#btn-delate'); //dichiarazione variabile per indicare il bottone di annulla
//console.log('Tasto di annulla:', delateBtn);

playBtn.addEventListener('click', function(){ //dichiarazione per indicare la funzione di click sul bottone
    //console.log('Tasto premuto!');
    gridCreate(); //richiamo la funzione della creazione del game-board
})

delateBtn.addEventListener('click', function(){
    //console.log('Tasto premuto!');
    window.location.reload(); //funzione che ricarica la pagina HTML
})

/*
* Funzione per indicare la selezione
* del livello
*/

function getLevel(){
    const level = document.querySelector('#get-level').value; //dichiarazione variabile per indicare il livello scelto
    //console.log('Valore:', level);
    
    return level;
}

/*
* Funzione per indicare la creazione
* della cella
*/

function cellsCreate(){
    const cell = document.createElement('div'); //dichiarazione variabile che crea un <div></div>
    //console.log('Creazione div:', cell);
    cell.classList.add('cell'); //aggiunge all'elemento cella la classe: cell

    return cell;
}

/*
* Funzione per indicare la creazione
* delle griglie
*/

function gridCreate(){
    const grid = document.querySelector('#game-board'); //dichiarazione variabile per indicare la game-board
    //console.log('Griglia:', grid);
    const level = getLevel(); //dichiarazione variabile che riprende la funzione
    //console.log('Livello scelto:', level);
    let gridDimension = [ //dichiarazione array per indicare le celle presenti all'interno del game-board
        100,
        81,
        49
    ];
    //console.log('Dimensioni game-boards:', gridDimension);
    let totalCells = gridDimension[level - 1];
    //console.log('Celle totali:', totalCells);
    let rowCells = Math.sqrt(totalCells); //radice quadrata di un numero nell'array
    //console.log('Radice quadrata:', rowCells);
    const venomsList = []; //dichiarazione array vuoto
    let gameOver = false; //dichiarazione variabile impostata su falso
    //console.log('Stato impostato:', gameOver);
    let point = 0; //dichiarazione variabile per indicare lo start del punteggio
    //console.log('Punteggio:', point);

    /*
    * Per includere i venom all'interno
    * del game-board
    */

    while(venomsList.length < 16){
        const newNumber = venomInt(1, totalCells); //dichiarazione variabile che riprende la funzione
        //console.log('Venom generati:', newNumber);

        /*
        * If per inserire i venom all'interno
        * del game-board
        */

        if(!venomsList.includes(newNumber)){ //se la lista venom non include il nuovo numero generato allora..
            venomsList.push(newNumber); //includi all'interno della lista venom il nuovo numero generato
        }
    }

    /*
    * Ciclo for per la creazione delle celle
    * all'interno della griglia
    */

    for(let i = 0; i < totalCells; i++){
        let cell = cellsCreate(i); //dichiarazione variabile che dipende dalla funzione
        //console.log('Celle create:', cell);
        cell.style.width = `calc(100% / ${rowCells})`; //modifichiamo la grandezza delle celle
        cell.style.height = `calc(100% / ${rowCells})`; //modifichiamo l'altezza delle celle
        
        cell.addEventListener('click', function(){
            const validCell = totalCells - venomsList; //dichiarazione variabile che indica le celle vittoria
            //console.log('Celle valide:', validCell);

            /*
            * If per inserire variabile vittoria e punteggio
            * oppure perdita
            */

            if(!gameOver){ //se diverso da gameOver = true allora..
                if(!venomsList.includes(i)){ //se venom list non include i numeri generati allora..
                    cell.classList.add('clicked'); //aggiunta di classe clicked alle celle cliccate
                    point++; //il punteggio incrementa
                    document.querySelector('#pointer').innerHTML = `${point}`; //rendo visibile nell'HTML il punteggio attuale
                    if(point >= validCell){
                        document.querySelector('#message').innerHTML = `HAI VINTO!`; //rendo visibile nell'HTML la vittoria
                        document.querySelector('#message').classList.add('text-success'); //rende verde la scritta
                        gameOver = true; //la varibile ora diventa true
                        document.querySelector('#re-play').innerHTML = `Premi il tasto "annulla" per rigiocare`; //rendo visibile nell'HTML il messaggio
                    }
                } else { //in tutti gli altri casi..
                    cell.classList.add('venom'); //aggiunta di classe venom alle celle perdita
                    document.querySelector('#message').innerHTML = `HAI PERSO!`;
                    document.querySelector('#message').classList.add('text-dark'); //rende nera la scritta
                    gameOver = true; //la variavile ora diventa true
                    document.querySelector('#re-play').innerHTML = `Premi il tasto "annulla" per rigiocare`; //rendo visibile nell'HTML il messaggio
                }
            }
        })
        grid.appendChild(cell);
    }
}

/*
* Funzione per indicare la quantita'di venom
* presenti nel livello
*/

function venomInt(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min; //numero randomico in base al minimo e massimo valore
}