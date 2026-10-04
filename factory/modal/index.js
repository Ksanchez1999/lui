//import { test } from './index - copia.js';

// info: DOM Object OR String
// classList: Array of strings





/* ===========================================================
											SUPPORT FUNCTIONS
=========================================================== */
// ---------- CREATE MODAL CONTENT ----------
function createModalContent(info){	
	const $container = document.createElement("div");
	
	if (info instanceof HTMLElement) $container.appendChild(info);
	else {
		const $p = document.createElement("p");
		$p.textContent = info;
		$container.appendChild($p);
	}
	
	return $container;
}





/* ===========================================================
												CREATE MODAL
=========================================================== */
export function createModal(info = null, { classList = null } = {}) {
	// -------------------- GUARD CLAUSES --------------------
	if (info === null) throw new Error("El modal debe tener información");
	
	// -------------------- DOM --------------------
	// MODAL: CREATE
	const $modal = document.createElement("div");

	// MODAL: CLASSLIST
	$modal.classList.add("modal");

	if (classList !== null){
		if (!Array.isArray(classList)) throw new Error("classList no es un Array");
		$modal.classList.add(...classList);
	}
	
	// MODAL: CLOSE-EVENT
	$modal.addEventListener("click", (e)=> {if (e.target === $modal) $modal.remove()});
	
	// CONTAINER: CREATE
	const $container = createModalContent(info);
	
	// CONTAINER: CHILD
	$modal.appendChild($container);

	// MODAL: RETURN
	return $modal;
}