document.addEventListener("DOMContentLoaded", () => {
	// Get all navigation links
	const navLinks = document.querySelectorAll(".navbar a");
	// Get all content sections
	const contentSections = document.querySelectorAll(".content-section");

	// Function to hide all sections
	function hideAllSections() {
		contentSections.forEach((section) => {
			section.classList.remove("active-section");
		});
	}

	// Function to show a specific section
	function showSection(id) {
		const sectionToShow = document.getElementById(id);
		if (sectionToShow) {
			sectionToShow.classList.add("active-section");
		} else {
			console.warn(`Section with ID "${id}" not found.`); // Optional: Warn if section doesn't exist
		}
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
			showSection(targetId);

			// Optional: Update URL hash without reloading (improves UX and allows bookmarking)
			// window.location.hash = targetId; // Uncomment if you want the URL to change (e.g., yoursite.com/#contact)
		});
	});

	// Optional: Handle initial page load based on URL hash
	// This allows direct linking like yoursite.com/#contact to work
	const initialHash = window.location.hash.substring(1);
	if (initialHash) {
		hideAllSections(); // Hide the default section first
		showSection(initialHash);
	} else {
		// Ensure the default section is shown if no hash is present
		// This is usually handled by the initial HTML class, but good for robustness
		const defaultSection = document.querySelector(
			".content-section.active-section"
		);
		if (!defaultSection) {
			// If somehow no section has the active class initially, activate 'home'
			showSection("home");
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		const themeToggleButton = document.getElementById("theme-toggle");
		const htmlElement = document.documentElement; // Selects the <html> element

		// Function to toggle the theme
		function toggleTheme() {
			htmlElement.classList.toggle("dark-mode");

			// Optional: Update button icon based on theme
			// Check if dark mode is now active
			if (htmlElement.classList.contains("dark-mode")) {
				// Change icon to sun
				themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
				// Optional: Store preference in localStorage
				localStorage.setItem("theme", "dark");
			} else {
				// Change icon back to moon
				themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
				// Optional: Remove preference from localStorage
				localStorage.setItem("theme", "light");
			}
		}

		// Add click event listener to the button
		if (themeToggleButton) {
			themeToggleButton.addEventListener("click", toggleTheme);
		}

		// Optional: Check for saved theme preference on page load
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "dark") {
			// Apply dark mode immediately without waiting for a click
			// but make sure the class isn't already there
			if (!htmlElement.classList.contains("dark-mode")) {
				htmlElement.classList.add("dark-mode");
				// Update icon accordingly
				if (themeToggleButton) {
					themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
				}
			}
		} else {
			// Default to light mode (or ensure dark-mode class is removed if it somehow got added)
			htmlElement.classList.remove("dark-mode");
			if (themeToggleButton) {
				themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
			}
		}
	});

	const themeToggleButton = document.getElementById("theme-toggle");
	const htmlElement = document.documentElement; // Selects the <html> element

	// Function to toggle the theme
	function toggleTheme() {
		htmlElement.classList.toggle("dark-mode");

		// Optional: Update button icon based on theme
		// Check if dark mode is now active
		if (htmlElement.classList.contains("dark-mode")) {
			themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
			// Optional: Store preference in localStorage
			localStorage.setItem("theme", "dark");
		} else {
			// Change icon back to moon
			themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
			// Optional: Remove preference from localStorage
			localStorage.setItem("theme", "light");
		}
	}

	// Add click event listener to the button
	if (themeToggleButton) {
		themeToggleButton.addEventListener("click", toggleTheme);
	}

	// Optional: Check for saved theme preference on page load
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "dark") {
		// Apply dark mode immediately without waiting for a click
		// but make sure the class isn't already there
		if (!htmlElement.classList.contains("dark-mode")) {
			htmlElement.classList.add("dark-mode");
			// Update icon accordingly
			if (themeToggleButton) {
				themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
			}
		}
	} else {
		// Default to light mode (or ensure dark-mode class is removed if it somehow got added)
		htmlElement.classList.remove("dark-mode");
		if (themeToggleButton) {
			themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
		}
	}

	// -- Año actual en el Footer -- //
	const yearSpan = document.getElementById("current-year");
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
}); // End of DOMContentLoaded
