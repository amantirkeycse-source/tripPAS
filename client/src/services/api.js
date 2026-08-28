// TripPAS API Service Layer

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('trippas_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Please login again.');
    }
    if (response.status === 404) {
      throw new Error(data.message || 'Resource not found.');
    }
    throw new Error(
      data.message || 'Something went wrong. Please try again.'
    );
  }

  return data;
};

// ======================================================
// CHECK BACKEND
// ======================================================

export async function checkBackend() {
  return request('/api/test');
}

// ======================================================
// AUTH
// ======================================================

export async function registerUser(name, email, password) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });

  if (data.token) {
    localStorage.setItem('trippas_token', data.token);
  }
  if (data.user) {
    localStorage.setItem('trippas_user', JSON.stringify(data.user));
  }

  return data;
}

export async function loginUser(email, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (data.token) {
    localStorage.setItem('trippas_token', data.token);
  }
  if (data.user) {
    localStorage.setItem('trippas_user', JSON.stringify(data.user));
  }

  return data;
}

export async function getCurrentUser() {
  return request('/api/auth/me');
}

export function logoutUser() {
  localStorage.removeItem('trippas_token');
  localStorage.removeItem('trippas_user');
}

// ======================================================
// DESTINATIONS
// ======================================================

export async function getDestinations(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.country) query.set('country', params.country);
  if (params.tag) query.set('tag', params.tag);
  if (params.minBudget) query.set('minBudget', params.minBudget);
  if (params.maxBudget) query.set('maxBudget', params.maxBudget);

  const qs = query.toString();
  return request(`/api/destinations${qs ? '?' + qs : ''}`);
}

export async function getDestination(id) {
  return request(`/api/destinations/${id}`);
}

export async function getSimilarDestinations(id) {
  return request(`/api/destinations/${id}/similar`);
}

// ======================================================
// EXPERIENCES
// ======================================================

export async function getExperiences(params = {}) {
  const query = new URLSearchParams();
  if (params.destination) query.set('destination', params.destination);
  if (params.style) query.set('style', params.style);
  if (params.minRating) query.set('minRating', params.minRating);
  if (params.minBudget) query.set('minBudget', params.minBudget);
  if (params.maxBudget) query.set('maxBudget', params.maxBudget);

  const qs = query.toString();
  return request(`/api/experiences${qs ? '?' + qs : ''}`);
}

export async function getExperience(id) {
  return request(`/api/experiences/${id}`);
}

export async function getRelatedExperiences(id) {
  return request(`/api/experiences/${id}/related`);
}

export async function createExperience(data) {
  return request('/api/experiences', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// ======================================================
// TRIPS
// ======================================================

export async function saveTrip(tripData) {
  const token = localStorage.getItem('trippas_token');
  if (!token) {
    throw new Error('You are not logged in. Please login again.');
  }

  return request('/api/trips', {
    method: 'POST',
    body: JSON.stringify(tripData)
  });
}

export async function getTrips() {
  return request('/api/trips');
}

export async function getTrip(id) {
  return request(`/api/trips/${id}`);
}

export async function updateTrip(id, tripData) {
  return request(`/api/trips/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tripData)
  });
}

export async function updateTripStatus(id, status) {
  return request(`/api/trips/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function deleteTrip(id) {
  return request(`/api/trips/${id}`, { method: 'DELETE' });
}

// ======================================================
// SAVED DESTINATIONS
// ======================================================

export async function getSavedDestinations() {
  return request('/api/saved/destinations');
}

export async function saveDestination(destinationId) {
  return request('/api/saved/destinations', {
    method: 'POST',
    body: JSON.stringify({ destinationId })
  });
}

export async function removeSavedDestination(destinationId) {
  return request(`/api/saved/destinations/${destinationId}`, {
    method: 'DELETE'
  });
}

// ======================================================
// SAVED EXPERIENCES
// ======================================================

export async function getSavedExperiences() {
  return request('/api/saved/experiences');
}

export async function saveExperience(experienceId) {
  return request('/api/saved/experiences', {
    method: 'POST',
    body: JSON.stringify({ experienceId })
  });
}

export async function removeSavedExperience(experienceId) {
  return request(`/api/saved/experiences/${experienceId}`, {
    method: 'DELETE'
  });
}

// ======================================================
// PROFILE
// ======================================================

export async function updateProfile(profileData) {
  const data = await request('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });

  if (data.user) {
    localStorage.setItem('trippas_user', JSON.stringify(data.user));
  }

  return data;
}

export async function uploadAvatar(base64String) {
  const data = await request('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ avatar: base64String })
  });

  if (data.user) {
    localStorage.setItem('trippas_user', JSON.stringify(data.user));
  }

  return data;
}

export async function removeAvatar() {
  const data = await request('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ avatar: '' })
  });

  if (data.user) {
    localStorage.setItem('trippas_user', JSON.stringify(data.user));
  }

  return data;
}
