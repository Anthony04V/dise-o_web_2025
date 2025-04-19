function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let cedulaInput = document.getElementById("cedula");
    let passwordInput = document.getElementById("password");
    let errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Limpiar mensaje de error antes de validar

    let isValid = true;

    if (cedulaInput.value.trim() === "") {
        cedulaInput.classList.add("is-invalid");
        isValid = false;
    } else {
        cedulaInput.classList.remove("is-invalid");
    }

    if (passwordInput.value.trim() === "") {
        passwordInput.classList.add("is-invalid");
        isValid = false;
    } else {
        passwordInput.classList.remove("is-invalid");
    }

    if (!isValid) return;

    // Enviar solicitud real al backend
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cedula: cedulaInput.value,
                password: passwordInput.value
            })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("usuarioActual", user.id_cedula);
            localStorage.setItem("role", capitalize(user.tipo_Usuario));

            let destino = "";
            if (user.tipo_Usuario === "Coordinador") {
                destino = "dash_coordinador.html";
            } else if (user.tipo_Usuario === "Analista") {
                destino = "dash_analista.html";
            } else if (user.tipo_Usuario === "Administrador") {
                destino = "admin.html";
            } else {
                destino = "dashboard.html";
            }

            window.location.href = destino;
        } else {
            errorMessage.textContent = "Usuario o contraseña incorrectos.";
        }
    } catch (error) {
        errorMessage.textContent = "Error de conexión con el servidor.";
        console.error(error);
    }
});
