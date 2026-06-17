
const sampleRows = [
  {id:'SOL-2026-000184', tipo:'DNI', doc:'74518779', cliente:'JUAN CARLOS RAMÍREZ TORRES', concesionario:'AUTONORT', sucursal:'San Miguel', ejecutivo:'ALOCHA', fecha:'17/06/2026 09:35', sla:'06h 20m', etapa:'Evaluación Riesgos', estado:'En evaluación'},
  {id:'SOL-2026-000185', tipo:'DNI', doc:'42689123', cliente:'MARÍA ELENA FLORES RUIZ', concesionario:'AUTOESPAR', sucursal:'Surco', ejecutivo:'PMENDOZA', fecha:'17/06/2026 10:12', sla:'07h 03m', etapa:'Evaluación Riesgos', estado:'Pendiente'}
];
function showApp(){
  document.querySelector('.app-header')?.classList.remove('hidden');
  document.getElementById('bandeja-view')?.classList.remove('hidden');
  document.getElementById('loginView')?.classList.add('hidden');
}
function renderRows(){
  const tbody=document.getElementById('table-body'); if(!tbody) return;
  tbody.innerHTML = sampleRows.map(r=>`<tr>
    <td><strong>${r.id}</strong></td><td>${r.tipo}</td><td>${r.doc}</td><td>${r.cliente}</td><td>${r.concesionario}</td><td>${r.sucursal}</td><td>${r.ejecutivo}</td><td>${r.fecha}</td><td><span class="status-pill status-warn">${r.sla}</span></td><td>${r.etapa}</td><td><span class="status-pill status-info">${r.estado}</span></td><td><button class="btn btn-primary" onclick="abrirRevision('${r.id}')" style="padding:.35rem .65rem;font-size:.68rem">Revisar</button></td>
  </tr>`).join('');
  document.getElementById('total-results-count').textContent=sampleRows.length;
  const sol=document.getElementById('solicitudes-table-body');
  if(sol){ sol.innerHTML = sampleRows.slice(0,1).map(r=>`<tr><td><strong>${r.id}</strong></td><td>${r.tipo}</td><td>${r.doc}</td><td>${r.cliente}</td><td>${r.concesionario}</td><td>${r.sucursal}</td><td>${r.ejecutivo}</td><td>${r.fecha}</td><td>${r.etapa}</td><td><button class="btn btn-primary" style="padding:.35rem .65rem;font-size:.68rem">Tomar</button></td></tr>`).join(''); document.getElementById('sol-total-results-count').textContent=1; }
}
function showModule(module){
  document.getElementById('bandeja-view')?.classList.toggle('hidden', module!=='bandeja');
  document.getElementById('solicitudes-view')?.classList.toggle('hidden', module!=='solicitudes');
  document.getElementById('revisar-view')?.classList.add('hidden');
}
function abrirRevision(id){
  document.getElementById('bandeja-view')?.classList.add('hidden');
  document.getElementById('solicitudes-view')?.classList.add('hidden');
  document.getElementById('revisar-view')?.classList.remove('hidden');
  document.getElementById('header-solicitud-id').textContent=id;
  document.getElementById('header-carretera').textContent='EXPRESS';
  document.getElementById('checklist-carretera').textContent='Carretera: EXPRESS';
  switchTab('cliente'); renderTimeline(); renderChecklist(); renderComments();
}
function volverABandeja(){ showModule('bandeja'); }
function closeDetailModal(){document.getElementById('details-modal')?.classList.remove('active')}
function closeTomarModal(){document.getElementById('tomar-confirm-modal')?.classList.remove('active')}
function closePdfModal(){document.getElementById('pdf-modal')?.classList.remove('active')}
function closeTimelineModal(){document.getElementById('timeline-modal')?.classList.remove('active')}
function closeDocModal(id){document.getElementById(id)?.classList.remove('active')}
function submitObservar(){} function submitRechazar(){} function submitAprobar(){}
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>{document.getElementById('splashScreen')?.classList.add('hidden'); showApp(); renderRows();},500);
  document.getElementById('btnLoginSubmit')?.addEventListener('click',showApp);
  document.getElementById('btnLoginClear')?.addEventListener('click',()=>{document.getElementById('loginUser').value='';document.getElementById('loginPass').value='';});
  document.querySelectorAll('#decision-panel button, #decision-panel select, #decision-panel textarea').forEach(el=>el.disabled=true);
});
