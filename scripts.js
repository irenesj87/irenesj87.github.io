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
	// --- CONSTANTES DE TEMA ---
	const THEME_DARK = "dark";
	const THEME_LIGHT = "light";
	const THEME_STORAGE_KEY = "theme";
	// --- FIN CONSTANTES DE TEMA ---

	// --- CAMBIO DE TEMA ---
	// Función que actualiza el botón para cambiar el tema. Si se está en modo claro tiene una luna y si se está en modo oscuro
	// tiene un sol.
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

	// Se añade el event listener al botón
	if (themeToggleButton) {
		themeToggleButton.addEventListener("click", toggleTheme);
	}

	function setTheme(theme) {
		htmlElement.setAttribute("data-theme", theme);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch (error) {
			console.error(
				"Error al guardar el tema en localStorage. El tema preferido no se guardará.",
				error
			);
		}
		updateThemeButtonVisuals(theme);
	}

	function toggleTheme() {
		// Se obtiene el tema actual...
		const currentTheme = htmlElement.getAttribute("data-theme");
		// ...y luego se determina el nuevo tema
		const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
		setTheme(newTheme);
	}

	// Esta función se llama cuando se carga la página para inicializar el tema
	function initializeTheme() {
		// Intenta obtener el tema guardado previamente en el almacenamiento local (localStorage)
		let savedTheme = null;
		try {
			savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		} catch (error) {
			console.warn(
				"localStorage no está disponible. No se pudo cargar el tema guardado y las preferencias no se mantendrán entre sesiones.",
				error
			);
		}
		// Comprueba si el sistema operativo o navegador del usuario prefiere un esquema de color oscuro
		// window.matchMedia: API para consultar media queries, y "(prefers-color-scheme: dark)" es la query.
		// .matches: Retorna true si la query coincide.
		const prefersDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;

		// 1. Si hay un tema guardado (savedTheme es true), usa ese tema.
		// 2. Si no hay un tema guardado (savedTheme es false), comprueba si el usuario prefiere oscuro.
		// 3. Si prefiere oscuro, usa 'dark'; de lo contrario, usa 'light'.
		setTheme(savedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT));
	}
	// --- FIN CAMBIO DE TEMA ---

	// --- CONFIGURACIÓN INICIAL ---
	initializeTheme();
	document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
}); // End of DOMContentLoaded
