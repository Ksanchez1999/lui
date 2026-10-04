/*

USAGE:
let badge1 = createBadge("Badge 1", ["badge-active"]);

*/

function createBadge(text, classList = []) {
	let badge = document.createElement("span");
	badge.className = "badge";
	badge.textContent = text;
	if (classList.length > 0) badge.classList.add(...classList);
	return badge;
}