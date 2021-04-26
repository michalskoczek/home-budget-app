function showAlert() {
  setTimeout(() => {
    const alertMessage = document.querySelector('#alert-message');
    alertMessage.classList.add('d-none');
  }, 100000000);
}

showAlert();
