

/* =================================================
                    BASIC CARD
================================================= */
export function createBasicCard(){
  /* CARD CONTAINER */
  const $cardContainer = document.createElement('div');
  $cardContainer.className = 'card-container';

  /* CARD */
  const $card = document.createElement('div');
  $card.className = 'card';
  $cardContainer.append($card);

  /* CARD FRONT */
  const $cardFront = document.createElement('div');
  $cardFront.className = 'card-front card-face';
  $card.append($cardFront);

  /* RETURN */
  return { $cardContainer, $card, $cardFront };
}



/* =================================================
                    ADD BACK SIDE
================================================= */
export function AddBackSide($cardContainer){
  /* CARD */
  const $card = $cardContainer.querySelector('.card');

  /* CARD BACK */
  const $cardBack = document.createElement('div');
  $cardBack.className = 'card-back card-face';
  $card.append($cardBack);

  /* BTN FLIPPED FRONT */
  const $btnFlippedFront = document.createElement('span');
  $btnFlippedFront.className = 'btn-flipped-front';
  $btnFlippedFront.textContent = '⇄';

  /* BTN FLIPPED BACK */
  const $btnFlippedBack = document.createElement('span');
  $btnFlippedBack.className = 'btn-flipped-back';
  $btnFlippedBack.textContent = '⇄';

  /* LISTENERS */
  $cardContainer.addEventListener('click', (e) => {
    if (e.target === $btnFlippedFront || e.target === $btnFlippedBack) {
      $card.classList.toggle('is-flipped');
    }
  });

  /* RETURN */
  return { $cardBack, $btnFlippedFront, $btnFlippedBack };
}
