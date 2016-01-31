/* global $, io, irc */
$(function() {
  //var irc = require('tmi.js');
  var socket = io();
  var channelList = ['#locigamebot'], doTimeouts = true;
  if(doTimeouts) console.log('Not printing timeouts from twitch');
  var options = {
    options: {
      debug: true
    },
    connection: {
      random: "chat",
      reconnect: true
    },
    channels: channelList
  };
  var twitchClient = new irc.client(options);
  twitchClient.connect();
  twitchClient.removeAllListeners();
  twitchClient.addListener('message', handleChat);
  function handleChat(channel, twitchUser, twitchMessage, self) {
    var twitchName = twitchUser.username;
    console.log('Channel: '+channel + self);
    socket.emit('message', {
      username: twitchName,
      message: twitchMessage
    });
  }
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
    $('#chatBody').scrollTop = $('#chatBody').scrollHeight;
    $("#chatBody").animate({
      scrollTop: $('#chatBody').prop("scrollHeight")
    });
    return false;
  });

  socket.on('chatMessage', function(msg) {
    console.log('Client player chat messsage: ' + msg);
    $('#chatBody').append('Chat> ', msg.message, '<br>');
    $('#chatBody').scrollTop = $('#chatBody').scrollHeight;
    $("#chatBody").animate({
      scrollTop: $('#chatBody').prop("scrollHeight")
    });

    return false;
  });
});
