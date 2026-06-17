
const evaluacion = {
  aplicaConyuge: true,
  
  resultado: {
    title: 'Resultado de Riesgos',
    fields: [
      ['Resultado de evaluación','En revisión','readonly'],['Segmento de riesgo','Bajo','readonly'],['Score interno','742','readonly'],['Política aplicada','Crédito vehicular EXPRESS','readonly'],
      ['Capacidad disponible','S/ 3,824.60','readonly'],['Ratio cuota ingreso','41.67%','readonly'],['Decisión preliminar','Califica con revisión','readonly'],['Analista asignado','Analista Riesgos','readonly']
    ]
  },
  comerciales: {
    title: 'Datos Comerciales',
    fields: [
      ['Concesionario','HYUNDAI','readonly'],['Tienda','PURUCHUCO','readonly'],['Vendedor','ALOCHA','readonly'],['Campaña comercial','SUV Mayo 2026','select'],
      ['Canal','Ejecutivo financiero','readonly'],['Fecha de solicitud','15/05/2026','readonly'],['Carretera','EXPRESS','readonly'],['Beneficio comercial','Tasa preferencial','readonly']
    ]
  },
  cliente: {
    title: 'Datos de Cliente',
    fields: [
      ['Tipo de documento','DNI','readonly'],['Número documento','70569533','readonly'],['Nombres','Juan','readonly'],['Apellido paterno','Pérez','readonly'],
      ['Apellido materno','García','readonly'],['Fecha de nacimiento','11/05/1995','readonly'],['Número de celular','987 654 321','readonly',1,true],['Correo electrónico','juan.perez.garcia@email.com','readonly',1,true],
      ['Sexo','Masculino','readonly'],['Nacionalidad','Peruana','readonly'],['Residencia','Lima, Perú','readonly',2],
      ['Dirección de domicilio','Av. La Marina 1234, San Miguel','readonly',4,true],
      ['Departamento','Lima','readonly',1,true],['Provincia','Lima','readonly',1,true],['Distrito','San Miguel','readonly',1,true],['Estado civil','Casado','readonly',1,true],
      ['Separación de bienes','No','readonly']
    ]
  },
  laboral: {
    title: 'Datos Laborales',
    fields: [
      ['Categoría laboral','Dependiente','select'],['RUC de empleador (no obligatorio)','Ingrese RUC','input'],['Giro o actividad','Comercio','select'],['Cargo','Empleado','select'],
      ['Fecha ingreso laboral','dd / mm / aaaa','date'],['Tipo moneda ingreso','Soles (S/)','select'],['Ingresos netos mensuales','S/ 0.00','readonly']
    ]
  },
  vehiculo: {
    title: 'Datos de Vehículo',
    fields: [
      ['Estado vehículo','Nuevo','readonly'],['Concesionario','HYUNDAI','readonly'],['Tienda','PURUCHUCO','readonly'],['Vendedor','ALOCHA','readonly'],
      ['Marca','Toyota','select'],['Modelo','Corolla','select'],['Año modelo','2026','readonly'],['Tarjeta propiedad a nombre de','TITULAR','select']
    ]
  },
  credito: {
    title: 'Crédito y Simulación',
    fields: [
      ['Producto','Crédito Vehicular','readonly'],['Campaña comercial','SUV Mayo 2026','select'],['Moneda Financiamiento','Dólares ($)','select'],['Tipo Cambio','3.78','input'],
      ['Precio Vehículo','$ 28,000.00','readonly'],['Cuota Inicial','$ 8,000.00','readonly'],['TEA','12.80%','readonly'],['Plazo Meses','24 meses','readonly'],
      ['Día Pago','03','select']
    ]
  },
  gastos: {
    title: 'Gastos y Plan GPS',
    fields: [
      ['Gastos Notariales','SÍ','select'],['Gastos Registrales (sábana)','SÍ','select'],['Gastos Delivery Firma','SÍ','select'],['Plan GPS','Premium','select'],
      ['Gastos Inclusión GPS (cálculo)','$ 650.00','readonly'],['Kit Mantenimiento prepagado','No','select'],['Cuotas Dobles','No','select'],['Incluir Portes','No','select'],
      ['Total Financiamiento','$ 21,480.00','readonly']
    ]
  },
  seguros: {
    title: 'Seguros',
    fields: [
      ['Seguro Vehicular','Propio','select'],['Costo Seguro Vehicular','S/ 1,200.00','input'],['Seguro Desgravamen','SÍ','select'],['Producto Desgravamen','Individual','select'],
      ['Costo Seguro Desgravamen (cálculo)','$ 0.00','readonly'],['Seguro Optativo','No','select'],['COSTO Seguro Optativo','NO','select'],['TIPO SEGURO OPTATIVO','Seleccionar','select']
    ]
  },
  ingresosTitular: {
    title: 'Titular',
    fields: [
      ['Tipo de ingreso','Dependiente fijo','select'],['Ingreso neto mensual','S/ 6,500.00','readonly'],['Ingreso complementario','S/ 1,200.00','readonly'],['Total ingresos','S/ 7,700.00','readonly']
    ]
  },
  ingresosConyuge: {
    title: 'Cónyuge',
    fields: [
      ['Categoría laboral','Independiente','select'],['Empresa','Consultora R&M','input'],['Cargo','Administradora','select'],['Tipo de ingreso','Recibos por honorarios','select'],
      ['Ingreso mensual','S/ 3,000.00','readonly'],['Ingreso complementario','S/ 0.00','readonly'],['Total ingresos','S/ 3,000.00','readonly']
    ]
  },
  conyuge: {
    title: 'Datos de Cónyuge',
    fields: [
      ['Tipo documento','DNI','select'],['N° documento','42157863','readonly'],['Nombres','MARÍA ROSA','readonly'],['Apellidos','MENDOZA LÓPEZ','readonly'],
      ['Categoría laboral','Independiente','select'],['Empresa','Consultora R&M','input'],['Cargo','Administradora','select'],['Total ingresos','S/ 3,000.00','readonly']
    ]
  }
};
const tabTitles = Object.fromEntries(Object.entries(evaluacion).map(([k,v]) => [k, v.title]));
function escapeHtml(v){return String(v ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));}
function fieldGrid(config){
  const fields = config.fields || [];
  return `<div class="readonly-grid form-like-grid">${fields.map(([label,value,type='readonly',span=1,required=false])=>{
    const spanClass = span === 4 ? ' span-4' : span === 3 ? ' span-3' : span === 2 ? ' span-2' : '';
    const isPlaceholder = ['Ingrese celular','Ingrese correo','Ingrese nacionalidad','Ingrese residencia','Ingrese dirección','Ingrese RUC','dd / mm / aaaa','Seleccionar'].includes(value);
    const controlClass = `readonly-control ${type === 'readonly' ? 'is-readonly' : ''} ${isPlaceholder ? 'is-placeholder' : ''}`;
    const chevron = type === 'select' ? '<span class="select-caret">⌄</span>' : '';
    const calendar = type === 'date' ? '<span class="calendar-icon">▣</span>' : '';
    return `<div class="readonly-field${spanClass}"><label>${escapeHtml(label)}${required ? ' <em>*</em>' : ''}</label><div class="${controlClass}"><span>${escapeHtml(value)}</span>${chevron}${calendar}</div></div>`;
  }).join('')}</div>`;
}
function switchTab(tab){
  document.querySelectorAll('.tab-nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(`tab-btn-${tab}`)?.classList.add('active');
  const area=document.getElementById('tab-content-area'); if(!area) return;
  let content='';
  if(tab==='ingresos'){
    content = `<h3 class="tab-section-title">Ingresos declarados</h3><div class="readonly-section"><div class="readonly-section-header">Titular</div>${fieldGrid(evaluacion.ingresosTitular)}</div>`;
    if(evaluacion.aplicaConyuge){ content += `<div class="readonly-section"><div class="readonly-section-header">Cónyuge</div>${fieldGrid(evaluacion.ingresosConyuge)}</div>`; }
  } else {
    const config=evaluacion[tab] || {title: tabTitles[tab] || '', fields: []};
    content = `<h3 class="tab-section-title">${escapeHtml(config.title || tabTitles[tab])}</h3>${fieldGrid(config)}`;
  }
  area.innerHTML=content;
}
function renderTimeline(){
  const el=document.getElementById('tracking-timeline'); if(!el) return;
  const data=[['Simulación','15/05/2026 09:20','Ejecutivo financiero','status-ok'],['Solicitud recibida','15/05/2026 09:45','Mesa de riesgos','status-ok'],['Validación documental','15/05/2026 10:05','Sistema Originador','status-info'],['Asignación a riesgos','15/05/2026 10:15','Analista Riesgos','status-warn']];
  el.innerHTML=data.map(([t,f,u,c])=>`<div class="tracking-item"><span class="tracking-dot"></span><div class="tracking-title">${t}</div><div class="tracking-meta">${f}</div><div class="tracking-meta">${u}</div><span class="status-pill ${c}" style="margin-top:.35rem">Registrado</span></div>`).join('');
}
function renderChecklist(){
  const tbody=document.getElementById('checklist-body'); if(!tbody) return;
  const docs=['DNI ambas caras','Boleta de pago','Sustento de ingresos complementarios','Proforma del vehículo','Recibo de servicios'];
  tbody.innerHTML=docs.map((d,i)=>`<tr><td>${i+1}</td><td><strong>${d}</strong></td><td>${d.replaceAll(' ','_')}.pdf</td><td><span class="status-pill status-info">Solo lectura</span></td></tr>`).join('');
}
function renderComments(){
  const el=document.getElementById('comments-history-list'); if(!el) return;
  el.innerHTML='<div class="readonly-notice" style="margin-bottom:0">Sin comentarios pendientes. Panel bloqueado por modo solo lectura.</div>';
}
