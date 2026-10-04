
/* =====================================================
								ADD NEW KEY TO OBJECT
===================================================== */
export function addNewKeyToObject(dataFromMySQL = null, keyName = null, value = null){
	// -------------------- GUARD CLAUSES --------------------
	if (!Array.isArray(dataFromMySQL)) throw new Error("dataFromMySQL no es un array");
	if (keyName === null) throw new Error("Parámetro keyName obligatorio");
	if (value === null) throw new Error("Parámetro value obligatorio");

	// -------------------- PROCESS DATA --------------------
	return dataFromMySQL.map((obj)=>{			
		return {
			...obj,
			[keyName]: value,
		}
	})
}





/* =====================================================
								ADD DOM ELEMENT TO OBJECT
===================================================== */
export function addDomElementToObject(dataFromMySQL = null, keyName = null, domElementName = null, { classDomElement = null } = {}){
	// -------------------- GUARD CLAUSES --------------------
	if (!Array.isArray(dataFromMySQL)) throw new Error("dataFromMySQL no es un array");
	if (keyName === null) throw new Error("Parámetro keyName obligatorio");
	if (domElementName === null) throw new Error("Parámetro domElementName obligatorio");

	// -------------------- PROCESS DATA --------------------
	return dataFromMySQL.map((obj)=>{
		// GUARD CLAUSES
		if (obj[keyName] === undefined) throw new Error("La llave del objeto no existe");
			
		// CREATE DOM ELEMENT
		let element = document.createElement(domElementName);
			
		if (classDomElement !== null){
			if (!Array.isArray(classDomElement)) throw new Error("La clase del elemento no es un array");
			element.classList.add(...classDomElement);
		}
			
		element.innerText = obj[keyName];

		// RETURN NEW OBJECT
		return {
			...obj,
			[keyName]: element
		}
	})
}





/* =====================================================
								FILTER KEYS OF OBJECTS
===================================================== */
export function filterKeysOfObjects(dataFromMySQL = null, keysName = null){
	// -------------------- GUARD CLAUSES --------------------
	if (!Array.isArray(dataFromMySQL)) throw new Error("dataFromMySQL no es un array");
	if (!Array.isArray(keysName)) throw new Error("keysName no es un array");
	
	// -------------------- PROCESS DATA --------------------
  return dataFromMySQL.map((obj)=>{       
    return Object.fromEntries(
      keysName
        .filter(key => key in obj)
        .map(key => [key, obj[key]])
    );
  })
}




/* =====================================================
						CONVERT NUMBER TO YES OR NOT
===================================================== */
export function convertNumberToYesOrNotFromDb(dataFromMySQL = null, keyName = null){
	// -------------------- GUARD CLAUSES --------------------
	if (!Array.isArray(dataFromMySQL)) throw new Error("dataFromMySQL no es un array");
 	if (keyName === null) throw new Error("Parámetro keyName obligatorio");

	// -------------------- PROCESS DATA --------------------
	return dataFromMySQL.map((obj)=>{
		// GUARD CLAUSES
		if (obj[keyName] === undefined) throw new Error("La llave del objeto no existe");
    let number = obj[keyName];

    if(number == "1"){
      number = "Si";
    }

    if(number == "0"){
      number = "No";
    }

		// RETURN NEW OBJECT
		return {
			...obj,
			[keyName]: number
		}
	})
}


export function convertNumberToYesOrNot(number){
  if(number == "1"){
    return "Si";
  }
  return "No"
}




/* =====================================================
						CONVERT YES OR NOT TO NUMBER
===================================================== */
export function convertYesOrNotToNumber(yesOrNot){
  yesOrNot = yesOrNot.toLowerCase().trim();

  if (yesOrNot === "si" || yesOrNot === "sí") {
    return 1;
  }
  return 0
};
