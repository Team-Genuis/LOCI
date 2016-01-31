/* global $, io */
$(function() {
  var socket = io();

  $(window).on('beforeunload', function() {
    socket.close();
    console.log('close socket');
  });

  var onSendMessage = () => {
    console.log('Send!');
    if ($('#messagebar').val() !== '') {
      socket.emit('message', {
        username: 'anon',
        message: $('#messagebar').val()
      });
      $('#messagebar').val('');
    }
  };

  var chatLogCleaner = () => {
    let log = $('#messagebar').val();
    if (log.length > 1000) {
      $('#messagebar').val(log.slice(0, 1000));
    }
    setTimeout(chatLogCleaner, 30);
  };
  chatLogCleaner();

  $('#messagebar').keydown(function(event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed === 13) {
      onSendMessage();
    }
  });

  $('#sendButton').click(function() {
    onSendMessage();
  });

  $('#connectTwitch').click(function() {
    socket.emit('connectTwitch');
    console.log('connect socket');

    return false;
  });

  $('#disconnectTwitch').click(function() {
    $('#messages').empty();
    socket.emit('disconnectTwitch');
    console.log('disconnect socket');
  });



  socket.on('chatLog', function(msg) {
    console.log('chat log bruh');
    console.log('wtfsdsdsdsd');
    $('#chatBody').append(msg);
    console.log(msg);
    return false;
  });

  socket.on('playerAction', function(msg) {
    console.log('Client player messsage: ' + msg);
    $('#chatBody').append('ACTION>>> ', msg.message, '<br>');
    $("#chatBody").animate({
      scrollTop: $('#chatBody').prop("scrollHeight")
    }, "slow");
    return false;
  });

  socket.on('chatMessage', function(msg) {
    console.log('Client player chat messsage: ' + msg);
    $('#chatBody').append('Chat> ', msg.message, '<br>');
    $("#chatBody").animate({
      scrollTop: $('#chatBody').prop("scrollHeight")
    }, "slow");

    return false;
  });
});
