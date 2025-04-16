document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("email");  // Corregido
    let password = document.getElementById("password");
    let errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Limpiar mensaje de error antes de validar

    let isValid = true;

    if (username.value.trim() === "") {
        username.classList.add("is-invalid");
        isValid = false;
    } else {
        username.classList.remove("is-invalid");
    }

    if (password.value.trim() === "") {
        password.classList.add("is-invalid");
        isValid = false;
    } else {
        password.classList.remove("is-invalid");
    }

    if (!isValid) return;

    // Simulación de credenciales correctas
    const users = [
        { user: "coordinador@email.com", pass: "1234", role: "coordinador" },
        { user: "analista@email.com", pass: "5678", role: "analista" },
        { user: "admin@email.com", pass: "admin", role: "admin" },
        { user: "usuario@email.com", pass: "user123", role: "usuario" }
    ];

    const userFound = users.find(u => u.user === username.value && u.pass === password.value);

    if (userFound) {
        localStorage.setItem("role", userFound.role);
        localStorage.setItem("usuarioActual", userFound.user);

        let destino = "";
        if (userFound.role === "coordinador") {
            destino = "dash_coordinador.html";
        } else if (userFound.role === "analista") {
            destino = "dash_analista.html";
        } else if (userFound.role === "admin") {
            destino = "admin.html";  // Redirigir a reportes si es admin
        } else {
            destino = "dashboard.html"; // Puedes definir un destino genérico para otros roles
        }

        console.log("Redirigiendo a:", destino);
        window.location.href = destino;
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }

});
