'use strict';

$(document).ready(function() {

  $('#new').click(getNewMessage);

  function getNewMessage() {
    $('#post').click(post);
  }

  function post() {
    var msgVal = $('#messageArea').val();

    if (msgVal) {
      var message = {
        author: $('#author').val() || 'anonymous',
        time: Date.now(),
        message: msgVal
      }

      $.post('/messages', message)
      .done(() => location.reload(true))
      .fail(err => console.log("ERROR POSTING MESSAGE:", err));
    }
  }

})
