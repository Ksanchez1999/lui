/* =================================================
                      IMPORTS
================================================= */
import { createModal } from './factory/modal/index.js';
import { createBasicCard, AddBackSide } from './factory/card/index.js';
import { modalText } from './modal-text.js';





/* =================================================
                     CONSTANTS
================================================= */
const qualities = ['🔸Empatica', '🔸Resiliente', '🔸Inteligente', '🔸Curiosa', '🔸Autentica', '🔸Humilde', '🔸Optimista'];
const essence = ['🔸Intuitiva', '🔸Libre', '🔸Apasionada', '🔸Generosa', '🔸Agradecida', '🔸Armoniosa', '🔸Firme'];
const talents = ['🔸Vendedora nata', '🔸Resolutiva', '🔸Ágil mentalmente', '🔸Virtuosa de la danza', '🔸Maestra pastelera', '🔸Conecta con facilidad', '🔸Influye positivamente'];





/* =================================================
                        DOM
================================================= */
/* ============== MAIN ============== */
const $main = document.createElement('main');
$main.id = 'main';



/* ============== CARD ============== */
const { $cardContainer, $card, $cardFront } = createBasicCard();
const { $cardBack, $btnFlippedFront, $btnFlippedBack } = AddBackSide($cardContainer);


/* ---------- FRONT ---------- */
const $containerFront = document.createElement('div');
$containerFront.className = 'container-front';

/* FRONT 1 */
const $containerFront1 = document.createElement('div');
$containerFront1.className = 'container-front-1';

const $containerPhoto = document.createElement('div');
$containerPhoto.className = 'container-photo';

const $img = document.createElement('img');
$img.src = 'photo.jpeg';
$img.alt = 'Foto de perfil';
$containerPhoto.appendChild($img);

const $containerName = document.createElement('div');
$containerName.className = 'container-name';

const $ocupation = document.createElement('h2');
$ocupation.className = 'ocupation';
$ocupation.textContent = 'Ingeniero en telecomunicaciones';

const $nameEl = document.createElement('h1');
$nameEl.className = 'name';
$nameEl.textContent = 'Luisana Pino';

$containerName.append($ocupation, $nameEl);
$containerFront1.append($containerPhoto, $containerName);

/* FRONT 2 */
const $containerFront2 = document.createElement('div');
$containerFront2.className = 'container-front-2';

const $containerButtonsFront = document.createElement('div');
$containerButtonsFront.className = 'container-buttons';
$containerButtonsFront.append($btnFlippedFront);
$containerFront2.append($containerButtonsFront);

/* CHILDS */
$containerFront.append($containerFront1, $containerFront2);
$cardFront.append($containerFront);


/* ---------- BACK ---------- */
const $containerBack = document.createElement('div');
$containerBack.className = 'container-back';

/* BACK 1 */
const $containerBack1 = document.createElement('div');
$containerBack1.className = 'container-back-1';

const $qualitiesList = createListSection('container-qualities column-list', 'CUALIDADES', qualities);
const $essenceList = createListSection('container-essence column-list', 'ESENCIA', essence);
const $talentsList = createListSection('container-talents column-list', 'TALENTOS', talents);
$containerBack1.append($qualitiesList, $essenceList, $talentsList);

/* BACK 2 */
const $containerBack2 = document.createElement('div');
$containerBack2.className = 'container-back-2';

const $containerButtonsBack = document.createElement('div');
$containerButtonsBack.className = 'container-buttons';
$containerButtonsBack.append($btnFlippedBack);
$containerBack2.append($containerButtonsBack);

/* CHILDS */
$containerBack.append($containerBack1, $containerBack2);
$cardBack.append($containerBack);

$card.append($cardFront, $cardBack);
$cardContainer.appendChild($card);
$main.appendChild($cardContainer);
document.body.appendChild($main);





/* ============== MODAL ============== */
/* ----------LISTENER ---------- */
document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('column-list-li')){
    const $modalinfo = document.createElement('p');
    $modalinfo.classList.add('modal-info');
    $modalinfo.textContent = modalText[e.target.textContent];

    const $modal = createModal($modalinfo);
    document.body.append($modal);
  }
});










/* ========================================================================
                          SUPPORT FUNCTIONS
======================================================================== */
// ============== CREATE LIST SECTION ==============
function createListSection(containerClass, titleText, itemsArray) {
  const $section = document.createElement('div');
  $section.className = containerClass;

  const $h3 = document.createElement('h3');
  $h3.textContent = titleText;
  $section.appendChild($h3);

  const $ul = document.createElement('ul');
  itemsArray.forEach(text => {
    const $li = document.createElement('li');
    $li.className = 'column-list-li';
    $li.textContent = text;
    $ul.appendChild($li);
  });

  $section.appendChild($ul);
  return $section;
}



