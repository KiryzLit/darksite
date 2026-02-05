let lang = 'ru';

async function loadLang(){
  let j = await fetch('lang/' + lang + '.json');
  let t = await j.json();

  for(let k in t){
    let e = document.getElementById(k);
    if(e) e.innerText = t[k];
  }
}

async function checkVersion(){
  let v = await (await fetch('version.txt')).text();

  let dot = document.getElementById('dot');
  let st  = document.getElementById('status_text');

  if(v.trim() == "1.0"){
    dot.className = "dot green";
    st.innerText = lang=="ru" ? "Полностью работает" : "Fully working";
  }else{
    dot.className = "dot yellow";
    st.innerText = lang=="ru" ? "Требуется обновление" : "Need update";
  }
}

async function loadChangelog(){
  let c = await (await fetch('changelog.txt')).text();
  document.getElementById('changelog_text').innerText = c;
}

function toggleLang(){
  lang = lang=='ru'?'en':'ru';
  loadLang();
}

loadLang();
checkVersion();
loadChangelog();
