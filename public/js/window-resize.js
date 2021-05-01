function windowResize() {
  const buttons = [...document.querySelectorAll('#header__btn')];
  if (window.innerWidth < 992) {
    buttons.forEach((button) => {
      button.classList.remove(
        'header__btn',
        'btn',
        'btn-secondary',
        'header__btn--login',
      );
      button.removeAttribute('type');
    });
  } else if (window.innerWidth >= 992) {
    buttons.forEach((button) => {
      button.classList.add('header__btn', 'btn', 'btn-secondary');
      button.setAttribute('type', 'button');
    });
    buttons[1].classList.add('header__btn--login');
  }
}

document.addEventListener('DOMContentLoaded', windowResize);
window.addEventListener('resize', windowResize);
