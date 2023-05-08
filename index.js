document.getElementById("buttonRules").onclick = function () {
    document.getElementById("modalRules").style.display = "block";
}

window.onclick = function(event) {
    if (event.target === document.getElementById('modalRules')) {
        document.getElementById('modalRules').style.display = 'none';
    }
}