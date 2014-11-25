$(function () {
  var pageTitle = $(document).find('title').text();
  $('.navbar .navbar-nav li:contains(' + pageTitle.substr(0, 4) + ')').addClass('active');
});

$(function () {
  $('#search-title').keyup(function () {
    var searchText = $("#search-title").val().toLowerCase();
    console.log(searchText);
    $('.post-short-info').each(function (index, elem) {
      var liElem = $(elem);
      if (liElem.find('a').text().toLowerCase().match('^' + searchText) || searchText === "") {
        liElem.show();
        liElem.addClass('animated fadeIn');
      } else {
        liElem.removeClass('animated fadeIn');
        liElem.hide();
      }
    });
  });
});
