import {
	THEME_STORAGE_KEY,
	THEME_DARK,
	THEME_LIGHT,
	ICON_CLASS_DARK,
	ICON_CLASS_LIGHT,
} from "./config.js";
// Cuando el navegador haya terminado de cargar y analizar la estructura HTML de la página (el DOM esté listo), entonces

// --- CAMBIO DE TEMA ---
function setupThemeToggle() {
	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement;

	// Si el botón no existe, no hacemos nada.
	if (!themeToggleButton) {
		return;
	}

	// Función que actualiza el botón para cambiar el tema.
	function updateVisuals(theme) {
		const icon = themeToggleButton.querySelector(".theme-toggle-icon");
		const isDark = theme === THEME_DARK;
		const ariaLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

		if (icon) {
			icon.classList.toggle(ICON_CLASS_DARK, isDark);
			icon.classList.toggle(ICON_CLASS_LIGHT, !isDark);
		}
		themeToggleButton.setAttribute("aria-label", ariaLabel);
	}

	// Función que alterna entre temas y guarda el tema en localStorage.
	// Esta función se llama al hacer clic en el botón.
	function toggle() {
		const currentTheme = htmlElement.getAttribute("data-theme");
		const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
		htmlElement.setAttribute("data-theme", newTheme);

		try {
			localStorage.setItem(THEME_STORAGE_KEY, newTheme);
		} catch (error) {
			console.error(
				"Error al guardar el tema en localStorage. El tema preferido no se guardará.",
				error
			);
		}
		updateVisuals(newTheme);
	}

	// Sincroniza la UI con el tema inicial establecido en el <head>.
	// Se ejecuta una vez al cargar la página.
	// Lee el tema que fue establecido en el <head>, después llama a updateVisuals para que el icono del botón coincida
	// con el tema inicial de la página
	const currentTheme = htmlElement.getAttribute("data-theme");
	if (currentTheme) {
		updateVisuals(currentTheme);
	}

	// Se añade el event listener al botón.
	themeToggleButton.addEventListener("click", toggle);
}
// --- FIN CAMBIO DE TEMA ---

// --- ACTUALIZACIÓN DINÁMICA DEL AÑO ---
function updateCopyrightYear() {
	const yearSpan = document.getElementById("current-year");
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
}
// --- FIN ACTUALIZACIÓN DINÁMICA DEL AÑO ---

// --- LÓGICA DE NAVEGACIÓN POR PESTAÑAS ---
function setupTabNavigation() {
	const navLinks = document.querySelectorAll(".main-nav a");
	// Se seleccionan dinámicamente todas las secciones que se pueden cambiar.
	const switchableSections = document.querySelectorAll(
		".main-content-right > .content-section"
	);

	function switchView(targetId) {
		// Si el targetId es inválido o no existe, se usa #curriculum como fallback.
		const validTargetId =
			targetId && document.querySelector(targetId) ? targetId : "#curriculum";

		navLinks.forEach((link) => {
			// Compara el href del enlace con el targetId válido para marcarlo como activo.
			link.classList.toggle(
				"active",
				link.getAttribute("href") === validTargetId
			);
		});

		// Muestra u oculta las secciones según el targetId válido.
		switchableSections.forEach((section) => {
			section.style.display = `#${section.id}` === validTargetId ? "" : "none";
		});
	}

	// Función centralizada para manejar la navegación.
	function handleNavigation() {
		const targetId = window.location.hash;
		switchView(targetId);
		// Llevamos al usuario a la parte superior de la página al cambiar de vista.
		window.scrollTo(0, 0);
	}

	// Añade event listeners a todos los enlaces de navegación.
	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault(); // Evita el comportamiento de anclaje por defecto.
			const targetId = e.currentTarget.getAttribute("href");
			// Actualizamos el hash, lo que activará el listener 'hashchange'.
			window.location.hash = targetId;
		});
	});

	// Escucha los cambios en el hash para actualizar la vista (navegación historial, URL manual).
	window.addEventListener("hashchange", handleNavigation);

	// Establece la vista inicial al cargar la página.
	handleNavigation();
}
// --- FIN LÓGICA DE NAVEGACIÓN POR PESTAÑAS ---

// --- CONFIGURACIÓN INICIAL ---
setupThemeToggle();
updateCopyrightYear();
setupTabNavigation();
document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
