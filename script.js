// scroll to link
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      var navbarHeight = 70; // Replace with your navbar height
      $('html, body').animate({
        scrollTop: $(hash).offset().top - navbarHeight
      }, 1000, function(){
        // Add hash to URL after scroll (without jumping)
        history.pushState(null, null, hash);
      });
    }
  });
});

//toggle class active
const navbarItems = document.querySelectorAll('.navbar-item');

//hamburger click
document.querySelector('.navbar-extra').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default action
  navbarItems.forEach(item => {
    item.classList.toggle('active');
  });
});

//klik diluar tutup navbar
document.addEventListener('click', (event) => {
  if (event.target.closest('.navbar-extra') === null) {
    navbarItems.forEach(item => {
      item.classList.remove('active');
    });
  }
});