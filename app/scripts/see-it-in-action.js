'use strict';

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
  gallery('#product-management-gallery');
  sortGallery('product-management-item');
  gallery('#inventory-management-gallery');
  sortGallery('inventory-management-item');
  gallery('#customer-management-gallery');
  sortGallery('customer-management-item');
  gallery('#supplier-management-gallery');
  sortGallery('supplier-management-item');
});






