// Fonction pour créer un cookie avec une durée de vie spécifique en secondes
function createCookie(name, value, seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure"; // Ajout de SameSite=None et Secure
}

// Fonction pour mettre à jour l'état de la boîte et créer un cookie
function updateBoxState() {
    var box = document.getElementById("box");
    var body = document.body; // Sélectionne l'élément body

    if (box.classList.contains("dark_mode")) {
        box.classList.remove("dark_mode");
        body.classList.remove("dark_mode"); // Retire la classe dark_mode de l'élément body
        createCookie("boxState", "indark_mode", 600); // Crée un cookie avec une durée de vie de 600 secondes (10 minutes)
    } else {
        box.classList.add("dark_mode");
        body.classList.add("dark_mode"); // Ajoute la classe dark_mode à l'élément body
        createCookie("boxState", "dark_mode", 600); // Crée un cookie avec une durée de vie de 600 secondes (10 minutes)
    }
}

// Ajouter un écouteur d'événements au bouton
document.getElementById("button").addEventListener("click", function() {
    updateBoxState();
});

// Vérifier s'il existe un cookie pour l'état de la boîte lors du chargement de la page
window.onload = function() {
    var boxState = document.cookie.replace(/(?:(?:^|.*;\s*)boxState\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (boxState) {
        var box = document.getElementById("box");
        var body = document.body; // Sélectionne l'élément body
        if (boxState === "dark_mode") {
            box.classList.add("dark_mode");
            body.classList.add("dark_mode"); // Ajoute la classe dark_mode à l'élément body
        } else {
            box.classList.remove("dark_mode");
            body.classList.remove("dark_mode"); // Retire la classe dark_mode de l'élément body
        }
    }
};
