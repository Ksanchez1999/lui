


## ********************************************** ALL HTML IMPORTS **********************************************
  <!-- _______________CSS-FACTORY_______________ -->
  <!-- BOX-MODEL -->
  <link rel="stylesheet" href="/factory/general/box-model.css">

  <!-- SCROLL -->
  <link rel="stylesheet" href="/factory/general/scroll.css">

  <!-- INPUT -->
  <link rel="stylesheet" href="/factory/form/dom/input/index.css">

  <!-- BADGE -->
  <link rel="stylesheet" href="/factory/general/dom/badge/index.css">

  <!-- BUTTON -->
  <link rel="stylesheet" href="/factory/general/dom/button/index.css">

  <!-- MODAL -->
  <link rel="stylesheet" href="/factory/modal/index.css">
  <link rel="stylesheet" href="/factory/modal/styles.css">

  <!-- CARD -->
  <link rel="stylesheet" href="/factory/card/index.css">

  <!-- TOAST NOTIFICATIONS -->
  <link rel="stylesheet" href="/factory/toast-notifications/index.css">

  <!-- TABLE -->
  <link rel="stylesheet" href="/factory/table/index.css">
  <link rel="stylesheet" href="/factory/table/responsive.css">
  <link rel="stylesheet" href="/factory/table/styles/black-table.css">

  <!-- _______________FUENTES_______________ -->
  <!-- SOURCE SANS 3 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">




















# ********************************************** /TABLE **********************************************
1. IMPORTAR MÓDULOS:

/* TABLE */
import { createBasicTable } from '/factory/table/index.js';
import { addColumnsManagement } from '/factory/table/plugins/columns-management.js';
import { addFilterToTheTable } from '/factory/table/plugins/filter.js';
import { addEventToCopyTbodyCell } from '/factory/table/plugins/events.js';
import { showCaption } from '/factory/table/plugins/caption.js';

/* REQUEST */
import { get, post } from '/factory/requests/index.js';

/* DATABASE TREATMENT */
import { addNewKeyToObject, addDomElementToObject, filterKeysOfObjects } from '/factory/database/mysql/formatters.js';

-----------------------------------------------------------------------------------------------------
2. DEFINIR ID DE LA TABLA:

const containerTableId = 'profiles-table';

-----------------------------------------------------------------------------------------------------
3. OBTENER DATABASE DATA (DEFINE CADA FILA DEL TBODY):

const databaseDataUrl = 'https://example.com';
const databaseData = get(databaseDataUrl);

-----------------------------------------------------------------------------------------------------
4. CREAR THEAD NAMES (DEFINE CADA NOMBRE DE COLUMNA):

const theadNames = [
  "ID",
  "Nombre",
  "Correo",
  "Fecha de registro",
  "Estado",
  "Rol",
  "Acción"
]


-----------------------------------------------------------------------------------------------------
5. CREAR TABLE KEYS (SE USA PARA FILTRAR LA BD Y CREAR LOS INPUTS):

const tableKeys = [
  "id",
  "name",
  "email",
  "registerDate",
  "status",
  "role",
  "button"
];

-----------------------------------------------------------------------------------------------------
6. MODIFICAR TBODY DATA (MODIFICA LA BD, SE UTILIZARÁ EN CADA FILTRADO):

function serverDataTreatment(serverData){
  const serverDataModified1 = addNewKeyToObject(serverData, "button", "Editar");
  const serverDataModified2 = addDomElementToObject(serverDataModified1, "button", "button", { classDomElement: ["no-copy", "btn", "btn-edit"] });
	return filterKeysOfObjects(serverDataModified2, tableKeys);
}

const databaseDataModified = serverDataTreatment(databaseData);

-----------------------------------------------------------------------------------------------------
7. CREAR TABLA BÁSICA:

const $table = createBasicTable(containerTableId, theadNames, databaseDataModified, databaseData);
document.body.append($table);

-----------------------------------------------------------------------------------------------------
8. AGREGAR CLASE PARA CSS:

$table.classList.add("container-black-table");

-----------------------------------------------------------------------------------------------------
9. AGREGAR EVENTO DE COPIADO A CELDAS DEL BODY:
**Para que no se active el evento, se debe añadir la clase "no-copy" al elemento que no requiere ser copiado**

addEventToCopyTbodyCell(containerTableId);

-----------------------------------------------------------------------------------------------------
10. AGREGAR FILTRO:

const urlToFilter = 'https://example.com';

addFilterToTheTable($table, tableKeys, urlToFilter, serverDataTreatment);

-----------------------------------------------------------------------------------------------------
11. AGREGAR MANEJADOR DE COLUMNAS:
**El parámetro "classForColumnsManagementModal" es sólo si requieres estilos, se puede omitir**

const classForColumnsManagementModal = 'columns-management-modal-black-table';

addColumnsManagement(containerTableId, classForColumnsManagementModal);

-----------------------------------------------------------------------------------------------------
12. MOSTRAR CAPTION:

showCaption(containerTableId, "TABLA DE EJEMPLO PARA PRÓXIMOS PROYECTOS");

-----------------------------------------------------------------------------------------------------
13. ELIMINAR ÚLTIMO INPUT CON CSS:

SELECTOR-INDIVIDUAL-DE-LA-TABLA thead tr td:last-child input {
  display: none;
}

-----------------------------------------------------------------------------------------------------
14. MODIFICAR EL ANCHO MÁXIMO DE LA COLUMNA CON CSS:

SELECTOR-INDIVIDUAL-DE-LA-TABLA tbody .col-1 > div {
  display: block;
  max-width: 120px;
  transition: max-width 0.4s ease-in-out;
}

SELECTOR-INDIVIDUAL-DE-LA-TABLA tbody .col-1 > div:hover {
  max-width: 1000px;
}

-----------------------------------------------------------------------------------------------------
15. APLICAR OPACIDAD A COLUMNA CON CSS:

SELECTOR-INDIVIDUAL-DE-LA-TABLA tbody tr td:nth-child(1) > div,
SELECTOR-INDIVIDUAL-DE-LA-TABLA tbody tr td:nth-child(2) > div {
  color: var(--body-secondary-data-color); 
}

-----------------------------------------------------------------------------------------------------



## ========================= LISTA DE CLASES CSS =========================
- container-black-table


## ========================= NOTAS =========================
* FUENTE SUGERIDA: SOURCE SANS 3.
* La clase base del contenedor de la tabla es: "table-container".
* Todos los **tr** de la tabla tienen una propiedad **_databaseData** que tiene el objeto original de la base de datos.





















# ********************************************** /GENERAL/FAKE-DATA.JS **********************************************
1. IMPORTAR MÓDULO:

/* FAKE DATA */
import { dataMysqlStandart, dataMysqlFiltered } from '/factory/general/fake-data.js';

-----------------------------------------------------------------------------------------------------
2. OBTENER DATA DE MYSQL ESTÁNDAR:

const databaseData = dataMysqlStandart;

**Las claves de los objetos son: id, name, email, registerDate, status, role**

-----------------------------------------------------------------------------------------------------
3. OBTENER DATA DE MYSQL ESTÁNDAR FILTRADA:

const databaseDataFiltered = dataMysqlFiltered;

**Las claves de los objetos son: id, name, email, registerDate, status, role**




















# ********************************************** /DATABASE/MYSQL/FORMATTERS.JS **********************************************
1. IMPORTAR MÓDULO:

/* FORMATTERS OF MYSQL DATA */
import {
  addNewKeyToObject,
  addDomElementToObject,
  filterKeysOfObjects,
  convertNumberToYesOrNotFromDb,
  convertNumberToYesOrNot,
  convertYesOrNotToNumber
} from "/factory/database/mysql/formatters.js";

-----------------------------------------------------------------------------------------------------
2. AÑADIR UNA NUEVA LLAVE A LA BASE DE DATOS:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const serverData = [{}, {}];
const newKey = "button";
const newValue = "button";

const serverDataModified = addNewKeyToObject(serverData, newKey, newValue);

-----------------------------------------------------------------------------------------------------
3. AÑADIR UN ELEMENTO DEL DOM A LA BASE DE DATOS, SEGÚN SU LLAVE:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const serverData = [{}, {}];
const keyToModify = "button";
const newDomElementName = "button";
const newDomElementClassList = ["no-copy", "btn-edit"];

const serverDataModified = addDomElementToObject(serverData, keyToModify, newDomElementName, { classDomElement: newDomElementClassList });

-----------------------------------------------------------------------------------------------------
4. FILTRAR LAS LLAVES DE LOS OBJETOS:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const serverData = [{}, {}];
const keysToKeep = ["id", "name", "date"];

const serverDataModified = filterKeysOfObjects(serverData, keysToKeep);

-----------------------------------------------------------------------------------------------------
5. CONVERTIR NÚMEROS EN SI O NO EN LA BASE DE DATOS:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const serverData = [{}, {}];
const keyToModify = ["active"];

const serverDataModified = convertNumberToYesOrNotFromDb(serverData, keyToModify);

-----------------------------------------------------------------------------------------------------
6. CONVERTIR NÚMERO EN SI O NO:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const number = 1;
const result = convertNumberToYesOrNot(number);

-----------------------------------------------------------------------------------------------------
6. CONVERTIR SI O NO EN NÚMEROS:
**Se pueden colocar los valores de las variables directamente en los parámetros**

const param = "si";
const result = convertYesOrNotToNumber(param);




















# ********************************************** /FORM/DOM/INPUT **********************************************
1. IMPORTAR MÓDULO:

/* INPUTS */
import {
  createInputText,
  createInputPassword,
  createInputEmail,
  createInputNumber,
  createInputDate,
  createInputCheckbox,
  createInputRadio
} from '/factory/form/dom/input/index.js';

-----------------------------------------------------------------------------------------------------
2. CREAR INPUT DE TIPO TEXTO:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "id";
const $inputText = createInputText(name, { classList: [ "input-text-black" ], placeholder: "Escribe acá..." });
$father.append($inputText);

-----------------------------------------------------------------------------------------------------
3. CREAR INPUT DE TIPO CONTRASEÑA:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "password";
const $inputPassword = createInputPassword(name, { classList: [ "input-text-black" ], placeholder: "Contraseña..." });
$father.append($inputPassword);

-----------------------------------------------------------------------------------------------------
4. CREAR INPUT DE TIPO EMAIL:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "email";
const $inputEmail = createInputEmail(name, { classList: [ "input-text-black" ], placeholder: "Email..." });
$father.append($inputEmail);

-----------------------------------------------------------------------------------------------------
5. CREAR INPUT DE TIPO NÚMERO:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "amount";
const $inputNumber = createInputNumber(name, { classList: [ "input-number-black" ], placeholder: "Ingresa el número..." });
$father.append($inputNumber);

-----------------------------------------------------------------------------------------------------
6. CREAR INPUT DE TIPO FECHA:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "date";
const $inputDate = createInputDate(name, { classList: [ "input-date-black" ]});
$father.append($inputDate);

-----------------------------------------------------------------------------------------------------
7. CREAR INPUT DE TIPO CHECKBOX:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "active";
const $inputCheckbox = createInputCheckbox(name, { classList: [ "input-checkbox-black" ]});
$father.append($inputCheckbox);

-----------------------------------------------------------------------------------------------------
8. CREAR INPUT DE TIPO RADIO BUTTON:
**Se pueden colocar los valores de las variables directamente en los parámetros**
**El único obligatorio es "name"**

const name = "color";
const $inputRadio = createInputRadio(name, { classList: [ "input-radio-black" ]});
$father.append($inputRadio);



## ========================= LISTA DE CLASES CSS =========================
- 


## ========================= NOTAS =========================
* Para cambiar el estado inicial de un checkbox puedes usar: "DOMELEMENT.checked = true";






















# ********************************************** /MODAL **********************************************
1. IMPORTAR MÓDULO:

/* MODAL */
import { createModal } from '/factory/modal/index.js';

-----------------------------------------------------------------------------------------------------
2. CREAR MODAL INFORMATIVO
**El único parámetro obligatorio es "message"**

const message = "MENSAJE INFORMATIVO PARA MODAL";
const $modal = createModal(message, { classList: ["modal-success"] });
document.body.append($modal);

-----------------------------------------------------------------------------------------------------
3. CREAR MODAL CON NODO
**Se puede añadir { classList: ["TU-CLASE-PARA-MODAL"] } como segundo parámetro**

const $p = document.createElement('p');
$p.classList.add('example-p');
$p.textContent = 'Este es un párrafo de ejemplo.';

const $modal = createModal($p);
document.body.append($modal);

## ========================= LISTA DE CLASES CSS =========================
- modal-warning
- modal-alert
- modal-success
- modal-info




















# ********************************************** /CARD **********************************************
1. IMPORTAR MÓDULO:

/* CARD */
import { createBasicCard, AddBackSide } from '/factory/card/index.js';

-----------------------------------------------------------------------------------------------------
2. CREAR TARJETA BÁSICA

const { $cardContainer, $card, $cardFront } = createBasicCard();

const $containerFront = document.createElement('div');
$containerFront.className = 'container-front';
$cardFront.append($containerFront);

document.body.append($cardContainer);

-----------------------------------------------------------------------------------------------------
3. AÑADIR SEGUNDA CARA Y BOTON PARA GIRAR
**Debes añadir los botones de giro en el contenedor que hayas creado para cada cara**

const { $cardBack, $btnFlippedFront, $btnFlippedBack } = AddBackSide($cardContainer);

const $containerBack = document.createElement('div');
$containerBack.className = 'container-back';
$cardBack.append($containerBack);

const $containerButtonFront = document.createElement('div');
$containerButtonFront.className = 'container-button container-button-front';
$containerButtonFront.append($btnFlippedFront);
$containerFront.append($containerButtonFront);

const $containerButtonBack = document.createElement('div');
$containerButtonBack.className = 'container-button container-button-back';
$containerButtonBack.append($btnFlippedBack);
$containerBack.append($containerButtonBack);
















# ******************* /REQUEST *******************

# ---------- IMPORT ----------
import { get, post } from '/factory/request/index.js';


# ---------- EXAMPLE WITH PROMISE.ALL ----------
const [busyProfilesRes, servicesRes] = await Promise.all([
  get(urlTableData),
  get(urlToServicesData)
]);



. Pasas el URL y devuelve un array de objetos listo;







# ******************* /GENERAL/DOM/BUTTON/INDEX.JS *******************

* onClick es la función que va dentro de un listener de click.


# ---------- IMPORT ----------
import { createButton } from '/factory/dom/button/index.js';

# ---------- EXAMPLE ----------
const $buttonCreateNewProfile = createButton("Crear nuevo perfil", { 
  onClick = async function(){ createModalToCreateProfile() },
  classes = ["buttonCreateNewProfile"]
});



# ******************* /TOAST-NOTIFICATION/INDEX.JS *******************
# ---------- IMPORT ----------
import { showToastNotification } from "/factory/toast-notifications/index.js"

# ---------- EXAMPLE ----------
showToastNotification("¡Copiado al portapapeles!");




















## ********************************************** REGLAS DE VERSIONADO **********************************************
- X.0.0 (MAJOR): Cambia cuando haces modificaciones grandes que rompen la compatibilidad con versiones anteriores.
- 0.Y.0 (MINOR): Cambia cuando agregas nuevas funciones sin romper el código existente.
- 0.0.Z (PATCH): Cambia cuando solo corriges errores menores.


















