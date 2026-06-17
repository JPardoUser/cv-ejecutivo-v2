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
            telefono: '945612378'
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

        // If cónyuge is active, also validate cónyuge doc
        if (isValid && toggleConyuge.checked) {
            const conyugeDoc = document.getElementById('nroDocConyuge').value.trim();
            if (conyugeDoc.length < 5) {
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
    document.getElementById('nroDocConyuge').addEventListener('input', validateSimulacionForm);
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

    document.querySelectorAll('.flujo-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showFlujoTab(btn.dataset.target === 'tabCalculo' ? 'calculo' : 'resultado');
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
        document.getElementById('resTipoDoc').value = tipoDoc;
        document.getElementById('resNroDoc').value = nroDoc;
        document.getElementById('resMontoPreaprobado').textContent = `S/ ${mockData.montoPreaprobado}`;
        document.getElementById('resCalificacion').textContent = mockData.califica ? 'CALIFICA' : 'NO CALIFICA';
        document.getElementById('resCalificacionMsg').textContent = mockData.califica
            ? 'El cliente cumple con los criterios de evaluación.'
            : 'El cliente no cumple con los criterios de evaluación.';
        document.getElementById('resSegmentoRiesgo').textContent = mockData.segmentoRiesgo;
        document.getElementById('resIngresoEstimado').textContent = `S/ ${mockData.ingresoEstimado}`;
        document.getElementById('resCuotaMaxima').textContent = `S/ ${mockData.cuotaMaxima}`;
        const calcCuotaMaxima = document.getElementById('calcCuotaMaxima');
        if (calcCuotaMaxima) calcCuotaMaxima.value = `S/ ${mockData.cuotaMaxima}`;
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
    }

    function generateMockEvaluacion(nroDoc) {
        // Use document number to seed pseudo-random consistent results
        const seed = nroDoc.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

        const montos = ['150,000.00', '200,000.00', '250,000.00', '300,000.00', '350,000.00', '85,000.00', '120,000.00'];
        const segmentos = ['NORMAL', 'REGULAR', 'PREFERENTE', 'BAJO'];
        const ingresos = ['3,500.00', '4,200.00', '5,850.00', '7,200.00', '8,500.00', '6,100.00'];
        const cuotas = ['1,520.00', '1,890.00', '2,540.00', '3,100.00', '3,680.00', '2,200.00'];
        const ingresosDeclarados = ['4,000.00', '5,000.00', '6,000.00', '7,500.00', '8,000.00', '10,000.00'];

        return {
            montoPreaprobado: montos[seed % montos.length],
            califica: seed % 5 !== 0, // ~80% califica
            segmentoRiesgo: segmentos[seed % segmentos.length],
            ingresoEstimado: ingresos[seed % ingresos.length],
            cuotaMaxima: cuotas[seed % cuotas.length],
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

    // Continuar desde Resultado — muestra la pestaña Cálculo dentro de la misma sección
    document.getElementById('btnContinuarSolicitud').addEventListener('click', () => {
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloResultado').classList.add('active');
        showFlujoTab('calculo');
        const calcCuotaMaxima = document.getElementById('calcCuotaMaxima');
        const resCuotaMaxima = document.getElementById('resCuotaMaxima');
        if (calcCuotaMaxima && resCuotaMaxima) calcCuotaMaxima.value = resCuotaMaxima.textContent;
        document.getElementById('calcResultadoCard').style.display = 'none';
        document.getElementById('btnContinuarDesdeCalculo').disabled = true;
        document.querySelectorAll('#calcCuotasBody tr').forEach(r => r.classList.remove('selected'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function continuarARegistroSolicitud() {
        const idSolicitud = document.getElementById('resSolicitudId').textContent;
        const tipoDoc = document.getElementById('resTipoDoc').value;
        const nroDoc = document.getElementById('resNroDoc').value;

        // Update stage to SOLICITUD and status to CONSTRUCCIÓN in solicitudes
        const currentSol = solicitudes.find(s => s.id === idSolicitud);
        if (currentSol) {
            currentSol.etapa = 'SOLICITUD';
            currentSol.estado = 'CONSTRUCCIÓN';
        }

        // Set top header info bar
        document.getElementById('regSolicitudId').textContent = idSolicitud;
        document.getElementById('regCartera').textContent = "EXPRESS";
        document.getElementById('regUsuario').textContent = "ALOCHA";

        // Set pre-populated fields for Datos Cliente
        document.getElementById('regTipoDoc').value = tipoDoc;
        document.getElementById('regNroDoc').value = nroDoc;
        document.getElementById('regNombres').value = "Juan";
        document.getElementById('regApePaterno').value = "Pérez";
        document.getElementById('regApeMaterno').value = "García";
        document.getElementById('regFechaNac').value = "11/05/1995";
        document.getElementById('regCelular').value = nroTelefono.value || "";
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
        document.getElementById('chkManualDni').checked = false;
        document.getElementById('chkManualExcel').checked = false;
        document.getElementById('regComentarios').value = "";

        // Navigate to Registro screen
        document.querySelectorAll('.module-page').forEach(p => p.classList.remove('active'));
        document.getElementById('moduloRegistroSolicitud').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    function mostrarPopupPoliticasDatosPersonales() {
        const telefono = nroTelefono.value.trim() || 'no registrado';
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

    function calcularCapacidadPago() {
        const ingreso = parseMoneyValue(document.getElementById('calcIngresoDeclarado').value);
        const capacidad = ingreso * 0.35;
        showToast(`Capacidad de pago calculada: ${formatMoneyValue(capacidad)}`, 'success');
        return capacidad;
    }

    document.getElementById('btnCalcularCuotas').addEventListener('click', () => {
        const tea = parseMoneyValue(document.getElementById('calcTea').value) / 100;
        const precioUsd = parseMoneyValue(document.getElementById('calcPrecioUsd').value);
        const inicial = parseMoneyValue(document.getElementById('calcCuotaInicial').value);
        const tipoCambio = parseMoneyValue(document.getElementById('calcTipoCambio').value) || 1;
        const monedaCredito = document.getElementById('calcMonedaCredito').value;
        const currency = monedaCredito === 'USD' ? '$' : 'S/';
        const montoFinanciarUsd = Math.max(precioUsd - inicial, 0);
        const montoFinanciar = monedaCredito === 'USD' ? montoFinanciarUsd : montoFinanciarUsd * tipoCambio;
        const capacidad = calcularCapacidadPago();
        const tasaMensual = Math.pow(1 + tea, 1 / 12) - 1;
        const plazos = [12, 24, 36, 48, 60];
        const tbody = document.getElementById('calcCuotasBody');
        tbody.innerHTML = '';

        plazos.forEach(plazo => {
            const cuota = tasaMensual > 0
                ? montoFinanciar * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1)
                : montoFinanciar / plazo;
            const cumple = cuota <= capacidad;
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
                document.getElementById('btnContinuarDesdeCalculo').disabled = false;
            });
            tbody.appendChild(tr);
        });

        document.getElementById('calcCarretera').textContent = 'EXPRESS';
        document.getElementById('calcDocumentos').textContent = 'Copia de DNI';
        document.getElementById('calcVerificacion').textContent = 'No aplicable';
        document.getElementById('calcResultadoCard').style.display = 'block';
        document.getElementById('btnContinuarDesdeCalculo').disabled = true;
        showToast('Grilla de cuotas generada. Selecciona un plazo para continuar.', 'success');
    });

    // ========================================
    // REGISTRO DE SOLICITUD - Handlers & Logic
    // ========================================

    // Regresar de Registro a Resultado
    document.getElementById('btnRegresarRegistro').addEventListener('click', () => {
        saveCurrentRegistrationState();
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

    // Modal save document name handler
    btnSaveDocName.addEventListener('click', () => {
        const docNameValue = inputDocName.value.trim();
        if (!docNameValue) {
            showToast('Debe escribir un nombre descriptivo para el documento.', 'warning');
            return;
        }

        // Ensure .pdf extension
        const finalName = docNameValue.toLowerCase().endsWith('.pdf') ? docNameValue : docNameValue + '.pdf';

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
        renderChecklistTable();
    });

    // Modal cancel document name handler
    btnCancelDocName.addEventListener('click', () => {
        modalDocNameOverlay.classList.remove('active');
        inputHiddenFile.value = '';
        pendingFileObject = null;
        editingDocId = null;
    });

    // Mock "Pasar a Riesgos" -> WhatsApp OTP Validation Modal
    document.getElementById('btnPasarRiesgos').addEventListener('click', () => {
        const celular = document.getElementById('regCelular').value.trim();
        const tipoDoc = document.getElementById('regTipoDoc').value;
        const nroDoc = document.getElementById('regNroDoc').value;
        const manualDniChecked = document.getElementById('chkManualDni').checked;
        const manualExcelChecked = document.getElementById('chkManualExcel').checked;
        const hasAttachedFile = attachedDocs.length > 0;

        // Validation: Only validate that there is at least one file attached and checkboxes are checked
        if (!manualDniChecked || !manualExcelChecked) {
            showToast('Debe marcar las casillas manuales de "Documentos a adjuntar (marcar manual)" (DNI y Excel).', 'warning');
            return;
        }
        if (!hasAttachedFile) {
            showToast('Debe adjuntar al menos un documento para poder continuar.', 'warning');
            return;
        }

        const celularText = celular || '922159933';

        // Show OTP validation modal
        modalTitle.textContent = 'Verificación de Identidad (OTP)';
        modalBody.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; padding: 10px 0;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #e8f5e9; display: flex; align-items: center; justify-content: center;">
                    <span class="material-icons-outlined" style="font-size: 36px; color: #25d366;">whatsapp</span>
                </div>
                <div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 6px;">Código OTP enviado</h4>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                        Hemos enviado un código de seguridad de 6 dígitos al número de celular <strong>+51 ${celularText}</strong> a través de WhatsApp.
                    </p>
                </div>
                <div style="margin: 12px 0; width: 100%; max-width: 280px;">
                    <input type="text" id="inputOtpCode" maxlength="6" placeholder="0 0 0 0 0 0" 
                        style="width: 100%; height: 50px; text-align: center; font-size: 1.6rem; letter-spacing: 12px; font-family: monospace; font-weight: 700; border: 2px solid var(--primary-blue); border-radius: 8px; color: var(--primary-blue);">
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">
                        ¿No recibiste el código? <a href="#" style="color: var(--accent-blue); font-weight: 600;" id="btnReenviarOtp">Reenviar código</a>
                    </p>
                </div>
            </div>
        `;

        // Configure modal footer buttons
        const btnCancel = document.getElementById('modalBtnCancel');
        const btnAction = document.getElementById('modalBtnAction');

        btnCancel.textContent = 'Cancelar';
        btnAction.textContent = 'Confirmar y Enviar';
        btnAction.disabled = true; // Disabled initially
        btnAction.style.display = 'inline-flex'; // Restore button visibility

        // Reenviar OTP handler
        document.getElementById('btnReenviarOtp').addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Código de seguridad reenviado por WhatsApp.', 'success');
        });

        // Enable action button when 6 digits are typed
        const inputOtpCode = document.getElementById('inputOtpCode');
        inputOtpCode.focus();
        const handleOtpInput = (e) => {
            e.target.value = e.target.value.replace(/\D/g, ''); // numbers only
            if (e.target.value.length === 6) {
                btnAction.disabled = false;
            } else {
                btnAction.disabled = true;
            }
        };
        inputOtpCode.addEventListener('input', handleOtpInput);

        // Action button click handler -> Finalize request
        const handleConfirmOtp = () => {
            if (inputOtpCode.value.length !== 6) return;

            // Remove listener so it doesn't fire multiple times
            btnAction.removeEventListener('click', handleConfirmOtp);
            inputOtpCode.removeEventListener('input', handleOtpInput);

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

            // Close modal
            closeModal();

            // Navigate to Bandeja
            document.querySelectorAll('.module-page').forEach(page => page.classList.remove('active'));
            document.getElementById('moduloBandeja').classList.add('active');
            
            navItems.forEach(n => n.classList.remove('active'));
            document.getElementById('navBandeja').classList.add('active');
            
            // Re-render table with new item
            applyBandejaFilters();

            showToast('Solicitud registrada con éxito. Enviada a evaluación de riesgos.', 'success');
        };

        btnAction.addEventListener('click', handleConfirmOtp);

        // Open modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Recalcular capacidad button moved to Cálculo screen

    // Limpiar button
    btnLimpiar.addEventListener('click', () => {
        nroDocumento.value = '';
        nroTelefono.value = '';
        tipoDocumento.value = 'DNI';
        toggleConyuge.checked = false;
        conyugeData.style.display = 'none';
        labelNo.classList.add('active-label');
        labelSi.classList.remove('active-label');
        document.getElementById('tipoDocConyuge').value = 'DNI';
        document.getElementById('nroDocConyuge').value = '';
        btnSimular.disabled = true;
        btnSimular.classList.remove('enabled');
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
        return estado.toUpperCase();
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
                <td><span class="status-badge ${sol.estado.toLowerCase()}">${getEstadoLabel(sol.estado)}</span></td>
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
                currentSol.chkManualDni = document.getElementById('chkManualDni').checked;
                currentSol.chkManualExcel = document.getElementById('chkManualExcel').checked;
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
        const chkManualDni = document.getElementById('chkManualDni');
        const chkManualExcel = document.getElementById('chkManualExcel');
        if (chkManualDni && chkManualExcel) {
            chkManualDni.disabled = readOnly;
            chkManualExcel.disabled = readOnly;
            if (readOnly) {
                chkManualDni.checked = true;
                chkManualExcel.checked = true;
            }
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
            document.getElementById('resTipoDoc').value = tipoDoc;
            document.getElementById('resNroDoc').value = nroDoc;
            document.getElementById('resMontoPreaprobado').textContent = `S/ ${mockData.montoPreaprobado}`;
            document.getElementById('resCalificacion').textContent = mockData.califica ? 'CALIFICA' : 'NO CALIFICA';
            document.getElementById('resCalificacionMsg').textContent = mockData.califica
                ? 'El cliente cumple con los criterios de evaluación.'
                : 'El cliente no cumple con los criterios de evaluación.';
            document.getElementById('resSegmentoRiesgo').textContent = mockData.segmentoRiesgo;
            document.getElementById('resIngresoEstimado').textContent = `S/ ${mockData.ingresoEstimado}`;
            document.getElementById('resCuotaMaxima').textContent = `S/ ${mockData.cuotaMaxima}`;
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

        } else if (solicitud.etapa === 'SOLICITUD' || solicitud.etapa === 'RIESGOS') {
            const isReadOnly = (solicitud.etapa === 'RIESGOS');

            // Set read-only state for registration page elements
            applyRegistrationFormReadOnlyState(isReadOnly);

            // Populate and show Registro de solicitud view
            const parts = (solicitud.documento || '').split(' - ');
            const tipoDoc = parts[0] || 'DNI';
            const nroDoc = parts[1] || '';

            // Set top header info bar
            document.getElementById('regSolicitudId').textContent = solicitud.id;
            document.getElementById('regCartera').textContent = "EXPRESS";
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

            // Set checkboxes checks
            if (isReadOnly) {
                document.getElementById('chkManualDni').checked = true;
                document.getElementById('chkManualExcel').checked = true;
            } else {
                document.getElementById('chkManualDni').checked = !!solicitud.chkManualDni;
                document.getElementById('chkManualExcel').checked = !!solicitud.chkManualExcel;
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
                        <span class="status-badge ${solicitud.estado}">${getEstadoLabel(solicitud.estado)}</span>
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
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';
        if (actionBtn) {
            actionBtn.style.display = 'inline-flex';
            actionBtn.textContent = 'Aceptar';
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
        const iconMap = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon"><span class="material-icons-outlined">${iconMap[type] || 'info'}</span></span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">
                <span class="material-icons-outlined" style="font-size: 18px;">close</span>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        });

        // Auto-remove after 4s
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'toastOut 0.3s ease forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
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
