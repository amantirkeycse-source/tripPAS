// TripPAS API Service Layer

import destinations, {
  getDestinationById
} from '../data/destinations';

import experiences, {
  getExperienceById
} from '../data/experiences';

const SERVER_URL = 'http://localhost:5000';

// ======================================================
// GET JWT TOKEN
// ======================================================

const getToken = () => {
  return localStorage.getItem('trippas_token');
};

// ======================================================
// COMMON API REQUEST
// ======================================================

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // JWT token automatically attach karo
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${SERVER_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    // Provide user-friendly error messages
    if (response.status === 401) {
      throw new Error('Please login again.');
    }
    if (response.status === 404) {
      throw new Error(data.message || 'Resource not found.');
    }
    throw new Error(
      data.message ||
      'Something went wrong. Please try again.'
    );
  }

  return data;
};

// ======================================================
// CHECK BACKEND
// ======================================================

export async function checkBackend() {
  return request('/');
}

// ======================================================
// REGISTER USER
// ======================================================

export async function registerUser(
  name,
  email,
  password
) {
  const data = await request(
    '/api/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  if (data.token) {
    localStorage.setItem(
      'trippas_token',
      data.token
    );
  }

  if (data.user) {
    localStorage.setItem(
      'trippas_user',
      JSON.stringify(data.user)
    );
  }

  return data;
}

// ======================================================
// LOGIN USER
// ======================================================

export async function loginUser(
  email,
  password
) {
  const data = await request(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  if (data.token) {
    localStorage.setItem(
      'trippas_token',
      data.token
    );
  }

  if (data.user) {
    localStorage.setItem(
      'trippas_user',
      JSON.stringify(data.user)
    );
  }

  return data;
}

// ======================================================
// CURRENT USER
// ======================================================

export async function getCurrentUser() {
  return request('/api/auth/me');
}

// ======================================================
// LOGOUT
// ======================================================

export function logoutUser() {
  localStorage.removeItem(
    'trippas_token'
  );

  localStorage.removeItem(
    'trippas_user'
  );
}

// ======================================================
// SAVE TRIP
// ======================================================

export async function saveTrip(tripData) {
  console.log(
    'Saving trip:',
    tripData
  );

  const token = getToken();

  if (!token) {
    throw new Error(
      'You are not logged in. Please login again.'
    );
  }

  const data = await request(
    '/api/trips',
    {
      method: 'POST',
      body: JSON.stringify(tripData)
    }
  );

  console.log(
    'Trip saved successfully:',
    data
  );

  return data;
}

// ======================================================
// GET ALL TRIPS
// ======================================================

export async function getTrips() {
  return request('/api/trips');
}

// ======================================================
// SAVED DESTINATIONS
// ======================================================

export async function getSavedDestinations() {
  return request('/api/saved-destinations');
}

export async function saveDestination(destinationId) {
  return request('/api/saved-destinations', {
    method: 'POST',
    body: JSON.stringify({
      destinationId
    })
  });
}

export async function removeSavedDestination(destinationId) {
  return request(
    `/api/saved-destinations/${destinationId}`,
    {
      method: 'DELETE'
    }
  );
}


// ======================================================
// SAVED EXPERIENCES
// ======================================================

export async function getSavedExperiences() {
  return request('/api/saved-experiences');
}

export async function saveExperience(experienceId) {
  return request('/api/saved-experiences', {
    method: 'POST',
    body: JSON.stringify({
      experienceId
    })
  });
}

export async function removeSavedExperience(experienceId) {
  return request(
    `/api/saved-experiences/${experienceId}`,
    {
      method: 'DELETE'
    }
  );
}

// ======================================================
// GET SINGLE TRIP
// ======================================================

export async function getTrip(id) {
  return request(
    `/api/trips/${id}`
  );
}

// ======================================================
// DELETE TRIP
// ======================================================

export async function deleteTrip(id) {
  return request(
    `/api/trips/${id}`,
    {
      method: 'DELETE'
    }
  );
}

// ======================================================
// UPDATE TRIP
// ======================================================

export async function updateTrip(id, tripData) {
  return request(
    `/api/trips/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(tripData)
    }
  );
}

// ======================================================
// UPDATE TRIP STATUS
// ======================================================

export async function updateTripStatus(id, status) {
  return request(
    `/api/trips/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }
  );
}

// ======================================================
// UPDATE PROFILE
// ======================================================

export async function updateProfile(profileData) {
  const data = await request(
    '/api/auth/profile',
    {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }
  );

  // Update local storage with new user data
  if (data.user) {
    localStorage.setItem(
      'trippas_user',
      JSON.stringify(data.user)
    );
  }

  return data;
}

// ======================================================
// UPLOAD AVATAR (base64)
// ======================================================

export async function uploadAvatar(base64String) {
  const data = await request(
    '/api/auth/profile',
    {
      method: 'PUT',
      body: JSON.stringify({ avatar: base64String })
    }
  );

  if (data.user) {
    localStorage.setItem(
      'trippas_user',
      JSON.stringify(data.user)
    );
  }

  return data;
}

// ======================================================
// REMOVE AVATAR
// ======================================================

export async function removeAvatar() {
  const data = await request(
    '/api/auth/profile',
    {
      method: 'PUT',
      body: JSON.stringify({ avatar: '' })
    }
  );

  if (data.user) {
    localStorage.setItem(
      'trippas_user',
      JSON.stringify(data.user)
    );
  }

  return data;
}

// ======================================================
// LOCAL MOCK DATA API
// ======================================================

const delay = (
  ms = 300
) =>
  new Promise(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

export const api = {

  // ----------------------------------------------------
  // DESTINATIONS
  // ----------------------------------------------------

  async getDestinations() {
    await delay();

    return destinations;
  },

  async getDestination(id) {
    await delay();

    return getDestinationById(id);
  },

  async searchDestinations(query) {
    await delay();

    const q =
      query
        .toLowerCase()
        .trim();

    return destinations.filter(
      destination =>
        destination.name
          .toLowerCase()
          .includes(q) ||

        destination.country
          .toLowerCase()
          .includes(q) ||

        destination.state
          ?.toLowerCase()
          .includes(q) ||

        destination.tags
          ?.some(tag =>
            tag
              .toLowerCase()
              .includes(q)
          )
    );
  },

  // ----------------------------------------------------
  // EXPERIENCES
  // ----------------------------------------------------

  async getExperiences() {
    await delay();

    return experiences;
  },

  async getExperience(id) {
    await delay();

    return getExperienceById(id);
  },

  async createExperience(data) {
    await delay(800);

    const newExperience = {
      id:
        'exp-' +
        Date.now(),

      ...data,

      likes: 0,
      saves: 0,

      createdAt:
        new Date().toISOString()
    };

    return newExperience;
  },

  // ----------------------------------------------------
  // TRIP CALCULATION
  // ----------------------------------------------------

  async calculateTrip(params) {
    await delay(1200);

    return params;
  }
};

export default api;