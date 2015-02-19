var milkcocoa = new MilkCocoa("https://io-fi6535oxh.mlkcca.com");
/* your-app-id にアプリ作成時に発行される"io-"から始まるapp-idを記入します */
var chatDataStore = milkcocoa.dataStore("chat");
var textName, isLogin;
var scores = [];
var board = null;
window.onload = function(){
  textName = document.getElementById("nm");
  isLogin = false;
  board = document.getElementById("board");
}

function clickEvent(){
  if (!isLogin) {
    isLogin = true;
    document.getElementById("btn").style.display="none";
    textName.style.display="none";
    // Unityのloginを呼び出す
    u.getUnity().SendMessage("Comm","login",textName.value);
  }
}

function sendText(text){
  chatDataStore.push({message : text},function(data){
    console.log("送信完了!");
    textArea.value = "";
  });
}

chatDataStore.on("push",function(data){
  addText(data.value.message);
});

function addText(text){
  var msgDom = document.createElement("li");
  msgDom.innerHTML = text;
  board.insertBefore(msgDom, board.firstChild);
}

// 成功。特にやることはないので空
function login_ok() {
}

// エラー
function login_error() {
  isLogin = false;
  document.getElementById("btn").style.display="inline";
  textName.style.display="inline";
  alert("名前が入力されていないか、すでに同じ名前のユーザーがいます。");
}

// Unityから呼び出して、文字列をMilkcocoaに送信する関数Send
function Send(dt) {
  chatDataStore.send(dt);
}

// Milkcocoaからsendが届いた時に呼ばれるイベント。UnityのOnRecv関数をdata.valueを渡して呼び出す
chatDataStore.on("send",function(data){
  u.getUnity().SendMessage("Comm","OnRecv",data.value);
  
  // 受信したデータをコンマで分解
  var splits = data.value.split(",");

  // 名前が有効であることを確認
  if (splits[0].length > 0) {
    // 対応インデックス
    var scidx = -1;
    // 更新フラグ
    var isupdate = false;
    // 名前を取り出す
    var recvname = decodeURI(splits[0]);
    // スコアを数値で取り出す。-0しているのは、文字列を数値に変換するJavaScriptの表記の１つ
    var sc = splits[1]-0;
    // 登録されているスコア表のチェック
    scores.some(function(element,index,array) {
      // 登録しているデータがあれば
      if (element.scname === recvname) {
        // スコアのインデックスを記録
        scidx = index;
        // ループ終了
        return true;
      }
      // ループ継続
      return false;
    });
    
    // 名前が見つかった時の処理
    if (scidx != -1) {
      // 点数が記録を上回ったかをチェック
      if (sc > scores[scidx].score) {
        isupdate = true;
        scores[scidx].score = sc;
      }
    }
    // 名前が見つからなかった時は追加する
    else {
      scores.push({scname:recvname,score:sc});
      isupdate = true;
    }
    
    // 降順ソート
    scores.sort(
      function(a,b) {
        return b.score - a.score;
      }
    );

    // 更新されていたらスコアテーブルを再描画する
    if (isupdate) {
      var tbl = "";
      for (var i=0 ; i<scores.length ; i++) {
        tbl += "<tr><td>"+scores[i].scname+"</td><td>"+scores[i].score+"</td>";
      }
      board.innerHTML="<table style='margin:auto'>"+tbl+"</table>";
    }
  }
  
});

