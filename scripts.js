document.addEventListener("DOMContentLoaded", () => {
	// --- Selectores de elementos del DOM ---
	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement;
	// --- FIN Selectores de elementos del DOM ---
	// --- CONSTANTES DE TEMA ---
	const THEME_DARK = "dark";
	const THEME_LIGHT = "light";
	const THEME_STORAGE_KEY = "theme";
	// --- FIN CONSTANTES DE TEMA ---

	// --- CAMBIO DE TEMA ---
	function updateThemeButtonVisuals(theme) {
		if (themeToggleButton) {
			const icon = themeToggleButton.querySelector("i");
			const isDark = theme === THEME_DARK;
			const ariaLabel = isDark
				? "Switch to light theme"
				: "Switch to dark theme";
			if (icon) {
				icon.classList.toggle("fa-sun", isDark);
				icon.classList.toggle("fa-moon", !isDark);
			}
			themeToggleButton.setAttribute("aria-label", ariaLabel);
		}
	}

	if (themeToggleButton) {
		themeToggleButton.addEventListener("click", toggleTheme);
	}

	function setTheme(theme) {
		htmlElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch (error) {
			console.error(
				"localStorage is not available. The preferred theme will not be saved.",
				error
			);
		}
		updateThemeButtonVisuals(theme);
	}

	function toggleTheme() {
		const newTheme =
			htmlElement.getAttribute("data-theme") === THEME_DARK
				? THEME_LIGHT
				: THEME_DARK;
		setTheme(newTheme);
	}

	// Esta función se llama cuando se carga la página para inicializar el tema
	function initializeTheme() {
		// Intenta obtener el tema guardado previamente en el almacenamiento local (localStorage)
		let savedTheme = null;
		try {
			savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		} catch (error) {
			console.warn("localStorage is not available. The preferred theme will not be saved", error)
		}
		// Comprueba si el sistema operativo o navegador del usuario prefiere un esquema de color oscuro
		// window.matchMedia: API para consultar media queries, y "(prefers-color-scheme: dark)" es la query.
		// .matches: Retorna true si la query coincide.
		const prefersDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;

		// Establece el tema:
		// 1. Si hay un tema guardado (savedTheme es true), usa ese tema.
		// 2. Si no hay tema guardado (savedTheme es false), comprueba si el usuario prefiere oscuro.
		// 3. Si prefiere oscuro, usa 'dark'; de lo contrario, usa 'light'.
		setTheme(savedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT));
	}
	// --- FIN CAMBIO DE TEMA ---

	// --- CONFIGURACIÓN INICIAL ---
	initializeTheme();
	document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
}); // End of DOMContentLoaded
