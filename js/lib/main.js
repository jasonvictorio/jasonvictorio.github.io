function emailValidator() {
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  var email = $('.email');
  if (email.val() == '' || !re.test(email.val())) {
    alert('Please enter a valid email address.');
    return false;
  }
  $('.overlay').toggleClass('active');
}

$(document).ready(function() {
  $('.page-title').fitText(1.2, { minFontSize: '45px', maxFontSize: '200px' });

  $('.overlay .close').click(function() {
    $('.overlay').toggleClass('active');
  })
});
