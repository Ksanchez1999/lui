/* =========================================================
												IMPORTS
========================================================= */
import { createTr } from './tools/tr.js';




/* =========================================================
										SUPPORT FUNCTIONS
========================================================= */
// -------------------- CREATE TBODY --------------------
export function createTbody(tbodyData, originalData){
	let $tbody = document.createElement("tbody");
	tbodyData.forEach((obj, i)=>{
		const cellValues = Object.values(obj);
		const $tr = createTr("td", cellValues, originalData[i]);
		$tbody.append($tr);
	})

	return $tbody;
}





/* =========================================================
											 BASIC TABLE
========================================================= */
export function createBasicTable(containerId = null, theadData = null, tbodyData, originalData){
	// GUARD CLAUSES
	if (containerId === null) throw new Error("La tabla debe tener un ID");
	if (!Array.isArray(theadData)) throw new Error("theadData: no es un array");
	if (!Array.isArray(tbodyData)) throw new Error("tbodyData: no es un array");
	if (!Array.isArray(originalData)) throw new Error("originalData: no es un array");

	// CONTAINER
	const $container = document.createElement("div");
	$container.classList.add("table-container");
	$container.id = containerId;
  
	// TABLE
	let $containerTable = document.createElement("div");
	$containerTable.classList.add("table-container-2");
	const $table = document.createElement("table");
	$containerTable.appendChild($table);
	$container.appendChild($containerTable);
	
	// CAPTION
	const $caption = document.createElement("caption");
	$caption.classList.add("hide-caption");
	$caption.innerText = "tabla de datos";
	$table.appendChild($caption);

	// THEAD
	const $thead = document.createElement("thead");
	const $tr = createTr("th", theadData);
	$thead.appendChild($tr);
	$table.appendChild($thead);

	// TBODY
	const $tbody = createTbody(tbodyData, originalData);
	$table.appendChild($tbody);
	
	// RETURN
	return $container;
}


