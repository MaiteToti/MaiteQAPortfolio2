document.addEventListener('DOMContentLoaded', function () {

  // Carga footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) footerContainer.innerHTML = data;
    })
    .catch(console.error);
});
