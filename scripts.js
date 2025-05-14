document.addEventListener("DOMContentLoaded", () => {
	// --- TRADUCCIONES ---
	const translations = {
		// Traducciones en español
		es: {
			pageTitle: "Página Personal - Irene San José",
			switchToSpanish: "Cambiar a Español",
			switchToEnglish: "Cambiar a Inglés",
			currentSpanish: "Español (idioma actual)",
			currentEnglish: "Inglés (idioma actual)",
			themeToggleToDark: "Cambiar a tema oscuro",
			themeToggleToLight: "Cambiar a tema claro",
			headerSubtitle: "Ingeniero Técnico en Informática de Sistemas",
			skipLink: "Saltar al contenido principal",
			navHome: "Home",
			navCurriculum: "Currículum",
			navProjects: "Proyectos",
			homeTitle: "Sobre mí",
			homeP1:
				"Soy un Ingeniero Técnico en Informática de Sistemas, una formación que me ha proporcionado una base en principios fundamentales de la computación, la arquitectura de software y la resolución de problemas.",
			homeP2:
				"He enfocado mi trayectoria hacia el desarrollo web, especializándome en la creación de interfaces de usuario utilizando la librería React.js.",
			homeP3:
				"Sin embargo, mi experiencia no se limita al frontend; también he tenido la oportunidad de trabajar en proyectos empleando otros lenguajes de programación como Java y C, lo que me ha dado una perspectiva más amplia sobre el desarrollo de software en diferentes entornos.",
			homeP4:
				"Explora mi página para saber más de mis proyectos y de cómo ponernos en contacto.",
			cvLangTechTitle: "Lenguajes y Tecnologías",
			cvLangJava: "Java",
			cvLangWebDev: "Programación Web",
			cvLangHtml: "HTML5",
			cvLangCss: "CSS3",
			cvLangJs: "JavaScript",
			cvLangReact: "React.js, React-Bootstrap y React Redux",
			cvLangSql: "SQL (MySQL)",
			cvLangC: "C",
			cvLangCpp: "C++",
			cvLangShell: "Desarrollo de scripts de shell en Linux",
			cvLangOs: "Manejo avanzado de Linux y Windows",
			cvLangAssembly: "Lenguaje de ensamblador (Motorola 68000), PIC",
			cvEducationTitle: "Formación Académica",
			cvEducationDegree:
				"Ingeniería Técnica en Informática de Sistemas - Universidad Complutense de Madrid",
			cvCoursesTitle: "Cursos",
			cvCourseMobile:
				"Diseño web para dispositivos móviles con HTML5, CSS3 y JavaScript (Cliente) - EUROINNOVA BUSINESS SCHOOL",
			cvCourseSecurity:
				"Gestión de seguridad informática en la empresa - EUROINNOVA BUSINESS SCHOOL",
			cvLanguagesTitle: "Idiomas",
			cvLangSpanish: "Español (Nativo)",
			cvLangEnglish:
				"Inglés: Cambridge English Advanced (CAE) C1 - University of Cambridge",
			projectExcursionesTitle: "Excursiones Juntos",
			projectExcursionesDesc:
				"Una aplicación web creada con React.js para planificar y compartir excursiones. Permite a los usuarios crear cuentas, apuntarse a excursiones y buscarlas por nombre, dificultad, área y tiempo estimado en completar la ruta.",
			projectTechUsed: "Tecnologías Usadas:",
			projectLinkGithub: "Ver en GitHub",
			footerContactTitle: "Contacto",
			footerCopyrightText: "Irene San José. Todos los derechos reservados.",
		},
		// Traducciones en inglés
		en: {
			pageTitle: "Personal WebPage - Irene San Jose",
			switchToSpanish: "Switch to Spanish",
			switchToEnglish: "Switch to English",
			currentSpanish: "Spanish (current language)",
			currentEnglish: "English (current language)",
			themeToggleToDark: "Switch to dark theme",
			themeToggleToLight: "Switch to light theme",
			headerSubtitle: "Computer Engineer",
			skipLink: "Skip to main content",
			navHome: "Home",
			navCurriculum: "Resume",
			navProjects: "Projects",
			homeTitle: "About Me",
			homeP1:
				"I'm a Computer Engineer, a background that has provided me with a foundation in fundamental principles of computing, software architecture, and problem-solving.",
			homeP2:
				"I've focused my career on web development, specializing in creating user interfaces using the React.js library.",
			homeP3:
				"However, my experience is not exclusively limited to the frontend; I have also had the opportunity to work on projects using other programming languages such as Java and C, which has given me a broader perspective on software development in different environments.",
			homeP4:
				"Explore my page to learn more about my projects and how to get in touch.",
			cvLangTechTitle: "Languages and Technologies",
			cvLangJava: "Java",
			cvLangWebDev: "Web Programming",
			cvLangHtml: "HTML5",
			cvLangCss: "CSS3",
			cvLangJs: "JavaScript",
			cvLangReact: "React.js, React-Bootstrap and React Redux",
			cvLangSql: "SQL (MySQL)",
			cvLangC: "C",
			cvLangCpp: "C++",
			cvLangShell: "Linux Shell Script Development",
			cvLangOs: "Advanced Linux and Windows Management",
			cvLangAssembly: "Assembly Language (Motorola 68000), PIC",
			cvEducationTitle: "Academic Background",
			cvEducationDegree: "Computer Engineer - Complutense University of Madrid",
			cvCoursesTitle: "Courses",
			cvCourseMobile:
				"Web design for mobile devices with HTML5, CSS3 and JavaScript (Client) - EUROINNOVA BUSINESS SCHOOL",
			cvCourseSecurity:
				"IT security management in the company - EUROINNOVA BUSINESS SCHOOL",
			cvLanguagesTitle: "Languages",
			cvLangSpanish: "Spanish (Native)",
			cvLangEnglish:
				"English: Cambridge English Advanced (CAE) C1 - University of Cambridge",
			projectExcursionesTitle: "Excursiones Juntos",
			projectExcursionesDesc:
				"A web application created with React.js to plan and share excursion routes. It allows users to create accounts, sign up for excursions, and search for them by name, difficulty, area, and estimated time to complete the route.",
			projectTechUsed: "Used Technologies:",
			projectLinkGithub: "View on GitHub",
			footerContactTitle: "Contact",
			footerCopyrightText: "Irene San José. All rights reserved.",
		},
	};

	//  --- Selectores de elementos del DOM ---
	// Selecciona todos los enlaces <a> dentro de elementos con la clase "navbar"
	const navLinks = document.querySelectorAll(".navbar a");
	// Selecciona todos los elementos con la clase "content-section"
	const contentSections = document.querySelectorAll(".content-section");
	// Selecciona el elemento con el ID "theme-toggle", que es botón para cambiar el tema
	const themeToggleButton = document.getElementById("theme-toggle");
	// Selecciona el elemento raíz <html> del documento
	const htmlElement = document.documentElement;
	// Selecciona el elemento con el ID "current-year", usado para mostrar el año actual en el footer
	const yearSpan = document.getElementById("current-year");
	// Selecciona el elemento con el ID "lang-es", que es el botón para cambiar el idioma a español
	const langEsButton = document.getElementById("lang-es");
	// Selecciona el elemento con el ID "lang-en", que es el botón para cambiar el idioma a inglés
	const langEnButton = document.getElementById("lang-en");

	// --- CAMBIO DE TEMA (THEME TOGGLE) ---
	// Función para actualizar los aspectos visuales del botón de cambio de tema.
	// Recibe el tema actual ('dark' o 'light') como argumento.
	function updateThemeButtonVisuals(theme) {
		// Verifica si el elemento del botón de cambio de tema (themeToggleButton) existe en el DOM.
		if (themeToggleButton) {
			// Selecciona el elemento <i> (generalmente usado para iconos) dentro del botón de cambio de tema.
			const icon = themeToggleButton.querySelector("i");
			// Determina si el tema actual es "dark". La variable isDark será true si el tema es oscuro, false si es claro.
			const isDark = theme === "dark";

			// Obtiene la clave de traducción para el 'aria-label' del botón.
			// Esta clave se lee de los atributos 'data-*' del propio botón HTML.
			// dataset: Propiedad que permite acceder a todos los atributos
			// Si el tema actual es oscuro (isDark es true), se usará la clave para "Cambiar a tema claro".
			// Si el tema actual es claro (isDark es false), se usará la clave para "Cambiar a tema oscuro".
			const ariaKey = isDark
				? themeToggleButton.dataset.ariaKeyToLight
				: themeToggleButton.dataset.ariaKeyToDark;

			// Define un 'aria-label' de respaldo en inglés.
			// Este texto se usará si no se encuentra una traducción para la clave obtenida (ariaKey).
			const fallbackAriaLabel = isDark
				? "Switch to light theme" // Texto de respaldo si el tema actual es oscuro (el botón ofrecerá cambiar a claro)
				: "Switch to dark theme"; // Texto de respaldo si el tema actual es claro (el botón ofrecerá cambiar a oscuro)

			// Si se encuentra un elemento de icono dentro del botón:
			if (icon) {
				// Alterna la clase CSS 'fa-sun'.
				// Si 'isDark' es true (tema oscuro), se añade la clase 'fa-sun' (para mostrar el icono del sol, indicando que se puede cambiar a tema claro).
				// Si 'isDark' es false (tema claro), se elimina la clase 'fa-sun'.
				icon.classList.toggle("fa-sun", isDark);
				// Alterna la clase CSS 'fa-moon'.
				// Si '!isDark' es true (es decir, el tema es claro), se añade la clase 'fa-moon' (para mostrar el icono de la luna, indicando que se puede cambiar a tema oscuro).
				// Si '!isDark' es false (es decir, el tema es oscuro), se elimina la clase 'fa-moon'.
				icon.classList.toggle("fa-moon", !isDark);
			}

			// Establece el atributo 'aria-label' del botón de cambio de tema.
			// El 'aria-label' proporciona información accesible sobre la función del botón.
			// Se intenta obtener la traducción usando:
			// 1. 'translations[currentLang]': El objeto de traducciones para el idioma actual (ej. 'es' o 'en').
			// 2. 'ariaKey': La clave específica para el texto del aria-label (ej. "themeToggleToLight").
			// 3. 'translations[currentLang][ariaKey]': El texto traducido.
			// Si alguna de estas partes no existe o la traducción no se encuentra, se utiliza 'fallbackAriaLabel'.
			// Se asume que 'currentLang' (el idioma actual) está definido y actualizado antes de llamar a esta función.
			themeToggleButton.setAttribute(
				"aria-label",
				(translations[currentLang] && // Verifica que exista el objeto de traducciones para el idioma actual
					ariaKey && // Verifica que la clave ariaKey tenga un valor
					translations[currentLang][ariaKey]) || // Intenta obtener la traducción específica
					fallbackAriaLabel // Si no se encuentra la traducción, usa el texto de respaldo
			);
		}
	}

	// Se añade el event listener al botón
	if (themeToggleButton) {
		themeToggleButton.addEventListener("click", toggleTheme);
	}

	// Función para establecer un tema específico (claro u oscuro).
	// Recibe el nombre del tema ('dark' o 'light') como argumento.
	function setTheme(theme) {
		// Establece el atributo 'data-theme' en el elemento <html>.
		// Esto permite aplicar estilos CSS específicos para el tema actual.
		// Ejemplo: html[data-theme="dark"] { /* estilos para tema oscuro */ }
		htmlElement.setAttribute("data-theme", theme);

		// Guarda la preferencia del tema en el localStorage del navegador.
		// Esto permite que el tema seleccionado persista entre sesiones.
		localStorage.setItem("theme", theme);

		// Actualiza los aspectos visuales del botón de cambio de tema
		// para que refleje el tema recién establecido (ej. cambiar el icono).
		updateThemeButtonVisuals(theme);
	}

	// Función para alternar entre el tema claro y oscuro.
	function toggleTheme() {
		// Obtiene el tema actual leyendo el atributo 'data-theme' del elemento <html>.
		// Si el tema actual es 'dark', newTheme se establecerá a 'light'.
		// Si el tema actual es 'light' (o cualquier otra cosa), newTheme se establecerá a 'dark'.
		const newTheme =
			htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

		// Llama a setTheme() para aplicar el nuevo tema calculado.
		setTheme(newTheme);
	}

	// Configuración inicial del tema.
	// Esta función se llama cuando la página se carga para establecer el tema inicial.
	function initializeTheme() {
		// Intenta obtener el tema guardado previamente por el usuario desde localStorage.
		const savedTheme = localStorage.getItem("theme");

		// Comprueba la preferencia de tema del sistema operativo del usuario solo si no hay un tema guardado en localStorage.
		// 'window.matchMedia' permite consultar el resultado de una media query de CSS.
		// '(prefers-color-scheme: dark)' es una media query que retorna true si el usuario
		// ha configurado su sistema operativo para preferir el modo oscuro.
		const prefersDark =
			window.matchMedia && // Primero, verifica que el navegador soporte 'matchMedia'.
			window.matchMedia("(prefers-color-scheme: dark)").matches; // Luego, verifica la preferencia.

		// Establece el tema.
		// Se da prioridad al tema guardado por el usuario (savedTheme).
		// Si no hay un tema guardado, se usa la preferencia del sistema:
		//   - Si 'prefersDark' es true, se usa el tema 'dark'.
		//   - Si 'prefersDark' es false (o 'matchMedia' no es soportado), se usa el tema 'light' como predeterminado.
		setTheme(savedTheme || (prefersDark ? "dark" : "light"));
	}
	// --- FINAL DE CAMBIO DE TEMA ---

	// Function to hide all sections
	function hideAllSections() {
		contentSections.forEach((section) => {
			section.classList.remove("active-section");
		});
	}

	// Function to show a specific section
	function showSectionById(id) {
		const sectionToShow = document.getElementById(id);
		console.log(
			`Attempting to show section: ${id}. Element found:`,
			sectionToShow
		);
		if (sectionToShow) {
			sectionToShow.classList.add("active-section");
			console.log(`Added active-section to:`, sectionToShow);
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

	// -- Año actual en el Footer -- //
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}

	// --- INTERNATIONALIZATION (I18N) ---
	let currentLang;

	function applyTranslations(lang) {
		document.documentElement.lang = lang;
		document.title = translations[lang]?.pageTitle || "Personal WebPage";

		document.querySelectorAll("[data-translate-key]").forEach((el) => {
			const key = el.getAttribute("data-translate-key");
			if (translations[lang][key]) {
				el.innerHTML = translations[lang][key]; // Use innerHTML to support potential HTML in translations
			}
		});

		// Update ARIA labels for language buttons using their data-aria-key attributes
		const langButtons = [
			{
				el: langEsButton,
				langCode: "es",
				fallbackTarget: "Switch to Spanish",
				fallbackActive: "Spanish (current language)",
			},
			{
				el: langEnButton,
				langCode: "en",
				fallbackTarget: "Switch to English",
				fallbackActive: "English (current language)",
			},
		];

		langButtons.forEach((item) => {
			if (item.el) {
				const isActive = lang === item.langCode;
				// Get the appropriate translation key from the button's data attributes
				const ariaKey = isActive
					? item.el.dataset.ariaKeyActive
					: item.el.dataset.ariaKeyTarget;
				const fallbackLabel = isActive
					? item.fallbackActive
					: item.fallbackTarget;

				item.el.setAttribute(
					"aria-label",
					(translations[lang] && ariaKey && translations[lang][ariaKey]) ||
						fallbackLabel
				);
			}
		});

		// Update theme toggle button ARIA label
		// currentLang will be updated to 'lang' by the setLanguage function right after this
		updateThemeButtonVisuals(htmlElement.getAttribute("data-theme"));

		// Update active language button
		langEsButton.classList.toggle("active-lang", lang === "es");
		langEnButton.classList.toggle("active-lang", lang === "en");
	}

	function setLanguage(lang) {
		currentLang = lang;
		localStorage.setItem("lang", lang); // Consistent key with inline script
		applyTranslations(lang);
		// Body visibility will be handled at the end of DOMContentLoaded
	}

	function getInitialLanguage() {
		const savedLang = localStorage.getItem("lang"); // Consistent key
		if (savedLang && translations[savedLang]) {
			return savedLang;
		}
		const browserLang = navigator.language.split("-")[0];
		if (translations[browserLang]) {
			return browserLang;
		}
		return "es"; // Default language as per your HTML
	}

	if (langEsButton) {
		langEsButton.addEventListener("click", () => setLanguage("es"));
	}
	if (langEnButton) {
		langEnButton.addEventListener("click", () => setLanguage("en"));
	}

	// Initial setup
	currentLang = getInitialLanguage(); // Get initial language first
	initializeTheme(); // Initialize theme (this will also call updateThemeButtonVisuals)
	setLanguage(currentLang); // Apply initial language
	initializeActiveSection(); // Set up the initial visible section and active nav link
	// --- Make body visible AFTER all initial setup ---
	document.body.style.visibility = "visible";
}); // End of DOMContentLoaded
