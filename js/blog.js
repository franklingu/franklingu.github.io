$(function () {
  var pageTitle = $(document).find('title').text();
  var elem = $('.navbar .navbar-nav li:contains(' + pageTitle.substr(0, 4) + ')').addClass('active');
});
