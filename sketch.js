var sound1
function preload(){
  sound1 = loadSound("0.mp3") //先把音樂檔載入到sound1程式碼中
}

var analyzer;


// 定義頭髮顏色陣列
var fcolors = "fbf8cc-fde4cf-ffcfd2-f1c0e8-cfbaf0-a3c4f3-90dbf4-8eecf5-98f5e1-b9fbc0".split("-").map(a => "#" + a)

// 定義初始位置的 x、y 座標陣列
var pos_x = [300, 200, 550, 900, 1000];
var pos_y = [150, 500, 600, 500, 50];

// 定義每個臉部的大小陣列
var sizes = [0.7, 1.2, 0.8, 1.5, 0.2];

// 定義物件移動速度
var vy    = [5,2,6,1,3]
var vx    = [3,1,8,6,4]

// 控制臉部移動和旋轉的變數
var face_move_var = false
var face_rot_var = false

// 定義眼球的初始位置
var eyeX = [-30, 30];
var eyeY = -40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(sound1) //使用analyzer.getLevel()取得音樂振幅

  //"移動"按鈕的設定
  btnMoveElement = createButton("移動") // 產生按鈕，上面有"移動"
  btnMoveElement.position(20,10) // 按鈕位置
  btnMoveElement.size(80,40) //按鈕大小
  btnMoveElement.style("font-size","20px") // 文字大小
  btnMoveElement.style("color","#ffcfd2") // 文字顏色
  btnMoveElement.style("background","#fff") // 文字方塊背景顏色
  btnMoveElement.mousePressed(face_move) //移動按鈕被按下，執行face_move函數
 
  //"暫停"按鈕的設定
  btnStopElement = createButton("暫停")
  btnStopElement.position(120,10) // 按鈕位置
  btnStopElement.size(80,40) //按鈕大小
  btnStopElement.style("font-size","20px") // 文字大小
  btnStopElement.style("color","#ffcfd2") // 文字顏色
  btnStopElement.style("background","#fff") // 文字方塊背景顏色
  btnStopElement.mousePressed(face_stop)

  //"旋轉"按鈕的設定
  btnRotElement = createButton("旋轉")
  btnRotElement.position(220,10) // 按鈕位置
  btnRotElement.size(80,40) //按鈕大小
  btnRotElement.style("font-size","20px") // 文字大小
  btnRotElement.style("color","#ffcfd2") // 文字顏色
  btnRotElement.style("background","#fff") // 文字方塊背景顏色
  btnRotElement.mousePressed(face_rot)

  //"停止旋轉"按鈕的設定
  btnNrotElement = createButton("取消")
  btnNrotElement.position(320,10) // 按鈕位置
  btnNrotElement.size(80,40) //按鈕大小
  btnNrotElement.style("font-size","20px") // 文字大小
  btnNrotElement.style("color","#ffcfd2") // 文字顏色
  btnNrotElement.style("background","#fff") // 文字方塊背景顏色
  btnNrotElement.mousePressed(face_nrot)

}

function draw() {
  background(100);
  let num = 0;
  
  // 迴圈遍歷每個臉部位置
  for (var i = 0; i < pos_x.length; i = i + 1) {
    num = num + 1;
    push();
      translate(pos_x[i], pos_y[i]); // 將座標系統移動到指定位置

      if(face_rot_var){
        rotate(sin(frameCount/20*vy[i]))//如果選轉角度一正一負，物件才會搖擺
      }
      drawface(fcolors[num % fcolors.length], sizes[i]); // 調用 drawface 函數，指定頭髮顏色和大小
    pop();
    
    if(face_move_var){
    pos_y[i] =  pos_y[i] + vy[i] //目前位置 + 速度(移動)
    pos_x[i] =  pos_x[i] + vx[i]
    }

    if(pos_y[i]>height){ //碰到視窗最底層
      vy[i] = -vy[i]
      pos_y[i] = height
      
    }

    if(pos_y[i]<0){ //碰到視窗最上層
      vy[i] = -vy[i]
      pos_y[i] = 0
    }

    if(pos_x[i]>width){ //碰到視窗最右
      vx[i] = -vx[i]
      pos_x[i] = width
    }

    if(pos_x[i]<0){ //碰到視窗最左
      vx[i] = -vx[i]
      pos_x[i] = 0
  }
}
}

// 繪製臉部的函數
function drawface(hair_clr = "#fbf8cc", size = 1) {
  push();
  scale(size); // 縮放臉部的大小

  // 頭髮
  fill(hair_clr);
  noStroke();
  ellipse(0, 0, 290, 380);
  rect(-140, -30, 280, 220);

  // 臉
  noStroke();
  fill(248, 209, 169);
  ellipse(0, 0, 170, 250);

  // 瀏海
  fill(hair_clr);
  noStroke();
  rect(-75, -150, 150, 100);

  // 眼白
  noStroke();
  fill(255);
  circle(-30, -40, 30);
  circle(30, -40, 30);

  // 眼球
  noStroke();
  fill(0);
  ellipse(eyeX[0], eyeY, 10, 10);
  ellipse(eyeX[1], eyeY, 10, 10);

  //當振幅為0時，嘴巴的高度為 40，為1時，嘴巴的高度為 100
  var mouthHeight = map(analyzer.getLevel(), 0, 1, 40, 100);
   
  // 嘴巴
  noStroke();
  fill(242, 82, 33);
  ellipse(0, 60, 20, mouthHeight);

  pop();
}

function mouseMoved() {
  // 根據滑鼠的位置更新眼球的位置
  eyeX = [-30 + mouseX / width * 12, 30 + mouseX / width * 12];
  eyeY = -40 + mouseY / height * 12;
}


function face_move(){
  face_move_var = true
}
  
function face_stop(){
  face_move_var = false
}

function face_rot(){
    face_rot_var = true
}

function face_nrot(){
  face_rot_var = false
}

//按下滑鼠播放音樂
function mousePressed(){
  if(mouseY>60){ 
  if(sound1.isPlaying()){
    sound1.stop();
  }else{
    sound1.play();
  }
}
}