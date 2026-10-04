

export function createButton(text, {
  onClick = null,
  id,
  classes = ["button"], 
  type = "button",
  isDisabled = false
} = {}){

  // GUARD CLAUSES
  if (!text) throw new Error("createButton: El parámetro 'text' es obligatorio.");

  // CREATE BUTTON
  const btn = document.createElement('button');

  // SET REQUIRED ATTRIBUTES
  btn.textContent = text;
  if(onClick !== null) btn.addEventListener('click', onClick);

  // SET OPTIONAL ATTRIBUTES
  if(id) btn.id = id;

  if (Array.isArray(classes) && classes.length > 0) {
    btn.classList.add(...classes);
  }

  btn.type = type;
  btn.disabled = isDisabled;

  // RETURN
  return btn;
}

