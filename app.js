const games=catalog.games;
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fold=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let state='home',current=games[0],query='',genre='',franchise='',favoritesOnly=false,page=0,editionIndex=0,timer=null,pct=0,hero=0;
let prefs;try{prefs=JSON.parse(localStorage.getItem('hn3d-v02')||'{}')}catch{prefs={}}
if(!prefs||typeof prefs!=='object'||Array.isArray(prefs))prefs={};
prefs.favorites=Array.isArray(prefs.favorites)?prefs.favorites:[];prefs.ratings=prefs.ratings&&typeof prefs.ratings==='object'?prefs.ratings:{};
const save=()=>{try{localStorage.setItem('hn3d-v02',JSON.stringify(prefs))}catch{}};
const date=()=>new Date().toISOString().slice(0,10);
function daily(){let seed=2166136261;for(const c of date())seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;let a=[...games].sort((x,y)=>x.id<y.id?-1:x.id>y.id?1:0);for(let i=a.length-1;i>0;i--){let bound=i+1,threshold=(4294967296-bound)%bound;do{seed=(Math.imul(seed,1664525)+1013904223)>>>0}while(seed<threshold);let j=seed%bound;[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,3)}
let drawDate=date(),featured=daily();
function chosen(){const v=current.variants?.[editionIndex];return v?{...current,...v,icon_path:v.icon_path||current.icon_path,banner_path:v.banner_path||current.banner_path}:current}
function filtered(){return games.filter(g=>(!genre||(g.genres||[g.genre]).includes(genre))&&(!franchise||g.franchise===franchise)&&(!favoritesOnly||prefs.favorites.includes(g.id))&&fold(g.title+' '+g.franchise).includes(fold(query)))}
function head(){return '<header><img class="brand-logo" src="logo.png" alt="Heivoli Network"><span>HEIVOLI NETWORK 3D</span></header>'}
function art(g){return `<div class="cover" style="--c:${esc(g.color)}">${g.icon_path?`<img src="assets/${esc(g.icon_path)}" alt="Icône ${esc(g.title)}" loading="lazy">`:esc(g.initials||'HN')}</div>`}
function active(id){return id==='catalog'?state==='catalog'&&!favoritesOnly:id==='favorites'?state==='catalog'&&favoritesOnly:state===id}
function tabs(){return '<nav class="tabs">'+[['home','Accueil'],['catalog','Catalogue'],['favorites','Favoris'],['settings','Options']].map(([id,label])=>`<button data-nav="${id}" class="${active(id)?'active':''}">${label}</button>`).join('')+'</nav>'}
function options(key,all){const values=key==='genre'?[...new Set(games.flatMap(g=>g.genres||[g.genre]))]:[...new Set(games.map(g=>g[key]))];return `<option value="">${all}</option>`+values.sort().map(v=>`<option ${v===(key==='genre'?genre:franchise)?'selected':''}>${esc(v)}</option>`).join('')}
function rows(){const list=filtered(),shown=list.slice(page*2,page*2+2);return shown.length?shown.map(g=>`<button class="row" data-game="${g.id}">${art(g)}<span><strong>${esc(g.title)}</strong><small>${esc(g.genre)} · ${esc(g.region)}</small></span></button>`).join(''):'<p class="notice">Aucun jeu ne correspond à ces filtres.</p>'}
function render(){
 let g=state==='home'?featured[hero]:state==='catalog'?(filtered()[page*2]||current):chosen();
 $('#top').innerHTML=head()+(state==='download'?'<canvas id="nds-transfer" width="400" height="211" aria-label="Animation de téléchargement reprise du shop NDS"></canvas>' :`<div class="hero" style="--c:${esc(g.color)}">${g.banner_path?`<img class="official-banner" src="assets/${esc(g.banner_path)}" alt="Bannière ${esc(g.title)}">`:`<div class="monogram">${esc(g.initials||'HN')}</div><h2>${esc(g.title)}</h2><p>Illustration indisponible</p>`}</div><div class="top-caption"><b>${esc(g.title)}</b><p>${state==='home'?'Sélection du '+date()+' UTC · '+games.length+' fiches':esc(g.genre)+' · '+esc(g.region)+(prefs.ratings[current.id]?' · Votre note locale : '+prefs.ratings[current.id]+'/5':'')}</p></div>`);
 let body='';
 if(state==='home')body=`<button class="search" data-action="search">Rechercher un jeu (Y)</button><div class="section-label">À la une aujourd’hui</div><div class="tiles"><button class="tile" data-game="${g.id}">${art(g)}<span class="name">${esc(g.title)}</span></button></div><div class="daily-controls"><button data-action="daily-prev" aria-label="Sélection précédente">←</button><b>${hero+1}/3</b><button data-action="daily-next" aria-label="Sélection suivante">→</button></div>`;
 if(state==='catalog')body=`<input class="search" id="search" aria-label="Rechercher un jeu" placeholder="Rechercher un jeu…" value="${esc(query)}"><div class="filters"><select id="genre" aria-label="Genre">${options('genre','Tous les genres')}</select><select id="franchise" aria-label="Franchise">${options('franchise','Toutes les franchises')}</select></div><div class="list" id="list">${rows()}</div><div class="pager"><button data-action="prev" aria-label="Page précédente">‹</button><span>${filtered().length} résultats · page ${page+1}/${Math.max(1,Math.ceil(filtered().length/2))}</span><button data-action="next" aria-label="Page suivante">›</button></div>`;
 if(state==='detail'){const v=chosen();body=`<div class="detail"><button class="edition" data-action="edition">Édition : ${esc(v.region)} · ${editionIndex+1}/${Math.max(1,current.variants?.length||1)}</button><p class="languages">Langues : ${esc(v.languages||'Voir infos')}</p><button class="info-button" data-action="info">Infos du jeu (R)</button><button class="fav" data-action="favorite">${prefs.favorites.includes(current.id)?'Favori ✓':'+ Favori'}</button><div class="rating">${[1,2,3,4,5].map(n=>`<button data-rate="${n}" aria-label="Noter ${n} sur 5" class="${n<=(prefs.ratings[current.id]||0)?'on':''}">★</button>`).join('')}</div><button class="action preview-download" data-action="download">Aperçu du téléchargement</button></div>`}
 if(state==='info'){const v=chosen();body=`<div class="info-copy"><b>${esc(v.title)}</b><p>${esc(v.publisher)}<br>${esc(v.genre)} · ${esc(v.region)}<br>Langues : ${esc(v.languages||'Non renseignées')}</p><p>${esc(v.description||'Description indisponible.')}</p></div><div class="info-actions"><button data-action="back">Retour</button><a target="_blank" rel="noopener" href="${esc(v.source_url)}">Fiche hShop ↗</a></div>`}
 if(state==='settings')body=`<div class="settings"><strong>Options · 0.2.11</strong><p>${games.length} jeux<br>Notes locales dans cet aperçu.</p><button class="action" data-action="download">Aperçu de l’animation</button><p>Installation réelle depuis le CIA.</p></div>`;
 if(state==='download')body=`<div class="download"><h3>${pct>=100?'Aperçu terminé':'Un jeu prend forme…'}</h3><p>Animation du shop NDS.<br>Téléchargement simulé.</p><p class="simulated-amount">0 % · simulation</p><button class="action secondary" data-action="back">Retour à la fiche</button></div>`;
 $('#bottom').innerHTML=head()+`<div class="content">${body}</div>`+tabs();bind();if(state==='download')animateNdsPreview(g);
}
function navigate(to){clearInterval(timer);timer=null;if(to==='favorites'){state='catalog';favoritesOnly=true}else{state=to;favoritesOnly=false}page=0;render()}
function openGame(id){clearInterval(timer);current=games.find(g=>g.id===id)||games[0];state='detail';editionIndex=0;render()}
function bindRows(){document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>openGame(b.dataset.game))}
function bind(){
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>navigate(b.dataset.nav));bindRows();
 document.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{prefs.ratings[current.id]=Number(b.dataset.rate);save();render()});
 document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const action=b.dataset.action;
 if(action==='info'){state='info';render()}
 if(action==='daily-prev'){hero=(hero+2)%3;render()}
 if(action==='daily-next'){hero=(hero+1)%3;render()}
 if(action==='search'){navigate('catalog');$('#search').focus()}
 if(action==='edition'){editionIndex=(editionIndex+1)%Math.max(1,current.variants?.length||1);render()}
 if(action==='favorite'){const at=prefs.favorites.indexOf(current.id);if(at<0)prefs.favorites.push(current.id);else prefs.favorites.splice(at,1);save();render()}
 if(action==='prev'){page=Math.max(0,page-1);render()}
 if(action==='next'){page=Math.min(Math.max(0,Math.ceil(filtered().length/2)-1),page+1);render()}
 if(action==='download'){if(state==='settings'){current=featured[0];editionIndex=0}state='download';pct=0;render();clearInterval(timer);const start=performance.now();timer=setInterval(()=>{pct=Math.min(100,(performance.now()-start)/150);const amount=$('.simulated-amount');if(amount)amount.textContent=Math.floor(pct)+' % · simulation';const p=$('.download-top');if(p){p.style.setProperty('--pct',pct+'%');$('.percent').textContent=Math.floor(pct)+' % · simulation'}if(pct>=100){clearInterval(timer);timer=null;$('.download h3').textContent='Aperçu terminé'}},100)}
 if(action==='back'){clearInterval(timer);state='detail';render()}
 });
 const input=$('#search');if(input)input.oninput=()=>{const caret=input.selectionStart;query=input.value;page=0;render();const next=$('#search');next.focus();next.setSelectionRange(caret,caret)};
 for(const key of ['genre','franchise']){const e=$('#'+key);if(e)e.onchange=()=>{if(key==='genre')genre=e.value;else franchise=e.value;page=0;render()}}
}
// Same rail, stagger and fall constants as the NDS bubble_motion.hpp.
function animateNdsPreview(game){
 const canvas=$('#nds-transfer');if(!canvas)return;const c=canvas.getContext('2d'),start=performance.now();
 const image=new Image();if(game.icon_path)image.src='assets/'+game.icon_path;
 const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
 const circle=(x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()};
 const round=(x,y,w,h,r,color)=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()};
 const bag=(x,y,fill)=>{
  circle(x+40,y+9,23,'#ed7d1b');circle(x+40,y+9,17,'#f9f8f4');rect(x+11,y+9,58,15,'#f9f8f4');
  round(x,y+12,80,88,7,'#e5e0d7');round(x-2,y+9,80,88,7,'#ed7d1b');round(x+4,y+15,68,76,4,'#ffa42e');
  const level=Math.max(0,Math.min(1,fill))*68;rect(x+8,y+87-level,60,level,'#ed7d1b');
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){let cy=y+77-row*16;if(cy>y+87-level)rect(x+11+col*14,cy,11,11,'#ffffff50')}
  circle(x+25,y+47,4,'white');circle(x+51,y+47,4,'white');round(x+28,y+63,21,5,2,'white');
 };
 function frame(){
  if(state!=='download'||canvas!==$('#nds-transfer'))return;
  const t=(performance.now()-start)/1000,ratio=pct/100;
  c.setTransform(1,0,0,1,0,-29);rect(0,29,400,211,'#f9f8f4');
  c.fillStyle='#20251e';c.font='16px Arial';c.fillText(game.title,12,52,376);
  if(pct>=100){bag(160,104,1);c.fillStyle='#20251e';c.font='18px Arial';c.fillText('Fichier prêt !',125,86)}
  else {
   rect(0,77,400,2,'#adaa9d');
   for(let i=0;i<7;i++){
    const travel=211/58,fall=1.05,period=7*.82;let age=t-i*.82;if(age<0)continue;age%=period;
    let x=-18,y=90,attached=true;
    if(age<travel)x=-18+58*age;else if(age<travel+fall){x=193;y=90+64*((age-travel)/fall)**2;attached=false}
    if(x<0)continue;if(attached){rect(x-1,78,2,6,'#a19e91');circle(x,78,2,'#e5e0d7')}
    circle(x,y,7,'#ed7d1b');circle(x-2,y-2,2.2,'white');
   }
   bag(224+4*Math.sin(t*2),125,0);round(145,134,104,98,5,'#e5e0d7');round(141,130,104,98,4,'white');
   if(image.complete&&image.naturalWidth)c.drawImage(image,151,140,84,84);
   else rect(151,140,84,84,game.color||'#9d4500');
   rect(147,224-84*ratio,92,84*ratio,'#ff8910d2');rect(147,224-84*ratio,92,2,'#ed7d1b');
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
}
window.addEventListener('keydown',e=>{if(e.target.matches('input,select'))return;if(e.key==='Escape')navigate('home');if(e.key.toLowerCase()==='y'){navigate('catalog');$('#search').focus()}});
setInterval(()=>{if(date()!==drawDate){drawDate=date();featured=daily();if(state==='home')render()}},30000);render();
