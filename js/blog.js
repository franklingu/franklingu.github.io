$(function () {
  var pageTitle = $(document).find('title').text();
  $('.navbar .navbar-nav li:contains(' + pageTitle.substr(0, 4) + ')').addClass('active');
});
