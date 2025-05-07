document.addEventListener("DOMContentLoaded", () => {
	// --- TRADUCCIONES ---
	const translations = {
		es: {
			pageTitle: "Página Personal - Irene San José",
			themeToggleLightAriaLabel: "Cambiar a tema claro",
			themeToggleDarkAriaLabel: "Cambiar a tema oscuro",
			langEsAriaLabel: "Cambiar a Español",
			langEnAriaLabel: "Cambiar a Inglés",
			headerSubtitle: "Ingeniero Técnico en Informática de Sistemas",
			navHome: "Home",
			navCurriculum: "Currículum",
			navProjects: "Proyectos",
			homeTitle: "Sobre mí",
			homeP1:
				"Soy un Ingeniero Técnico en Informática de Sistemas, una formación que me ha proporcionado una base en los principios fundamentales de la computación, la arquitectura de software y la resolución de problemas.",
			homeP2:
				"He enfocado mi trayectoria hacia el desarrollo web, especializándome en la creación de interfaces de usuario dinámicas y eficientes utilizando la librería React.js.",
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
				"Una aplicación web creada con React para planificar y compartir rutas de senderismo y excursiones. Permite a los usuarios crear cuentas, apuntarse a excursiones y buscarlas por nombre, dificultad, área y tiempo estimado en completar la ruta.",
			projectTechUsed: "Tecnologías Usadas:",
			projectLinkGithub: "Ver en GitHub",
			footerContactTitle: "Contacto",
			footerCopyrightText: "Irene San José. Todos los derechos reservados.",
		},
		en: {
			pageTitle: "Personal WebPage - Irene San Jose",
			themeToggleLightAriaLabel: "Switch to light theme",
			themeToggleDarkAriaLabel: "Switch to dark theme",
			langEsAriaLabel: "Switch to Spanish",
			langEnAriaLabel: "Switch to English",
			headerSubtitle: "Computer Engineer",
			navHome: "Home",
			navCurriculum: "Resume",
			navProjects: "Projects",
			homeTitle: "About Me",
			homeP1:
				"I'm a Computer Engineer, a background that has provided me with a foundation in the fundamental principles of computing, software architecture, and problem-solving.",
			homeP2:
				"I've focused my career on web development, specializing in creating dynamic and efficient user interfaces using the React.js library.",
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
			cvEducationDegree:
				"Technical Engineering in Computer Systems - Complutense University of Madrid",
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
				"A web application created with React to plan and share hiking and excursion routes. It allows users to create accounts, sign up for excursions, and search for them by name, difficulty, area, and estimated time to complete the route.",
			projectTechUsed: "Used Technologies:",
			projectLinkGithub: "View on GitHub",
			footerContactTitle: "Contact",
			footerCopyrightText: "Irene San José. All rights reserved.",
		},
	};

	//  --- DOM Element Selectors ---
	const navLinks = document.querySelectorAll(".navbar a");
	const contentSections = document.querySelectorAll(".content-section");
	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement;
	const yearSpan = document.getElementById("current-year");
	const langEsButton = document.getElementById("lang-es");
	const langEnButton = document.getElementById("lang-en");

	// Function to hide all sections
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

		// Ensure the default section is marked active in HTML if no hash
		if (!initialHash && contentSections.length > 0) {
			const homeSection = document.getElementById("home");
			if (homeSection && !homeSection.classList.contains("active-section")) {
				homeSection.classList.add("active-section");
			}
			const homeLink = document.querySelector('.navbar a[href="#home"]');
			if (homeLink && !homeLink.classList.contains("active")) {
				homeLink.classList.add("active");
			}
		}
	}

	// --- THEME TOGGLE ---
	function updateThemeButtonVisuals(theme) {
		if (themeToggleButton) {
			const icon = themeToggleButton.querySelector("i");
			const isDark = theme === "dark";
			const ariaLabelKey = isDark
				? "themeToggleLightAriaLabel"
				: "themeToggleDarkAriaLabel";
			const fallbackAriaLabel = isDark
				? "Switch to light theme"
				: "Switch to dark theme";

			if (icon) {
				icon.classList.toggle("fa-sun", isDark);
				icon.classList.toggle("fa-moon", !isDark);
			}
			themeToggleButton.setAttribute(
				"aria-label",
				(translations[currentLang] &&
					translations[currentLang][ariaLabelKey]) ||
					fallbackAriaLabel
			);
		}
	}

	// Add click event listener to the button
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

	// Initial setup
	function initializeTheme() {
		const savedTheme = localStorage.getItem("theme");
		// Check for system preference if no saved theme
		const prefersDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		setTheme(savedTheme || (prefersDark ? "dark" : "light"));
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

		// Update ARIA labels for language buttons
		if (langEsButton) {
			langEsButton.setAttribute(
				"aria-label",
				translations[lang]?.langEsAriaLabel || "Switch to Spanish"
			);
		}
		if (langEnButton) {
			langEnButton.setAttribute(
				"aria-label",
				translations[lang]?.langEnAriaLabel || "Switch to English"
			);
		}

		// Update theme toggle button ARIA label
		updateThemeButtonVisuals(htmlElement.getAttribute("data-theme"));

		// Update active language button
		langEsButton.classList.toggle("active-lang", lang === "es");
		langEnButton.classList.toggle("active-lang", lang === "en");
	}

	function setLanguage(lang) {
		currentLang = lang;
		localStorage.setItem("preferredLang", lang);
		applyTranslations(lang);
	}

	function getInitialLanguage() {
		const savedLang = localStorage.getItem("preferredLang");
		if (savedLang && translations[savedLang]) {
			return savedLang;
		}
		const browserLang = navigator.language.split("-")[0];
		if (translations[browserLang]) {
			return browserLang;
		}
		return "es"; // Default language
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
	setLanguage(currentLang); // Apply initial language (this will also call updateThemeButtonVisuals via applyTranslations)
	initializeActiveSection(); // Set up the initial visible section and active nav link
}); // End of DOMContentLoaded
