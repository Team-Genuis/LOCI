/* global $, io */
console.log(' hey');
$(window).on('beforeunload', function() {
  socket.close();
  console.log('close socket');
});
var socket = io();
var onSendMessage = () => {
  console.log('Send!');
  socket.emit('message', {
    username: 'anon',
    message: $('#messagebar').val()
  });
  $('#messagebar').val('');
};
$('#messagebar').keydown(function(event) {
  var keypressed = event.keyCode || event.which;
  if (keypressed === 13) {
    onSendMessage();
  }
});
/*$(window).click(function () {
  console.log('Click!');
  socket.emit('playerAction');
});*/
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

socket.on('playerAction', function(msg) {
  console.log('Client player messsage: ' + msg);
  $('#chatBody').append('ACTION>>> ', msg.message, '<br>');
  $("#chatBody").animate({ scrollTop: $('#chatBody').prop("scrollHeight") }, "slow");
  return false;
});
socket.on('chatMessage', function(msg) {
  console.log('Client player chat messsage: ' + msg);
  $('#chatBody').append('Chat> ', msg.message, '<br>');
  $("#chatBody").animate({ scrollTop: $('#chatBody').prop("scrollHeight") }, "slow");

  return false;
});
