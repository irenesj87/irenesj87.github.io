const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

links.forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault(); // Prevent default link behavior

		// Remove active class from all links and sections
		links.forEach((link) => link.classList.remove("clicked"));
		sections.forEach((section) => section.classList.remove("clicked"));

		// Add active class to the clicked link
		link.classList.add("clicked");

		// Get the target section id
		const targetId = link.getAttribute("href").substring(1);

		// Add active class to the target section
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			targetSection.classList.add("clicked");
		}
	});
});
