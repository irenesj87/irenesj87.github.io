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
	// Esto hace que el código sea más escalable. Si se añade una nueva sección
	// en el HTML dentro de .main-content-right, el script la gestionará automáticamente.
	const switchableSections = document.querySelectorAll(
		".main-content-right > .content-section"
	);

	function switchView(targetId) {
		// Actualiza la clase 'active' en los enlaces de navegación
		navLinks.forEach((link) => {
			link.classList.toggle("active", link.getAttribute("href") === targetId);
		});

		// Muestra u oculta las secciones de forma explícita y escalable.
		// Esto es más robusto si se añaden más pestañas en el futuro.
		switchableSections.forEach((section) => {
			if (section) {
				// Compara el ID de la sección (sin #) con el targetId del enlace (con #)
				section.style.display = `#${section.id}` === targetId ? "" : "none";
			}
		});
	}

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault(); // Evita el comportamiento de anclaje por defecto
			const targetId = e.currentTarget.getAttribute("href");
			switchView(targetId);
			// Llevamos al usuario a la parte superior de la página al cambiar de vista
			window.scrollTo(0, 0);
		});
	});

	// Establece la vista inicial al cargar la página ("Home")
	switchView("#curriculum");
}
// --- FIN LÓGICA DE NAVEGACIÓN POR PESTAÑAS ---

// --- CONFIGURACIÓN INICIAL ---
setupThemeToggle();
updateCopyrightYear();
setupTabNavigation();
document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
