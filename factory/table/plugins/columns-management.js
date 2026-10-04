/* =========================================================
													IMPORTS
========================================================= */
import { createInputCheckbox } from '../../form/dom/input/index.js';
import { createModal } from '../../modal/index.js';


/* =========================================================
										SUPPORT FUNCTIONS
========================================================= */
// -------------------- GET PREFERENCES --------------------
function getTablePreferences(containerId) {
	const data = localStorage.getItem(`pref_table_${containerId}`);
	return data ? JSON.parse(data) : [];
}


// -------------------- SAVE PREFERENCES --------------------
function saveTablePreferences(containerId, hiddenColumns) {
	localStorage.setItem(`pref_table_${containerId}`, JSON.stringify(hiddenColumns));
}


// -------------------- UPDATE DOM --------------------
export function updateDom(containerId) {
  const $table = document.getElementById(containerId);
  const hiddenColumns = getTablePreferences(containerId);

	// SHOW ALL COLUMNS
	$table.querySelectorAll('.hidden-col').forEach(c => c.classList.remove('hidden-col'))

	// HIDE COLUMNS
	hiddenColumns.forEach((col)=>{
		$table.querySelectorAll(`.${col}`).forEach((cell)=>{
			cell.closest('th, td').classList.add('hidden-col');
		})
	})
}


// -------------------- CREATE MANAGEMENT COLUMNS --------------------
export function createManagementColumns(containerId, className){
  const $table = document.getElementById(containerId);

	// MANAGEMENT COLUMNS
	const $mc = document.createElement("div");
	$mc.className = "column-management-modal";
	if(className) $mc.classList.add(className);

	// CHECKBOX AND LABELS
	$table.querySelectorAll(`thead > tr:first-of-type th`).forEach(($th, i) => {
		const $label = document.createElement("label");
		const $span = document.createElement("span");
		$span.innerText = $th.lastElementChild.textContent.trim();
		
		const $checkbox = createInputCheckbox(`col-${i}`, {
			value: `col-${i}`,
			eventChange: ()=> {
	      // GET CURRENT HIDDEN COLUMNS
	      const currentHidden = Array.from($mc.querySelectorAll('input'))
	      .filter(cb => !cb.checked)
	      .map(cb => cb.value);
	      // UPDATE
    	  saveTablePreferences(containerId, currentHidden);
	      updateDom(containerId);
      }
		});
		$checkbox.checked = !$th.classList.contains('hidden-col');

		// APPEND
		$label.append($checkbox);
		$label.append($span);
		$mc.append($label);
	});

	// MODAL
  const $modal = createModal($mc);
  document.body.append($modal);
}





/* =========================================================
												ADD COLUMNS MANAGEMENT
========================================================= */
export function addColumnsManagement(containerId = null, className = null){
	// GUARD CLAUSES
	if (containerId === null) throw new Error("Debe proveer el ID de la tabla");


	updateDom(containerId);
  const $table = document.getElementById(containerId);

  // DOM ELEMENT
	let $btn = document.createElement("div");
	$btn.className = `column-management-button`;
	$btn.innerText = "GESTIONAR COLUMNAS";
  $table.prepend($btn);

  // EVENT
  $btn.addEventListener("click", (e)=> createManagementColumns(containerId, className))
}
