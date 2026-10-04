/* =========================================================
                         IMPORTS
========================================================= */
import { copyToClipboard } from "../../general/general-tools.js"



/* =========================================================
									  ADD EVENT TO COPY
========================================================= */
export function addEventToCopyTbodyCell(containerId){
  document.getElementById(containerId).addEventListener("click", (e)=> {
		if (e.target.closest('.no-copy')) return;
    if (e.target.closest('tbody td')) copyToClipboard(e.target.textContent.trim());
  })
}

