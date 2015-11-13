'use strict';

$(document).ready(function() {

  $('#new').click(getNewMessage);
  $('#board').on('click', '.remove', removeMessage);
  // $('#board').on('click', '.edit', editMessage);


  function getNewMessage() {
    $('#author, #messageArea').val('');
    $('#post').click(post);
  }


  function post() {
    $('#post').off('click');
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


  function removeMessage() {
    var id = $(this).siblings('.mongoId').text();
  }

})
