/* globals hopscotch: false  */

var tour = {
  id: "venn-main",
  steps: [
    {
      target: 'accnt-btn',
      title: 'Input Availability!',
      content: 'Visit your schedule to input your weekly availability',
      placement: 'bottom',
      arrowOffset: 60,
      multipage: true,
      onNext: function() {
        window.location = "account.html"
      }
    },
    {
      target: 'venn-schedule',
      title: 'Input Availability!',
      content: 'Input your weekly availability here, and we\'ll schedule all your meetings around it!',
      placement: 'right',
      arrowOffset: 60,
    },
    {
      target: 'homepage',
      title: "Visit Marketplace!",
      content: "Head back to the marketplace and find a great opportunity.",
      placement: "bottom",
      multipage: true,
      onNext: function() {
        window.location = "index.html"
      }
    },
    {
      target: 'clickable-post',
      title: 'Find a steal of a deal!',
      content: 'Find your perfect deal, and you\'re on your way to metting up!',
      placement: 'right',
      arrowOffset: 60,
      multipage: true,
      onNext: function() {
        window.location = "listing.html"
      }
    },
    {
      target: 'venn-picktimes',
      title: 'Pick Place and Time!',
      content: 'Schedule your meeting, choosing time and place to meet!',
      placement: 'right',
      arrowOffset: 60
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 100
};

var init = function() {
  var state = hopscotch.getState();

  if (state && state === 'venn-main:3') {
    // Already started the tour at some point!
    hopscotch.startTour(tour,3);
  } else {
    hopscotch.startTour(tour,0);
  }
};

var addClickListener = function(el, fn) {
  if (el.addEventListener) {
    el.addEventListener('click', fn, false);
  }
  else {
    el.attachEvent('onclick', fn);
  }
};

init();