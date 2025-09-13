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
	initializeTheme();
	updateCopyrightYear();
	setupTabNavigation();
	document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
});
