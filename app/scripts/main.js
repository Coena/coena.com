'use strict';
/*!
 * Responsive Bootstrap Toolkit
 * Author:    Maciej Gurban
 * License:   MIT
 * Version:   2.0.0 (2014-08-23)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
var ResponsiveBootstrapToolkit = (function($){
  // Methods and properties
  var self = {
    // Determines interval between firing 'changed' method
    interval: 300,
    // Used to calculate intervals between consecutive function executions
    timer: new Date(),
    // Returns true if current breakpoint matches passed alias
    is: function( alias ) {
      return $('.device-' + alias).is(':visible');
    },
    /*
     * Waits specified number of miliseconds before executing a function
     * Source: http://stackoverflow.com/a/4541963/2066118
     */
    changed: function() {
      var timers = {};
      return function (callback, ms) {
        // Get unique timer ID
        var uID = (!uID) ? self.timer.getTime() : null;
        if (timers[uID]) {
          clearTimeout(timers[uID]);
        }
        // Use default interval if none specified
        if(typeof ms === 'undefined') {
          ms = self.interval;
        }
        timers[uID] = setTimeout(callback, ms);
      };
    }
  };
  return self;
})(jQuery);



// Custom scripts
(function($, document, window, viewport){
  // Add current year to footer copyright
  var currentDate = new Date();
  $('#current-year').text((currentDate).getFullYear());

  // Toggle search field where needed
  $('#header-search-toggle').on('click', function (e) {
    e.preventDefault();
    $('#header-search').toggleClass('hidden');
  });

  function updateContainer() {
    var windowHeight = $(window).outerHeight();
    $('#contents section.fixed').height(windowHeight - 133 + 'px');
    $('#contents section > .container-fluid').height($('#contents section').height() + 'px');
    if (viewport.is('sm') || viewport.is('md') || viewport.is('lg')) {
      var colContentHeight = $('#contents section').height() - 145 + 'px';
      $('#contents section > .container-fluid .columns-container').css('max-height', colContentHeight);
      $('#contents section > .container-fluid > .row').addClass('row-full-height');
    }
    if (viewport.is('xs')) {
      var smallColContentHeight = $('#contents section').height() - 176 + 'px';
      $('#contents section > .container-fluid .columns-container').css('max-height', smallColContentHeight);
    }
  }

  // Executes once whole document has been loaded
  $(document).ready(function() {
    updateContainer();
  });

  // Executes each time window size changes
  $(window).bind('resize', function() {
    viewport.changed(function(){
      updateContainer();
    });
  });
  
  function resetColumnsHeading(clickedItem) {
    $('.columns-title-container').not(clickedItem).removeClass('columns-title-container-top').addClass('columns-title-container-bottom');
    $('.columns-title-container').not(clickedItem).find('[class*="arrow-up"]').removeClass('hidden');
    $('.columns-title-container').not(clickedItem).find('[class*="arrow-down"]').addClass('hidden');
    $('.columns-title-container').not(clickedItem).find('.columns-title-blue').removeClass('blue-title-border-bottom').addClass('blue-title-border-top');
    $('.columns-title-container').not(clickedItem).find('.columns-title-green').removeClass('green-title-border-bottom').addClass('green-title-border-top');
    $('.columns-title-container').not(clickedItem).next('.columns-container').addClass('hidden');
  }
  

  $('.columns-title-container').on('click', function (e) {
    e.preventDefault();
    var clickedTitle = $(this);
    if (viewport.is('sm') || viewport.is('md') || viewport.is('lg')) {
      resetColumnsHeading(clickedTitle);

      $(this).toggleClass('columns-title-container-bottom columns-title-container-top');
      $(this).find('[class*="arrow-up"]').toggleClass('hidden');
      $(this).find('[class*="arrow-down"]').toggleClass('hidden');
      $(this).find('.columns-title-blue').toggleClass('blue-title-border-top blue-title-border-bottom');
      $(this).find('.columns-title-green').toggleClass('green-title-border-top green-title-border-bottom');
      $(this).next().toggleClass('hidden');
    }
  });

  function resetSmallColumnsHeading(clickedItem) {
    var homeColumn = $('#contents section').find('.columns-title-container');
    $(homeColumn).not(clickedItem).parent().removeClass('inactive');
    $(homeColumn).not(clickedItem).removeClass('columns-title-container-top').addClass('columns-title-container-bottom');
    $(homeColumn).not(clickedItem).next('.columns-container').addClass('hidden');
  }
  

  $('#contents section').find('.columns-title-container').on('click', function (e) {
    e.preventDefault();
    var clickedTitle = $(this);
    if (viewport.is('xs')) {
      resetSmallColumnsHeading(clickedTitle);

      if($(clickedTitle).parent().hasClass('inactive')) {
        $('#contents section').find('.col-xs-12').removeClass('inactive');
      } else if (!$(clickedTitle).parent().hasClass('inactive') && !$(clickedTitle).next('.columns-container').hasClass('hidden')) {
        $('#contents section').find('.col-xs-12').addClass('inactive');
      } else if (!$(clickedTitle).parent().hasClass('inactive') && $(clickedTitle).next('.columns-container').hasClass('hidden')) {
        $('#contents section').find('.col-xs-12').removeClass('inactive');
      }
      $(this).toggleClass('columns-title-container-bottom columns-title-container-top');
      $(this).next('.columns-container').toggleClass('hidden');
    }
  });
  
})(jQuery, document, window, ResponsiveBootstrapToolkit);


//images pretty photo lightbox
function lightbox(){
  $('[rel^=\'lightbox\']').prettyPhoto({
    'social_tools': false
  });
}
//function to toggle all gallery start items with single gallery items
function gallery(id){
  $(id + '-link').on('click', function(e){
    e.preventDefault();
    $('#all-galleries').toggleClass('hidden');
    $(id).toggleClass('hidden');
  });
  $('.all-galleries-link').on('click', function(e){
    e.preventDefault();
    $('#all-galleries').toggleClass('hidden');
    $(id).toggleClass('hidden');
  });
}

//function to sort gallery items
function sortGallery(item) {
  var $data = $('#' + item + 's').clone();
  var $filteredData;
  $('.' + item + '-filter li').click(function(e) {
    e.preventDefault();
    $('.' + item + '-filter li').removeClass('active');
    var filterClass=$(this).attr('class').split(' ').slice(-1)[0];
    if (filterClass === 'all') {
      $filteredData = $data.find('.' + item + '');
    } else {
      $filteredData = $data.find('.' + item + '[data-type=' + filterClass + ']');
    }
    $('#' + item + 's').quicksand($filteredData, {
      duration: 600,
      adjustHeight: 'auto'
    }, function () {
      lightbox();
    });
    $(this).addClass('active');
    return false;
  });
}

$(document).ready(function(){
  lightbox();
  //product management gallery
  gallery('#product-management-gallery');
  sortGallery('product-management-item');
  //inventory management gallery
  gallery('#inventory-management-gallery');
  sortGallery('inventory-management-item');
  //customers management gallery
  gallery('#customer-management-gallery');
  sortGallery('customer-management-item');
  //suppliers management gallery
  gallery('#supplier-management-gallery');
  sortGallery('supplier-management-item');
  //business archive and settings gallery
  gallery('#business-archive-and-settings-gallery');
  sortGallery('business-archive-and-settings-item');
  //advertisement management gallery
  gallery('#advertisement-management-gallery');
  sortGallery('advertisement-management-item');
  //marketplace and showroom gallery
  gallery('#marketplace-and-showroom-gallery');
  sortGallery('marketplace-and-showroom-item');
  //bsuiness communication gallery
  gallery('#business-communication-gallery');
  sortGallery('business-communication-item');
  //system configuration gallery
  gallery('#system-configuration-gallery');
  sortGallery('system-configuration-item');
  
  //return to all galleries from single gallery
  $('.back-to-galleries').on('click', function (e) {
    e.preventDefault();
    $('.single-feature-gallery').addClass('hidden');
    $('#all-galleries').removeClass('hidden');
  });
});



