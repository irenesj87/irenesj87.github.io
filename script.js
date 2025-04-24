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

			// Optional: Close mobile menu if you have one
			// closeMobileMenu();
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
}); // End of DOMContentLoaded

// Función que retorna el año actual
const getCurrentYear = () => {
	return new Date().getFullYear();
};
