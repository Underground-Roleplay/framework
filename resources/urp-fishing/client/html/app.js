function toggleGUI(toggle) {
    if (toggle) {
        document.getElementById('body').style.visibility = 'visible';
        document.getElementById('body').style.opacity = '1.0';
    } else if (!toggle) {
        document.getElementById('body').style.visibility = 'hidden';
        document.getElementById('body').style.opacity = '0.0';
    }
}

function hideAllMSG() {
    document.getElementById('fishMessage1').style.display = 'none';
    document.getElementById('fishMessage2').style.display = 'none';
    document.getElementById('fishMessage3').style.display = 'none';
}

let currentDiff = null;
let currentKeys = null;

function showMSG(type, diff, keys) {
    hideAllMSG();
    if (type == 'fishMessage1') {
        document.getElementById(type).style.display = 'block';
    } else if (type == 'fishMessage2') {
        document.getElementById(type).style.display = 'block';
    } else if (
        type == 'fishMessage3' &&
        diff != undefined &&
        keys != undefined
    ) {
        document.getElementById('keysPuzzle').innerHTML = '';
        for (let index = 0; index < keys.length; index++) {
            document.getElementById(
                'keysPuzzle'
            ).innerHTML += `<button id="game${index}" type="button" class="btn btn-light keybk unsolved">${keys[index]}</button>`;
        }

        currentDiff = diff;
        currentKeys = keys;

        document.getElementById(type).style.display = 'block';
    }
}

function setSolved(index) {
    let element = document.getElementById(`game${index}`);
    element.classList.add('solved');
}

if ('alt' in window) {
    alt.on('toggleGUI', toggleGUI);
    alt.on('showMSG', showMSG);
    alt.on('setSolved', setSolved);
}
