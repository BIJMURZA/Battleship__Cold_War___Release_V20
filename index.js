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
