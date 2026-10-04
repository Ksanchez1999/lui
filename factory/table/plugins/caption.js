
/* =========================================================
												SHOW CAPTION
========================================================= */
export function showCaption(containerId = null, captionText = null){
	// ----- GUARD CLAUSES -----
	if (containerId === null) throw new Error("La tabla debe tener un ID");
	if (captionText === null) throw new Error("Debe proveer el texto del caption");
	
	const $caption = document.getElementById(containerId).querySelector("caption");
	$caption.classList.remove("hide-caption");
	$caption.textContent = captionText;
}
