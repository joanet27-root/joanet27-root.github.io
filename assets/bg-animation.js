// crea el canvas y lo coloca al principio del <body>
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let w, h;
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
addEventListener('resize', resize, {passive:true});
resize();

// nodos y líneas
const N = 60;
const nodes = Array.from({length:N}, () => ({
  x: Math.random()*w, y: Math.random()*h,
  vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4
}));

function frame(){
  ctx.clearRect(0,0,w,h);

  // puntos
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for(const n of nodes){
    n.x+=n.vx; n.y+=n.vy;
    if(n.x<0||n.x>w) n.vx*=-1;
    if(n.y<0||n.y>h) n.vy*=-1;
    ctx.beginPath(); ctx.arc(n.x,n.y,1.5,0,Math.PI*2); ctx.fill();
  }

  // líneas
  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx,dy);
      if(d<120){ ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke(); }
    }
  }
  requestAnimationFrame(frame);
}
frame();
