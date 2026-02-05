let lang = 'ru';

async function loadLang(){
  try{
    let t = await (await fetch('lang/' + lang + '.json')).json();

    for(let k in t){
      let e = document.getElementById(k);
      if(e) e.innerText = t[k];
    }
  }catch(e){
    console.log('Lang load error', e);
  }
}

async function checkVersion(){
  let dot = document.getElementById('dot');
  let st  = document.getElementById('status_text');

  try{
    let v = (await (await fetch('version.txt')).text()).trim();

    if(v == '1.0'){
      dot.className = 'dot green';
      st.innerText = lang=='ru'
        ? 'Полностью работает'
        : 'Fully working';
    }else{
      dot.className = 'dot yellow';
      st.innerText = lang=='ru'
        ? 'Требуется обновление'
        : 'Need update';
    }

  }catch{
    dot.className = 'dot red';
    st.innerText = lang=='ru'
      ? 'Ошибка версии'
      : 'Version error';
  }
}

async function loadChangelog(){
  try{
    let text = await (await fetch('changelog.txt')).text();
    document.getElementById('changelog_text').innerText = text;
  }catch(e){
    console.log('changelog error', e);
  }
}

function toggleLang(){
  lang = lang=='ru' ? 'en' : 'ru';
  loadLang();
  checkVersion();
}

loadLang();
checkVersion();
loadChangelog();
