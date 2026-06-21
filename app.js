/* ========================================
   EFECTIVA - TU FINANCIERA
   Módulo Ejecutivo v2 - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // DOM REFERENCES
    // ============================
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const headerUser = document.getElementById('headerUser');
    const userDropdown = document.getElementById('userDropdown');
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const modulePages = document.querySelectorAll('.module-page');

    // Simulación
    const formSimulacion = document.getElementById('formSimulacion');
    const tipoDocumento = document.getElementById('tipoDocumento');
    const nroDocumento = document.getElementById('nroDocumento');
    const nroTelefono = document.getElementById('nroTelefono');
    const calcTelefonoPoliticas = document.getElementById('calcTelefonoPoliticas');
    const toggleConyuge = document.getElementById('toggleConyuge');
    const conyugeData = document.getElementById('conyugeData');
    const labelNo = document.getElementById('labelNo');
    const labelSi = document.getElementById('labelSi');
    const btnSimular = document.getElementById('btnSimular');
    const btnLimpiar = document.getElementById('btnLimpiar');

    // Bandeja Redesigned
    const searchSolId = document.getElementById('searchSolId');
    const searchDocNum = document.getElementById('searchDocNum');
    const searchConcesionario = document.getElementById('searchConcesionario');
    const searchTienda = document.getElementById('searchTienda');
    const searchEstado = document.getElementById('searchEstado');
    const searchFechaDesde = document.getElementById('searchFechaDesde');
    const searchFechaHasta = document.getElementById('searchFechaHasta');
    const btnLimpiarBandeja = document.getElementById('btnLimpiarBandeja');
    const btnBuscarBandeja = document.getElementById('btnBuscarBandeja');
    const tablaBandejaNewBody = document.getElementById('tablaBandejaNewBody');
    const btnBandejaMenu = document.getElementById('btnBandejaMenu');

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBtnCancel = document.getElementById('modalBtnCancel');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Toast
    const toastContainer = document.getElementById('toastContainer');

    // Global active solicitation state
    let currentSolicitudId = null;
    let correlativoCounter = 1;
    let isSolicitudReadOnly = false;
    let currentCarretera = 'EXPRESS';

    // ============================
    // MOCK DATA — Bandeja de Entrada
    // ============================
    const solicitudes = [
        {
            id: 'EFE004',
            cliente: 'Pérez García Juan',
            documento: 'DNI - 71865987',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 21,480.00',
            fecha: '22-05-2026 15:30:00',
            concesionario: 'Toyota',
            tienda: 'San Miguel',
            etapa: 'DOCUMENTARIA',
            estado: 'PENDIENTE',
            telefono: '922159933'
        },
        {
            id: 'EFE001',
            cliente: 'Méndez Quispe Carlos',
            documento: 'DNI - 12345678',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 48,500.00',
            fecha: '20-05-2026 15:30:00',
            concesionario: 'Toyota',
            tienda: 'Puruchuco',
            etapa: 'SIMULACIÓN',
            estado: 'PENDIENTE',
            telefono: '987654321'
        },
        {
            id: 'EFE002',
            cliente: 'López Fernández María',
            documento: 'DNI - 12345678',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 65,200.00',
            fecha: '20-05-2026 15:30:00',
            concesionario: 'Hyundai',
            tienda: 'San Miguel',
            etapa: 'RIESGOS',
            estado: 'PENDIENTE',
            telefono: '912345678'
        },
        {
            id: 'EFE003',
            cliente: 'Sánchez Vargas Roberto',
            documento: 'DNI - 23456789',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 35,800.00',
            fecha: '20-05-2026 15:30:00',
            concesionario: 'Toyota',
            tienda: 'La Molina',
            etapa: 'RIESGOS',
            estado: 'APROBADO',
            telefono: '998877665'
        },
        {
            id: 'POP001',
            cliente: 'Torres Delgado Ana',
            documento: 'DNI - 34567890',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 52,000.00',
            fecha: '19-05-2026 11:20:00',
            concesionario: 'Hyundai',
            tienda: 'Puruchuco',
            etapa: 'OPERACIONES',
            estado: 'OBSERVADO',
            telefono: '945612378',
            downloadedPostAprobacionDocs: [
                'Carta de aprobación',
                'Contrato de crédito',
                'Pagaré',
                'Hoja resumen (TCEA)',
                'Cronograma preliminar',
                'Póliza de seguro vehicular',
                'Póliza de desgravamen',
                'Contrato de garantía'
            ],
            checklist2Docs: [
                { id: 'POP001-CL2-001', name: 'DNI_cliente_POP001.pdf' },
                { id: 'POP001-CL2-002', name: 'Contrato_credito_firmado_POP001.pdf' },
                { id: 'POP001-CL2-003', name: 'Garantia_mobiliaria_POP001.pdf' }
            ],
            operacionesObservacion: {
                analista: 'María Fernández - Operaciones',
                motivo: 'Documento observado',
                fechaHora: '20-05-2026 10:35:00',
                comentario: 'Se observa que el archivo de garantía mobiliaria no cuenta con el dato completo del VIN. Regularizar el documento y reenviar a operaciones.'
            },
            operacionesRespuestaHabilitada: false,
            operacionesRespuestaEnviada: false,
            checklist2Comentario: '',
            postAprobacionCompletionPopupShown: true
        },
        {
            id: 'POP003',
            cliente: 'García Paredes Luis',
            documento: 'DNI - 56789012',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 72,350.00',
            fecha: '18-05-2026 16:40:00',
            concesionario: 'Hyundai',
            tienda: 'La Molina',
            etapa: 'RIESGOS',
            estado: 'OBSERVADO',
            telefono: '923456789'
        },
        {
            id: 'POP002',
            cliente: 'Huamán Ramos Patricia',
            documento: 'DNI - 45678901',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 41,900.00',
            fecha: '18-05-2026 10:45:00',
            concesionario: 'Toyota',
            tienda: 'San Miguel',
            etapa: 'RIESGOS',
            estado: 'RECHAZADO',
            telefono: '976543210'
        },
        {
            id: 'POP004',
            cliente: 'Ramírez Castro José',
            documento: 'DNI - 67890123',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 58,600.00',
            fecha: '17-05-2026 09:15:00',
            concesionario: 'Kia',
            tienda: 'Puruchuco',
            etapa: 'ACTIVACIÓN',
            estado: 'ACTIVADO',
            telefono: '934567812'
        },
        {
            id: 'POP005',
            cliente: 'Díaz Morales Carmen',
            documento: 'DNI - 78901234',
            tipoCredito: 'Crédito vehicular',
            monto: 'S/ 39,750.00',
            fecha: '16-05-2026 12:00:00',
            concesionario: 'Chevrolet',
            tienda: 'San Miguel',
            etapa: 'FIRMA',
            estado: 'EXITOSO',
            telefono: '956781234'
        }
    ];

    const SOLICITUD_FIRMA_AUTOMATICA_ID = 'EFE004';
    const SOLICITUD_FIRMA_STORAGE_KEY = 'efectivaSolicitudEFE004FirmaState';

    function isSolicitudFirmaAutomatica(solicitud) {
        return !!(solicitud && solicitud.id === SOLICITUD_FIRMA_AUTOMATICA_ID);
    }

    function loadSolicitudFirmaAutomaticaState() {
        try {
            const stored = localStorage.getItem(SOLICITUD_FIRMA_STORAGE_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            const solicitud = solicitudes.find(sol => sol.id === SOLICITUD_FIRMA_AUTOMATICA_ID);
            if (solicitud && parsed && parsed.id === SOLICITUD_FIRMA_AUTOMATICA_ID) {
                Object.assign(solicitud, parsed);
            }
        } catch (error) {
            console.warn('No se pudo recuperar el estado de firma de EFE004:', error);
        }
    }

    function saveSolicitudFirmaAutomaticaState(solicitud) {
        if (!isSolicitudFirmaAutomatica(solicitud)) return;
        try {
            const state = {
                id: solicitud.id,
                etapa: solicitud.etapa,
                estado: solicitud.estado,
                downloadedPostAprobacionDocs: Array.isArray(solicitud.downloadedPostAprobacionDocs) ? solicitud.downloadedPostAprobacionDocs : [],
                checklist2Docs: Array.isArray(solicitud.checklist2Docs) ? solicitud.checklist2Docs.map(doc => ({ id: doc.id, name: doc.name })) : [],
                checklist2Comentario: solicitud.checklist2Comentario || '',
                postAprobacionCollapsed: !!solicitud.postAprobacionCollapsed,
                postAprobacionCompletionPopupShown: !!solicitud.postAprobacionCompletionPopupShown
            };
            localStorage.setItem(SOLICITUD_FIRMA_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.warn('No se pudo guardar el estado de firma de EFE004:', error);
        }
    }

    loadSolicitudFirmaAutomaticaState();

    // ============================
    // SIDEBAR TOGGLE
    // ============================
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // ============================
    // USER DROPDOWN
    // ============================
    headerUser.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!headerUser.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // ============================
    // MODULE NAVIGATION
    // ============================
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            saveCurrentRegistrationState();
            const targetModule = item.dataset.module;

            // Update active nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Show target module
            modulePages.forEach(page => page.classList.remove('active'));

            if (targetModule === 'simulacion') {
                document.getElementById('moduloSimulacion').classList.add('active');
            } else if (targetModule === 'bandeja') {
                document.getElementById('moduloBandeja').classList.add('active');
                applyBandejaFilters();
            }
        });
    });

    // ============================
    // SIMULACIÓN — Form Logic
    // ============================

    // Toggle Cónyuge
    toggleConyuge.addEventListener('change', () => {
        const isChecked = toggleConyuge.checked;
        conyugeData.style.display = isChecked ? 'block' : 'none';

        if (isChecked) {
            labelNo.classList.remove('active-label');
            labelSi.classList.add('active-label');
        } else {
            labelNo.classList.add('active-label');
            labelSi.classList.remove('active-label');
            // Clear cónyuge fields
            document.getElementById('tipoDocConyuge').value = 'DNI';
            document.getElementById('nroDocConyuge').value = '';
        }
    });

    // Validate form to enable/disable Simular button
    function validateSimulacionForm() {
        const docValue = nroDocumento.value.trim();
        const tipoDoc = tipoDocumento.value;
        let isValid = false;

        if (tipoDoc === 'DNI' && docValue.length === 8 && /^\d+$/.test(docValue)) {
            isValid = true;
        } else if (tipoDoc === 'CE' && docValue.length >= 6) {
            isValid = true;
        } else if (tipoDoc === 'RUC' && docValue.length === 11 && /^\d+$/.test(docValue)) {
            isValid = true;
        } else if (tipoDoc === 'PASAPORTE' && docValue.length >= 5) {
            isValid = true;
        }

        // If cónyuge is active, also validate cónyuge DNI
        if (isValid && toggleConyuge.checked) {
            const conyugeDoc = document.getElementById('nroDocConyuge').value.trim();
            if (!/^\d{8}$/.test(conyugeDoc)) {
                isValid = false;
            }
        }

        if (isValid) {
            btnSimular.disabled = false;
            btnSimular.classList.add('enabled');
        } else {
            btnSimular.disabled = true;
            btnSimular.classList.remove('enabled');
        }
    }

    nroDocumento.addEventListener('input', validateSimulacionForm);
    tipoDocumento.addEventListener('change', validateSimulacionForm);

    // Also listen on cónyuge document field
    document.getElementById('nroDocConyuge').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        validateSimulacionForm();
    });
    toggleConyuge.addEventListener('change', () => {
        setTimeout(validateSimulacionForm, 100);
    });

    // Restrict DNI input to numbers only
    nroDocumento.addEventListener('input', (e) => {
        const tipo = tipoDocumento.value;
        if (tipo === 'DNI' || tipo === 'RUC') {
            e.target.value = e.target.value.replace(/\D/g, '');
        }
    });

    // Restrict phone to numbers only
    nroTelefono.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    if (calcTelefonoPoliticas) {
        calcTelefonoPoliticas.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            e.target.setCustomValidity('');
            clearTelefonoPoliticasHighlight();
            updateContinuarDesdeCalculoState();
        });
    }

    // Simular button — navigate to Resultado
    btnSimular.addEventListener('click', () => {
        if (btnSimular.disabled) return;
        showResultadoEvaluacion();
    });

    // ============================
    // RESULTADO — Show & Populate
    // ============================
    function showFlujoTab(tabName) {
        const targetId = tabName === 'calculo' ? 'tabCalculo' : 'tabResultado';
        document.querySelectorAll('.flujo-tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.flujo-tab-btn').forEach(btn => btn.classList.remove('active'));

        const targetTab = document.getElementById(targetId);
        const targetBtn = document.querySelector(`[data-target="${targetId}"]`);
        if (targetTab) targetTab.classList.add('active');
        if (targetBtn) targetBtn.classList.add('active');
    }


    function setResultadoDocumento(tipoDoc, nroDoc) {
        const tipoDocEl = document.getElementById('resTipoDoc');
        const nroDocEl = document.getElementById('resNroDoc');
        if (tipoDocEl) {
            if ('value' in tipoDocEl) tipoDocEl.value = tipoDoc;
            tipoDocEl.textContent = tipoDoc;
        }
        if (nroDocEl) {
            if ('value' in nroDocEl) nroDocEl.value = nroDoc;
            nroDocEl.textContent = nroDoc;
        }
    }

    function getResultadoDocumento() {
        const tipoDocEl = document.getElementById('resTipoDoc');
        const nroDocEl = document.getElementById('resNroDoc');
        return {
            tipoDoc: tipoDocEl ? (tipoDocEl.value || tipoDocEl.textContent || '').trim() : '',
            nroDoc: nroDocEl ? (nroDocEl.value || nroDocEl.textContent || '').trim() : ''
        };
    }

    function syncIngresoEstimadoCalculo() {
        const resIngresoEstimado = document.getElementById('resIngresoEstimado');
        const calcIngresoEstimado = document.getElementById('calcIngresoEstimado');
        if (resIngresoEstimado && calcIngresoEstimado) {
            calcIngresoEstimado.value = resIngresoEstimado.textContent;
        }
    }

    function syncTelefonoPoliticasCalculo() {
        if (calcTelefonoPoliticas) {
            calcTelefonoPoliticas.value = nroTelefono.value.trim();
            calcTelefonoPoliticas.setCustomValidity('');
            if (calcTelefonoPoliticas.value.trim()) {
                clearTelefonoPoliticasHighlight();
            }
        }
        updateContinuarDesdeCalculoState();
    }

    function getTelefonoPoliticasCalculo() {
        return calcTelefonoPoliticas ? calcTelefonoPoliticas.value.trim() : nroTelefono.value.trim();
    }

    function validarTelefonoPoliticasCalculo() {
        if (!calcTelefonoPoliticas) return true;
        const telefono = getTelefonoPoliticasCalculo();
        if (!telefono) {
            resaltarTelefonoPoliticasCalculo();
            return false;
        }
        calcTelefonoPoliticas.setCustomValidity('');
        clearTelefonoPoliticasHighlight();
        return true;
    }

    function clearTelefonoPoliticasHighlight() {
        if (!calcTelefonoPoliticas) return;
        calcTelefonoPoliticas.classList.remove('input-attention');
        const group = calcTelefonoPoliticas.closest('.form-group');
        if (group) group.classList.remove('field-attention');
    }

    function resaltarTelefonoPoliticasCalculo() {
        if (!calcTelefonoPoliticas) return;
        if (getTelefonoPoliticasCalculo()) {
            calcTelefonoPoliticas.setCustomValidity('');
            clearTelefonoPoliticasHighlight();
            return;
        }
        const group = calcTelefonoPoliticas.closest('.form-group');
        calcTelefonoPoliticas.classList.remove('input-attention');
        if (group) group.classList.remove('field-attention');
        void calcTelefonoPoliticas.offsetWidth;
        calcTelefonoPoliticas.classList.add('input-attention');
        if (group) group.classList.add('field-attention');
        calcTelefonoPoliticas.scrollIntoView({ behavior: 'smooth', block: 'center' });
        calcTelefonoPoliticas.focus({ preventScroll: true });
        calcTelefonoPoliticas.setCustomValidity('Ingrese el N° de teléfono para enviar la URL de políticas de privacidad.');
    }

    function tieneFilaCalculoSeleccionada() {
        return !!document.querySelector('#calcCuotasBody tr.selected');
    }

    function updateContinuarDesdeCalculoState() {
        const btnContinuarCalculo = document.getElementById('btnContinuarDesdeCalculo');
        if (!btnContinuarCalculo) return;
        const debeHabilitar = tieneFilaCalculoSeleccionada() && getTelefonoPoliticasCalculo();
        btnContinuarCalculo.disabled = false;
        btnContinuarCalculo.classList.toggle('is-disabled', !debeHabilitar);
        btnContinuarCalculo.setAttribute('aria-disabled', String(!debeHabilitar));
    }

    function puedeContinuarDesdeCalculo() {
        return tieneFilaCalculoSeleccionada() && getTelefonoPoliticasCalculo();
    }

    function getConyugeSimulacionData() {
        const tipoDocConyugeEl = document.getElementById('tipoDocConyuge');
        const nroDocConyugeEl = document.getElementById('nroDocConyuge');
        const nroDocConyugeValue = nroDocConyugeEl ? nroDocConyugeEl.value.trim() : '';
        return {
            tieneConyuge: toggleConyuge.checked && nroDocConyugeValue !== '',
            tipoDoc: tipoDocConyugeEl ? tipoDocConyugeEl.value : 'DNI',
            nroDoc: nroDocConyugeValue
        };
    }

    function actualizarConyugeResultado() {
        const conyuge = getConyugeSimulacionData();
        const resConyugeCard = document.getElementById('resConyugeCard');
        const resTipoDocConyuge = document.getElementById('resTipoDocConyuge');
        const resNroDocConyuge = document.getElementById('resNroDocConyuge');
        if (!resConyugeCard) return;

        if (conyuge.tieneConyuge) {
            if (resTipoDocConyuge) resTipoDocConyuge.value = conyuge.tipoDoc;
            if (resNroDocConyuge) resNroDocConyuge.value = conyuge.nroDoc;
            resConyugeCard.style.display = 'block';
        } else {
            if (resTipoDocConyuge) resTipoDocConyuge.value = 'DNI';
            if (resNroDocConyuge) resNroDocConyuge.value = '';
            resConyugeCard.style.display = 'none';
        }
    }

    document.querySelectorAll('.flujo-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const esCalculo = btn.dataset.target === 'tabCalculo';
            showFlujoTab(esCalculo ? 'calculo' : 'resultado');
            if (esCalculo) syncTelefonoPoliticasCalculo();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    function showResultadoEvaluacion() {
        // Gather form data
        const tipoDoc = tipoDocumento.value;
        const nroDoc = nroDocumento.value.trim();

        // Generate mock solicitud ID: EJE + [AÑO] + [correlativo] (ej. EJE2026001)
        const now = new Date();
        const year = now.getFullYear();
        const formattedCorrelativo = String(correlativoCounter++).padStart(3, '0');
        const solicitudId = `EJE${year}${formattedCorrelativo}`;
        currentSolicitudId = solicitudId; // Save in global variable

        // Generate timestamp for mock data received (dd-mm-yyyy hh:mm:ss)
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const fechaStr = `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;

        // Parse Concesionario and Tienda from Header Location
        let headerConcesionario = 'Hyundai';
        let headerTienda = 'Puruchuco';
        const headerLocEl = document.querySelector('.header-location span:not(.dot)');
        if (headerLocEl) {
            const locParts = headerLocEl.textContent.split('-');
            if (locParts[0]) headerConcesionario = locParts[0].trim();
            if (locParts[1]) headerTienda = locParts[1].trim();
        }

        // Generate mock financial data based on document
        const mockData = generateMockEvaluacion(nroDoc);

        // Immediately add to solicitudes array as SIMULACIÓN / PENDIENTE
        const newSimSol = {
            id: solicitudId,
            cliente: 'Juan Pérez García', // mock client name
            documento: `${tipoDoc} - ${nroDoc}`,
            tipoCredito: 'Crédito vehicular',
            monto: `S/ ${mockData.montoPreaprobado}`,
            fecha: fechaStr,
            concesionario: headerConcesionario,
            tienda: headerTienda,
            etapa: 'SIMULACIÓN',
            estado: 'PENDIENTE',
            telefono: nroTelefono.value.trim() || '922159933'
        };
        solicitudes.unshift(newSimSol);

        // Populate the resultado view
        document.getElementById('resSolicitudId').textContent = solicitudId;
        document.getElementById('resFechaHora').textContent = `${fechaStr}`; // show correct date & time
        setResultadoDocumento(tipoDoc, nroDoc);
        actualizarConyugeResultado();
        document.getElementById('resMontoPreaprobado').textContent = `S/ ${mockData.montoPreaprobado}`;
        document.getElementById('resCalificacion').textContent = mockData.califica ? 'CALIFICA' : 'NO CALIFICA';
        document.getElementById('resCalificacionMsg').textContent = mockData.califica
            ? 'El cliente cumple con los criterios de evaluación.'
            : 'El cliente no cumple con los criterios de evaluación.';
        document.getElementById('resSegmentoRiesgo').textContent = mockData.segmentoRiesgo;
        document.getElementById('resIngresoEstimado').textContent = `S/ ${mockData.ingresoEstimado}`;
        syncIngresoEstimadoCalculo();
        document.getElementById('resCuotaMaxima').textContent = `S/ ${mockData.capacidadCuotaMaxima}`;
        const calcCuotaMaxima = document.getElementById('calcCuotaMaxima');
        if (calcCuotaMaxima) calcCuotaMaxima.value = `S/ ${mockData.capacidadCuotaMaxima}`;
        const calcIngresoDeclaradoInicial = document.getElementById('calcIngresoDeclarado');
        if (calcIngresoDeclaradoInicial) calcIngresoDeclaradoInicial.value = '';

        // Update califica styling
        const calificacionCard = document.querySelector('.resultado-calificacion');
        const calificacionIcon = calificacionCard.querySelector('.resultado-calificacion-icon .material-icons-outlined');
        if (mockData.califica) {
            calificacionCard.classList.add('califica');
            calificacionCard.classList.remove('no-califica');
            calificacionIcon.textContent = 'check_circle';
        } else {
            calificacionCard.classList.remove('califica');
            calificacionCard.classList.add('no-califica');
            calificacionIcon.textContent = 'cancel';
        }

        // Switch views: hide all, show resultado
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloResultado').classList.add('active');
        showFlujoTab('resultado');

        // Update sidebar active state
        navItems.forEach(n => n.classList.remove('active'));

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        showToast('Simulación procesada y registrada en bandeja.', 'success');
        mostrarPopupSolicitudGenerada(solicitudId);
    }

    function mostrarPopupSolicitudGenerada(solicitudId) {
        modalTitle.textContent = 'Solicitud generada con éxito';
        modalBody.innerHTML = `
            <div class="popup-solicitud-success">
                <div class="popup-solicitud-icon">
                    <span class="material-icons-outlined">check_circle</span>
                </div>
                <p class="popup-solicitud-text">La simulación fue procesada correctamente.</p>
                <div class="popup-solicitud-number">
                    <span>N° de solicitud</span>
                    <strong>${solicitudId}</strong>
                </div>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'none';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', () => {
            closeModal();
            document.getElementById('modalBtnCancel').style.display = 'inline-flex';
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function generateMockEvaluacion(nroDoc) {
        // Use document number to seed pseudo-random consistent results
        const seed = nroDoc.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

        const montos = ['150,000.00', '200,000.00', '250,000.00', '300,000.00', '350,000.00', '85,000.00', '120,000.00'];
        const segmentos = ['NORMAL', 'REGULAR', 'PREFERENTE', 'BAJO'];
        const ingresos = ['3,500.00', '4,200.00', '5,850.00', '7,200.00', '8,500.00', '6,100.00'];
        const ingresosDeclarados = ['4,000.00', '5,000.00', '6,000.00', '7,500.00', '8,000.00', '10,000.00'];
        const montoPreaprobado = montos[seed % montos.length];
        const ingresoEstimado = ingresos[seed % ingresos.length];
        const capacidadCuotaMaxima = calcularCapacidadCuotaMaxima(
            parseMoneyValue(montoPreaprobado),
            parseMoneyValue(ingresoEstimado),
            60,
            0.128
        ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return {
            montoPreaprobado,
            califica: seed % 5 !== 0, // ~80% califica
            segmentoRiesgo: segmentos[seed % segmentos.length],
            ingresoEstimado,
            capacidadCuotaMaxima,
            ingresoDeclarado: ingresosDeclarados[seed % ingresosDeclarados.length]
        };
    }

    // Regresar button — go back to simulación form
    document.getElementById('btnRegresar').addEventListener('click', () => {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloSimulacion').classList.add('active');

        // Restore sidebar active
        navItems.forEach(n => n.classList.remove('active'));
        document.getElementById('navSimulacion').classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Siguiente desde Resultado — muestra la pestaña Cálculo dentro de la misma sección
    document.getElementById('btnContinuarSolicitud').addEventListener('click', () => {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloResultado').classList.add('active');
        showFlujoTab('calculo');
        const calcCuotaMaxima = document.getElementById('calcCuotaMaxima');
        const resCuotaMaxima = document.getElementById('resCuotaMaxima');
        if (calcCuotaMaxima && resCuotaMaxima) calcCuotaMaxima.value = resCuotaMaxima.textContent;
        syncIngresoEstimadoCalculo();
        syncTelefonoPoliticasCalculo();
        document.getElementById('calcResultadoCard').style.display = 'none';
        document.querySelectorAll('#calcCuotasBody tr').forEach(r => r.classList.remove('selected'));
        updateContinuarDesdeCalculoState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function continuarARegistroSolicitud() {
        const idSolicitud = document.getElementById('resSolicitudId').textContent;
        const { tipoDoc, nroDoc } = getResultadoDocumento();

        // Update stage to SOLICITUD and status to CONSTRUCCIÓN in solicitudes
        const currentSol = solicitudes.find(s => s.id === idSolicitud);
        const carreteraActual = getCarreteraActual();
        if (currentSol) {
            currentSol.etapa = 'SOLICITUD';
            currentSol.estado = 'CONSTRUCCIÓN';
            currentSol.cartera = carreteraActual;
        }

        // Set top header info bar
        document.getElementById('regSolicitudId').textContent = idSolicitud;
        document.getElementById('regCartera').textContent = carreteraActual;
        document.getElementById('regUsuario').textContent = "ALOCHA";

        // Set pre-populated fields for Datos Cliente
        document.getElementById('regTipoDoc').value = tipoDoc;
        document.getElementById('regNroDoc').value = nroDoc;
        document.getElementById('regNombres').value = "Juan";
        document.getElementById('regApePaterno').value = "Pérez";
        document.getElementById('regApeMaterno').value = "García";
        document.getElementById('regFechaNac').value = "11/05/1995";
        document.getElementById('regCelular').value = getTelefonoPoliticasCalculo() || nroTelefono.value || "";
        document.getElementById('regCorreo').value = "";
        
        // Reset inputs that are editable
        document.getElementById('regSexo').value = "";
        document.getElementById('regNacionalidad').value = "";
        document.getElementById('regResidencia').value = "";
        document.getElementById('regDireccion').value = "";
        document.getElementById('regDepartamento').value = "";
        document.getElementById('regProvincia').innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        document.getElementById('regDistrito').innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        document.getElementById('regEstadoCivil').value = "";
        document.getElementById('regSeparacionBienes').value = "";
        document.getElementById('regSeparacionBienes').disabled = true;
        document.getElementById('regSeparacionBienes').classList.add('disabled');

        // Reset Datos Laborales
        document.getElementById('regCatLaboral').value = "";
        document.getElementById('regRucEmpleador').value = "";
        document.getElementById('regGiroActividad').value = "";
        document.getElementById('regCargo').value = "";
        document.getElementById('regFechaIngresoLab').value = "";
        document.getElementById('regMonedaIngreso').value = "PEN";
        document.getElementById('regIngresoNeto').value = "S/ 0.00";
        resetIngresosSection();

        // Pre-populate Vehiculo
        document.getElementById('regVehEstado').value = "Nuevo";
        document.getElementById('regVehConcesionario').value = "HYUNDAI";
        document.getElementById('regVehTienda').value = "PURUCHUCO";
        document.getElementById('regVehVendedor').value = "ALOCHA";
        document.getElementById('regVehMarca').value = "Toyota";
        document.getElementById('regVehModelo').value = "Corolla";
        document.getElementById('regVehAnio').value = "2026";
        document.getElementById('regVehTarjetaNombre').value = "TITULAR";

        // Pre-populate Simulación
        document.getElementById('regSimProducto').value = "Credito Vehicular";
        document.getElementById('regSimCampana').value = "SUV Mayo 2026";
        document.getElementById('regSimMoneda').value = "USD";
        document.getElementById('regSimTipoCambio').value = "3.78";
        document.getElementById('regSimPrecioVeh').value = "$ 28,000.00";
        document.getElementById('regSimCuotaInicial').value = "$ 8,000.00";
        document.getElementById('regSimTea').value = "12.80%";
        document.getElementById('regSimPlazo').value = "24 meses";
        document.getElementById('regSimDiaPago').value = "03";

        // Pre-populate Gastos
        document.getElementById('regGastosNotariales').value = "SI";
        document.getElementById('regGastosRegistrales').value = "SI";
        document.getElementById('regGastosDelivery').value = "SI";
        document.getElementById('regPlanGpx').value = "Premium";
        document.getElementById('regGastosInclGpx').value = "$ 650.00";
        document.getElementById('regKitMantenimiento').value = "No";
        document.getElementById('regCuotasDobles').value = "No";
        document.getElementById('regIncluirPortes').value = "No";
        document.getElementById('regTotalFinanciamiento').value = "$ 21,480.00";

        // Pre-populate Seguros
        document.getElementById('regSegVehicular').value = "Propio";
        document.getElementById('regSegVehCosto').value = "S/ 1,200.00";
        document.getElementById('regSegDesgravamen').value = "SI";
        document.getElementById('regSegDesgProd').value = "Individual";
        document.getElementById('regSegDesgCosto').value = "$ 0.00";
        document.getElementById('regSegOptativo').value = "No";
        document.getElementById('regSegOptCosto').value = "NO";
        document.getElementById('regSegOptTipo').value = "";

        // Reset Checklist state & Read-Only state
        applyRegistrationFormReadOnlyState(false);
        attachedDocs = [];
        renderChecklistTable();
        actualizarChecklistPorCarretera(carreteraActual);
        resetChecklistManualChecks();
        document.getElementById('regComentarios').value = "";

        // Navigate to Registro screen
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloRegistroSolicitud').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    function mostrarPopupPoliticasDatosPersonales() {
        if (!puedeContinuarDesdeCalculo()) {
            if (!getTelefonoPoliticasCalculo()) {
                resaltarTelefonoPoliticasCalculo();
            } else {
                clearTelefonoPoliticasHighlight();
            }
            updateContinuarDesdeCalculoState();
            return;
        }
        if (!validarTelefonoPoliticasCalculo()) return;
        const telefono = getTelefonoPoliticasCalculo();
        modalTitle.textContent = 'Políticas de datos personales';
        modalBody.innerHTML = `
            <div class="popup-politicas-confirmacion">
                <div class="popup-politicas-icon">
                    <span class="material-icons-outlined">check_circle</span>
                </div>
                <p class="popup-politicas-text">
                    Enlace de politicas de datos personales enviado al número <strong>${telefono}</strong>
                </p>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'none';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', () => {
            closeModal();
            document.getElementById('modalBtnCancel').style.display = 'inline-flex';
            continuarARegistroSolicitud();
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    document.getElementById('btnContinuarDesdeCalculo').addEventListener('click', mostrarPopupPoliticasDatosPersonales);
    updateContinuarDesdeCalculoState();

    document.getElementById('btnRegresarCalculo').addEventListener('click', () => {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloResultado').classList.add('active');
        showFlujoTab('resultado');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function parseMoneyValue(value) {
        return Number(String(value || '0').replace(/[^0-9.,-]/g, '').replace(/,/g, '')) || 0;
    }

    function formatMoneyValue(value, currency = 'S/') {
        return `${currency} ${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function getReglasCarretera(carretera) {
        const tipo = String(carretera || 'EXPRESS').toUpperCase();
        if (tipo === 'FULL') {
            return {
                carretera: 'FULL',
                documentos: ['Copia de DNI ambas caras.', 'Recibo de servicios.', 'Cotización del vehículo.'],
                verificacion: 'Verificación domiciliaria'
            };
        }

        return {
            carretera: 'EXPRESS',
            documentos: ['Copia de DNI ambas caras.'],
            verificacion: 'No aplicable'
        };
    }

    function renderPolicyItems(items) {
        if (!items || items.length <= 1) return items && items[0] ? items[0] : '';
        return `<ul class="policy-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    function actualizarPoliticasPorCarretera(carretera) {
        const reglas = getReglasCarretera(carretera);
        currentCarretera = reglas.carretera;

        const calcCarretera = document.getElementById('calcCarretera');
        const calcDocumentos = document.getElementById('calcDocumentos');
        const calcVerificacion = document.getElementById('calcVerificacion');

        if (calcCarretera) calcCarretera.textContent = reglas.carretera;
        if (calcDocumentos) calcDocumentos.innerHTML = renderPolicyItems(reglas.documentos);
        if (calcVerificacion) calcVerificacion.textContent = reglas.verificacion;

        return reglas;
    }

    function getCarreteraActual() {
        const calcCarretera = document.getElementById('calcCarretera');
        return String(calcCarretera?.textContent || currentCarretera || 'EXPRESS').trim().toUpperCase();
    }

    function actualizarChecklistPorCarretera(carretera) {
        const reglas = getReglasCarretera(carretera);
        const tag = document.getElementById('regChecklistCarteraTag');
        const desc = document.getElementById('regChecklistDesc');
        const reciboItem = document.getElementById('manualReciboItem');
        const cotizacionItem = document.getElementById('manualCotizacionItem');
        const chkRecibo = document.getElementById('chkManualRecibo');
        const chkCotizacion = document.getElementById('chkManualCotizacion');

        if (tag) {
            tag.textContent = `CARTERA: ${reglas.carretera}`;
            tag.classList.toggle('tag-full', reglas.carretera === 'FULL');
        }

        if (desc) {
            desc.textContent = reglas.carretera === 'FULL'
                ? 'Para carretera FULL se requiere adjuntar copia de DNI ambas caras, recibo de servicios y cotización del vehículo.'
                : 'Para carretera EXPRESS solo se requiere adjuntar copia de DNI ambas caras.';
        }

        const esFull = reglas.carretera === 'FULL';
        if (reciboItem) reciboItem.style.display = esFull ? 'block' : 'none';
        if (cotizacionItem) cotizacionItem.style.display = esFull ? 'block' : 'none';
        if (!esFull) {
            if (chkRecibo) chkRecibo.checked = false;
            if (chkCotizacion) chkCotizacion.checked = false;
        }
    }

    function resetChecklistManualChecks() {
        ['chkManualDni', 'chkManualRecibo', 'chkManualCotizacion'].forEach(id => {
            const item = document.getElementById(id);
            if (item) item.checked = false;
        });
    }

    function getRequiredManualChecks(carretera) {
        const reglas = getReglasCarretera(carretera);
        const checks = [
            { id: 'chkManualDni', label: 'Copia de DNI ambas caras' }
        ];
        if (reglas.carretera === 'FULL') {
            checks.push(
                { id: 'chkManualRecibo', label: 'Recibo de servicios' },
                { id: 'chkManualCotizacion', label: 'Cotización del vehículo' }
            );
        }
        return checks;
    }

    function obtenerBaseIngresoCalculo() {
        const ingresoEstimado = parseMoneyValue(document.getElementById('calcIngresoEstimado').value);
        const ingresoDeclarado = parseMoneyValue(document.getElementById('calcIngresoDeclarado').value);
        const usaIngresoDeclarado = ingresoDeclarado > ingresoEstimado;
        const ingresoBase = usaIngresoDeclarado ? ingresoDeclarado : ingresoEstimado;

        return {
            ingresoEstimado,
            ingresoDeclarado,
            usaIngresoDeclarado,
            ingresoBase
        };
    }

    function calcularCuotaMensualMaxima(ingresoBase) {
        return ingresoBase * 0.35;
    }

    function calcularCuotaPorMonto(monto, plazoMeses, tea) {
        const tasaMensual = Math.pow(1 + tea, 1 / 12) - 1;
        if (tasaMensual > 0) {
            return monto * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / (Math.pow(1 + tasaMensual, plazoMeses) - 1);
        }
        return monto / plazoMeses;
    }

    function calcularCapacidadCuotaMaxima(montoPreaprobado, ingresoBase, plazoMeses = 60, tea = 0.128) {
        const cuotaPorIngreso = calcularCuotaMensualMaxima(ingresoBase);
        const cuotaPorMontoPreaprobado = montoPreaprobado > 0
            ? calcularCuotaPorMonto(montoPreaprobado, plazoMeses, tea)
            : cuotaPorIngreso;

        return Math.min(cuotaPorIngreso, cuotaPorMontoPreaprobado);
    }

    function calcularFinanciamientoMaximo(ingresoBase, plazoMeses, tea) {
        const cuotaMensualMaxima = calcularCuotaMensualMaxima(ingresoBase);
        const tasaMensual = Math.pow(1 + tea, 1 / 12) - 1;

        if (tasaMensual > 0) {
            return cuotaMensualMaxima * (1 - Math.pow(1 + tasaMensual, -plazoMeses)) / tasaMensual;
        }

        return cuotaMensualMaxima * plazoMeses;
    }

    function actualizarCapacidadCuotaMaximaCalculo(mostrarToast = true) {
        const { ingresoBase } = obtenerBaseIngresoCalculo();
        const montoPreaprobado = parseMoneyValue(document.getElementById('resMontoPreaprobado').textContent);
        const cuotaMaxima = calcularCapacidadCuotaMaxima(montoPreaprobado, ingresoBase, 60, 0.128);
        const calcCapacidadCuotaMaxima = document.getElementById('calcCuotaMaxima');
        if (calcCapacidadCuotaMaxima) {
            calcCapacidadCuotaMaxima.value = formatMoneyValue(cuotaMaxima);
        }
        if (mostrarToast) {
            showToast(`Capacidad de cuota máxima calculada: ${formatMoneyValue(cuotaMaxima)}`, 'success');
        }
        return cuotaMaxima;
    }

    function recalcularResultadoCalculo(mostrarToast = true) {
        const tea = parseMoneyValue(document.getElementById('calcTea').value) / 100;
        const precioUsd = parseMoneyValue(document.getElementById('calcPrecioUsd').value);
        const inicial = parseMoneyValue(document.getElementById('calcCuotaInicial').value);
        const tipoCambio = parseMoneyValue(document.getElementById('calcTipoCambio').value) || 1;
        const monedaCreditoEl = document.getElementById('calcMonedaCredito');
        const monedaPrecioEl = document.getElementById('calcMonedaPrecio');
        const monedaCredito = monedaCreditoEl ? monedaCreditoEl.value : 'PEN';
        const monedaPrecio = monedaPrecioEl ? monedaPrecioEl.value : 'USD';
        const currency = monedaCredito === 'USD' ? '$' : 'S/';
        const montoOperacion = monedaPrecio === 'USD' ? precioUsd * tipoCambio : precioUsd;
        const cuotaInicial = monedaPrecio === 'USD' ? inicial * tipoCambio : inicial;
        const montoFinanciar = Math.max(montoOperacion - cuotaInicial, 0);
        const calcMontoFinanciar = document.getElementById('calcMontoFinanciar');
        if (calcMontoFinanciar) calcMontoFinanciar.value = formatMoneyValue(montoFinanciar, 'S/');

        const { ingresoEstimado, ingresoDeclarado, ingresoBase } = obtenerBaseIngresoCalculo();
        const tasaMensual = Math.pow(1 + tea, 1 / 12) - 1;
        const plazoSeleccionado = parseInt(document.getElementById('calcPlazoSeleccionado').value, 10) || 24;
        const cuotaMensualMaxima = actualizarCapacidadCuotaMaximaCalculo(false);
        const plazos = [plazoSeleccionado];
        const tbody = document.getElementById('calcCuotasBody');
        const teniaFilaSeleccionada = !!document.querySelector('#calcCuotasBody tr.selected');
        tbody.innerHTML = '';

        plazos.forEach(plazo => {
            const cuota = tasaMensual > 0
                ? montoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1)
                : montoFinanciar / plazo;
            const cumple = cuota <= cuotaMensualMaxima;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${plazo} meses</strong></td>
                <td>${(tea * 100).toFixed(2)}%</td>
                <td>${formatMoneyValue(cuota, currency)}</td>
                <td><span class="capacidad-badge ${cumple ? 'ok' : 'warning'}">${cumple ? 'Cumple' : 'No cumple'}</span></td>
            `;
            tr.addEventListener('click', () => {
                document.querySelectorAll('#calcCuotasBody tr').forEach(row => row.classList.remove('selected'));
                tr.classList.add('selected');
                updateContinuarDesdeCalculoState();
            });
            if (teniaFilaSeleccionada) {
                tr.classList.add('selected');
            }
            tbody.appendChild(tr);
        });

        const carreteraCalculada = ingresoDeclarado > ingresoEstimado ? 'FULL' : 'EXPRESS';
        actualizarPoliticasPorCarretera(carreteraCalculada);
        document.getElementById('calcResultadoCard').style.display = 'block';
        updateContinuarDesdeCalculoState();
        if (mostrarToast) {
            showToast('Grilla de cuotas generada. Selecciona el plazo calculado para continuar.', 'success');
        }
    }

    document.getElementById('btnCalcularCuotas').addEventListener('click', () => {
        recalcularResultadoCalculo(true);
    });

    const calcIngresoDeclaradoInput = document.getElementById('calcIngresoDeclarado');
    if (calcIngresoDeclaradoInput) {
        calcIngresoDeclaradoInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d.,]/g, '');
            const resultadoVisible = document.getElementById('calcResultadoCard').style.display !== 'none' && document.querySelector('#calcCuotasBody tr');
            if (resultadoVisible) {
                recalcularResultadoCalculo(false);
            } else {
                actualizarCapacidadCuotaMaximaCalculo(false);
            }
        });
    }

    // ========================================
    // REGISTRO DE SOLICITUD - Handlers & Logic
    // ========================================

    function isRiesgosPendienteSolicitud(solicitud) {
        return !!(solicitud
            && String(solicitud.etapa || '').trim().toUpperCase() === 'RIESGOS'
            && String(solicitud.estado || '').trim().toUpperCase() === 'PENDIENTE');
    }

    function volverABandejaEntradaDesdeSolicitud() {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloBandeja').classList.add('active');

        navItems.forEach(n => n.classList.remove('active'));
        const navBandeja = document.getElementById('navBandeja');
        if (navBandeja) navBandeja.classList.add('active');

        applyBandejaFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Regresar de Registro: si la solicitud está en RIESGOS/PENDIENTE vuelve a Bandeja; caso contrario vuelve al Resultado.
    document.getElementById('btnRegresarRegistro').addEventListener('click', () => {
        saveCurrentRegistrationState();
        const solicitudActual = solicitudes.find(s => s.id === currentSolicitudId);

        if (isRiesgosPendienteSolicitud(solicitudActual)) {
            volverABandejaEntradaDesdeSolicitud();
            return;
        }

        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloResultado').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Estado civil changes -> toggle separación de bienes
    const regEstadoCivil = document.getElementById('regEstadoCivil');
    const regSeparacionBienes = document.getElementById('regSeparacionBienes');
    regEstadoCivil.addEventListener('change', () => {
        if (regEstadoCivil.value === 'CASADO') {
            regSeparacionBienes.disabled = false;
            regSeparacionBienes.classList.remove('disabled');
        } else {
            regSeparacionBienes.disabled = true;
            regSeparacionBienes.classList.add('disabled');
            regSeparacionBienes.value = '';
        }
    });

    // Department / Province / District cascade populating
    const regDepartamento = document.getElementById('regDepartamento');
    const regProvincia = document.getElementById('regProvincia');
    const regDistrito = document.getElementById('regDistrito');
    
    const provinciasPorDepto = {
        LIMA: ['LIMA', 'CAÑETE', 'HUAURA'],
        AREQUIPA: ['AREQUIPA', 'CAMANA', 'CAYLLOMA'],
        'LA LIBERTAD': ['TRUJILLO', 'ASCOPE', 'PACASMAYO']
    };
    
    const distritosPorProvincia = {
        LIMA: ['MIRAFLORES', 'SAN ISIDRO', 'ATE', 'PURUCHUCO', 'SANTIAGO DE SURCO'],
        CAÑETE: ['SAN VICENTE', 'MALA', 'ASIA'],
        HUAURA: ['HUACHO', 'HUALMAY'],
        AREQUIPA: ['AREQUIPA', 'YANAHUARA', 'CAYMA'],
        TRUJILLO: ['TRUJILLO', 'VICTOR LARCO', 'LA ESPERANZA']
    };

    regDepartamento.addEventListener('change', () => {
        const depto = regDepartamento.value;
        regProvincia.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        regDistrito.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        if (provinciasPorDepto[depto]) {
            provinciasPorDepto[depto].forEach(prov => {
                const opt = document.createElement('option');
                opt.value = prov;
                opt.textContent = prov;
                regProvincia.appendChild(opt);
            });
        }
    });

    regProvincia.addEventListener('change', () => {
        const prov = regProvincia.value;
        regDistrito.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
        if (distritosPorProvincia[prov]) {
            distritosPorProvincia[prov].forEach(dist => {
                const opt = document.createElement('option');
                opt.value = dist;
                opt.textContent = dist;
                regDistrito.appendChild(opt);
            });
        }
    });

    // Checklist dynamic document management
    let attachedDocs = [];
    let pendingFileObject = null;
    let editingDocId = null;

    const checklistTableBody = document.getElementById('checklistTableBody');
    const inputHiddenFile = document.getElementById('inputHiddenFile');
    const modalDocNameOverlay = document.getElementById('modalDocNameOverlay');
    const inputDocName = document.getElementById('inputDocName');
    const btnSaveDocName = document.getElementById('btnSaveDocName');
    const btnCancelDocName = document.getElementById('btnCancelDocName');
    const docChecklist2Body = document.getElementById('docChecklist2Body');
    const docChecklist2FileInput = document.getElementById('docChecklist2FileInput');
    const docChecklist2Counter = document.getElementById('docChecklist2Counter');
    const docChecklist2Card = document.getElementById('docChecklist2Card');
    const docChecklist2Subtitle = document.getElementById('docChecklist2Subtitle');
    const docChecklist2Content = document.getElementById('docChecklist2Content');
    const docChecklist2Footer = document.getElementById('docChecklist2Footer');
    const docChecklist2Comentario = document.getElementById('docChecklist2Comentario');
    const docChecklist2ComentarioLabel = document.getElementById('docChecklist2ComentarioLabel');
    const docChecklist2ComentarioCounter = document.getElementById('docChecklist2ComentarioCounter');
    const docOperacionesObservation = document.getElementById('docOperacionesObservation');
    const btnResponderObservacionOperaciones = document.getElementById('btnResponderObservacionOperaciones');
    const docOpsAnalista = document.getElementById('docOpsAnalista');
    const docOpsMotivo = document.getElementById('docOpsMotivo');
    const docOpsFechaHora = document.getElementById('docOpsFechaHora');
    const docOpsComentarioAnalista = document.getElementById('docOpsComentarioAnalista');
    const documentariaPageTitle = document.getElementById('documentariaPageTitle');
    const btnEnviarOperacionesChecklist2 = document.getElementById('btnEnviarOperacionesChecklist2');
    const docPostAprobacionCard = document.getElementById('docPostAprobacionCard');
    const docPostAprobacionList = document.getElementById('docPostAprobacionList');
    const btnVerMasPostDocs = document.getElementById('btnVerMasPostDocs');

    const DOC_CHECKLIST2_MAX = 15;
    let docNameContext = null;
    let docChecklist2Docs = [];
    let docChecklist2ComentarioValue = '';
    let pendingChecklist2FileObject = null;
    let editingChecklist2Index = null;
    let postAprobacionCollapsed = false;
    let postAprobacionCompletionPopupShown = false;
    let currentDocumentariaSolicitud = null;
    let isChecklist2ReadOnly = false;
    const downloadedPostAprobacionDocs = new Set();

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function isPdfFile(file) {
        if (!file) return false;
        return file.type === 'application/pdf' || /\.pdf$/i.test(file.name || '');
    }

    function isOperacionesObservadoSolicitud(solicitud) {
        return !!(solicitud && solicitud.operacionesObservacion);
    }

    function isOperacionesRespuestaHabilitada() {
        return !!(currentDocumentariaSolicitud && currentDocumentariaSolicitud.operacionesRespuestaHabilitada);
    }

    function isOperacionesRespuestaEnviada() {
        return !!(currentDocumentariaSolicitud && currentDocumentariaSolicitud.operacionesRespuestaEnviada);
    }

    function renderChecklistTable() {
        checklistTableBody.innerHTML = '';

        // Render attached files
        attachedDocs.forEach((doc, index) => {
            const row = document.createElement('tr');
            let actionsHtml = '';
            if (isSolicitudReadOnly) {
                actionsHtml = `
                    <button type="button" class="action-link" data-action="ver" data-index="${index}" style="font-size: 0.8rem; font-weight: 600; color: var(--accent-blue); background: none; border: none; padding: 0; cursor: pointer;">Ver</button>
                `;
            } else {
                actionsHtml = `
                    <button type="button" class="action-link" data-action="ver" data-index="${index}" style="font-size: 0.8rem; font-weight: 600; color: var(--accent-blue); background: none; border: none; padding: 0; cursor: pointer;">Ver</button>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">|</span>
                    <button type="button" class="action-link" data-action="editar" data-index="${index}" style="font-size: 0.8rem; font-weight: 600; color: var(--accent-blue); background: none; border: none; padding: 0; cursor: pointer;">Editar</button>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">|</span>
                    <button type="button" class="action-link" data-action="eliminar" data-index="${index}" style="font-size: 0.8rem; font-weight: 600; color: var(--danger-red); background: none; border: none; padding: 0; cursor: pointer;">Eliminar</button>
                `;
            }

            row.innerHTML = `
                <td style="font-weight: 500; color: var(--text-primary); padding: 12px 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="material-icons-outlined" style="font-size: 18px; color: #ef4444;">picture_as_pdf</span>
                        <span>${doc.name}</span>
                    </div>
                </td>
                <td style="padding: 12px 10px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        ${actionsHtml}
                    </div>
                </td>
            `;
            checklistTableBody.appendChild(row);
        });

        // Only render one empty upload row at the bottom if NOT read-only
        if (!isSolicitudReadOnly) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td class="text-muted" style="color: var(--text-secondary); font-style: italic; padding: 12px 10px;">Sin archivo adjunto</td>
                <td style="padding: 12px 10px;">
                    <button type="button" class="btn-adjuntar" id="btnTriggerUpload" style="padding: 5px 12px; font-size: 0.75rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        <span class="material-icons-outlined" style="font-size: 14px;">upload_file</span>
                        Adjuntar
                    </button>
                </td>
            `;
            checklistTableBody.appendChild(emptyRow);

            // Bind event to Adjuntar button
            const btnTriggerUpload = document.getElementById('btnTriggerUpload');
            if (btnTriggerUpload) {
                btnTriggerUpload.addEventListener('click', () => {
                    docNameContext = 'checklist1';
                    editingDocId = null;
                    pendingFileObject = null;
                    inputHiddenFile.click();
                });
            }
        }

        // Bind events to Ver, Editar, Eliminar buttons
        checklistTableBody.querySelectorAll('.action-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                const index = parseInt(btn.dataset.index);

                if (action === 'ver') {
                    showToast(`Visualizando documento: ${attachedDocs[index].name}`, 'info');
                    modalTitle.textContent = `Visualizar - ${attachedDocs[index].name}`;
                    modalBody.innerHTML = `
                        <div style="background-color: #f1f3f5; border: 1px solid var(--border-color); border-radius: 8px; height: 350px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; color: var(--text-secondary);">
                            <span class="material-icons-outlined" style="font-size: 64px; color: var(--primary-blue);">picture_as_pdf</span>
                            <p style="font-weight: 600;">[ Simulación de Visor PDF ]</p>
                            <p style="font-size: 0.8rem;">Archivo: ${attachedDocs[index].name}</p>
                        </div>
                    `;
                    document.getElementById('modalBtnCancel').textContent = 'Cerrar';
                    document.getElementById('modalBtnAction').style.display = 'none';
                    modalOverlay.classList.add('active');
                } else if (action === 'editar') {
                    docNameContext = 'checklist1';
                    editingDocId = index;
                    pendingFileObject = null;
                    // Pre-fill modal input with current name without extension
                    inputDocName.value = attachedDocs[index].name.replace(/\.[^/.]+$/, "");
                    modalDocNameOverlay.classList.add('active');
                    inputDocName.focus();
                } else if (action === 'eliminar') {
                    attachedDocs.splice(index, 1);
                    renderChecklistTable();
                    showToast('Documento eliminado.', 'info');
                }
            });
        });

    }

    // Hidden input change handler
    inputHiddenFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (!isPdfFile(file)) {
                showToast('Solo se permite adjuntar documentos PDF.', 'warning');
                inputHiddenFile.value = '';
                return;
            }
            docNameContext = 'checklist1';
            pendingFileObject = file;
            editingDocId = null;

            // Extract filename without extension
            const rawName = file.name.replace(/\.[^/.]+$/, "");
            inputDocName.value = rawName;

            // Open document name modal
            modalDocNameOverlay.classList.add('active');
            inputDocName.focus();
        }
    });

    function getPostAprobacionDownloadButtons() {
        return Array.from(document.querySelectorAll('.documentaria-documents .doc-download-btn'));
    }

    function getPostAprobacionDocNames() {
        return getPostAprobacionDownloadButtons()
            .map(btn => btn.dataset.docName)
            .filter(Boolean);
    }

    function persistCurrentDocumentariaState() {
        if (!currentDocumentariaSolicitud) return;
        if (docChecklist2Comentario) {
            docChecklist2ComentarioValue = docChecklist2Comentario.value.slice(0, 250);
        }
        currentDocumentariaSolicitud.checklist2Docs = docChecklist2Docs;
        currentDocumentariaSolicitud.checklist2Comentario = docChecklist2ComentarioValue;
        currentDocumentariaSolicitud.downloadedPostAprobacionDocs = Array.from(downloadedPostAprobacionDocs);
        currentDocumentariaSolicitud.postAprobacionCollapsed = postAprobacionCollapsed;
        currentDocumentariaSolicitud.postAprobacionCompletionPopupShown = postAprobacionCompletionPopupShown;
        if (isOperacionesObservadoSolicitud(currentDocumentariaSolicitud)) {
            currentDocumentariaSolicitud.operacionesRespuestaHabilitada = !!currentDocumentariaSolicitud.operacionesRespuestaHabilitada;
            currentDocumentariaSolicitud.operacionesRespuestaEnviada = !!currentDocumentariaSolicitud.operacionesRespuestaEnviada;
        }
        actualizarEstadoFirmaChecklist2(currentDocumentariaSolicitud);
        saveSolicitudFirmaAutomaticaState(currentDocumentariaSolicitud);
    }

    function updateOperacionesObservationState() {
        const isOperaciones = isOperacionesObservadoSolicitud(currentDocumentariaSolicitud);
        if (docOperacionesObservation) docOperacionesObservation.hidden = !isOperaciones;
        if (!isOperaciones) return;

        const observacion = currentDocumentariaSolicitud.operacionesObservacion || {};
        if (docOpsAnalista) docOpsAnalista.textContent = observacion.analista || '-';
        if (docOpsMotivo) docOpsMotivo.textContent = observacion.motivo || '-';
        if (docOpsFechaHora) docOpsFechaHora.textContent = observacion.fechaHora || '-';
        if (docOpsComentarioAnalista) docOpsComentarioAnalista.textContent = observacion.comentario || '-';

        if (btnResponderObservacionOperaciones) {
            const respuestaEnviada = isOperacionesRespuestaEnviada();
            btnResponderObservacionOperaciones.disabled = respuestaEnviada;
            btnResponderObservacionOperaciones.hidden = respuestaEnviada;
            btnResponderObservacionOperaciones.title = respuestaEnviada
                ? 'La respuesta ya fue enviada a operaciones.'
                : 'Habilitar campo para responder la observación.';
        }
    }

    function updateChecklist2ComentarioState() {
        if (!docChecklist2Comentario) return;
        const texto = docChecklist2Comentario.value.slice(0, 250);
        if (texto !== docChecklist2Comentario.value) docChecklist2Comentario.value = texto;
        docChecklist2ComentarioValue = texto;

        if (docChecklist2ComentarioCounter) {
            docChecklist2ComentarioCounter.textContent = `${texto.length}/250`;
        }

        const isOperaciones = isOperacionesObservadoSolicitud(currentDocumentariaSolicitud);
        const respuestaHabilitada = isOperacionesRespuestaHabilitada();
        const respuestaEnviada = isOperacionesRespuestaEnviada();
        const comentarioReadonly = isChecklist2ReadOnly || (isOperaciones && !respuestaHabilitada);

        docChecklist2Comentario.readOnly = comentarioReadonly;
        docChecklist2Comentario.classList.toggle('is-readonly', comentarioReadonly);
        docChecklist2Comentario.placeholder = comentarioReadonly
            ? (isOperaciones ? 'Seleccione Responder para registrar el comentario' : 'Comentario enviado a operaciones')
            : (isOperaciones ? 'Ingrese respuesta para operaciones' : 'Ingrese comentario para operaciones');

        if (docChecklist2ComentarioLabel) {
            docChecklist2ComentarioLabel.textContent = isOperaciones ? 'Respuesta a operaciones' : 'Comentario';
        }

        if (respuestaEnviada) {
            docChecklist2Comentario.placeholder = 'Respuesta enviada a operaciones';
        }
    }

    function areAllPostAprobacionDocsDownloaded() {
        const docNames = getPostAprobacionDocNames();
        return docNames.length > 0 && docNames.every(docName => downloadedPostAprobacionDocs.has(docName));
    }

    function isChecklist2Unlocked() {
        return areAllPostAprobacionDocsDownloaded()
            || !!(currentDocumentariaSolicitud && currentDocumentariaSolicitud.documentariaEnviadaOperaciones)
            || isOperacionesObservadoSolicitud(currentDocumentariaSolicitud);
    }

    function isSolicitudEnFirma(solicitud) {
        return String(solicitud?.etapa || '').toUpperCase() === 'FIRMA';
    }

    function updateDocumentariaTitleAndStage() {
        if (!currentDocumentariaSolicitud) return;
        const isOperaciones = isOperacionesObservadoSolicitud(currentDocumentariaSolicitud);
        const isFirma = isSolicitudEnFirma(currentDocumentariaSolicitud);
        const docEtapa = document.getElementById('docEtapa');

        if (documentariaPageTitle) {
            documentariaPageTitle.textContent = isOperaciones ? 'Operaciones' : (isFirma ? 'Firmas' : 'Bandeja documentaria');
        }
        if (docEtapa) {
            docEtapa.textContent = currentDocumentariaSolicitud.etapa || 'DOCUMENTARIA';
        }
    }

    function avanzarSolicitudEFE004AFirmaPendiente() {
        if (!isSolicitudFirmaAutomatica(currentDocumentariaSolicitud)) return;
        if (!areAllPostAprobacionDocsDownloaded()) return;

        currentDocumentariaSolicitud.etapa = 'FIRMA';
        if (!docChecklist2Docs.length) {
            currentDocumentariaSolicitud.estado = 'PENDIENTE';
        }
        updateDocumentariaTitleAndStage();
        saveSolicitudFirmaAutomaticaState(currentDocumentariaSolicitud);
    }

    function actualizarEstadoFirmaChecklist2(solicitud) {
        if (!isSolicitudFirmaAutomatica(solicitud) || !isSolicitudEnFirma(solicitud)) return;
        const tieneChecklist2 = Array.isArray(solicitud.checklist2Docs) && solicitud.checklist2Docs.length > 0;
        solicitud.estado = tieneChecklist2 ? 'EN PROCESO' : 'PENDIENTE';
    }

    function updatePostAprobacionDownloadVisuals() {
        getPostAprobacionDownloadButtons().forEach(btn => {
            const downloaded = downloadedPostAprobacionDocs.has(btn.dataset.docName);
            btn.classList.toggle('is-downloaded', downloaded);
            btn.setAttribute('data-downloaded', String(downloaded));
        });
    }

    function updatePostAprobacionCollapseState() {
        const allDownloaded = areAllPostAprobacionDocsDownloaded();

        if (!allDownloaded) {
            postAprobacionCollapsed = false;
        } else if (!docPostAprobacionCard || !docPostAprobacionCard.classList.contains('is-completed')) {
            postAprobacionCollapsed = true;
        }

        if (docPostAprobacionCard) {
            docPostAprobacionCard.classList.toggle('is-completed', allDownloaded);
            docPostAprobacionCard.classList.toggle('is-collapsed', allDownloaded && postAprobacionCollapsed);
        }

        if (docPostAprobacionList) {
            docPostAprobacionList.hidden = allDownloaded && postAprobacionCollapsed;
        }

        if (btnDescargarTodosDocs) {
            btnDescargarTodosDocs.hidden = allDownloaded;
        }

        if (btnVerMasPostDocs) {
            btnVerMasPostDocs.hidden = !allDownloaded;
            const icon = btnVerMasPostDocs.querySelector('.material-icons-outlined');
            if (allDownloaded && postAprobacionCollapsed) {
                btnVerMasPostDocs.lastChild.textContent = 'Ver más';
                if (icon) icon.textContent = 'expand_more';
            } else {
                btnVerMasPostDocs.lastChild.textContent = 'Ver menos';
                if (icon) icon.textContent = 'expand_less';
            }
        }
    }

    function updateChecklist2Availability() {
        const unlocked = isChecklist2Unlocked();

        if (docChecklist2Card) {
            docChecklist2Card.classList.toggle('is-locked', !unlocked);
            docChecklist2Card.classList.toggle('is-unlocked', unlocked);
            docChecklist2Card.classList.toggle('is-readonly', isChecklist2ReadOnly);
        }
        if (docChecklist2Subtitle) {
            docChecklist2Subtitle.hidden = !unlocked;
            docChecklist2Subtitle.textContent = isChecklist2ReadOnly
                ? 'Documentos enviados a operaciones. Solo se permite ver o descargar.'
                : 'Adjunta los documentos PDF requeridos para la etapa documentaria.';
        }
        if (docChecklist2Counter) docChecklist2Counter.hidden = !unlocked;
        if (docChecklist2Content) docChecklist2Content.hidden = !unlocked;
        updateOperacionesObservationState();
        updateChecklist2ComentarioState();

        if (!unlocked && docChecklist2Body) {
            docChecklist2Body.innerHTML = '';
        }
        updateChecklist2SendButtonState();
    }

    function updateChecklist2SendButtonState() {
        const unlocked = isChecklist2Unlocked();
        const tieneDocumentos = docChecklist2Docs.length > 0;
        const isOperaciones = isOperacionesObservadoSolicitud(currentDocumentariaSolicitud);
        const respuestaHabilitada = isOperacionesRespuestaHabilitada();
        const respuestaEnviada = isOperacionesRespuestaEnviada();

        let enviarOperacionesDeshabilitado = !unlocked || !tieneDocumentos || isChecklist2ReadOnly;
        if (isOperaciones) {
            enviarOperacionesDeshabilitado = !unlocked || !tieneDocumentos || respuestaEnviada || !respuestaHabilitada;
        }

        if (docChecklist2Footer) {
            docChecklist2Footer.hidden = isOperaciones ? false : enviarOperacionesDeshabilitado;
        }

        if (btnEnviarOperacionesChecklist2) {
            btnEnviarOperacionesChecklist2.disabled = enviarOperacionesDeshabilitado;
            btnEnviarOperacionesChecklist2.setAttribute('aria-disabled', String(enviarOperacionesDeshabilitado));
            btnEnviarOperacionesChecklist2.title = respuestaEnviada
                ? 'La respuesta ya fue enviada a operaciones.'
                : (isOperaciones && !respuestaHabilitada
                    ? 'Seleccione Responder para habilitar el envío.'
                    : (tieneDocumentos ? 'Enviar documentos a operaciones' : 'Adjunte al menos un documento para enviar a operaciones'));
        }
    }

    function mostrarPopupDocumentosPostAprobacionCompletos() {
        modalTitle.textContent = 'Descarga completada';
        modalBody.innerHTML = `
            <div class="popup-solicitud-success">
                <div class="popup-solicitud-icon">
                    <span class="material-icons-outlined">check_circle</span>
                </div>
                <p class="popup-solicitud-text">Todos los documentos descargados continúa con etapa de firmas</p>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'none';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', () => {
            closeModal();
            document.getElementById('modalBtnCancel').style.display = 'inline-flex';
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function syncDocumentariaDownloadFlow() {
        updatePostAprobacionDownloadVisuals();
        updatePostAprobacionCollapseState();
        updateChecklist2Availability();
        if (isChecklist2Unlocked()) {
            renderDocChecklist2();
            if (!postAprobacionCompletionPopupShown && areAllPostAprobacionDocsDownloaded()) {
                postAprobacionCompletionPopupShown = true;
                avanzarSolicitudEFE004AFirmaPendiente();
                persistCurrentDocumentariaState();
                mostrarPopupDocumentosPostAprobacionCompletos();
            } else if (areAllPostAprobacionDocsDownloaded()) {
                avanzarSolicitudEFE004AFirmaPendiente();
            }
        }
        persistCurrentDocumentariaState();
    }

    function markPostAprobacionDocDownloaded(docName) {
        if (!docName) return;
        downloadedPostAprobacionDocs.add(docName);
        syncDocumentariaDownloadFlow();
    }

    function descargarDocumentoChecklist2(doc) {
        if (!doc) return;
        console.log(`Descarga solicitada de CheckList 2: ${doc.name}`);
        showToast(`Descarga solicitada: ${doc.name}`, 'success');
    }

    function renderDocChecklist2() {
        if (!docChecklist2Body || !isChecklist2Unlocked()) return;

        docChecklist2Body.innerHTML = '';

        docChecklist2Docs.forEach((doc, index) => {
            const row = document.createElement('tr');
            const acciones = isChecklist2ReadOnly ? `
                        <button type="button" class="doc-checklist2-icon-btn" data-doc-checklist2-action="ver" data-index="${index}" title="Ver documento" aria-label="Ver documento">
                            <span class="material-icons-outlined">visibility</span>
                        </button>
                        <button type="button" class="doc-checklist2-download-btn" data-doc-checklist2-action="descargar" data-index="${index}">
                            <span class="material-icons-outlined">download</span>
                            Descargar
                        </button>
            ` : `
                        <button type="button" class="doc-checklist2-icon-btn" data-doc-checklist2-action="ver" data-index="${index}" title="Ver documento" aria-label="Ver documento">
                            <span class="material-icons-outlined">visibility</span>
                        </button>
                        <button type="button" class="doc-checklist2-edit-btn" data-doc-checklist2-action="editar" data-index="${index}">Editar</button>
                        <button type="button" class="doc-checklist2-icon-btn danger" data-doc-checklist2-action="eliminar" data-index="${index}" title="Eliminar documento" aria-label="Eliminar documento">
                            <span class="material-icons-outlined">delete</span>
                        </button>
            `;

            row.innerHTML = `
                <td>
                    <div class="documentaria-checklist2-file">
                        <span class="material-icons-outlined">picture_as_pdf</span>
                        <span>${escapeHtml(doc.name)}</span>
                    </div>
                </td>
                <td>
                    <div class="documentaria-checklist2-actions">
                        ${acciones}
                    </div>
                </td>
            `;
            docChecklist2Body.appendChild(row);
        });

        if (!isChecklist2ReadOnly && docChecklist2Docs.length < DOC_CHECKLIST2_MAX) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td class="documentaria-checklist2-empty">Adjuntar documento</td>
                <td>
                    <button type="button" class="doc-checklist2-upload-btn" data-doc-checklist2-action="adjuntar">
                        <span class="material-icons-outlined">upload_file</span>
                        Adjuntar documento
                    </button>
                </td>
            `;
            docChecklist2Body.appendChild(emptyRow);
        } else if (!isChecklist2ReadOnly && docChecklist2Docs.length >= DOC_CHECKLIST2_MAX) {
            const limitRow = document.createElement('tr');
            limitRow.innerHTML = `
                <td colspan="2" class="documentaria-checklist2-limit">Límite máximo de 15 documentos alcanzado.</td>
            `;
            docChecklist2Body.appendChild(limitRow);
        }

        if (docChecklist2Counter) {
            docChecklist2Counter.textContent = `${docChecklist2Docs.length}/${DOC_CHECKLIST2_MAX} documentos`;
        }
        updateChecklist2ComentarioState();

        updateChecklist2SendButtonState();

        docChecklist2Body.querySelectorAll('[data-doc-checklist2-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.docChecklist2Action;
                const index = Number(btn.dataset.index);

                if (action === 'adjuntar') {
                    if (isChecklist2ReadOnly) return;
                    if (!isChecklist2Unlocked()) return;
                    if (docChecklist2Docs.length >= DOC_CHECKLIST2_MAX) return;
                    docNameContext = 'checklist2';
                    editingChecklist2Index = null;
                    pendingChecklist2FileObject = null;
                    if (docChecklist2FileInput) docChecklist2FileInput.click();
                    return;
                }

                if (action === 'ver') {
                    const doc = docChecklist2Docs[index];
                    if (!doc) return;
                    modalTitle.textContent = `Visualizar - ${doc.name}`;
                    modalBody.innerHTML = `
                        <div style="background-color: #f1f3f5; border: 1px solid var(--border-color); border-radius: 8px; height: 350px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; color: var(--text-secondary);">
                            <span class="material-icons-outlined" style="font-size: 64px; color: var(--primary-blue);">picture_as_pdf</span>
                            <p style="font-weight: 600;">[ Simulación de Visor PDF ]</p>
                            <p style="font-size: 0.8rem;">Archivo: ${escapeHtml(doc.name)}</p>
                        </div>
                    `;
                    document.getElementById('modalBtnCancel').textContent = 'Cerrar';
                    document.getElementById('modalBtnCancel').style.display = 'inline-flex';
                    document.getElementById('modalBtnAction').style.display = 'none';
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    return;
                }

                if (action === 'descargar') {
                    const doc = docChecklist2Docs[index];
                    descargarDocumentoChecklist2(doc);
                    return;
                }

                if (action === 'editar') {
                    if (isChecklist2ReadOnly) return;
                    const doc = docChecklist2Docs[index];
                    if (!doc) return;
                    docNameContext = 'checklist2';
                    editingChecklist2Index = index;
                    pendingChecklist2FileObject = null;
                    if (docChecklist2FileInput) docChecklist2FileInput.click();
                    return;
                }

                if (action === 'eliminar') {
                    if (isChecklist2ReadOnly) return;
                    if (!docChecklist2Docs[index]) return;
                    docChecklist2Docs.splice(index, 1);
                    if (currentDocumentariaSolicitud) {
                        currentDocumentariaSolicitud.checklist2Docs = docChecklist2Docs;
                        actualizarEstadoFirmaChecklist2(currentDocumentariaSolicitud);
                        updateDocumentariaTitleAndStage();
                    }
                    persistCurrentDocumentariaState();
                    renderDocChecklist2();
                    showToast('Documento eliminado del CheckList 2.', 'info');
                }
            });
        });
    }

    function volverABandejaEntradaDesdeDocumentaria() {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloBandeja').classList.add('active');
        navItems.forEach(n => n.classList.remove('active'));
        if (document.getElementById('navBandeja')) document.getElementById('navBandeja').classList.add('active');
        renderBandejaNewTable(filteredBandejaData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function mostrarPopupExitoEnviarOperaciones() {
        modalTitle.textContent = 'Envío exitoso';
        modalBody.innerHTML = `
            <div class="popup-solicitud-success">
                <div class="popup-solicitud-icon">
                    <span class="material-icons-outlined">check_circle</span>
                </div>
                <p class="popup-solicitud-text">La documentación fue enviada a operaciones correctamente.</p>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'none';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', () => {
            closeModal();
            document.getElementById('modalBtnCancel').style.display = 'inline-flex';
            volverABandejaEntradaDesdeDocumentaria();
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function enviarChecklist2AOperaciones() {
        if (!currentDocumentariaSolicitud || docChecklist2Docs.length === 0 || isChecklist2ReadOnly) return;

        if (docChecklist2Comentario) {
            docChecklist2ComentarioValue = docChecklist2Comentario.value.slice(0, 250);
        }
        currentDocumentariaSolicitud.documentariaEnviadaOperaciones = true;
        currentDocumentariaSolicitud.checklist2Docs = docChecklist2Docs;
        currentDocumentariaSolicitud.checklist2Comentario = docChecklist2ComentarioValue;
        currentDocumentariaSolicitud.downloadedPostAprobacionDocs = Array.from(downloadedPostAprobacionDocs);
        currentDocumentariaSolicitud.etapa = 'OPERACIONES';
        currentDocumentariaSolicitud.estado = 'PENDIENTE';
        if (isOperacionesObservadoSolicitud(currentDocumentariaSolicitud)) {
            currentDocumentariaSolicitud.operacionesRespuestaEnviada = true;
            currentDocumentariaSolicitud.operacionesRespuestaHabilitada = false;
        }
        isChecklist2ReadOnly = true;
        persistCurrentDocumentariaState();
        updateChecklist2Availability();
        renderDocChecklist2();
        mostrarPopupExitoEnviarOperaciones();
    }

    function mostrarPopupConfirmacionEnviarOperaciones() {
        if (!btnEnviarOperacionesChecklist2 || btnEnviarOperacionesChecklist2.disabled) return;

        modalTitle.textContent = 'Confirmar envío a operaciones';
        modalBody.innerHTML = `
            <div class="popup-solicitud-success">
                <div class="popup-solicitud-icon">
                    <span class="material-icons-outlined">help_outline</span>
                </div>
                <p class="popup-solicitud-text">¿Está seguro de enviar la documentación a operaciones?</p>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'inline-flex';
        document.getElementById('modalBtnCancel').textContent = 'Cancelar';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', enviarChecklist2AOperaciones);

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (btnEnviarOperacionesChecklist2) {
        btnEnviarOperacionesChecklist2.addEventListener('click', mostrarPopupConfirmacionEnviarOperaciones);
    }

    if (btnResponderObservacionOperaciones) {
        btnResponderObservacionOperaciones.addEventListener('click', () => {
            if (!isOperacionesObservadoSolicitud(currentDocumentariaSolicitud) || isOperacionesRespuestaEnviada()) return;
            currentDocumentariaSolicitud.operacionesRespuestaHabilitada = true;
            updateOperacionesObservationState();
            updateChecklist2ComentarioState();
            updateChecklist2SendButtonState();
            if (docChecklist2Comentario) {
                docChecklist2Comentario.focus();
            }
            persistCurrentDocumentariaState();
        });
    }

    if (docChecklist2Comentario) {
        docChecklist2Comentario.addEventListener('input', () => {
            if (isChecklist2ReadOnly) {
                docChecklist2Comentario.value = docChecklist2ComentarioValue;
                updateChecklist2ComentarioState();
                return;
            }
            updateChecklist2ComentarioState();
            persistCurrentDocumentariaState();
        });
    }

    if (docChecklist2FileInput) {
        docChecklist2FileInput.addEventListener('change', (e) => {
            if (isChecklist2ReadOnly) {
                docChecklist2FileInput.value = '';
                return;
            }
            if (!isChecklist2Unlocked()) {
                docChecklist2FileInput.value = '';
                return;
            }
            if (e.target.files.length === 0) return;

            const file = e.target.files[0];
            if (!isPdfFile(file)) {
                showToast('Solo se permite adjuntar documentos PDF.', 'warning');
                docChecklist2FileInput.value = '';
                pendingChecklist2FileObject = null;
                return;
            }

            docNameContext = 'checklist2';
            pendingChecklist2FileObject = file;
            inputDocName.value = file.name.replace(/\.[^/.]+$/, '');
            modalDocNameOverlay.classList.add('active');
            inputDocName.focus();
        });
    }

    // Modal save document name handler
    btnSaveDocName.addEventListener('click', () => {
        const docNameValue = inputDocName.value.trim();
        if (!docNameValue) {
            showToast('Debe escribir un nombre descriptivo para el documento.', 'warning');
            return;
        }

        // Ensure .pdf extension
        const finalName = docNameValue.toLowerCase().endsWith('.pdf') ? docNameValue : docNameValue + '.pdf';

        if (docNameContext === 'checklist2') {
            if (isChecklist2ReadOnly) {
                showToast('La solicitud ya fue enviada a operaciones. Solo se permite visualizar o descargar.', 'warning');
                return;
            }
            if (!pendingChecklist2FileObject) {
                showToast('Debe seleccionar un documento PDF para registrarlo.', 'warning');
                return;
            }

            if (editingChecklist2Index !== null) {
                docChecklist2Docs[editingChecklist2Index] = {
                    ...docChecklist2Docs[editingChecklist2Index],
                    name: finalName,
                    file: pendingChecklist2FileObject
                };
                showToast('Documento actualizado en CheckList 2.', 'success');
            } else {
                if (docChecklist2Docs.length >= DOC_CHECKLIST2_MAX) {
                    showToast('Solo se permite adjuntar hasta 15 documentos.', 'warning');
                    return;
                }

                docChecklist2Docs.push({
                    id: 'DOC-CL2-' + Date.now(),
                    name: finalName,
                    file: pendingChecklist2FileObject
                });
                showToast('Documento adjuntado en CheckList 2.', 'success');
            }

            currentDocumentariaSolicitud.checklist2Docs = docChecklist2Docs;
            actualizarEstadoFirmaChecklist2(currentDocumentariaSolicitud);
            updateDocumentariaTitleAndStage();

            modalDocNameOverlay.classList.remove('active');
            if (docChecklist2FileInput) docChecklist2FileInput.value = '';
            pendingChecklist2FileObject = null;
            editingChecklist2Index = null;
            docNameContext = null;
            persistCurrentDocumentariaState();
            renderDocChecklist2();
            return;
        }

        if (editingDocId !== null) {
            // Edit mode
            attachedDocs[editingDocId].name = finalName;
            showToast('Nombre de documento actualizado.', 'success');
        } else {
            // Add mode
            attachedDocs.push({
                id: 'DOC-' + Date.now(),
                name: finalName,
                file: pendingFileObject
            });
            showToast('Documento adjuntado.', 'success');
        }

        modalDocNameOverlay.classList.remove('active');
        inputHiddenFile.value = '';
        pendingFileObject = null;
        editingDocId = null;
        docNameContext = null;
        renderChecklistTable();
    });

    // Modal cancel document name handler
    btnCancelDocName.addEventListener('click', () => {
        modalDocNameOverlay.classList.remove('active');
        inputHiddenFile.value = '';
        if (docChecklist2FileInput) docChecklist2FileInput.value = '';
        pendingFileObject = null;
        editingDocId = null;
        pendingChecklist2FileObject = null;
        editingChecklist2Index = null;
        docNameContext = null;
    });

    // Pasar a Riesgos sin validación OTP
    document.getElementById('btnPasarRiesgos').addEventListener('click', () => {
        const celular = document.getElementById('regCelular').value.trim();
        const tipoDoc = document.getElementById('regTipoDoc').value;
        const nroDoc = document.getElementById('regNroDoc').value;
        const carreteraRegistro = String(document.getElementById('regCartera')?.textContent || currentCarretera || 'EXPRESS').trim().toUpperCase();
        const requiredManualChecks = getRequiredManualChecks(carreteraRegistro);
        const missingManualChecks = requiredManualChecks.filter(item => !document.getElementById(item.id)?.checked);
        const hasAttachedFile = attachedDocs.length > 0;

        // Validation: Only validate that there is at least one file attached and required checkboxes are checked
        if (missingManualChecks.length > 0) {
            const missingLabels = missingManualChecks.map(item => item.label).join(', ');
            showToast(`Debe marcar las casillas manuales requeridas para carretera ${carreteraRegistro}: ${missingLabels}.`, 'warning');
            return;
        }
        if (!hasAttachedFile) {
            showToast('Debe adjuntar al menos un documento para poder continuar.', 'warning');
            return;
        }

        const celularText = celular || '922159933';

        // Generate current timestamp matching the format dd-mm-yyyy hh:mm:ss
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const fechaStr = `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;

        const capitalizeWord = (str) => {
            if (!str) return '';
            return str.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        };
        const concesionarioStr = capitalizeWord(document.getElementById('regVehConcesionario').value) || 'Hyundai';
        const tiendaStr = capitalizeWord(document.getElementById('regVehTienda').value) || 'Puruchuco';

        // Update the existing request in solicitudes, or add new if not found
        const solId = document.getElementById('regSolicitudId').textContent;
        const existingSol = solicitudes.find(s => s.id === solId);
        if (existingSol) {
            existingSol.fecha = fechaStr;
            existingSol.etapa = 'RIESGOS';
            existingSol.estado = 'PENDIENTE';
            existingSol.telefono = celularText;
            existingSol.concesionario = concesionarioStr;
            existingSol.tienda = tiendaStr;
            
            // Set the correct calculated amount from the form
            const precioVehStr = document.getElementById('regSimPrecioVeh').value;
            if (precioVehStr) {
                existingSol.monto = precioVehStr.replace('$', 'S/');
            }
        } else {
            const newSol = {
                id: solId,
                cliente: 'Juan Pérez García',
                documento: `${tipoDoc} - ${nroDoc}`,
                tipoCredito: 'Crédito vehicular',
                monto: 'S/ 21,480.00',
                fecha: fechaStr,
                estado: 'PENDIENTE',
                etapa: 'RIESGOS',
                telefono: celularText,
                concesionario: concesionarioStr,
                tienda: tiendaStr
            };
            solicitudes.unshift(newSol);
        }

        // Navigate to Bandeja
        document.querySelectorAll('.module-page').forEach(page => page.classList.remove('active'));
        document.getElementById('moduloBandeja').classList.add('active');
        
        navItems.forEach(n => n.classList.remove('active'));
        document.getElementById('navBandeja').classList.add('active');
        
        // Re-render table with new item
        applyBandejaFilters();

        mostrarPopupEnvioRiesgos();
    });

    function mostrarPopupEnvioRiesgos() {
        modalTitle.textContent = 'Envío exitoso';
        modalBody.innerHTML = `
            <div class="popup-solicitud-success">
                <div class="popup-solicitud-icon">
                    <span class="material-icons-outlined">check_circle</span>
                </div>
                <p class="popup-solicitud-text">Se envió a Riesgos con éxito, espere atento para su revisión.</p>
            </div>
        `;

        document.getElementById('modalBtnCancel').style.display = 'none';
        document.getElementById('modalBtnAction').style.display = 'inline-flex';
        document.getElementById('modalBtnAction').textContent = 'Aceptar';

        const oldActionBtn = document.getElementById('modalBtnAction');
        const newActionBtn = oldActionBtn.cloneNode(true);
        oldActionBtn.parentNode.replaceChild(newActionBtn, oldActionBtn);
        newActionBtn.addEventListener('click', () => {
            closeModal();
            document.getElementById('modalBtnCancel').style.display = 'inline-flex';
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Recalcular capacidad button moved to Cálculo screen

    // Limpiar button
    btnLimpiar.addEventListener('click', () => {
        nroDocumento.value = '';
        nroTelefono.value = '';
        if (calcTelefonoPoliticas) {
            calcTelefonoPoliticas.value = '';
            clearTelefonoPoliticasHighlight();
        }
        tipoDocumento.value = 'DNI';
        toggleConyuge.checked = false;
        conyugeData.style.display = 'none';
        labelNo.classList.add('active-label');
        labelSi.classList.remove('active-label');
        document.getElementById('tipoDocConyuge').value = 'DNI';
        document.getElementById('nroDocConyuge').value = '';
        btnSimular.disabled = true;
        btnSimular.classList.remove('enabled');
        updateContinuarDesdeCalculoState();
        showToast('Formulario limpiado correctamente.', 'info');
    });

    // ========================================
    // BANDEJA DE ENTRADA REDESIGNED — Table & Search
    // ========================================
    let currentSortColumn = null;
    let currentSortAscending = true;
    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredBandejaData = [];

    // Toggle Sidebar using Bandeja menu button
    if (btnBandejaMenu) {
        btnBandejaMenu.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }



    // Date Auto-Formatting Input Handler
    const formatBandejaDateInput = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 8) {
            val = val.substring(0, 8);
        }
        if (val.length > 4) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4) + '/' + val.substring(4);
        } else if (val.length > 2) {
            val = val.substring(0, 2) + '/' + val.substring(2);
        }
        e.target.value = val;
    };

    if (searchFechaDesde) {
        searchFechaDesde.addEventListener('input', formatBandejaDateInput);
    }
    if (searchFechaHasta) {
        searchFechaHasta.addEventListener('input', formatBandejaDateInput);
    }

    function getEstadoLabel(estado) {
        const estadoNormalizado = String(estado || '').trim().toUpperCase();
        return estadoNormalizado === 'EN PROCESO' ? 'En proceso' : estadoNormalizado;
    }

    function getEstadoClass(estado) {
        return String(estado || '').trim().toLowerCase().replace(/[\s_]+/g, '-');
    }

    function renderBandejaNewTable(data) {
        if (!tablaBandejaNewBody) return;

        tablaBandejaNewBody.innerHTML = '';

        if (data.length === 0) {
            tablaBandejaNewBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <span class="material-icons-outlined" style="font-size: 48px; display: block; margin-bottom: 8px;">inbox</span>
                        No se encontraron solicitudes
                    </td>
                </tr>
            `;
            document.getElementById('bandejaSubResults').textContent = '0 resultados';
            document.getElementById('bandejaTotalCount').textContent = '0';
            
            // Update pagination text
            document.getElementById('currentPageNum').textContent = '1';
            document.getElementById('totalPagesNum').textContent = '1';
            document.getElementById('paginationPrevBtn').disabled = true;
            document.getElementById('paginationNextBtn').disabled = true;
            return;
        }

        // Apply sorting if a column is selected
        if (currentSortColumn) {
            data.sort((a, b) => {
                let valA = a[currentSortColumn] || '';
                let valB = b[currentSortColumn] || '';

                if (currentSortColumn === 'fecha') {
                    const parseDate = (dStr) => {
                        const parts = dStr.split(' ');
                        const dateParts = parts[0].split('-');
                        const timeParts = parts[1] ? parts[1].split(':') : ['00', '00', '00'];
                        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
                    };
                    valA = parseDate(valA);
                    valB = parseDate(valB);
                }

                if (valA < valB) return currentSortAscending ? -1 : 1;
                if (valA > valB) return currentSortAscending ? 1 : -1;
                return 0;
            });
        }

        // Pagination calculations
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach(sol => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong style="color: var(--primary-blue); font-weight: 700;">${sol.id}</strong></td>
                <td>${sol.documento}</td>
                <td>${sol.concesionario}</td>
                <td>${sol.tienda}</td>
                <td>${sol.fecha}</td>
                <td><span style="font-weight: 700; color: #475569; font-size: 0.78rem;">${sol.etapa}</span></td>
                <td><span class="status-badge ${getEstadoClass(sol.estado)}">${getEstadoLabel(sol.estado)}</span></td>
                <td>
                    <button type="button" class="revisar-link" data-id="${sol.id}" style="background: none; border: none; padding: 0; color: var(--accent-blue); font-weight: 600; cursor: pointer; font-size: 0.82rem;">Revisar</button>
                </td>
            `;
            tablaBandejaNewBody.appendChild(row);
        });

        // Update results counts
        document.getElementById('bandejaSubResults').textContent = `${data.length} resultados`;
        document.getElementById('bandejaTotalCount').textContent = `${data.length}`;

        // Update pagination text & buttons
        document.getElementById('currentPageNum').textContent = currentPage;
        document.getElementById('totalPagesNum').textContent = totalPages;
        document.getElementById('paginationPrevBtn').disabled = (currentPage === 1);
        document.getElementById('paginationNextBtn').disabled = (currentPage === totalPages);

        // Bind click on "Revisar" link
        tablaBandejaNewBody.querySelectorAll('.revisar-link').forEach(link => {
            link.addEventListener('click', () => {
                const id = link.dataset.id;
                const solicitud = solicitudes.find(s => s.id === id);
                if (solicitud) {
                    handleRevisarAction(solicitud);
                }
            });
        });
    }

    // Pagination Click Listeners
    const paginationPrevBtn = document.getElementById('paginationPrevBtn');
    const paginationNextBtn = document.getElementById('paginationNextBtn');

    if (paginationPrevBtn) {
        paginationPrevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderBandejaNewTable(filteredBandejaData);
            }
        });
    }

    if (paginationNextBtn) {
        paginationNextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredBandejaData.length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                renderBandejaNewTable(filteredBandejaData);
            }
        });
    }

    // Set sorting columns click handler
    const sortHeaders = document.querySelectorAll('.table-bandeja-new th.sortable');
    sortHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.sort;
            if (currentSortColumn === col) {
                currentSortAscending = !currentSortAscending;
            } else {
                currentSortColumn = col;
                currentSortAscending = true;
            }
            
            applyBandejaFilters();

            // Update sorting indicators
            sortHeaders.forEach(header => {
                const icon = header.querySelector('.sort-icon-bandeja');
                if (header === th) {
                    icon.innerHTML = currentSortAscending ? '⁝ ▲' : '⁝ ▼';
                    icon.style.color = 'var(--accent-blue)';
                } else {
                    icon.innerHTML = '⁝';
                    icon.style.color = 'var(--text-muted)';
                }
            });
        });
    });

    const parseInputDate = (str) => {
        if (!str) return null;
        const cleanStr = str.replace(/\//g, '-');
        const parts = cleanStr.split('-');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month, day, 0, 0, 0);
            }
        }
        return null;
    };

    const parseRecordDate = (str) => {
        if (!str) return null;
        const cleanStr = str.replace(/\//g, '-');
        const parts = cleanStr.split(' ');
        const dateParts = parts[0].split('-');
        if (dateParts.length === 3) {
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const year = parseInt(dateParts[2], 10);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month, day, 0, 0, 0);
            }
        }
        return null;
    };

    function applyBandejaFilters() {
        const solId = document.getElementById('searchSolId').value.toLowerCase().trim();
        const docNum = document.getElementById('searchDocNum').value.toLowerCase().trim();
        const concessionsVal = document.getElementById('searchConcesionario').value;
        const tiendaVal = document.getElementById('searchTienda').value;
        const estadoVal = document.getElementById('searchEstado').value;
        const fechaDesdeVal = document.getElementById('searchFechaDesde').value.trim();
        const fechaHastaVal = document.getElementById('searchFechaHasta').value.trim();

        let filtered = [...solicitudes];



        // Search filters
        if (solId) {
            filtered = filtered.filter(sol => sol.id.toLowerCase().includes(solId));
        }
        if (docNum) {
            filtered = filtered.filter(sol => sol.documento.toLowerCase().includes(docNum));
        }
        if (concessionsVal) {
            filtered = filtered.filter(sol => sol.concesionario === concessionsVal);
        }
        if (tiendaVal) {
            filtered = filtered.filter(sol => sol.tienda === tiendaVal);
        }
        if (estadoVal) {
            filtered = filtered.filter(sol => sol.estado === estadoVal);
        }

        // Date Range Filters
        const dateDesde = parseInputDate(fechaDesdeVal);
        const dateHasta = parseInputDate(fechaHastaVal);

        if (dateDesde) {
            filtered = filtered.filter(sol => {
                const recDate = parseRecordDate(sol.fecha);
                return recDate && recDate >= dateDesde;
            });
        }
        if (dateHasta) {
            filtered = filtered.filter(sol => {
                const recDate = parseRecordDate(sol.fecha);
                return recDate && recDate <= dateHasta;
            });
        }

        filteredBandejaData = filtered;
        renderBandejaNewTable(filteredBandejaData);
    }

    // Button event listeners
    if (btnBuscarBandeja) {
        btnBuscarBandeja.addEventListener('click', () => {
            currentPage = 1; // Reset to page 1 on new search
            applyBandejaFilters();
        });
    }

    if (btnLimpiarBandeja) {
        btnLimpiarBandeja.addEventListener('click', () => {
            document.getElementById('searchSolId').value = '';
            document.getElementById('searchDocNum').value = '';
            document.getElementById('searchConcesionario').value = '';
            document.getElementById('searchTienda').value = '';
            document.getElementById('searchEstado').value = '';
            document.getElementById('searchFechaDesde').value = '';
            document.getElementById('searchFechaHasta').value = '';
            
            currentPage = 1; // Reset to page 1
            applyBandejaFilters();
            showToast('Filtros de búsqueda limpiados.', 'info');
        });
    }



    // ============================
    // INGRESOS - Registro de Solicitud
    // ============================
    function parseCurrencyValue(value) {
        if (!value) return 0;
        const cleaned = String(value)
            .replace(/S\//g, '')
            .replace(/\$/g, '')
            .replace(/,/g, '')
            .replace(/\s/g, '')
            .replace(/[^0-9.-]/g, '');
        const amount = parseFloat(cleaned);
        return Number.isFinite(amount) ? amount : 0;
    }

    function formatSoles(amount) {
        return `S/ ${Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateTotalIngresos() {
        const totalEl = document.getElementById('totalIngresosTitular');
        if (!totalEl) return;
        const total = Array.from(document.querySelectorAll('#ingresosList .ingreso-monto'))
            .reduce((sum, input) => sum + parseCurrencyValue(input.value), 0);
        totalEl.textContent = formatSoles(total);
    }

    function refreshIngresoLabels() {
        document.querySelectorAll('#ingresosList .ingreso-item').forEach((item, index) => {
            item.dataset.ingresoIndex = String(index + 1);
            const badge = item.querySelector('.ingreso-badge');
            if (badge) badge.textContent = `Ingreso ${index + 1}`;
            const removeBtn = item.querySelector('.btn-remove-ingreso');
            if (removeBtn) removeBtn.style.display = index === 0 ? 'none' : 'inline-flex';
        });
    }

    function createIngresoItem(index) {
        const firstItem = document.querySelector('#ingresosList .ingreso-item');
        if (!firstItem) return null;
        const item = firstItem.cloneNode(true);
        item.dataset.ingresoIndex = String(index);
        item.querySelectorAll('select').forEach(select => {
            if (select.classList.contains('ingreso-anualizado')) {
                select.value = 'NO';
            } else {
                select.value = '';
            }
            select.disabled = isSolicitudReadOnly;
        });
        item.querySelectorAll('input').forEach(input => {
            input.value = input.classList.contains('ingreso-monto') ? 'S/ 0.00' : '';
            input.disabled = isSolicitudReadOnly;
        });
        const header = item.querySelector('.ingreso-item-header');
        let removeBtn = item.querySelector('.btn-remove-ingreso');
        if (!removeBtn) {
            removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn btn-outline btn-remove-ingreso';
            removeBtn.innerHTML = '<span class="material-icons-outlined">delete</span> Quitar';
            header.appendChild(removeBtn);
        }
        return item;
    }

    function resetIngresosSection() {
        const list = document.getElementById('ingresosList');
        if (!list) return;
        const firstItem = list.querySelector('.ingreso-item');
        if (!firstItem) return;
        list.innerHTML = '';
        list.appendChild(firstItem);
        firstItem.querySelectorAll('select').forEach(select => {
            if (select.classList.contains('ingreso-anualizado')) {
                select.value = 'NO';
            } else {
                select.value = '';
            }
            select.disabled = isSolicitudReadOnly;
        });
        firstItem.querySelectorAll('input').forEach(input => {
            input.value = input.classList.contains('ingreso-monto') ? 'S/ 0.00' : '';
            input.disabled = isSolicitudReadOnly;
        });
        let removeBtn = firstItem.querySelector('.btn-remove-ingreso');
        if (removeBtn) removeBtn.style.display = 'none';
        refreshIngresoLabels();
        updateTotalIngresos();
    }

    const btnAgregarIngreso = document.getElementById('btnAgregarIngreso');
    const ingresosList = document.getElementById('ingresosList');

    if (btnAgregarIngreso && ingresosList) {
        btnAgregarIngreso.addEventListener('click', () => {
            if (isSolicitudReadOnly) return;
            const nextIndex = ingresosList.querySelectorAll('.ingreso-item').length + 1;
            const newItem = createIngresoItem(nextIndex);
            if (newItem) {
                ingresosList.appendChild(newItem);
                refreshIngresoLabels();
                updateTotalIngresos();
            }
        });

        ingresosList.addEventListener('input', (event) => {
            if (event.target.classList.contains('ingreso-ruc')) {
                event.target.value = event.target.value.replace(/\D/g, '');
            }
            if (event.target.classList.contains('ingreso-monto')) {
                updateTotalIngresos();
            }
        });

        ingresosList.addEventListener('blur', (event) => {
            if (event.target.classList.contains('ingreso-monto')) {
                event.target.value = formatSoles(parseCurrencyValue(event.target.value));
                updateTotalIngresos();
            }
        }, true);

        ingresosList.addEventListener('click', (event) => {
            const removeBtn = event.target.closest('.btn-remove-ingreso');
            if (!removeBtn || isSolicitudReadOnly) return;
            const item = removeBtn.closest('.ingreso-item');
            if (item && ingresosList.querySelectorAll('.ingreso-item').length > 1) {
                item.remove();
                refreshIngresoLabels();
                updateTotalIngresos();
            }
        });
    }

    // ============================
    // REGISTRATION FORM READ-ONLY & STATE PERSISTENCE
    // ============================
    function saveCurrentRegistrationState() {
        if (currentSolicitudId && document.getElementById('moduloRegistroSolicitud').classList.contains('active')) {
            const currentSol = solicitudes.find(s => s.id === currentSolicitudId);
            if (currentSol) {
                currentSol.documentos = [...attachedDocs];
                currentSol.comentarios = document.getElementById('regComentarios').value;
                currentSol.chkManualDni = document.getElementById('chkManualDni')?.checked || false;
                currentSol.chkManualRecibo = document.getElementById('chkManualRecibo')?.checked || false;
                currentSol.chkManualCotizacion = document.getElementById('chkManualCotizacion')?.checked || false;
                currentSol.cartera = String(document.getElementById('regCartera')?.textContent || currentSol.cartera || 'EXPRESS').trim().toUpperCase();
                const celular = document.getElementById('regCelular').value.trim();
                if (celular) currentSol.telefono = celular;
            }
        }
    }

    function applyRegistrationFormReadOnlyState(readOnly) {
        isSolicitudReadOnly = readOnly;

        // Hide/show Pasar a riesgos button
        const btnPasarRiesgos = document.getElementById('btnPasarRiesgos');
        if (btnPasarRiesgos) {
            btnPasarRiesgos.style.display = readOnly ? 'none' : 'inline-flex';
        }

        // Lock checkboxes
        ['chkManualDni', 'chkManualRecibo', 'chkManualCotizacion'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) checkbox.disabled = readOnly;
        });
        if (readOnly) {
            getRequiredManualChecks(document.getElementById('regCartera')?.textContent || currentCarretera).forEach(item => {
                const checkbox = document.getElementById(item.id);
                if (checkbox) checkbox.checked = true;
            });
        }

        // Disable comments
        const regComentarios = document.getElementById('regComentarios');
        if (regComentarios) {
            regComentarios.disabled = readOnly;
        }

        // Disable/enable all inputs/selects in the module page
        const inputsAndSelects = document.querySelectorAll('#moduloRegistroSolicitud input, #moduloRegistroSolicitud select, #moduloRegistroSolicitud textarea');
        inputsAndSelects.forEach(input => {
            if (input.id !== 'inputHiddenFile') {
                const isOriginallyReadonly = input.classList.contains('disabled') || input.hasAttribute('readonly');
                if (readOnly) {
                    input.disabled = true;
                } else {
                    if (!isOriginallyReadonly) {
                        input.disabled = false;
                    }
                }
            }
        });
    }

    // ============================
    // REVISAR ACTION ROUTER (IN-PROGRESS & READ-ONLY FLOWS)
    // ============================
    function handleRevisarAction(solicitud) {
        currentSolicitudId = solicitud.id; // Set active request ID

        if (solicitud.etapa === 'SIMULACIÓN') {
            // Populate and show Resultado de calificación view
            const parts = (solicitud.documento || '').split(' - ');
            const tipoDoc = parts[0] || 'DNI';
            const nroDoc = parts[1] || '';

            // Generate mock financial data based on document
            const mockData = generateMockEvaluacion(nroDoc);

            document.getElementById('resSolicitudId').textContent = solicitud.id;
            document.getElementById('resFechaHora').textContent = solicitud.fecha;
            setResultadoDocumento(tipoDoc, nroDoc);
            document.getElementById('resMontoPreaprobado').textContent = `S/ ${mockData.montoPreaprobado}`;
            document.getElementById('resCalificacion').textContent = mockData.califica ? 'CALIFICA' : 'NO CALIFICA';
            document.getElementById('resCalificacionMsg').textContent = mockData.califica
                ? 'El cliente cumple con los criterios de evaluación.'
                : 'El cliente no cumple con los criterios de evaluación.';
            document.getElementById('resSegmentoRiesgo').textContent = mockData.segmentoRiesgo;
            document.getElementById('resIngresoEstimado').textContent = `S/ ${mockData.ingresoEstimado}`;
            syncIngresoEstimadoCalculo();
            document.getElementById('resCuotaMaxima').textContent = `S/ ${mockData.capacidadCuotaMaxima}`;
            const calcCuotaMaximaReset = document.getElementById('calcCuotaMaxima');
            if (calcCuotaMaximaReset) calcCuotaMaximaReset.value = `S/ ${mockData.capacidadCuotaMaxima}`;
            const calcIngresoDeclaradoReset = document.getElementById('calcIngresoDeclarado');
            if (calcIngresoDeclaradoReset) calcIngresoDeclaradoReset.value = '';

            const calificacionCard = document.querySelector('.resultado-calificacion');
            const calificacionIcon = calificacionCard.querySelector('.resultado-calificacion-icon .material-icons-outlined');
            if (mockData.califica) {
                calificacionCard.classList.add('califica');
                calificacionCard.classList.remove('no-califica');
                calificacionIcon.textContent = 'check_circle';
            } else {
                calificacionCard.classList.remove('califica');
                calificacionCard.classList.add('no-califica');
                calificacionIcon.textContent = 'cancel';
            }

            // Navigate to resultado screen
            document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
            document.getElementById('moduloResultado').classList.add('active');

            // Deactivate active nav highlights
            navItems.forEach(n => n.classList.remove('active'));

            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`Continuando Simulación para ${solicitud.id}`, 'info');

        } else if ((solicitud.etapa === 'DOCUMENTARIA' && solicitud.estado === 'PENDIENTE') || solicitud.etapa === 'FIRMA' || solicitud.documentariaEnviadaOperaciones || isOperacionesObservadoSolicitud(solicitud)) {
            showBandejaDocumentaria(solicitud);

        } else if (solicitud.etapa === 'SOLICITUD' || solicitud.etapa === 'RIESGOS') {
            const isReadOnly = (solicitud.etapa === 'RIESGOS');

            // Set read-only state for registration page elements
            applyRegistrationFormReadOnlyState(isReadOnly);

            // Populate and show Registro de solicitud view
            const parts = (solicitud.documento || '').split(' - ');
            const tipoDoc = parts[0] || 'DNI';
            const nroDoc = parts[1] || '';

            // Set top header info bar
            const carreteraSolicitud = String(solicitud.cartera || 'EXPRESS').trim().toUpperCase();
            document.getElementById('regSolicitudId').textContent = solicitud.id;
            document.getElementById('regCartera').textContent = carreteraSolicitud;
            document.getElementById('regUsuario').textContent = "ALOCHA";

            // Set pre-populated fields for Datos Cliente
            document.getElementById('regTipoDoc').value = tipoDoc;
            document.getElementById('regNroDoc').value = nroDoc;
            document.getElementById('regNombres').value = "Juan";
            document.getElementById('regApePaterno').value = "Pérez";
            document.getElementById('regApeMaterno').value = "García";
            document.getElementById('regFechaNac').value = "11/05/1995";
            document.getElementById('regCelular').value = solicitud.telefono || '';
            document.getElementById('regCorreo').value = "";
            
            // Reset/populate fields
            document.getElementById('regSexo').value = "";
            document.getElementById('regNacionalidad').value = "";
            document.getElementById('regResidencia').value = "";
            document.getElementById('regDireccion').value = "";
            document.getElementById('regDepartamento').value = "";
            document.getElementById('regProvincia').innerHTML = '<option value="" disabled selected>Seleccionar</option>';
            document.getElementById('regDistrito').innerHTML = '<option value="" disabled selected>Seleccionar</option>';
            document.getElementById('regEstadoCivil').value = "";
            document.getElementById('regSeparacionBienes').value = "";
            document.getElementById('regSeparacionBienes').disabled = true;
            document.getElementById('regSeparacionBienes').classList.add('disabled');

            // Reset Laborales
            document.getElementById('regCatLaboral').value = "";
            document.getElementById('regRucEmpleador').value = "";
            document.getElementById('regGiroActividad').value = "";
            document.getElementById('regCargo').value = "";
            document.getElementById('regFechaIngresoLab').value = "";
            document.getElementById('regMonedaIngreso').value = "PEN";
            document.getElementById('regIngresoNeto').value = "S/ 0.00";
            resetIngresosSection();

            // Pre-populate Vehiculo using Concesionario/Tienda from the solicitation
            document.getElementById('regVehEstado').value = "Nuevo";
            document.getElementById('regVehConcesionario').value = (solicitud.concesionario || 'HYUNDAI').toUpperCase();
            document.getElementById('regVehTienda').value = (solicitud.tienda || 'PURUCHUCO').toUpperCase();
            document.getElementById('regVehVendedor').value = "ALOCHA";
            document.getElementById('regVehMarca').value = "Toyota";
            document.getElementById('regVehModelo').value = "Corolla";
            document.getElementById('regVehAnio').value = "2026";
            document.getElementById('regVehTarjetaNombre').value = "TITULAR";

            // Pre-populate Simulación
            document.getElementById('regSimProducto').value = "Credito Vehicular";
            document.getElementById('regSimCampana').value = "SUV Mayo 2026";
            document.getElementById('regSimMoneda').value = "USD";
            document.getElementById('regSimTipoCambio').value = "3.78";
            document.getElementById('regSimPrecioVeh').value = (solicitud.monto || '$ 28,000.00').replace('S/', '$');
            document.getElementById('regSimCuotaInicial').value = "$ 8,000.00";
            document.getElementById('regSimTea').value = "12.80%";
            document.getElementById('regSimPlazo').value = "24 meses";
            document.getElementById('regSimDiaPago').value = "03";

            // Pre-populate Gastos
            document.getElementById('regGastosNotariales').value = "SI";
            document.getElementById('regGastosRegistrales').value = "SI";
            document.getElementById('regGastosDelivery').value = "SI";
            document.getElementById('regPlanGpx').value = "Premium";
            document.getElementById('regGastosInclGpx').value = "$ 650.00";
            document.getElementById('regKitMantenimiento').value = "No";
            document.getElementById('regCuotasDobles').value = "No";
            document.getElementById('regIncluirPortes').value = "No";
            document.getElementById('regTotalFinanciamiento').value = "$ 21,480.00";

            // Pre-populate Seguros
            document.getElementById('regSegVehicular').value = "Propio";
            document.getElementById('regSegVehCosto').value = "S/ 1,200.00";
            document.getElementById('regSegDesgravamen').value = "SI";
            document.getElementById('regSegDesgProd').value = "Individual";
            document.getElementById('regSegDesgCosto').value = "$ 0.00";
            document.getElementById('regSegOptativo').value = "No";
            document.getElementById('regSegOptCosto').value = "NO";
            document.getElementById('regSegOptTipo').value = "";

            // Load Checklist state
            attachedDocs = solicitud.documentos ? [...solicitud.documentos] : [];
            document.getElementById('regComentarios').value = solicitud.comentarios || "";
            renderChecklistTable();
            actualizarChecklistPorCarretera(carreteraSolicitud);

            // Set checkboxes checks
            if (isReadOnly) {
                getRequiredManualChecks(carreteraSolicitud).forEach(item => {
                    const checkbox = document.getElementById(item.id);
                    if (checkbox) checkbox.checked = true;
                });
            } else {
                document.getElementById('chkManualDni').checked = !!solicitud.chkManualDni;
                const chkManualRecibo = document.getElementById('chkManualRecibo');
                const chkManualCotizacion = document.getElementById('chkManualCotizacion');
                if (chkManualRecibo) chkManualRecibo.checked = !!solicitud.chkManualRecibo;
                if (chkManualCotizacion) chkManualCotizacion.checked = !!solicitud.chkManualCotizacion;
            }

            // Navigate to Registro screen
            document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
            document.getElementById('moduloRegistroSolicitud').classList.add('active');

            // Deactivate active nav highlights
            navItems.forEach(n => n.classList.remove('active'));

            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(isReadOnly ? `Visualizando Registro de Solicitud (Solo Lectura) para ${solicitud.id}` : `Continuando Registro de Solicitud para ${solicitud.id}`, 'info');

        } else {
            // Fallback for other final stages
            openModal(solicitud);
        }
    }


    // ============================
    // BANDEJA DOCUMENTARIA
    // ============================
    function showBandejaDocumentaria(solicitud) {
        const docSolicitudId = document.getElementById('docSolicitudId');
        const docFechaSimulacion = document.getElementById('docFechaSimulacion');
        const docEtapa = document.getElementById('docEtapa');
        const docResumenNumero = document.getElementById('docResumenNumero');
        const docResumenCliente = document.getElementById('docResumenCliente');
        const docClienteNombre = document.getElementById('docClienteNombre');
        const docClienteNumero = document.getElementById('docClienteNumero');
        const docClienteTelefono = document.getElementById('docClienteTelefono');
        const numeroDocumento = (solicitud.documento || 'DNI - 71865987').split(' - ')[1] || '71865987';

        const isOperaciones = isOperacionesObservadoSolicitud(solicitud);

        if (documentariaPageTitle) documentariaPageTitle.textContent = isOperaciones ? 'Operaciones' : (isSolicitudEnFirma(solicitud) ? 'Firmas' : 'Bandeja documentaria');
        if (docSolicitudId) docSolicitudId.textContent = solicitud.id || 'EFE004';
        if (docFechaSimulacion) docFechaSimulacion.textContent = solicitud.fecha || '22-05-2026 15:30:00';
        if (docEtapa) docEtapa.textContent = solicitud.etapa || 'DOCUMENTARIA';
        if (docResumenNumero) docResumenNumero.textContent = numeroDocumento;
        if (docResumenCliente) docResumenCliente.textContent = solicitud.cliente || 'Pérez García Juan';
        if (docClienteNombre) docClienteNombre.value = solicitud.cliente || 'Juan Julio Ramirez Gonzales';
        if (docClienteNumero) docClienteNumero.value = numeroDocumento;
        if (docClienteTelefono) docClienteTelefono.value = solicitud.telefono || '928775998';

        currentDocumentariaSolicitud = solicitud;
        if (isOperaciones && typeof solicitud.operacionesRespuestaHabilitada !== 'boolean') {
            solicitud.operacionesRespuestaHabilitada = false;
        }
        if (isOperaciones && typeof solicitud.operacionesRespuestaEnviada !== 'boolean') {
            solicitud.operacionesRespuestaEnviada = false;
        }
        isChecklist2ReadOnly = isOperaciones ? !!solicitud.operacionesRespuestaEnviada : !!solicitud.documentariaEnviadaOperaciones;
        docChecklist2Docs = Array.isArray(solicitud.checklist2Docs) ? solicitud.checklist2Docs : [];
        if (!Array.isArray(solicitud.checklist2Docs)) solicitud.checklist2Docs = docChecklist2Docs;
        actualizarEstadoFirmaChecklist2(solicitud);
        updateDocumentariaTitleAndStage();
        saveSolicitudFirmaAutomaticaState(solicitud);
        docChecklist2ComentarioValue = String(solicitud.checklist2Comentario || '').slice(0, 250);
        if (docChecklist2Comentario) {
            docChecklist2Comentario.value = docChecklist2ComentarioValue;
            updateChecklist2ComentarioState();
        }

        downloadedPostAprobacionDocs.clear();
        if (Array.isArray(solicitud.downloadedPostAprobacionDocs)) {
            solicitud.downloadedPostAprobacionDocs.forEach(docName => downloadedPostAprobacionDocs.add(docName));
        }
        postAprobacionCollapsed = !!solicitud.postAprobacionCollapsed;
        postAprobacionCompletionPopupShown = !!solicitud.postAprobacionCompletionPopupShown;

        setDocumentariaTab('vehiculo');
        updateContratoGarantiaDownloadState();
        syncDocumentariaDownloadFlow();

        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        const docPage = document.getElementById('moduloBandejaDocumentaria');
        if (docPage) docPage.classList.add('active');

        navItems.forEach(n => n.classList.remove('active'));
        if (document.getElementById('navBandeja')) document.getElementById('navBandeja').classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setDocumentariaTab(tabName) {
        const panelMap = {
            vehiculo: 'docTabVehiculo',
            domiciliaria: 'docTabDomiciliaria',
            cliente: 'docTabCliente'
        };

        document.querySelectorAll('.documentaria-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.docTab === tabName);
        });

        document.querySelectorAll('.documentaria-tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === panelMap[tabName]);
        });
    }

    document.querySelectorAll('.documentaria-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            setDocumentariaTab(btn.dataset.docTab);
        });
    });

    let garantiaValidationAttempted = false;

    function getGarantiaRequiredFields() {
        return Array.from(document.querySelectorAll('[data-garantia-required="true"]'));
    }

    function isGarantiaFieldComplete(field) {
        return String(field.value || '').trim() !== '';
    }

    function isGarantiaCompleta() {
        const requiredFields = getGarantiaRequiredFields();
        return requiredFields.length > 0 && requiredFields.every(isGarantiaFieldComplete);
    }

    function clearGarantiaRequiredHighlight(field) {
        field.classList.remove('is-required-missing');
        field.removeAttribute('aria-invalid');
        const group = field.closest('.form-group');
        if (group) group.classList.remove('field-required-missing');
    }

    function markGarantiaFieldRequired(field) {
        field.classList.add('is-required-missing');
        field.setAttribute('aria-invalid', 'true');
        const group = field.closest('.form-group');
        if (group) group.classList.add('field-required-missing');
    }

    function updateGarantiaRequiredHighlights() {
        const missingFields = [];
        getGarantiaRequiredFields().forEach(field => {
            if (isGarantiaFieldComplete(field)) {
                clearGarantiaRequiredHighlight(field);
            } else {
                missingFields.push(field);
                if (garantiaValidationAttempted) markGarantiaFieldRequired(field);
            }
        });
        return missingFields;
    }

    function highlightMissingGarantiaFields() {
        garantiaValidationAttempted = true;
        const missingFields = updateGarantiaRequiredHighlights();
        if (!missingFields.length) return true;

        setDocumentariaTab('vehiculo');
        window.requestAnimationFrame(() => {
            const firstMissing = missingFields[0];
            firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstMissing.focus({ preventScroll: true });
        });
        return false;
    }

    function updateContratoGarantiaDownloadState() {
        const btnContratoGarantia = document.getElementById('btnDescargarContratoGarantia');
        if (!btnContratoGarantia) return;

        const habilitarDescarga = isGarantiaCompleta();
        btnContratoGarantia.disabled = !habilitarDescarga;
        btnContratoGarantia.classList.toggle('is-disabled', !habilitarDescarga);
        btnContratoGarantia.setAttribute('aria-disabled', String(!habilitarDescarga));
        btnContratoGarantia.title = habilitarDescarga
            ? 'Descargar Contrato de garantía'
            : 'Complete los datos del cuadro GARANTÍA para habilitar la descarga';

        const icon = btnContratoGarantia.querySelector('.material-icons-outlined');
        if (icon) icon.textContent = habilitarDescarga ? 'download' : 'lock';

        const docIcon = document.querySelector('[data-doc-icon="contrato-garantia"]');
        if (docIcon) {
            docIcon.classList.toggle('warning', !habilitarDescarga);
            docIcon.setAttribute('aria-label', habilitarDescarga ? 'Documento generado' : 'Documento pendiente');
        }
    }

    function getDownloadablePostAprobacionDocs() {
        return Array.from(document.querySelectorAll('.documentaria-documents .doc-download-btn'))
            .filter(btn => !btn.disabled)
            .map(btn => btn.dataset.docName)
            .filter(Boolean);
    }

    function descargarDocumentoPostAprobacion(docName) {
        if (!docName) return;
        console.log(`Descarga solicitada: ${docName}`);
    }

    getGarantiaRequiredFields().forEach(field => {
        const actualizarFlujoDocumentario = () => {
            updateGarantiaRequiredHighlights();
            updateContratoGarantiaDownloadState();
            syncDocumentariaDownloadFlow();
        };
        field.addEventListener('input', actualizarFlujoDocumentario);
        field.addEventListener('change', actualizarFlujoDocumentario);
    });

    document.querySelectorAll('.documentaria-documents .doc-download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            descargarDocumentoPostAprobacion(btn.dataset.docName);
            markPostAprobacionDocDownloaded(btn.dataset.docName);
        });
    });

    const btnDescargarTodosDocs = document.getElementById('btnDescargarTodosDocs');
    if (btnDescargarTodosDocs) {
        btnDescargarTodosDocs.addEventListener('click', () => {
            if (!isGarantiaCompleta()) {
                highlightMissingGarantiaFields();
                return;
            }

            updateContratoGarantiaDownloadState();
            const documentos = getDownloadablePostAprobacionDocs();
            console.log('Descarga solicitada de documentos Post Aprobación:', documentos);
            documentos.forEach(docName => downloadedPostAprobacionDocs.add(docName));
            syncDocumentariaDownloadFlow();
        });
    }

    if (btnVerMasPostDocs) {
        btnVerMasPostDocs.addEventListener('click', () => {
            postAprobacionCollapsed = !postAprobacionCollapsed;
            updatePostAprobacionCollapseState();
        });
    }

    updateContratoGarantiaDownloadState();
    syncDocumentariaDownloadFlow();

    const btnVolverBandejaDocumentaria = document.getElementById('btnVolverBandejaDocumentaria');
    if (btnVolverBandejaDocumentaria) {
        btnVolverBandejaDocumentaria.addEventListener('click', () => {
            volverABandejaEntradaDesdeDocumentaria();
        });
    }

    // ============================
    // MODAL
    // ============================
    function openModal(solicitud) {
        modalTitle.textContent = `Detalle - ${solicitud.id}`;
        modalBody.innerHTML = `
            <div style="display: grid; gap: 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">N° Solicitud</p>
                        <p style="font-weight: 600; color: var(--primary-blue);">${solicitud.id}</p>
                    </div>
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Estado</p>
                        <span class="status-badge ${getEstadoClass(solicitud.estado)}">${getEstadoLabel(solicitud.estado)}</span>
                    </div>
                </div>
                <div style="height: 1px; background: var(--border-color);"></div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Cliente</p>
                        <p style="font-weight: 600;">${solicitud.cliente}</p>
                    </div>
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Documento</p>
                        <p style="font-weight: 500;">${solicitud.documento}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Tipo de crédito</p>
                        <p style="font-weight: 500;">${solicitud.tipoCredito}</p>
                    </div>
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Monto</p>
                        <p style="font-weight: 700; color: var(--primary-blue); font-size: 1.1rem;">${solicitud.monto}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Teléfono</p>
                        <p style="font-weight: 500;">${solicitud.telefono}</p>
                    </div>
                    <div>
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Concesionario</p>
                        <p style="font-weight: 500;">${solicitud.concesionario}</p>
                    </div>
                </div>
                <div>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Fecha de registro</p>
                    <p style="font-weight: 500;">${solicitud.fecha}</p>
                </div>
            </div>
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const cancelBtn = document.getElementById('modalBtnCancel');
        const actionBtn = document.getElementById('modalBtnAction');
        if (cancelBtn) {
            cancelBtn.style.display = 'inline-flex';
            cancelBtn.textContent = 'Cerrar';
        }
        if (actionBtn) {
            const cleanActionBtn = actionBtn.cloneNode(true);
            cleanActionBtn.style.display = 'inline-flex';
            cleanActionBtn.textContent = 'Aceptar';
            actionBtn.parentNode.replaceChild(cleanActionBtn, actionBtn);
        }
    }

    modalClose.addEventListener('click', closeModal);
    modalBtnCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ============================
    // TOAST NOTIFICATIONS
    // ============================
    function showToast(message, type = 'info') {
        // Notificaciones laterales deshabilitadas por requerimiento.
        if (toastContainer) toastContainer.innerHTML = '';
    }

    // ============================
    // CONFIG BUTTON (placeholder)
    // ============================
    document.getElementById('btnConfiguracion').addEventListener('click', () => {
        showToast('Módulo de configuración - Próximamente disponible.', 'info');
    });

    // ============================
    // DISCLAIMER LINK
    // ============================
    document.getElementById('disclaimerLink').addEventListener('click', () => {
        modalTitle.textContent = 'Aviso de privacidad';
        modalBody.innerHTML = `
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.9rem;">
                El cliente acepta que sus datos personales ingresados en este formulario serán utilizados
                exclusivamente para la <strong>simulación y evaluación preliminar de crédito vehicular</strong>
                por parte de Financiera Efectiva S.A., de conformidad con la Ley N° 29733, Ley de Protección
                de Datos Personales y su Reglamento.
            </p>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.9rem; margin-top: 12px;">
                Los datos proporcionados no serán compartidos con terceros sin el consentimiento
                previo del titular, salvo las excepciones previstas por ley.
            </p>
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    resetIngresosSection();

    // ============================
    // INITIAL RENDER
    // ============================
    // Bandeja table will render when module is activated
});
