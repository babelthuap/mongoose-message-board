'use strict';

$(document).ready(function () {

  $('#new').click(getNewMessage);
  $('#board').on('click', '.remove', removeMessage);
  $('#board').on('click', '.edit', editMessage);

  function getNewMessage() {
    $('#post').off('click');
    $('#author, #messageArea').val('');
    $('.modal-title').text('Post New Message');
    $('#post').text('Post').click(function () {
      modifyDB('POST');
    });
  }

  function modifyDB(method, id) {
    var msgVal = $('#messageArea').val();

    if (msgVal) {
      var message = {
        author: $('#author').val() || 'anonymous',
        message: msgVal
      };

      if (id) message['_id'] = id;

      $.ajax({
        method: method,
        url: '/messages',
        data: message
      }).done(function () {
        return location.reload(true);
      }).fail(function (err) {
        return console.log("ERROR POSTING MESSAGE:", err);
      });
    }
  }

  function editMessage() {
    $('#post').off('click');
    var id = $(this).siblings('.mongoId').text();

    $('#author').val($(this).siblings('#msgAuthor').text());
    $('#messageArea').val($(this).closest('.row').find('p').text());

    $('.modal-title').text('Edit Message');
    $('#post').text('Update').click(function () {
      modifyDB('PUT', id);
    });
  }

  function removeMessage() {
    var id = $(this).siblings('.mongoId').text();

    $.ajax({
      method: 'DELETE',
      url: '/messages',
      data: { '_id': id }
    }).done(function () {
      return location.reload(true);
    }).fail(function (err) {
      return console.log("ERROR DELETING MESSAGE:", err);
    });
  }
});
