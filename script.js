const videos=[
{id:"_QOExkQZSgY",title:"Keliling Kota PALING ISLAM di Spanyol - Granada, Andalusia",category:"Masjid & Sejarah",desc:"Menjelajahi Granada dan jejak peradaban Islam di Andalusia.",duration:"YouTube"},
{id:"FtRkc82KJtY",title:"NETHERLANDS: A Small Country Full of Wonders",category:"Dunia",desc:"Eksplorasi keindahan, arsitektur, kanal, dan berbagai keajaiban Belanda.",duration:"YouTube"},
{id:"ro-8ODGp3Yc",title:"23 Desa Terindah Paling Sulit Dijangkau Di Bumi",category:"Alam",desc:"Perjalanan melihat desa-desa terpencil dengan pemandangan yang menakjubkan.",duration:"YouTube"},
{id:"ec1hkzXNdN8",title:"Exploring World Wonders & High-Tech Wonders",category:"Dunia",desc:"Eksplorasi berbagai mahakarya arsitektur dan keajaiban dunia.",duration:"YouTube"}
];

const prayerTimes={Subuh:"04:35",Dzuhur:"11:54",Ashar:"15:12",Maghrib:"17:58",Isya:"19:07"};
let filter="all",query="";

function renderPrayer(){
 const grid=document.getElementById("prayerGrid"); grid.innerHTML="";
 Object.entries(prayerTimes).forEach(([name,time])=>{
   const el=document.createElement("div"); el.className="prayer-card"; el.id="prayer-"+name;
   el.innerHTML=`<span class="prayer-name">${name}</span><span class="prayer-time">${time}</span>`; grid.appendChild(el);
 });
}
function updateClock(){
 const now=new Date(), hh=String(now.getHours()).padStart(2,"0"), mm=String(now.getMinutes()).padStart(2,"0"), ss=String(now.getSeconds()).padStart(2,"0"), cur=hh+":"+mm;
 document.getElementById("digitalClock").textContent=`${hh}:${mm}:${ss}`;
 document.getElementById("dateText").textContent=now.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 document.querySelectorAll(".prayer-card").forEach(x=>x.classList.remove("active"));
 const entries=Object.entries(prayerTimes), future=entries.find(([,t])=>t>cur); const next=future||entries[0];
 const active=entries.reduce((last,[n,t])=>t<=cur?[n,t]:last,null);
 if(active) document.getElementById("prayer-"+active[0])?.classList.add("active");
 document.getElementById("nextPrayer").textContent="Sholat berikutnya: "+next[0]+" • "+next[1];
 let target=new Date(now); let [h,m]=next[1].split(":"); target.setHours(+h,+m,0,0); if(target<=now) target.setDate(target.getDate()+1);
 let d=target-now, H=Math.floor(d/3600000), M=Math.floor(d%3600000/60000), S=Math.floor(d%60000/1000);
 document.getElementById("countdown").textContent=`${String(H).padStart(2,"0")}:${String(M).padStart(2,"0")}:${String(S).padStart(2,"0")}`;
}
function renderVideos(){
 const grid=document.getElementById("videoGrid"), q=query.toLowerCase();
 const list=videos.filter(v=>(filter==="all"||v.category===filter)&&((v.title+" "+v.desc).toLowerCase().includes(q)));
 document.getElementById("resultCount").textContent=list.length+" video";
 grid.innerHTML=list.length?list.map(v=>`<article class="video-card" onclick='openVideo(${JSON.stringify(v)})'>
 <div class="thumb"><img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" loading="lazy" alt="${v.title}"><div class="play"><i>▶</i></div></div>
 <div class="card-body"><span class="tag">${v.category.toUpperCase()}</span><h3>${v.title}</h3><p>${v.desc}</p><div class="meta"><span>▶ Tonton di YouTube</span><span>${v.duration}</span></div></div></article>`).join(""):`<div style="grid-column:1/-1;text-align:center;padding:60px;color:#84958e">Tidak ada video yang cocok.</div>`;
}
function openVideo(v){
 document.getElementById("modalTitle").textContent=v.title;document.getElementById("modalCategory").textContent=v.category;document.getElementById("modalDesc").textContent=v.desc;
 document.getElementById("videoFrame").src=`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`;document.getElementById("modal").classList.add("show");document.body.style.overflow="hidden";
}
function closeModal(){document.getElementById("modal").classList.remove("show");document.getElementById("videoFrame").src="";document.body.style.overflow="";}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;renderVideos()});
document.getElementById("searchInput").oninput=e=>{query=e.target.value;renderVideos()};
document.getElementById("closeBtn").onclick=closeModal;document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")closeModal()};document.onkeydown=e=>{if(e.key==="Escape")closeModal()};
document.getElementById("locationBtn").onclick=()=>alert("Demo lokasi: Palembang. Jadwal di bawah dapat kamu ubah di bagian prayerTimes pada script.js.");
renderPrayer();renderVideos();updateClock();setInterval(updateClock,1000);
