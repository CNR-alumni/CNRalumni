/* Load both supplied images before enabling the orbit. */
(()=>{
const hero=document.getElementById('cnrHero'),carousel=document.getElementById('heroCarousel');
if(!hero||!carousel)return;
const slides=Array.from(carousel.querySelectorAll('.hero-slide'));
const check=url=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=url});
Promise.all(slides.map(slide=>check(slide.querySelector('img').src))).then(()=>{
 hero.classList.add('has-carousel');
 let index=0,timer,turn=0,gesture=null,hovered=false;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const show=next=>{
  const target=(next+slides.length)%slides.length;
  if(target!==index){turn+=next>index?180:-180;carousel.style.setProperty('--orbit-turn',turn+'deg')}
  index=target;
  slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.querySelector('img').draggable=false});
 };
 const stop=()=>clearInterval(timer);
 const start=()=>{stop();if(!reduced&&!document.hidden&&!hovered&&!gesture&&!carousel.contains(document.activeElement))timer=setInterval(()=>show(index+1),3500)};
 const finish=()=>{gesture=null;carousel.classList.remove('is-dragging');start()};
 carousel.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY};stop();carousel.classList.add('is-dragging');carousel.setPointerCapture(e.pointerId);
 });
 carousel.addEventListener('pointerup',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(Math.abs(dx)>=40&&Math.abs(dx)>Math.abs(dy)*1.25)show(index+(dx<0?1:-1));
  finish();
 });
 carousel.addEventListener('pointercancel',finish);
 carousel.addEventListener('lostpointercapture',()=>{if(gesture)finish()});
 carousel.addEventListener('keydown',e=>{
  if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
  e.preventDefault();stop();show(index+(e.key==='ArrowRight'?1:-1));
 });
 carousel.addEventListener('mouseenter',()=>{hovered=true;stop()});
 carousel.addEventListener('mouseleave',()=>{hovered=false;start()});
 carousel.addEventListener('focusin',stop);
 carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))start()});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 show(0);start();
}).catch(()=>{/* Retain the crest fallback if either image cannot load. */});
})();
