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
		// window.matchMedia es una API para consultar media queries, y "(prefers-color-scheme: dark)" es la query.
		// .matches retorna true si la query coincide.
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

	// Function to show a specific section
	function showSectionById(id) {
		const sectionToShow = document.getElementById(id);
		if (sectionToShow) {
			sectionToShow.classList.add("active-section");
		} else {
			console.warn(`Section with ID "${id}" not found.`);
		}
	}

	// Function to update active state of navigation links
	function updateActiveNavLink(targetId) {
		navLinks.forEach((navLink) => {
			navLink.classList.remove("active");
			if (navLink.getAttribute("href") === `#${targetId}`) {
				navLink.classList.add("active");
			}
		});
	}

	// Add click event listeners to navigation links
	navLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			// 1. Prevent the default link behavior (jumping/reloading)
			event.preventDefault();
			// 2. Get the target section ID from the href (remove the '#')
			const targetId = link.getAttribute("href").substring(1);
			// 3. Hide all sections
			hideAllSections();
			// 4. Show the target section
			showSectionById(targetId);
			updateActiveNavLink(targetId); // Update active state of navigation links

			// Optional: Update URL hash without reloading (improves UX and allows bookmarking)
			// window.location.hash = targetId; // Uncomment if you want the URL to change (e.g., yoursite.com/#contact)
		});
	});

	// Handle initial page load based on URL hash or default to 'home'
	function initializeActiveSection() {
		const initialHash = window.location.hash.substring(1);
		let sectionToActivate = "home"; // Default section

		if (initialHash && document.getElementById(initialHash)) {
			sectionToActivate = initialHash;
		}

		hideAllSections();
		showSectionById(sectionToActivate);
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
	document.body.style.visibility = "visible";
}); // End of DOMContentLoaded
