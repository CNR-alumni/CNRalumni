/* Enable the carousel only when BOTH user-provided images are available. */
(()=>{
const hero=document.getElementById('cnrHero'),carousel=document.getElementById('heroCarousel');
if(!hero||!carousel)return;
const slides=Array.from(carousel.querySelectorAll('.hero-slide'));
const dots=Array.from(carousel.querySelectorAll('.hero-dot'));
const filenames=slides.map(slide=>slide.querySelector('img').getAttribute('src'));
const check=url=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(true);img.onerror=reject;img.src=url});
const crest=document.querySelector('.brand-icon img[data-alumni-crest]');
if(crest){check(crest.dataset.alumniCrest).then(()=>{crest.src=crest.dataset.alumniCrest}).catch(()=>{});}
Promise.all(filenames.map(check)).then(()=>{
 hero.classList.add('has-carousel');let index=0,timer;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const show=next=>{index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>{const active=i===index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.querySelector('img').tabIndex=active?0:-1});dots.forEach((dot,i)=>{const active=i===index;dot.classList.toggle('is-active',active);if(active)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current')})};
 const stop=()=>clearInterval(timer);const start=()=>{stop();if(!reduced)timer=setInterval(()=>show(index+1),4500)};
 document.getElementById('heroPrev')?.addEventListener('click',()=>{show(index-1);start()});
 document.getElementById('heroNext')?.addEventListener('click',()=>{show(index+1);start()});
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start()}));
 carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',start);
 carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))start()});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 show(0);start();
}).catch(()=>{/* Keep the original functioning school crest until both assets are uploaded. */});
})();
