var nick
function getNick() {
  nick = prompt("Podaj swój nick")
  startPolling();
}

colors = [
  'rgb(255, 255, 255)',
  'rgb(0, 0, 0)',
  'rgb(0, 0, 127)',
  'rgb(0, 147, 0)',
  'rgb(255, 0, 0)',
  'rgb(127, 0, 0)',
  'rgb(156, 0, 156)',
  'rgb(252, 127, 0)',
  'rgb(255, 255, 0)',
  'rgb(0, 252, 0)',
  'rgb(0, 147, 147)',
  'rgb(0, 255, 255)',
  'rgb(0, 0, 252)',
  'rgb(255, 0, 255)',
  'rgb(127, 127, 127)',
  'rgb(210, 210, 210)'
]



var color=colors[Math.floor(Math.random() * 15)];

$('#submit').click(sendMessage)

function sendMessage () {
  console.log($('#inputMessage').val())
  $.ajax({
    url: 'http://localhost:3000/message',
    data: {  nick: nick , colorNick: color, msg: $("#inputMessage").val()},
    type: "POST",
    dataType: "json"
  });
  document.querySelector('#inputMessage').value = '';
}

async function startPolling() {
  let response = await $.ajax({
    url: 'http://localhost:3000/long-poll',
    type: "POST",
    dataType: "json",
  })
  var obj = response
  console.log(obj)
  $('.messages').append("<div class='container'><div class='nick' style='color:" + obj.colorNick + "'>" + obj.nick + "</div>&nbsp:&nbsp<div class='message'>" + obj.msg + "</div></div><br>")
  $(document).ready(function () {
    $('.message').emoticonize({
      delay: 0,
      animate: false
    });
  })
  let element = document.querySelector('.messages');
  element.scrollTop = element.scrollHeight;
  startPolling()
}

// function startPolling() {
//   $.ajax({
//     url: 'http://localhost:3000/long-poll',
//     type: "POST",
//     dataType: "json",
//   })
//     .then((data) => {
//       var obj = data
//       console.log(obj)
//       $('.messages').append("<div class='container'><div class='nick' style='color:" + obj.colorNick + "'>" + obj.nick + "</div>&nbsp:&nbsp<div class='message'>" + obj.msg + "</div></div><br>")
//       $(document).ready(function () {
//         $('.message').emoticonize({
//           delay: 0,
//           animate: false
//         });
//       })

      
//       startPolling()
//     })
// }

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
      return;
  }
  switch (event.key) {
      case "Enter":
          sendMessage()
          break;
      default:
          return;
  }
})

$('.messages').niceScroll({ cursorborder: '0px' });
