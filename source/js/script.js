let navMain = document.querySelector('.main-nav__list-wrapper');
let navClose = document.querySelector('.main-nav__close');
let navOpen = document.querySelector('.main-nav__toggle');

navClose.addEventListener('click', function () {
    if (navMain.classList.contains('main-nav__list-wrapper--hidden')) {
        navMain.classList.remove('main-nav__list-wrapper--hidden');
    } else {
        navMain.classList.add('main-nav__list-wrapper--hidden');
    }
});

navOpen.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav__list-wrapper--hidden')) {
      navMain.classList.remove('main-nav__list-wrapper--hidden');
  } else {
      navMain.classList.add('main-nav__list-wrapper--hidden');
  }
});
