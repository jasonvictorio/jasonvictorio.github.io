function onSubmit() {
  $('.js-notification').addClass('active');
}

$(document).ready(function() {
  $('.js-page-title').fitText(1.2, { minFontSize: '45px', maxFontSize: '200px' });

  $('.js-notification .js-close').click(function() {
    $('.js-notification').removeClass('active');
  })
});
