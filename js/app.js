// 1. CATÁLOGO DE PSICÓLOGOS
    const PSYCHOLOGISTS = [
      {
        id: 'psi-1',
        name: 'Dra. Elena Ríos',
        specialty: 'Ansiedad, Estrés y Burnout',
        experience: '9 años exp.',
        availability: 'Lun - Vie',
        avatarColor: 'from-teal-500 to-emerald-600',
        initials: 'ER',
        rating: '4.9'
      },
      {
        id: 'psi-2',
        name: 'Dr. Mateo Vargas',
        specialty: 'Depresión y Autoestima',
        experience: '11 años exp.',
        availability: 'Mar - Sáb',
        avatarColor: 'from-indigo-500 to-blue-600',
        initials: 'MV',
        rating: '4.9'
      },
      {
        id: 'psi-3',
        name: 'Dra. Sofía Mendoza',
        specialty: 'Terapia de Pareja y Familia',
        experience: '8 años exp.',
        availability: 'Lun - Sáb',
        avatarColor: 'from-purple-500 to-pink-600',
        initials: 'SM',
        rating: '4.8'
      },
      {
        id: 'psi-4',
        name: 'Dr. Lucas Paredes',
        specialty: 'Duelo, Trauma e Insomnio',
        experience: '12 años exp.',
        availability: 'Mié - Dom',
        avatarColor: 'from-cyan-500 to-sky-600',
        initials: 'LP',
        rating: '5.0'
      }
    ];

    // 2. MOTIVOS DE CONSULTA ("¿De qué está mal?")
    const CONSULTATION_REASONS = [
      { label: 'Ansiedad y Nerviosismo', icon: 'fa-wind', badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
      { label: 'Estrés Laboral / Académico', icon: 'fa-briefcase', badgeClass: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
      { label: 'Depresión / Tristeza profunda', icon: 'fa-cloud-rain', badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
      { label: 'Problemas de Pareja / Familia', icon: 'fa-heart-crack', badgeClass: 'bg-pink-500/15 text-pink-300 border-pink-500/30' },
      { label: 'Baja Autoestima', icon: 'fa-seedling', badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-500/30' },
      { label: 'Duelo o Pérdida', icon: 'fa-dove', badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
      { label: 'Insomnio / Agotamiento', icon: 'fa-moon', badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
      { label: 'Otro motivo emocional', icon: 'fa-comment-dots', badgeClass: 'bg-slate-500/15 text-slate-300 border-slate-500/30' }
    ];

    // 3. DATOS INICIALES PRECARGADOS (para que el administrador vea pacientes desde el primer ingreso)
    const INITIAL_APPOINTMENTS = [
      {
        id: 'CITA-1001',
        patientName: 'Valeria Gómez',
        patientEmail: 'valeria.gomez@correo.com',
        patientPhone: '+51 984 112 233',
        psychologistId: 'psi-1',
        psychologistName: 'Dra. Elena Ríos',
        psychologistSpecialty: 'Ansiedad, Estrés y Burnout',
        reason: 'Ansiedad y Nerviosismo',
        description: 'Siento palpitaciones y mucha preocupación constante antes de dormir desde hace tres semanas.',
        date: getFutureDate(1),
        time: '10:30 AM',
        modality: 'Virtual (Videollamada)',
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      },
      {
        id: 'CITA-1002',
        patientName: 'Carlos Mendoza',
        patientEmail: 'cmendoza@correo.com',
        patientPhone: '+51 977 445 889',
        psychologistId: 'psi-2',
        psychologistName: 'Dr. Mateo Vargas',
        psychologistSpecialty: 'Depresión y Autoestima',
        reason: 'Depresión / Tristeza profunda',
        description: 'He perdido motivación para realizar mis actividades diarias y me siento sin energía.',
        date: getFutureDate(2),
        time: '04:30 PM',
        modality: 'Presencial (Consultorio)',
        status: 'Confirmada',
        createdAt: new Date().toISOString()
      },
      {
        id: 'CITA-1003',
        patientName: 'Lucía Torres',
        patientEmail: 'lucia.torres@correo.com',
        patientPhone: '+51 966 332 110',
        psychologistId: 'psi-3',
        psychologistName: 'Dra. Sofía Mendoza',
        psychologistSpecialty: 'Terapia de Pareja y Familia',
        reason: 'Problemas de Pareja / Familia',
        description: 'Dificultades de comunicación en la convivencia y discusiones frecuentes en casa.',
        date: getFutureDate(3),
        time: '06:00 PM',
        modality: 'Virtual (Videollamada)',
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      }
    ];

    // Claves de almacenamiento local
    const STORAGE_KEY_APPOINTMENTS = 'psicocare_appointments_v1';
    const STORAGE_KEY_SESSION = 'psicocare_session_v1';

    // Utilidad para fechas futuras
    function getFutureDate(daysAhead) {
      const d = new Date();
      d.setDate(d.getDate() + daysAhead);
      return d.toISOString().split('T')[0];
    }

    // ==================== GESTIÓN DE ESTADO Y LOCALSTORAGE ====================
    function getAppointments() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
        if (!stored) {
          localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
          return [...INITIAL_APPOINTMENTS];
        }
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error leyendo citas:', e);
        return [...INITIAL_APPOINTMENTS];
      }
    }

    function saveAppointments(appointments) {
      try {
        localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
      } catch (e) {
        console.error('Error guardando citas:', e);
      }
    }

    function getSession() {
      try {
        const s = localStorage.getItem(STORAGE_KEY_SESSION);
        return s ? JSON.parse(s) : null;
      } catch (e) {
        return null;
      }
    }

    function saveSession(sessionObj) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionObj));
    }

    function clearSession() {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }

    // ==================== NOTIFICACIONES (TOAST) ====================
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      
      const styles = {
        success: {
          bg: 'bg-slate-900 border-teal-500/40 text-teal-100',
          icon: 'fa-circle-check text-teal-400'
        },
        error: {
          bg: 'bg-slate-900 border-rose-500/40 text-rose-100',
          icon: 'fa-circle-exclamation text-rose-400'
        },
        info: {
          bg: 'bg-slate-900 border-indigo-500/40 text-indigo-100',
          icon: 'fa-circle-info text-indigo-400'
        }
      };

      const current = styles[type] || styles.info;

      toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md animate-fade-in ${current.bg}`;
      toast.innerHTML = `
        <i class="fa-solid ${current.icon} text-lg shrink-0"></i>
        <p class="text-xs sm:text-sm font-medium leading-snug flex-grow">${message}</p>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white ml-1 cursor-pointer">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(8px)';
          toast.style.transition = 'all 0.3s ease';
          setTimeout(() => toast.remove(), 300);
        }
      }, 4200);
    }

    // ==================== MODAL DE CONFIRMACIÓN PERSONALIZADO ====================
    function openConfirmModal({ title, message, confirmText = 'Confirmar', isDanger = true, onConfirm }) {
      const modal = document.getElementById('confirm-modal');
      const titleEl = document.getElementById('modal-title');
      const msgEl = document.getElementById('modal-message');
      const confirmBtn = document.getElementById('modal-confirm-btn');
      const cancelBtn = document.getElementById('modal-cancel-btn');
      const iconBg = document.getElementById('modal-icon-bg');

      titleEl.textContent = title;
      msgEl.textContent = message;
      confirmBtn.textContent = confirmText;

      if (isDanger) {
        iconBg.className = 'w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0';
        confirmBtn.className = 'px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 transition shadow-lg shadow-rose-950/40 cursor-pointer';
      } else {
        iconBg.className = 'w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0';
        confirmBtn.className = 'px-4 py-2.5 rounded-xl text-sm font-medium text-slate-950 bg-teal-500 hover:bg-teal-400 transition shadow-lg shadow-teal-950/40 cursor-pointer';
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');

      const cleanup = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };

      cancelBtn.onclick = cleanup;
      confirmBtn.onclick = () => {
        cleanup();
        if (typeof onConfirm === 'function') onConfirm();
      };
    }

    // ==================== AUTENTICACIÓN Y NAVEGACIÓN ====================
    function switchLoginRole(role) {
      const tabPatient = document.getElementById('tab-patient');
      const tabAdmin = document.getElementById('tab-admin');
      const formPatient = document.getElementById('form-login-patient');
      const formAdmin = document.getElementById('form-login-admin');

      if (role === 'patient') {
        tabPatient.className = 'flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all bg-teal-600 text-white shadow-lg shadow-teal-950/50 cursor-pointer';
        tabAdmin.className = 'flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-200 transition-all cursor-pointer';
        formPatient.classList.remove('hidden');
        formAdmin.classList.add('hidden');
      } else {
        tabAdmin.className = 'flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-950/50 cursor-pointer';
        tabPatient.className = 'flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-200 transition-all cursor-pointer';
        formAdmin.classList.remove('hidden');
        formPatient.classList.add('hidden');
      }
    }

    function fillDemoPatient() {
      document.getElementById('patient-name-input').value = 'Valeria Gómez';
      document.getElementById('patient-email-input').value = 'valeria.gomez@correo.com';
      document.getElementById('patient-phone-input').value = '+51 984 112 233';
      showToast('Datos de paciente demo cargados. Haz clic en Continuar.', 'info');
    }

    function fillDemoAdmin() {
      document.getElementById('admin-user-input').value = 'admin';
      document.getElementById('admin-pass-input').value = 'admin1234';
      showToast('Credenciales de administrador completadas.', 'info');
    }

    function toggleAdminPassword() {
      const input = document.getElementById('admin-pass-input');
      const icon = document.getElementById('admin-eye-icon');
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
      }
    }

    function handlePatientLogin(event) {
      event.preventDefault();
      const name = document.getElementById('patient-name-input').value.trim();
      const email = document.getElementById('patient-email-input').value.trim().toLowerCase();
      const phone = document.getElementById('patient-phone-input').value.trim() || 'No especificado';

      if (!name || !email) {
        showToast('Por favor completa tu nombre y correo.', 'error');
        return;
      }

      const session = { role: 'patient', name, email, phone };
      saveSession(session);
      renderApp();
      showToast(`¡Bienvenida/o, ${name}! Ya puedes agendar tu cita.`, 'success');
    }

    function handleAdminLogin(event) {
      event.preventDefault();
      const user = document.getElementById('admin-user-input').value.trim();
      const pass = document.getElementById('admin-pass-input').value.trim();

      if (user === 'admin' && pass === 'admin1234') {
        const session = { role: 'admin', name: 'Administrador General', email: 'admin@psicocare.com' };
        saveSession(session);
        renderApp();
        showToast('Sesión iniciada como Administrador.', 'success');
      } else {
        showToast('Usuario o contraseña incorrectos. Usa admin / admin1234', 'error');
      }
    }

    function logout() {
      clearSession();
      renderApp();
      showToast('Has cerrado sesión correctamente.', 'info');
    }

    // ==================== RENDERIZADO GENERAL DE LA APP ====================
    function renderApp() {
      const session = getSession();
      const viewLogin = document.getElementById('view-login');
      const viewPatient = document.getElementById('view-patient');
      const viewAdmin = document.getElementById('view-admin');
      const navbarSession = document.getElementById('navbar-session');

      // Ocultar todas las vistas primero
      viewLogin.classList.add('hidden');
      viewPatient.classList.add('hidden');
      viewAdmin.classList.add('hidden');

      if (!session) {
        navbarSession.classList.add('hidden');
        navbarSession.classList.remove('flex');
        viewLogin.classList.remove('hidden');
        return;
      }

      // Mostrar barra superior de sesión
      navbarSession.classList.remove('hidden');
      navbarSession.classList.add('flex');
      document.getElementById('nav-user-name').textContent = session.name;

      const roleBadge = document.getElementById('nav-role-badge');
      const roleText = document.getElementById('nav-user-role');

      if (session.role === 'patient') {
        roleBadge.className = 'w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse';
        roleText.textContent = '(Paciente)';
        viewPatient.classList.remove('hidden');
        initPatientPortal(session);
      } else if (session.role === 'admin') {
        roleBadge.className = 'w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse';
        roleText.textContent = '(Administrador)';
        viewAdmin.classList.remove('hidden');
        initAdminPortal();
      }
    }

    // ==================== PORTAL DEL PACIENTE ====================
    function initPatientPortal(session) {
      document.getElementById('patient-welcome-name').textContent = session.name;

      // Configurar fecha mínima (hoy)
      const dateInput = document.getElementById('appointment-date');
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) {
        dateInput.value = getFutureDate(1);
      }

      renderPsychologistCards();
      renderReasonChips();
      renderPatientAppointments(session.email);
    }

    function renderPsychologistCards() {
      const grid = document.getElementById('psychologists-grid');
      const selectedId = document.getElementById('selected-psychologist-id').value;

      grid.innerHTML = PSYCHOLOGISTS.map(psi => {
        const isSelected = selectedId === psi.id;
        return `
          <div onclick="selectPsychologist('${psi.id}')"
            class="cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
              isSelected
                ? 'bg-teal-500/10 border-teal-500 shadow-lg shadow-teal-950/40'
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
            }">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${psi.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
              ${psi.initials}
            </div>
            <div class="flex-grow min-w-0">
              <div class="flex items-center justify-between gap-1">
                <h3 class="text-sm font-bold text-white truncate">${psi.name}</h3>
                <span class="text-[11px] font-semibold text-amber-400 flex items-center gap-1 shrink-0">
                  <i class="fa-solid fa-star text-[10px]"></i> ${psi.rating}
                </span>
              </div>
              <p class="text-xs text-teal-300 font-medium mt-0.5 truncate">${psi.specialty}</p>
              <div class="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                <span><i class="fa-regular fa-clock mr-1"></i>${psi.availability}</span>
                <span>&bull;</span>
                <span>${psi.experience}</span>
              </div>
            </div>
            <div class="shrink-0 mt-1">
              <div class="w-5 h-5 rounded-full border flex items-center justify-center ${
                isSelected ? 'border-teal-400 bg-teal-500 text-slate-950' : 'border-slate-700'
              }">
                ${isSelected ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    function selectPsychologist(psiId) {
      document.getElementById('selected-psychologist-id').value = psiId;
      renderPsychologistCards();
    }

    function renderReasonChips() {
      const container = document.getElementById('reasons-grid');
      const selectedReason = document.getElementById('selected-reason').value;

      container.innerHTML = CONSULTATION_REASONS.map(item => {
        const isSelected = selectedReason === item.label;
        return `
          <button type="button" onclick="selectReason('${item.label}')"
            class="px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold shadow-md shadow-teal-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }">
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.label}</span>
          </button>
        `;
      }).join('');
    }

    function selectReason(reasonLabel) {
      document.getElementById('selected-reason').value = reasonLabel;
      renderReasonChips();
    }

    function handleCreateAppointment(event) {
      event.preventDefault();
      const session = getSession();
      if (!session || session.role !== 'patient') return;

      const psiId = document.getElementById('selected-psychologist-id').value;
      const reason = document.getElementById('selected-reason').value;
      const description = document.getElementById('reason-description').value.trim();
      const date = document.getElementById('appointment-date').value;
      const time = document.getElementById('appointment-time').value;
      const modalityEl = document.querySelector('input[name="modality"]:checked');
      const modality = modalityEl ? modalityEl.value : 'Virtual (Videollamada)';

      if (!psiId) {
        showToast('Por favor selecciona un/a psicólogo/a de la lista.', 'error');
        return;
      }
      if (!reason) {
        showToast('Por favor selecciona de qué te sientes mal o el motivo.', 'error');
        return;
      }
      if (!date || !time) {
        showToast('Selecciona la fecha y el horario de tu cita.', 'error');
        return;
      }

      const psychologist = PSYCHOLOGISTS.find(p => p.id === psiId);
      const appointments = getAppointments();

      const newAppointment = {
        id: 'CITA-' + Math.floor(1000 + Math.random() * 9000),
        patientName: session.name,
        patientEmail: session.email,
        patientPhone: session.phone || 'No especificado',
        psychologistId: psychologist.id,
        psychologistName: psychologist.name,
        psychologistSpecialty: psychologist.specialty,
        reason,
        description,
        date,
        time,
        modality,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      };

      appointments.unshift(newAppointment);
      saveAppointments(appointments);

      // Limpiar formulario
      document.getElementById('selected-psychologist-id').value = '';
      document.getElementById('selected-reason').value = '';
      document.getElementById('reason-description').value = '';
      document.getElementById('appointment-time').value = '';
      renderPsychologistCards();
      renderReasonChips();

      // Actualizar listado de citas del paciente
      renderPatientAppointments(session.email);
      showToast(`¡Cita agendada con ${psychologist.name} para el ${formatDateSpanish(date)}!`, 'success');
    }

    function renderPatientAppointments(patientEmail) {
      const container = document.getElementById('patient-appointments-list');
      const allAppointments = getAppointments();
      const myAppointments = allAppointments.filter(a => a.patientEmail.toLowerCase() === patientEmail.toLowerCase());

      document.getElementById('patient-total-count').textContent = `${myAppointments.length} ${myAppointments.length === 1 ? 'cita' : 'citas'}`;

      if (myAppointments.length === 0) {
        container.innerHTML = `
          <div class="text-center py-10 px-4 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800">
            <div class="w-12 h-12 rounded-2xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <i class="fa-regular fa-calendar text-xl"></i>
            </div>
            <p class="text-sm font-medium text-slate-300">Aún no tienes citas agendadas</p>
            <p class="text-xs text-slate-500 mt-1">Elige un especialista a la izquierda para reservar tu primera sesión.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = myAppointments.map(app => {
        const statusBadge = getStatusBadgeHTML(app.status);
        const canCancel = app.status === 'Pendiente';

        return `
          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-[11px] font-mono text-slate-500">${app.id}</span>
                <h3 class="text-sm font-bold text-white">${app.psychologistName}</h3>
                <p class="text-xs text-teal-400">${app.psychologistSpecialty}</p>
              </div>
              ${statusBadge}
            </div>

            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
              <p class="text-xs font-semibold text-amber-300">
                <i class="fa-solid fa-notes-medical mr-1.5"></i>${app.reason}
              </p>
              <p class="text-xs text-slate-400 italic">"${app.description}"</p>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-300">
              <div class="flex items-center gap-3">
                <span><i class="fa-regular fa-calendar text-teal-400 mr-1"></i>${formatDateSpanish(app.date)}</span>
                <span><i class="fa-regular fa-clock text-teal-400 mr-1"></i>${app.time}</span>
              </div>
              <span class="text-[11px] ${app.modality.includes('Virtual') ? 'text-emerald-400 font-medium' : 'text-slate-400'}">
                <i class="fa-solid ${app.modality.includes('Virtual') ? 'fa-video' : 'fa-building'} mr-1"></i>${app.modality}
              </span>
            </div>

            ${(app.modality.includes('Virtual') && (app.status === 'Pendiente' || app.status === 'Confirmada')) ? `
              <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button onclick="openVideoCall('${app.id}')" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40 transition flex items-center gap-1.5 cursor-pointer">
                  <i class="fa-solid fa-video"></i> Entrar a Videollamada
                </button>
                ${canCancel ? `
                  <button onclick="cancelPatientAppointment('${app.id}')" class="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1.5 cursor-pointer">
                    <i class="fa-solid fa-ban"></i> Cancelar
                  </button>
                ` : ''}
              </div>
            ` : (canCancel ? `
              <div class="pt-2 border-t border-slate-800/80 flex justify-end">
                <button onclick="cancelPatientAppointment('${app.id}')" class="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1.5 cursor-pointer">
                  <i class="fa-solid fa-ban"></i> Cancelar cita
                </button>
              </div>
            ` : '')}
          </div>
        `;
      }).join('');
    }

    function cancelPatientAppointment(appointmentId) {
      openConfirmModal({
        title: '¿Cancelar esta cita?',
        message: 'La cita pasará a estado Cancelada. Si deseas otro horario podrás agendar una nueva cuando gustes.',
        confirmText: 'Sí, cancelar cita',
        isDanger: true,
        onConfirm: () => {
          const appointments = getAppointments();
          const index = appointments.findIndex(a => a.id === appointmentId);
          if (index !== -1) {
            appointments[index].status = 'Cancelada';
            saveAppointments(appointments);
            const session = getSession();
            if (session) renderPatientAppointments(session.email);
            showToast('Tu cita ha sido cancelada.', 'info');
          }
        }
      });
    }

    // ==================== PORTAL DEL ADMINISTRADOR ====================
    function initAdminPortal() {
      // Llenar filtro de psicólogos
      const selectPsi = document.getElementById('admin-filter-psychologist');
      const currentVal = selectPsi.value;
      selectPsi.innerHTML = `<option value="all">Todos los psicólogos</option>` +
        PSYCHOLOGISTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
      selectPsi.value = currentVal || 'all';

      renderAdminDashboard();
    }

    function renderAdminDashboard() {
      const appointments = getAppointments();

      // Actualizar estadísticas globales
      const total = appointments.length;
      const pending = appointments.filter(a => a.status === 'Pendiente').length;
      const confirmed = appointments.filter(a => a.status === 'Confirmada').length;
      const uniquePatients = new Set(appointments.map(a => a.patientEmail.toLowerCase())).size;

      document.getElementById('stat-total').textContent = total;
      document.getElementById('stat-pending').textContent = pending;
      document.getElementById('stat-confirmed').textContent = confirmed;
      document.getElementById('stat-patients').textContent = uniquePatients;

      // Aplicar filtros
      const searchQuery = document.getElementById('admin-search-input').value.trim().toLowerCase();
      const filterPsi = document.getElementById('admin-filter-psychologist').value;
      const filterStatus = document.getElementById('admin-filter-status').value;

      const filtered = appointments.filter(app => {
        const matchesSearch =
          app.patientName.toLowerCase().includes(searchQuery) ||
          app.patientEmail.toLowerCase().includes(searchQuery) ||
          app.reason.toLowerCase().includes(searchQuery) ||
          app.description.toLowerCase().includes(searchQuery);

        const matchesPsi = filterPsi === 'all' || app.psychologistId === filterPsi;
        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;

        return matchesSearch && matchesPsi && matchesStatus;
      });

      const container = document.getElementById('admin-appointments-container');

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
            <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <i class="fa-solid fa-folder-open text-2xl"></i>
            </div>
            <h3 class="text-base font-bold text-white">No se encontraron pacientes o citas</h3>
            <p class="text-xs text-slate-400 mt-1">Prueba ajustando los filtros de búsqueda o espera a que un paciente agende una consulta.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(app => {
        const reasonObj = CONSULTATION_REASONS.find(r => r.label === app.reason) || CONSULTATION_REASONS[7];
        const statusBadge = getStatusBadgeHTML(app.status);

        return `
          <div class="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-lg transition animate-fade-in">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              <!-- Datos del Paciente (4 cols) -->
              <div class="lg:col-span-4 flex items-start gap-3.5">
                <div class="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                  ${getInitials(app.patientName)}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-white truncate">${app.patientName}</h3>
                    <span class="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded">${app.id}</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-0.5 truncate"><i class="fa-regular fa-envelope mr-1.5 text-slate-500"></i>${app.patientEmail}</p>
                  <p class="text-xs text-slate-400 mt-0.5"><i class="fa-solid fa-phone mr-1.5 text-slate-500"></i>${app.patientPhone || 'Sin teléfono'}</p>
                </div>
              </div>

              <!-- Motivo / De qué está mal + Psicólogo (5 cols) -->
              <div class="lg:col-span-5 space-y-2.5 bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${reasonObj.badgeClass}">
                    <i class="fa-solid ${reasonObj.icon}"></i>
                    ${app.reason}
                  </span>
                  <span class="text-xs font-semibold text-teal-300">
                    <i class="fa-solid fa-user-doctor mr-1"></i>${app.psychologistName}
                  </span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  <span class="text-slate-500 font-medium">Síntomas / Detalle:</span> "${app.description}"
                </p>
                <div class="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 border-t border-slate-800/70">
                  <span><i class="fa-regular fa-calendar text-indigo-400 mr-1"></i>${formatDateSpanish(app.date)}</span>
                  <span><i class="fa-regular fa-clock text-indigo-400 mr-1"></i>${app.time}</span>
                  <span class="${app.modality.includes('Virtual') ? 'text-emerald-400 font-semibold' : ''}">
                    <i class="fa-solid ${app.modality.includes('Virtual') ? 'fa-video text-emerald-400' : 'fa-location-dot text-indigo-400'} mr-1"></i>${app.modality}
                  </span>
                </div>
                ${app.clinicalNotes ? `
                  <div class="mt-2 pt-2 border-t border-slate-800/70 text-[11px] text-teal-200/90 bg-teal-500/5 p-2 rounded-lg">
                    <i class="fa-solid fa-file-medical text-teal-400 mr-1"></i><strong>Nota clínica:</strong> ${app.clinicalNotes}
                  </div>
                ` : ''}
              </div>

              <!-- Estado y Acciones del Administrador (3 cols) -->
              <div class="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3">
                <div class="flex items-center justify-between lg:justify-end gap-2 w-full">
                  <span class="text-xs text-slate-500 lg:hidden">Estado:</span>
                  ${statusBadge}
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full lg:justify-end">
                  ${(app.modality.includes('Virtual') && app.status !== 'Cancelada') ? `
                    <button onclick="openVideoCall('${app.id}')" title="Iniciar sala de videollamada con el paciente"
                      class="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/50 transition flex items-center justify-center gap-1.5 cursor-pointer">
                      <i class="fa-solid fa-video"></i> Iniciar Videollamada
                    </button>
                  ` : ''}

                  ${app.status === 'Pendiente' ? `
                    <button onclick="updateAppointmentStatus('${app.id}', 'Confirmada')" title="Confirmar cita"
                      class="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
                      <i class="fa-solid fa-check"></i> Confirmar
                    </button>
                  ` : ''}

                  ${app.status === 'Confirmada' ? `
                    <button onclick="updateAppointmentStatus('${app.id}', 'Completada')" title="Marcar sesión como realizada"
                      class="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
                      <i class="fa-solid fa-check-double"></i> Completar
                    </button>
                  ` : ''}

                  ${(app.status === 'Pendiente' || app.status === 'Confirmada') ? `
                    <button onclick="updateAppointmentStatus('${app.id}', 'Cancelada')" title="Cancelar cita"
                      class="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 text-xs font-medium transition cursor-pointer">
                      <i class="fa-solid fa-ban"></i>
                    </button>
                  ` : ''}

                  <button onclick="deleteAppointment('${app.id}')" title="Eliminar registro"
                    class="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 text-xs font-medium transition cursor-pointer">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;
      }).join('');
    }

    function updateAppointmentStatus(id, newStatus) {
      const appointments = getAppointments();
      const idx = appointments.findIndex(a => a.id === id);
      if (idx !== -1) {
        appointments[idx].status = newStatus;
        saveAppointments(appointments);
        renderAdminDashboard();
        showToast(`Estado actualizado a "${newStatus}".`, 'success');
      }
    }

    function deleteAppointment(id) {
      openConfirmModal({
        title: '¿Eliminar registro de cita?',
        message: 'Esta acción eliminará permanentemente la cita del historial del sistema.',
        confirmText: 'Eliminar registro',
        isDanger: true,
        onConfirm: () => {
          const appointments = getAppointments().filter(a => a.id !== id);
          saveAppointments(appointments);
          renderAdminDashboard();
          showToast('Registro eliminado del sistema.', 'info');
        }
      });
    }

    function resetDemoData() {
      openConfirmModal({
        title: '¿Restaurar datos de demostración?',
        message: 'Se restablecerán las 3 citas iniciales de ejemplo en el sistema.',
        confirmText: 'Restaurar',
        isDanger: false,
        onConfirm: () => {
          saveAppointments([...INITIAL_APPOINTMENTS]);
          renderAdminDashboard();
          showToast('Datos de ejemplo restaurados.', 'success');
        }
      });
    }

    // ==================== UTILIDADES DE FORMATO ====================
    function getStatusBadgeHTML(status) {
      const map = {
        'Pendiente': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        'Confirmada': 'bg-teal-500/15 text-teal-300 border-teal-500/30',
        'Completada': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        'Cancelada': 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      };
      const icons = {
        'Pendiente': 'fa-clock',
        'Confirmada': 'fa-circle-check',
        'Completada': 'fa-award',
        'Cancelada': 'fa-circle-xmark'
      };
      const cls = map[status] || map['Pendiente'];
      const icon = icons[status] || 'fa-circle';
      return `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}">
          <i class="fa-solid ${icon}"></i>
          ${status}
        </span>
      `;
    }

    function formatDateSpanish(dateStr) {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
    }

    function getInitials(name) {
      return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(n => n[0].toUpperCase())
        .join('');
    }

    // ==================== SALA DE VIDEOLLAMADA EN VIVO ====================
    let activeCallAppointmentId = null;
    let localMediaStream = null;
    let callTimerInterval = null;
    let callSecondsElapsed = 0;
    let isMicMuted = false;
    let isCameraOff = false;
    let isSharingScreen = false;

    async function openVideoCall(appointmentId) {
      const appointments = getAppointments();
      const app = appointments.find(a => a.id === appointmentId);
      if (!app) return;

      const session = getSession();
      const isAdmin = session && session.role === 'admin';

      activeCallAppointmentId = appointmentId;
      isMicMuted = false;
      isCameraOff = false;
      isSharingScreen = false;

      // Poblar datos de la sala
      document.getElementById('vc-room-title').textContent = `Teleconsulta • ${app.patientName}`;
      document.getElementById('vc-room-subtitle').textContent = `${app.id} • Especialista: ${app.psychologistName}`;
      document.getElementById('vc-room-link').value = `https://psicocare.meet/sala-${app.id.toLowerCase()}`;

      document.getElementById('vc-info-patient').textContent = app.patientName;
      document.getElementById('vc-info-email').textContent = app.patientEmail;
      document.getElementById('vc-info-psychologist').textContent = `${app.psychologistName} (${app.psychologistSpecialty})`;
      document.getElementById('vc-info-reason').textContent = app.reason;
      document.getElementById('vc-info-desc').textContent = `"${app.description}"`;
      document.getElementById('vc-info-datetime').textContent = `${formatDateSpanish(app.date)} • ${app.time}`;

      // Configurar vista remota según quién entra (Admin ve a la Paciente; Paciente ve al Psicólogo/a)
      if (isAdmin) {
        document.getElementById('vc-remote-role-label').textContent = 'Paciente en sala';
        document.getElementById('vc-remote-name').textContent = app.patientName;
        document.getElementById('vc-remote-avatar').textContent = getInitials(app.patientName);
        document.getElementById('vc-local-label').textContent = `Tú (${app.psychologistName} / Admin)`;
        document.getElementById('vc-notes-wrapper').classList.remove('hidden');
        document.getElementById('vc-clinical-notes').value = app.clinicalNotes || '';
      } else {
        document.getElementById('vc-remote-role-label').textContent = 'Especialista en sala';
        document.getElementById('vc-remote-name').textContent = app.psychologistName;
        document.getElementById('vc-remote-avatar').textContent = getInitials(app.psychologistName);
        document.getElementById('vc-local-label').textContent = `Tú (${app.patientName})`;
        document.getElementById('vc-notes-wrapper').classList.add('hidden');
      }

      // Resetear UI de controles
      updateMediaControlsUI();

      // Mostrar modal a pantalla completa
      const modal = document.getElementById('video-call-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');

      // Iniciar temporizador
      callSecondsElapsed = 0;
      document.getElementById('vc-timer').textContent = '00:00';
      if (callTimerInterval) clearInterval(callTimerInterval);
      callTimerInterval = setInterval(() => {
        callSecondsElapsed++;
        const mins = String(Math.floor(callSecondsElapsed / 60)).padStart(2, '0');
        const secs = String(callSecondsElapsed % 60).padStart(2, '0');
        document.getElementById('vc-timer').textContent = `${mins}:${secs}`;
      }, 1000);

      // Intentar acceder a cámara y micrófono reales
      await startLocalMedia();
    }

    async function startLocalMedia() {
      const videoEl = document.getElementById('vc-local-video');
      const fallbackEl = document.getElementById('vc-local-fallback');
      const fallbackTitle = document.getElementById('vc-fallback-title');
      const fallbackDesc = document.getElementById('vc-fallback-desc');

      stopLocalStream();

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('API de medios no disponible');
        }
        localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoEl.srcObject = localMediaStream;
        videoEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
        isCameraOff = false;
        updateMediaControlsUI();
        showToast('Cámara y micrófono conectados a la sala virtual.', 'success');
      } catch (err) {
        // Fallback elegante si el usuario no tiene cámara o denegó permisos
        videoEl.classList.add('hidden');
        fallbackEl.classList.remove('hidden');
        fallbackTitle.textContent = 'Modo Audio / Avatar Activo';
        fallbackDesc.textContent = 'No se detectó cámara web o el permiso fue bloqueado. Puedes continuar la sesión por voz.';
        isCameraOff = true;
        updateMediaControlsUI();
      }
    }

    function stopLocalStream() {
      if (localMediaStream) {
        localMediaStream.getTracks().forEach(track => track.stop());
        localMediaStream = null;
      }
    }

    function toggleMicrophone() {
      isMicMuted = !isMicMuted;
      if (localMediaStream) {
        localMediaStream.getAudioTracks().forEach(track => {
          track.enabled = !isMicMuted;
        });
      }
      updateMediaControlsUI();
      showToast(isMicMuted ? 'Micrófono silenciado' : 'Micrófono activado', 'info');
    }

    async function toggleCamera() {
      const videoEl = document.getElementById('vc-local-video');
      const fallbackEl = document.getElementById('vc-local-fallback');

      if (!localMediaStream && isCameraOff) {
        await startLocalMedia();
        return;
      }

      isCameraOff = !isCameraOff;
      if (localMediaStream) {
        localMediaStream.getVideoTracks().forEach(track => {
          track.enabled = !isCameraOff;
        });
      }

      if (isCameraOff) {
        videoEl.classList.add('hidden');
        fallbackEl.classList.remove('hidden');
        document.getElementById('vc-fallback-title').textContent = 'Cámara apagada';
        document.getElementById('vc-fallback-desc').textContent = 'Haz clic en "Encender Cámara" para volver a mostrar tu video.';
      } else if (localMediaStream) {
        videoEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
      }

      updateMediaControlsUI();
    }

    async function toggleScreenShare() {
      const videoEl = document.getElementById('vc-local-video');
      const fallbackEl = document.getElementById('vc-local-fallback');
      const labelScreen = document.getElementById('label-screen');

      if (isSharingScreen) {
        isSharingScreen = false;
        labelScreen.textContent = 'Compartir Pantalla';
        await startLocalMedia();
        return;
      }

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          showToast('Tu navegador no permite compartir pantalla en este entorno.', 'info');
          return;
        }
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        stopLocalStream();
        localMediaStream = screenStream;
        videoEl.srcObject = screenStream;
        videoEl.classList.remove('scale-x-100', '-scale-x-100');
        videoEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
        isSharingScreen = true;
        labelScreen.textContent = 'Dejar de Compartir';
        showToast('Compartiendo pantalla en la sesión.', 'success');

        screenStream.getVideoTracks()[0].onended = () => {
          isSharingScreen = false;
          labelScreen.textContent = 'Compartir Pantalla';
          videoEl.classList.add('-scale-x-100');
          startLocalMedia();
        };
      } catch (err) {
        showToast('No se inició la compartición de pantalla.', 'info');
      }
    }

    function updateMediaControlsUI() {
      const iconMic = document.getElementById('icon-mic');
      const labelMic = document.getElementById('label-mic');
      const mutedBadge = document.getElementById('vc-muted-badge');

      if (isMicMuted) {
        iconMic.className = 'fa-solid fa-microphone-slash text-rose-400';
        labelMic.textContent = 'Activar Micrófono';
        mutedBadge.classList.remove('hidden');
        mutedBadge.classList.add('flex');
      } else {
        iconMic.className = 'fa-solid fa-microphone text-teal-400';
        labelMic.textContent = 'Silenciar';
        mutedBadge.classList.add('hidden');
        mutedBadge.classList.remove('flex');
      }

      const iconCam = document.getElementById('icon-cam');
      const labelCam = document.getElementById('label-cam');
      const camDot = document.getElementById('vc-cam-indicator-dot');

      if (isCameraOff) {
        iconCam.className = 'fa-solid fa-video-slash text-rose-400';
        labelCam.textContent = 'Encender Cámara';
        camDot.className = 'w-2 h-2 rounded-full bg-rose-500';
      } else {
        iconCam.className = 'fa-solid fa-video text-teal-400';
        labelCam.textContent = 'Apagar Cámara';
        camDot.className = 'w-2 h-2 rounded-full bg-teal-400';
      }
    }

    function copyMeetingLink() {
      const linkInput = document.getElementById('vc-room-link');
      linkInput.select();
      linkInput.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
        showToast('Enlace de videollamada copiado al portapapeles.', 'success');
      } catch (e) {
        showToast('Enlace: ' + linkInput.value, 'info');
      }
    }

    function saveSessionNotes() {
      if (!activeCallAppointmentId) return;
      const notes = document.getElementById('vc-clinical-notes').value.trim();
      const appointments = getAppointments();
      const idx = appointments.findIndex(a => a.id === activeCallAppointmentId);
      if (idx !== -1) {
        appointments[idx].clinicalNotes = notes;
        saveAppointments(appointments);
        showToast('Notas clínicas guardadas en la ficha de la cita.', 'success');
      }
    }

    function closeVideoModalCleanup() {
      if (callTimerInterval) {
        clearInterval(callTimerInterval);
        callTimerInterval = null;
      }
      stopLocalStream();
      const modal = document.getElementById('video-call-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      activeCallAppointmentId = null;
    }

    function endVideoCall() {
      const session = getSession();
      const isAdmin = session && session.role === 'admin';
      const callId = activeCallAppointmentId;

      if (isAdmin && callId) {
        // Guardar notas automáticamente antes de salir
        const notes = document.getElementById('vc-clinical-notes').value.trim();
        const appointments = getAppointments();
        const idx = appointments.findIndex(a => a.id === callId);
        if (idx !== -1 && notes) {
          appointments[idx].clinicalNotes = notes;
          saveAppointments(appointments);
        }

        openConfirmModal({
          title: 'Finalizar sesión de videollamada',
          message: '¿Deseas marcar esta cita virtual como "Completada" al finalizar la llamada?',
          confirmText: 'Finalizar y Completar Cita',
          isDanger: false,
          onConfirm: () => {
            closeVideoModalCleanup();
            updateAppointmentStatus(callId, 'Completada');
          }
        });
      } else {
        closeVideoModalCleanup();
        showToast('Has salido de la sala de videollamada.', 'info');
      }
    }

    // Inicializar al cargar la página
    window.addEventListener('DOMContentLoaded', () => {
      // Asegurar datos iniciales en localStorage
      getAppointments();
      renderApp();
    });
