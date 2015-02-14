var milkcocoa = new MilkCocoa("https://io-hi1wslbu4.mlkcca.com");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var chatDataStore = milkcocoa.dataStore("chat");
var textArea, board;
window.onload = function(){
  textArea = document.getElementById("msg");
  board = document.getElementById("board");
}

function clickEvent(){
chatDataStore.send({time: Date.now(),data0:0,data1:1,data2:'たなか',data3:'あばばば'});
}

chatDataStore.on("send",function(data){
  addText((Date.now()-data.value.time)+","+data.value.data2);
});

function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = text;
  board.insertBefore(msgDom, board.firstChild);
}
