// load.js
//
// Author: blinklv <blinklv@icloud.com>
// Create Time: 2017-05-18
// Maintainer: blinklv <blinklv@icloud.com>
// Last Change: 2017-05-18

$(document).ready(function() {
  $(".bin").each(function(i) {
    setTimeout(function() {
      $(".bin").eq(i).addClass("is-visible");
    }, 200 * i);
  });
});




