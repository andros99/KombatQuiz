const gameCanvas = document.querySelector('canvas');
const ctx = gameCanvas.getContext('2d');

gameCanvas.width = 1024;
gameCanvas.height = 576;

ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

const pullForce = 0.7;

class Spwnsprite {
    constructor({pos, speed, tint = 'red', offset}) {
        this.pos = pos;
        this.speed = speed;
        this.dimWidth = 50;
        this.dimHeight = 150;
        this.recentKey;
        this.strikeArea = {
            pos: {
                x: this.pos.x,
                y: this.pos.y
            },
            offset,
            dimWidth: 100,
            dimHeight: 50,
        };
        this.tint = tint;
        this.striking;
        this.vitality = 100;
    }
    render() {
        ctx.fillStyle = this.tint;
        ctx.fillRect(this.pos.x, this.pos.y, this.dimWidth, this.dimHeight);

        if (this.striking) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.strikeArea.pos.x, this.strikeArea.pos.y, this.strikeArea.dimWidth, this.strikeArea.dimHeight);
        }
    }
    refresh() {
        this.render();
        this.strikeArea.pos.x = this.pos.x + this.strikeArea.offset.x;
        this.strikeArea.pos.y = this.pos.y;
        
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;

        if (this.pos.y + this.dimHeight + this.speed.y >= gameCanvas.height) {
            this.speed.y = 0;
        } else this.speed.y += pullForce;
    }
    strike() {
        this.striking = true;
        setTimeout(() => {
            this.striking = false;
        }, 100);
    }
}

const mainPlayer = new Character({
    pos: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    }
});

const adversary = new Character({
    pos: {
        x: 400,
        y: 100
    },
    speed: {
        x: 0,
        y: 0
    },
    tint: 'blue',
    offset: {
        x: -50,
        y: 0
    }
});

console.log();

const inputKeys = {
    a: {
        active: false
    },
    d: {
        active: false
    },
    ArrowRight: {
        active: false
    },
    ArrowLeft: {
        active: false
    },
};

function collisionDetection({char1, char2}) {
    return (
        char1.strikeArea.pos.x + char1.strikeArea.dimWidth >= char2.pos.x && 
        char1.strikeArea.pos.x <= char2.pos.x + char2.dimWidth && 
        char1.strikeArea.pos.y + char1.strikeArea.dimHeight >= char2.pos.y && 
        char1.strikeArea.pos.y <= char2.pos.y + char2.dimHeight
    );
}

let countdown = 5;
function countdownTimer() {
    setTimeout(countdownTimer, 1000);
    if (countdown > 0) {
        countdown--;
        document.querySelector('#timer').innerHTML = countdown;
    }
    if (countdown === 0) {
        document.querySelector('#resultDisplay').style.display = 'flex';
        if (mainPlayer.vitality === adversary.vitality) {
            document.querySelector('#resultDisplay').innerHTML = 'Tie';
        } else if (mainPlayer.vitality > adversary.vitality) {
            document.querySelector('#resultDisplay').innerHTML = 'Player 1 Wins';
        } else if (mainPlayer.vitality < adversary.vitality) {
            document.querySelector('#resultDisplay').innerHTML = 'Player 2 Wins';
        }
    }
}

countdownTimer();

function initkombat() {
    window.requestAnimationFrame(initkombat);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    mainPlayer.refresh();
    adversary.refresh();

    mainPlayer.speed.x = 0;
    adversary.speed.x = 0;

    if (inputKeys.a.active && mainPlayer.recentKey === 'a') {
        mainPlayer.speed.x = -5;
    } else if (inputKeys.d.active && mainPlayer.recentKey === 'd') {
        mainPlayer.speed.x = 5;
    }

    if (inputKeys.ArrowRight.active && adversary.recentKey === 'ArrowRight') {
        adversary.speed.x = 5;
    } else if (inputKeys.ArrowLeft.active && adversary.recentKey === 'ArrowLeft') {
        adversary.speed.x = -5;
    }

    if (collisionDetection({
        char1: mainPlayer,
        char2: adversary
    })
        && mainPlayer.striking) {
        mainPlayer.striking = false;
        adversary.vitality -= 20;
        document.querySelector('#adversaryVitality').style.width = adversary.vitality + "%";
    }

    if (collisionDetection({
        char1: adversary,
        char2: mainPlayer
    })
        && adversary.striking) {
        adversary.striking = false;
        mainPlayer.vitality -= 20;
        document.querySelector('#playerVitality').style.width = mainPlayer.vitality + "%";
    }
}

initkombat();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w' :
            player.velocity.y = -20
            break
        case ' ' :
            player.attack()
            break
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp' :
            enemy.velocity.y = -20
            break
        case 'ArrowDown' :
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            lastKey = 'a'
            break
        case 'a' :
            keys.a.pressed = false
            lastKey = 'd'
            break
    }
    // enemy keys
    switch (event.key) {
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowRight'
            break
    }
})
