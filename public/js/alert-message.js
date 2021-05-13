function showAlert() {
  const alertMessage = document.querySelector('#alert-message');
  if (alertMessage) {
    setTimeout(() => {
      alertMessage.classList.add('d-none');
    }, 2000);
  }
}

showAlert();
