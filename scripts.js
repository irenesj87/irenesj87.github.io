// Cuando el navegador haya terminado de cargar y analizar la estructura HTML de la página (el DOM esté listo), entonces ejecuta
// el código que se encuentra dentro de esta función.
// DOMContentLoaded: Nombre del evento que el event listener está escuchando. El evento DOMContentLoaded se dispara cuando el
// documento HTML inicial ha sido completamente cargado y analizado (parseado) por el navegador. Esto sirve para evitar errores,
// ya que si el JavaScript intenta manipular elementos HTML antes de que existan en el DOM será lo que se producirá.
document.addEventListener("DOMContentLoaded", () => {
	// --- Selectores de elementos del DOM ---
	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement;
	// --- FIN Selectores de elementos del DOM ---

	// --- CONSTANTES ---
	const ICON_CLASS_DARK = "fa-sun";
	const ICON_CLASS_LIGHT = "fa-moon";
	// --- FIN CONSTANTES ---

	// --- CAMBIO DE TEMA ---
	// Función que actualiza el botón para cambiar el tema. Si se está en modo claro tiene una luna y si se está en modo oscuro tiene
	// un sol.
	function updateThemeButtonVisuals(theme) {
		if (themeToggleButton) {
			const icon = themeToggleButton.querySelector(".theme-toggle-icon");
			const isDark = theme === window.APP_CONFIG.THEME_DARK;
			const ariaLabel = isDark
				? "Switch to light theme"
				: "Switch to dark theme";
			if (icon) {
				icon.classList.toggle(ICON_CLASS_DARK, isDark);
				icon.classList.toggle(ICON_CLASS_LIGHT, !isDark);
			}
			themeToggleButton.setAttribute("aria-label", ariaLabel);
		}
	}

	// Se añade el event listener al botón
	if (themeToggleButton) {
		themeToggleButton.addEventListener("click", toggleTheme);
	}

	function toggleTheme() {
		const currentTheme = htmlElement.getAttribute("data-theme");
		const newTheme =
			currentTheme === window.APP_CONFIG.THEME_DARK
				? window.APP_CONFIG.THEME_LIGHT
				: window.APP_CONFIG.THEME_DARK;
		htmlElement.setAttribute("data-theme", newTheme);
		try {
			// Si localStorage no es accesible, la preferencia de tema no se puede guardar.
			// El tema seguirá aplicándose para la sesión actual, pero no se recordará
			// en futuras visitas.
			localStorage.setItem(window.APP_CONFIG.THEME_STORAGE_KEY, newTheme);
		} catch (error) {
			console.error(
				"Error al guardar el tema en localStorage. El tema preferido no se guardará.",
				error
			);
		}
		updateThemeButtonVisuals(newTheme);
	}

	// Sincroniza la UI (el botón de tema) con el tema que ya fue establecido por el script en línea en el <head>.
	function initializeTheme() {
		// El tema se establece en el <head> para evitar FOUC. Aquí solo leemos ese valor.
		const currentTheme = htmlElement.getAttribute("data-theme");
		// Nos aseguramos de que el botón refleje el estado inicial correcto.
		if (currentTheme) {
			updateThemeButtonVisuals(currentTheme);
		}
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

	// --- CONFIGURACIÓN INICIAL ---
	initializeTheme();
	updateCopyrightYear();
	// Se fuerza el scroll a la parte superior como corrección final antes de mostrar la página.
	window.scrollTo(0, 0);
	document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
});
