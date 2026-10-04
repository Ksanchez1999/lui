/* =========================================================
													IMPORTS
========================================================= */
import { createInputText } from '../../form/dom/input/index.js';
import { createTr } from '../tools/tr.js';
import { createTbody } from '../index.js';
import { updateDom } from './columns-management.js';
import { debounce } from '../../general/general-tools.js';
import { post } from '../../requests/index.js';


/* =========================================================
										SUPPORT FUNCTIONS
========================================================= */
// -------------------- CREATE TR MSG TO FILTER --------------------
function createTrMsgToFilter(typeMsg, columnsCount){
  const msg = {
    error: `<tr><td colspan="${columnsCount}" class="td-error-msg">Error al filtrar, intenta de nuevo.</td></tr>`,
    noResults: `<tr><td colspan="${columnsCount}" class="td-no-results-msg">No se encontraron resultados.</td></tr>`,
  }

  return msg[typeMsg];
}



// -------------------- APPLY FILTER --------------------
async function applyFilter($table, url, serverDataTreatment){
	// ----- GET INPUTS DATA -----
	const inputsData = {};
	$table.querySelectorAll('thead input').forEach((input)=> {
		inputsData[input.name] = input.value;
	})
	
	// ----- TBODY LOADING -----
	const $currentTbody = $table.querySelector("tbody");
	$currentTbody.classList.add('tbody-loading');

	// ----- COLUMNS COUNT -----
	const columnsCount = $table.querySelectorAll('thead th').length;

	// ----- FETCH -----
	let newTbodyData;
	
	try {
		newTbodyData = await post(url, { body: inputsData });
	} catch {
		// ERR MSG
		$currentTbody.innerHTML = createTrMsgToFilter("error", columnsCount);	
		return;
	} finally {
		// REMOVE TBODY LOADING
		$currentTbody.classList.remove('tbody-loading');
	}

	// NO RESULTS MSG
	if(newTbodyData.length == 0) {
    $currentTbody.innerHTML = createTrMsgToFilter("noResults", columnsCount);
    return
  }

	// ----- SERVER DATA TREATMENT -----
	const tbodyData = serverDataTreatment(newTbodyData);
	
	// ----- UPDATE TBODY -----
	const $newTbody = createTbody(tbodyData, newTbodyData);
	$currentTbody.replaceWith($newTbody);
  updateDom($table.id);
}









/* =========================================================
												ADD FILTER
========================================================= */
export function addFilterToTheTable($table = null, inputsName = null, url = null, serverDataTreatment = null){
	// ----- GUARD CLAUSES -----
	if ($table === null) throw new Error("Debe proveer un elemento tabla ($table)");
	if (!Array.isArray(inputsName)) throw new Error("inputsName debe ser un array");
	if (url === null) throw new Error("Debe proveer un url");
	if (serverDataTreatment === null) throw new Error("Debe proveer la función para tratar los datos obtenidos del servidor");
	
	// ----- ADD INPUTS -----
	const $inputs = [];
	inputsName.forEach((name)=>{
		const input = createInputText(name, { placeholder: "Filtrar..."});				
		$inputs.push(input);
	})

	const $tr = createTr("td", $inputs);
	$table.querySelector('thead').append($tr);
	
	// ----- ADD EVENT -----
	const filterEvent = debounce(applyFilter, 500)
	
	$table.addEventListener("input", ()=>{
		filterEvent($table, url, serverDataTreatment);
	});
}
