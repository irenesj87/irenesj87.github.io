document.addEventListener("DOMContentLoaded", () => {
	// --- Selectores de elementos del DOM ---
	const navLinks = document.querySelectorAll(".navbar a");
	const contentSections = document.querySelectorAll(".content-section");
	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement;
	const yearSpan = document.getElementById("current-year");

	// --- CAMBIO DE TEMA ---
	function updateThemeButtonVisuals(theme) {
		if (themeToggleButton) {
			const icon = themeToggleButton.querySelector("i");
			const isDark = theme === "dark";
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
		updateThemeButtonVisuals(theme);
	}

	function toggleTheme() {
		const newTheme =
			htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
		setTheme(newTheme);
	}

	// Esta función se llama cuando se carga la página para inicializar el tema
	function initializeTheme() {
		// Intenta obtener el tema guardado previamente en el almacenamiento local (localStorage)
		const savedTheme = localStorage.getItem("theme");

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
		setTheme(savedTheme || (prefersDark ? "dark" : "light"));
	}
	// --- FIN CAMBIO DE TEMA ---

	// --- SÓLO SECCIÓN ACTIVA VISIBLE ---
	function hideAllSections() {
		contentSections.forEach((section) => {
			section.classList.remove("active-section");
		});
	}

	function showSectionById(id) {
		const sectionToShow = document.getElementById(id);
		if (sectionToShow) {
			sectionToShow.classList.add("active-section");
		} else {
			console.warn(`Section with ID "${id}" not found.`);
		}
	}

	function updateActiveNavLink(targetId) {
		navLinks.forEach((navLink) => {
			navLink.classList.remove("active-nav-link");
			if (navLink.getAttribute("href") === `#${targetId}`) {
				navLink.classList.add("active-nav-link");
			}
		});
	}

	/**
	 * Se encarga de la navegación interactiva dentro de la página cuando un usuario hace clic en un enlace de la barra de
	 * navegación
	 **/
	navLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			event.preventDefault();
			const targetId = link.getAttribute("href").substring(1);
			hideAllSections();
			showSectionById(targetId);
			updateActiveNavLink(targetId);

			// Update URL hash without reloading (improves UX and allows bookmarking)
			window.location.hash = targetId; // Uncomment if you want the URL to change (e.g., yoursite.com/#contact)
		});
	});

	// Establece la sección visible inicial cuando la página se carga por primera vez
	function initializeActiveSection() {
		// Lee el hash de la URL que es la parte que va detrás de '#'
		const initialHash = window.location.hash.substring(1);
		let sectionToActivate = "home"; // Sección pr defecto
		// Si existe un hash y corresponde a un 'id' de una sección existente en la página
		if (initialHash && document.getElementById(initialHash)) {
			// Esa sección se convierte en la que se va a activar
			sectionToActivate = initialHash;
		}
		hideAllSections();
		// Se llama para mostrar la seción determinada (ya sea por el hash o la de por defecto)
		showSectionById(sectionToActivate);
		// Resalta el enlace de navegación correspondiente a la sección activa
		updateActiveNavLink(sectionToActivate);
	}
	// --- FIN SÓLO SECCIÓN ACTIVA VISIBLE ---

	// -- Año actual en el Footer --
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

	// --- CONFIGURACIÓN INICIAL ---
	initializeTheme(); // Inicializa el tema
	initializeActiveSection(); // Muestra la primera sección visible de la barra de navegación
	document.body.style.visibility = "visible"; // Muestra el <body> ahora para evitar el FOUC
}); // End of DOMContentLoaded
