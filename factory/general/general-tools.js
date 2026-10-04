/* =========================================================
                         IMPORTS
========================================================= */
import { showToastNotification } from "../toast-notifications/index.js"


// -------------------- DEBOUNCE --------------------
export function debounce(callback, delay){
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}



// -------------------- COPY CLIPBOARD --------------------
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToastNotification("¡Copiado al portapapeles!");
}
