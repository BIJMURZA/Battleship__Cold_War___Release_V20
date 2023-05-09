let ships = 4; // общее количество кораблей
let fships = 4; // количество клеток для Линкора (4-х палубный корабль)
let thships = 6; // количество клеток для Крейсера (3-х палубный корабль)
let twships = 6; // количество клеток для Эсминцев (2-х палубный корабль)
let shlupki = 4; // количество клеток для Шлюпки (1 палубный корабль)
let begin = null;
let left = null;
let right = null;
let up = null;
let down = null;
let direction = null; // направление клеток
let array = [];
const lot = Math.floor(Math.random() * 2) + 1; // 1 - Первый ход за союзниками || 2 - Первый ход за Капиталистами
let move = 1; //1 - ваш ход, 0 - ход противника

let allaybattlefield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]; // поле союзника

let enemybattlefield = [
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0]
] // поле врага

// 0 - пустое поле 1 - расположение корабля 2 - подбитый корабль 

document.getElementById("buttonRules").onclick = function () {
    document.getElementById("modalRules").style.display = "block";
}

document.getElementById("buttonSettings").onclick = function () {
    document.getElementById("modalSettings").style.display = "block";
}

document.getElementById("saveSettings").addEventListener("click", function() {
    if (document.getElementById('volumeSwitch').checked === true) {
        document.getElementById("audioTheme").play();
    } else {
        document.getElementById("audioTheme").pause();
    }
    document.getElementById('modalSettings').style.display='none';
})

window.onclick = function(event) {
    if (event.target === document.getElementById('modalRules')) {
        document.getElementById('modalRules').style.display = 'none';
    }
}

function fill (array) {
    for (let i = 0; i < array.length - 1; i += 2) {
        let x = array[i];
        let y = array[i+1];

        if (getCell(x, y) !== undefined) {
            allaybattlefield[x][y] = 1;
        }
    }
    return array.length = 0;
}

function dir (id) {
    if (direction === null) {
        if (id === left - 1 || id === right + 1) {
            direction = "hor";
        }
        if (id === up - 10 || id === down + 10) {
            direction = "ver";
        }
    }

    if (direction === "hor"){
        if (id === left - 1) {
            left = id;
            return true;
        } else if (id === right + 1) {
            right = id;
            return true;
        } else {return 0;}
    } else if (direction === "ver") {
        if (id === up - 10) {
            up = id;
            return true;
        } else if (id === down + 10) {
            down = id;
            return true;
        } else {return false;}
    } else {return false;}
}

function getCell(x, y) {
    if (x < 0 || x >= allaybattlefield.length || y < 0 ||y >= allaybattlefield[x].length) {
        return undefined;
    }
    return allaybattlefield[x][y];
}

function check (x, y) {
    if ((getCell(x, y) !== 1) &&
        (getCell(x, y-1) !== 1) && (getCell(x, y+1) !== 1) &&
        (getCell(x-1, y) !== 1) && (getCell(x+1, y) !== 1) &&
        (getCell(x-1, y-1) !== 1) && (getCell(x-1, y+1) !== 1) &&
        (getCell(x+1, y-1) !== 1) && (getCell(x+1, y+1) !== 1))
    {
        console.log("1");
        return true;
    }
    else
    {
        console.log("0")
        return false;
    }
}

function linkor (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (fships > 0) {
        if (begin == null) {
            begin = parseInt(event.target.id);
            left = begin;
            right = begin;
            up = begin;
            down = begin;
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            console.log(allaybattlefield);
            fships--;
            return;
        }
        if (dir(parseInt(event.target.id)) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            fships --;
        } else { return; }

        if (fships === 0) {
            ships--;
            begin = null;
            left = null;
            right = null;
            up = null;
            down = null;
            direction = null;
        }
    }
    locate_albattlefield();
}

function craser (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (thships > 0) {
        if (check(x, y) === true) {
            if (begin === null) {
                begin = parseInt(event.target.id);
                left = begin;
                right = begin;
                up = begin;
                down = begin;
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                thships--;
                return;
            }
            if (dir(parseInt(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                thships--;
            } else {
                return;
            }
            if (thships === 3) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (thships === 0) {
                ships--;
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            }
        }
    }
    locate_albattlefield();
}

function esminec (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (twships > 0) {
        if (check(x, y) === true) {
            if (begin === null) {
                begin = parseInt(event.target.id);
                left = begin;
                right = begin;
                up = begin;
                down = begin;
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
                return;
            }
            if (dir(parseInt(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
            } else {
                return;
            }

            if (twships === 4) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (twships === 2) {
                fill(array);
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            } else if (twships === 0) {
                console.log("twships = 0: " + array)
                fill(array);
                ships--;
                begin = null;
                left = null;
                right = null;
                up = null;
                down = null;
                direction = null;
            }
        }
    }
    locate_albattlefield();
}

function shlupka (event) {
    let x = Math.floor(( parseInt(event.target.id) - 1) / 10);
    let y = (parseInt(event.target.id) - 1) % 10;
    if (shlupki >= 1) {
        if (check(x,y) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            shlupki --;
            if (shlupki === 1) {
                ships --;
            }
        }
    }
    locate_albattlefield();
}

function checkNbattlefield (x, y) {
    return enemybattlefield[x][y] === 1 || enemybattlefield[x][y] === 2;
}

function checkUbattlefield (x, y) {
    return enemybattlefield[x][y] === 1 || enemybattlefield[x][y] === 2;
}

function checkEndGame() {
    if (enemybattlefield.includes('1') === true) {
        alert("ПОБЕДА ТОВАРИЩИ!");
        window.location.reload();
    }
    if (allaybattlefield.includes("1") === false) {
        alert("КАПИТАЛИСТЫ ВЫЙГРАЛИ!");
        window.location.reload();
    }
}

function shoot(event) {
    if (move === 1) {
        let x = Math.floor(((parseInt(event.target.id) % 100) - 1) / 10);
        let y = ((parseInt(event.target.id) % 100) - 1) % 10;
        if (checkNbattlefield(x, y) === true){
            document.getElementById(event.target.id).style.background = "blue";
            enemybattlefield[x][y] = 2;
            checkEndGame()
            shootUSSR();
        }
        else {
            document.getElementById(event.target.id).style.background = "green";
            move = 0;
            document.getElementById("arrow").src = "/picture/lot_NATO.png"
            setTimeout(shootNATO, 1000);
        }
    } else if (move === 0) {
        let x = Math.floor(((parseInt(event) % 100) - 1) / 10);
        let y = ((parseInt(event) % 100) - 1) % 10;
        if (checkUbattlefield(x, y) === true) {
            document.getElementById(event).style.background = "gray";
            allaybattlefield[x][y] = 0;
            shootNATO();
        }
        else {

            document.getElementById(event).style.background = "green";
            document.getElementById("arrow").src = "/picture/lot_USSR.png"
            move = 1;
            shootUSSR();
        }
    }
}

function shootUSSR() {
    document.getElementById("albattlefield").addEventListener("click", function (event) {
        event.stopPropagation();
    });
    document.getElementById("enbattlefield").addEventListener("click", shoot);
}

function shootNATO() {
    let id = Math.floor(Math.random()*100) + 1;
    shoot(String(id));
}

function startShoot() {
    newTableEnbattlefield();
    if (lot === 1) {
        move = 1;
        shootUSSR();
    } else if (lot === 2) {
        move = 0;
        shootNATO();
    }
}

function locate_albattlefield() {
    switch (ships) {
        case 4:
            document.getElementById("albattlefield").addEventListener("click", linkor);
            document.getElementById("out").innerText = "Расположите линкоры!";
            break;
        case 3:
            document.getElementById("albattlefield").addEventListener("click", craser);
            document.getElementById("out").innerText = "Расположите крейсеры!";
            break;
        case 2:
            document.getElementById("albattlefield").addEventListener("click", esminec);
            document.getElementById("out").innerText = "Расположите Эсминцы!";
            break;
        case 1:
            document.getElementById("albattlefield").addEventListener("click", shlupka);
            document.getElementById("out").innerText = "Расположите шлюпки!";
            break;
    }
    if (ships === 0) {
        document.getElementById("out").remove();
        startShoot();
    }
}

function newTableAlbattlefield() {
    document.getElementById("out").style.display = "block";
    document.getElementById("albattlefield").classList.remove("hidden");
    document.getElementById("img_USSR").style.display = "block";
    locate_albattlefield();
}

function newTableEnbattlefield () {
    document.getElementById("enbattlefield").style.display = "block";
    document.getElementById("img_NATO").style.display = "block";
    document.getElementById("arrow").style.display = "block";
}

function startNewBackground() {
    document.getElementById("videoBackground").src = "video/ColdWar_Theme.mp4";
    document.getElementById("videoBackground").play();
    document.getElementById("audioTheme").src = "ost/ColdWar%20-%20Comrades.mp3";
    document.getElementById("audioTheme").play();
    newTableAlbattlefield();
}

function start() {
    document.getElementById("buttonStartGame").remove();
    document.getElementById("buttonRules").remove();
    document.getElementById("buttonSettings").remove();
    startNewBackground();
}