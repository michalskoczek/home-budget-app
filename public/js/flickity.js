const element = document.querySelector('.main-carousel');
const flickity = new Flickity(element, {
  freeScroll: true,
  contain: true,
  // disable previous & next buttons and dots
  prevNextButtons: false,
  pageDots: false,
});
