let lang='ru';

async function loadLang(){
  let t = await (await fetch('lang/'+lang+'.json')).json();
  for(let k in t){
    let e=document.getElementById(k);
    if(e) e.innerText=t[k];
  }
}

async function checkVersion(){
  try{
    let v=(await (await fetch('version.txt')).text()).trim();
    let dot=document.getElementById('dot');
    let st=document.getElementById('status_text');

    if(v=='1.0'){
      dot.className='dot green';
      st.innerText=lang=='ru'?'Полностью работает':'Fully working';
    }else{
      dot.className='dot yellow';
      st.innerText=lang=='ru'?'Требуется обновление':'Need update';
    }
  }catch{
    dot.className='dot red';
  }
}

async function loadChangelog(){
  document.getElementById('changelog_text').innerText =
    await (await fetch('changelog.txt')).text();
}

function toggleLang(){
  lang=lang=='ru'?'en':'ru';
  loadLang();
  checkVersion();
}

loadLang();
checkVersion();
loadChangelog();