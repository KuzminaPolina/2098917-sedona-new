let navMainWrpr = document.querySelector('.main-nav__list-wrapper');
let navClose = document.querySelector('.main-nav__close');
let navOpen = document.querySelector('.main-nav__toggle');
let mainHeader = document.querySelector('.main-header');

navMainWrpr.classList.remove('main-nav__list-wrapper--nojs');
navMainWrpr.classList.remove('main-nav__list-wrapper--open');
navMainWrpr.classList.add('main-nav__list-wrapper--hidden');
navOpen.classList.remove('main-nav__toggle--nojs');
mainHeader.classList.remove('main-header--nojs');

navClose.addEventListener('click', function () {
    if (navMainWrpr.classList.contains('main-nav__list-wrapper--hidden')) {
        navMainWrpr.classList.remove('main-nav__list-wrapper--hidden');
        navMainWrpr.classList.add('main-nav__list-wrapper--open')
    } else {
        navMainWrpr.classList.add('main-nav__list-wrapper--hidden');
        navMainWrpr.classList.remove('main-nav__list-wrapper--open');
    }
});

navOpen.addEventListener('click', function () {
  if (navMainWrpr.classList.contains('main-nav__list-wrapper--hidden')) {
    navMainWrpr.classList.remove('main-nav__list-wrapper--hidden');
    navMainWrpr.classList.add('main-nav__list-wrapper--open')
} else {
    navMainWrpr.classList.add('main-nav__list-wrapper--hidden');
    navMainWrpr.classList.remove('main-nav__list-wrapper--open');
}
});
