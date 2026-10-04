
// -------------------- CONSTANTS --------------------
const VALID_CELL_TYPES = {
  th: 'th',
  td: 'td'
};



/* =========================================================
													TR
========================================================= */
// ACEPTA TEXTO Y ELEMENTOS DEL DOM.
// LA CELDA ES LA QUE POSEE LA CLASE QUE ESPECIFICA SU COLUMNA, NO EL DIV INTERNO.

export function createTr(cellType = null, dataCell = null, originalData){	
	// GUARD CLAUSES
	if (cellType === null) throw new Error("Debe especificar el tipo de celda");
	if (!VALID_CELL_TYPES[cellType]) throw new Error("Tipo de celda incorrecta");
	if (!Array.isArray(dataCell)) throw new Error("Debe enviar los datos de la celda en un Array");

	const $tr = document.createElement("tr");
  if(originalData) $tr._databaseData = originalData;
   
	dataCell.forEach((value, i) =>{
		// CELL
		const $cell = document.createElement(cellType);
		$cell.classList.add(`col-${i}`);
		$tr.appendChild($cell);

		// DIV
		const $div = document.createElement("div");
		if (value instanceof Node) $div.appendChild(value)
		else $div.textContent = value;
		$cell.appendChild($div);
	});
	
	// RETURN
	return $tr;
}
