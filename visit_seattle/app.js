$(function() {

  var hoodNames   = [];
  var hoodContent = '';
  var counter     = 0;

  var printHoods = function(hoods) {
    counter = $('section').hasClass(hoods[0].name.split(' ').join('') + counter) ? counter + 1 : 0;
    for (var i = 0; i < hoods.length; i++) {
      var nameJoined = hoods[i].name.split(' ').join('') + counter;
      var name = hoods[i].name;
      $('.hood-holder').append($('<section>')
                        .addClass('hood')
                        .addClass(nameJoined));
      var $current = $('.' + nameJoined);
      $current.append($('<img>')
                          .attr('src', hoods[i].imgUrl)
                          .attr('alt', 'picture of ' + name)
                          .addClass('thumbnail'));
      $current.append($('<a>')
                          .attr('href',name)
                          .append($('<h3>')
                          .text(name.toUpperCase())));
      $current.append($('<p>')
                          .text(hoods[i].content));
    }
  };

  function Neighborhood(name, imgUrl, content) {
    this.name    = name;
    this.imgUrl  = imgUrl;
    this.content = content;
  };

  var listCreator = function(hoodNames) {
    var hoodList = [];
    for(var i = 0; i < hoodNames.length; i++) {
      hoodList.push(new Neighborhood(hoodNames[i], 'assets/Images/' + hoodNames[i] + '.jpg', hoodContent));
    }
    return hoodList;
  };

  //Mobile Menu Behavior
  $('#openMenu').on('click', function() {
    $('#menu').show();
    $('.navigation').css('height', '240px');
    $('header').css('height', '450px');
    $('#openMenu').hide();
    $('#closeMenu').show();
  });
  $('#closeMenu').on('click', function() {
    $('#menu').hide();
    $('.navigation').css('height', '85px');
    $('header').css('height', '250px');
    $('#closeMenu').hide();
    $('#openMenu').show();
  });

  //Contact Form Submit Behavior
  $('#submit-form').on('click', function() {
    var name  = $('#name').val();
    var email = $('#email').val();
    var city  = $('#city').val();
    $('#name').val('');
    $('#email').val('');
    $('#city').val('');
    //dummy message generation instead of sumbit to server or database
    var message = 'Hello ' + name + ' from ' + city + '! ' + 'Thanks for giving us your email address: ' + email + '. We promise to only use it for spam!';
    alert(message);
  });

  //Load More Neighborhoods Behavior
  $('#loadMore').on('click', function() {
    //This would perform an ajax call and build the array based on the returned data.
    printHoods(listCreator(hoodNames));
    $('#loadMore').hide();
  });

  $('#overlay').on('click', function() {
    $('#overlay').hide();
    $('#overlayPicture').hide();
    $('iframe').show();
    $('iframe').attr('src', 'https://www.youtube.com/embed/92ISlO9U-84?rel=0&autoplay=1;showinfo=0');
  });

  //Dummy Data would be gathered from ajax requests
  hoodContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.';
  hoodNames = ['Ballard', 'Greenlake', 'Fremont', 'Wallingford', 'Queen Anne', 'Magnolia'];

  printHoods(listCreator(hoodNames));
});
