const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

function getHeaders() {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Login failed');
  return data.data;  // { token, user }
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
}

export async function fetchInbox(page = 1, limit = 50) {
  const res = await fetch(`${API_BASE}/conversations/inbox?page=${page}&limit=${limit}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;  // array of patients with conversations
}

export async function fetchHistory(patientId, page = 1, limit = 200) {
  const res = await fetch(`${API_BASE}/conversations/history/${patientId}?page=${page}&limit=${limit}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data;  // { data: messages[], pagination }
}

export async function sendMessage(patientId, message) {
  const res = await fetch(`${API_BASE}/conversations/send`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ patientId, message })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;  // sent message object
}

// REAL BACKEND DATA INTEGRATIONS BELOW //

export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`, { headers: getHeaders() });
    const data = await res.json();
    if (!data.success) return null;
    return data.data;
  } catch (e) {
    console.error('Failed to fetch dashboard stats from backend:', e);
    return null;
  }
}

export async function fetchPatients(page = 1, limit = 50, search = '') {
  try {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
    const res = await fetch(`${API_BASE}/patients?page=${page}&limit=${limit}${searchParam}`, { headers: getHeaders() });
    const data = await res.json();
    if (!data.success) return { data: [], total: 0 };
    return { data: data.data || [], total: data.pagination?.total || (data.data ? data.data.length : 0) };
  } catch (e) {
    console.error('Failed to fetch patients from backend:', e);
    return { data: [], total: 0 };
  }
}

export async function fetchPatientById(id) {
  try {
    const res = await fetch(`${API_BASE}/patients/${id}`, { headers: getHeaders() });
    const data = await res.json();
    if (!data.success) return null;
    return data.data;
  } catch (e) {
    console.error(`Failed to fetch patient ${id} from backend:`, e);
    return null;
  }
}

export async function fetchAppointments(page = 1, limit = 50, status = '', search = '') {
  try {
    let url = `${API_BASE}/appointments?page=${page}&limit=${limit}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, { headers: getHeaders() });
    const data = await res.json();
    if (!data.success) return { data: [], total: 0 };
    return { data: data.data || [], total: data.pagination?.total || (data.data ? data.data.length : 0) };
  } catch (e) {
    console.error('Failed to fetch appointments from backend:', e);
    return { data: [], total: 0 };
  }
}

export async function updateAppointmentStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Status update failed');
    return data.data;
  } catch (e) {
    console.error(`Failed to update status for appointment ${id}:`, e);
    throw e;
  }
}

export async function createAppointment(appointmentData) {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(appointmentData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Booking failed');
    return data.data;
  } catch (e) {
    console.error('Failed to create appointment:', e);
    throw e;
  }
}

export async function fetchDoctors(department = '', search = '') {
  try {
    let url = `${API_BASE}/doctors?limit=50`;
    if (department) url += `&department=${encodeURIComponent(department)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, { headers: getHeaders() });
    const data = await res.json();
    if (!data.success) return [];
    return data.data || [];
  } catch (e) {
    console.error('Failed to fetch doctors from backend:', e);
    return [];
  }
}
