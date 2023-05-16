let heart = document.querySelector('.likes__button');
let likesNumber = document.querySelector('.likes__counter');


heart.onclick = function () {
  if (heart.classList.contains('added')) {
    likesNumber.textContent--;
  } else {
    likesNumber.textContent++;
  }

  heart.classList.toggle('added');
};
