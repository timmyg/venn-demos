/* globals hopscotch: false  */

var tour = {
  id: "venn-main",
  steps: [
    {
      target: 'sell',
      title: 'Input Availability!',
      content: 'Visit your schedule to input your weekly availability!',
      placement: 'right',
      arrowOffset: 0
    },
    {
      target: 'venn-schedule',
      title: 'Input Availability!',
      content: 'Input your weekly availability here, and we\'ll schedule all your meetings around it!',
      placement: 'top',
      arrowOffset: 60,
    },
    {
      target: 'buy',
      title: "Check out the Buyer's perspective!",
      content: "Head to the marketplace and find a great opportunity.",
      placement: "bottom",
      multipage: true,
      onNext: function() {
        window.location = "pick.html"
      }
    },
    {
      target: 'venn-picktimes',
      title: 'Pick Place and Time!',
      content: 'Schedule your meeting, choosing time and place to meet!',
      placement: 'top',
      arrowOffset: 60
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 100
};

var runTour = function() {
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
  } else {
    el.attachEvent('onclick', fn);
  }
};

// runTour();
hopscotch.startTour(tour,0);
