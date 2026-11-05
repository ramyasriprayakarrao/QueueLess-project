const API='http://localhost:3000/api';
const authToken=localStorage.getItem('queueLessToken');
if(!authToken) location.href='login.html';
const tokenForm=document.getElementById('tokenForm');
if(tokenForm) tokenForm.addEventListener('submit',async e=>{
 e.preventDefault();
 try{
  const res=await fetch(`${API}/queue/token`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${authToken}`},body:JSON.stringify({service:document.getElementById('service').value})});
  const data=await res.json();if(!res.ok)throw new Error(data.message||'Could not create token');
  localStorage.setItem('queueLessLastToken',JSON.stringify(data.token));
  document.getElementById('tokenResult').innerHTML=`<div class="token-card"><h2>Token: ${data.token.token_number}</h2><p>Service: ${data.token.service}</p><p>Status: ${data.token.status}</p><a href="token.html">View token</a></div>`;
 }catch(err){document.getElementById('tokenResult').textContent=err.message;}
});
async function refreshQueue(){try{const r=await fetch(`${API}/queue/status`,{headers:{Authorization:`Bearer ${authToken}`}});const d=await r.json();if(!r.ok)throw new Error(d.message);document.getElementById('queueStatus').innerHTML=d.queue.length?d.queue.map(x=>`<div class="queue-row">Token <b>${x.token_number}</b><span>${x.service}</span><span class="status">${x.status}</span></div>`).join(''):'No active tokens.';}catch(e){document.getElementById('queueStatus').textContent=e.message;}}
document.getElementById('refreshQueue')?.addEventListener('click',refreshQueue);
function logout(){localStorage.removeItem('queueLessToken');localStorage.removeItem('queueLessUser');location.href='login.html';}
