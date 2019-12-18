let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let startX = 50;
let startY = 50;
let cellWidth = 50;
let cellHeight = 50;
let colum = +prompt('Количество ячеек по вертикали?', 10);
let row = +prompt('Количество ячеек по горизонтали?', 10);
let rectWidth = cellWidth * row;
let rectHeight = cellHeight * colum;
let coords = {};
let clr = document.getElementById('clear');
let rst = document.getElementById('restore');
let tempCoords = [];
let count = 0;

canv.width = rectWidth + 1;
canv.height = rectHeight + 1;

function field(ctx, startX, startY) {
  for (let i = 0.5; i < rectHeight; i += cellWidth) {
      ctx.moveTo(startX + i, startY);
      ctx.lineTo(startX + i, rectHeight);
    }
  for (let j = 0.5; j < rectWidth; j += cellHeight) {
      ctx.moveTo(startX, startY + j);
      ctx.lineTo(rectHeight, startY + j);
    }
    ctx.stroke();
}

canv.addEventListener('click', function(e) {
  let x = event.clientX;
  let y = event.clientY;
  x = Math.floor(x/cellWidth)*cellWidth;
  y = Math.floor(y/cellHeight)*cellHeight;
  let key = x + ':' + y;
  if (key in coords) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x + 1, y + 1, cellWidth - 1, cellHeight - 1);
    delete coords[key];
  } else if (x == 0 || y == 0) {
    console.log('miss');
  } else {
    ctx.fillStyle = 'black';
    ctx.fillRect(x + 1, y + 1, cellWidth - 1, cellHeight - 1);
    coords[key] = key;
  }
});

clr.addEventListener('click', function(e) {
  tempCoords = coords;
  ctx.fillStyle = 'white';
  ctx.fillRect(startX, startY, rectWidth, rectHeight);
  field(ctx, startX, startY);
  coords = {};
})

rst.addEventListener('click', function(e) {
  coords = tempCoords;
  for (let temp in tempCoords) {
  let arrTemp = temp.split(':');
  ctx.fillStyle = 'black';
  ctx.fillRect(+arrTemp[0],  +arrTemp[1] + 1, cellWidth - 1, cellHeight - 1);
  };
});

field(ctx, startX, startY);
