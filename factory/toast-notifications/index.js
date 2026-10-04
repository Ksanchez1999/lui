
export function showToastNotification(info = null){
	// GUARD CLAUSES
	if (info === null) throw new Error("Debe proporcionar el texto de la notificación");
	if (document.querySelector('.toast-notification')) return;

	// CREATE TOAST
	const $toast = document.createElement("span");
	$toast.classList.add("toast-notification");
	$toast.textContent = info; 
	document.body.appendChild($toast);

	// SHOW
	setTimeout(() => {
		$toast.classList.add("show");
	}, 10);
	
	// REMOVE
  setTimeout(() => {
    $toast.classList.remove("show");
		setTimeout(() => $toast.remove(), 400);
  }, 1500);
}