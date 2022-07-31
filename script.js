let body = $("body");
let buttons = [$("#red"), $("#blue"), $("#yellow"), $("#green")];
let title = $("#level-title");
let cliquable = false, compteur = 0, inputs = [], sequence = [];

function startGame(sequence) {
    sequence = [];
    inputs = [];
    sequence = ajoutSequence(sequence);
    lireSequence(sequence);
    return sequence
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function eclairageBouton(button, defaite) {
    button.addClass("pressed");
    defaite ? joueSon("wrong") : joueSon(button[0].id)
    setTimeout(() => {
        button.removeClass("pressed")
    }, 200)
}

function joueSon(nomFichier) {
    let fichier = new Audio(`./sounds/${nomFichier}.mp3`);
    fichier.play();
}

function ajoutSequence(sequence) {
    sequence.push(getRandomInt(4))
    return sequence
}
function lireSequence(sequence) {
    cliquable = false;
    changeLevel(sequence)
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            eclairageBouton(buttons[sequence[i]])
        }, (i * 500))
    }
    setTimeout(() => {
        cliquable = true;
        compteur = 0 
    }, sequence.length * 500)

}


function changeLevel(sequence) {
    if (sequence.length === 0) {
        title[0].innerText = "Game Over, Press Any Key to Restart"
    }
    else {
        title[0].innerText = `Level ${sequence.length}`
    }
}
for (let i = 0; i < buttons.length; i++) {
    buttons[i].click(() => {
        if (cliquable && sequence.length > 0 && compteur < sequence.length) {
            if (sequence[compteur] === i) {
                eclairageBouton(buttons[i])
            }
            else {
                sequence = [];
                body.addClass("game-over")
                changeLevel(sequence);
                eclairageBouton(buttons[i], 1)
            }
            compteur++;
            if (compteur === sequence.length) {
                setTimeout(() => {
                    sequence = ajoutSequence(sequence)
                    lireSequence(sequence)
                }, 800)
            }
        }
    })
}
body.keypress(() => {
    if (sequence.length === 0) {
        compteur = 0;
        changeLevel(sequence)
        sequence = startGame(sequence)
        body.removeClass("game-over")
    }
})

