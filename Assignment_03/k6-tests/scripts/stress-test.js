import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';
import { login, getAuthHeaders } from './helpers.js';

export const options = {
  stages: [
    { duration: '1m', target: 10 },    // Ramp up to 10 users
    { duration: '2m', target: 10 },    // Stay at 10 for 2 minutes
    { duration: '1m', target: 20 },    // Ramp up to 20 users
    { duration: '2m', target: 20 },    // Stay at 20 for 2 minutes
    { duration: '1m', target: 30 },    // Ramp up to 30 users
    { duration: '2m', target: 30 },    // Stay at 30 for 2 minutes
    { duration: '2m', target: 0 },     // Ramp down gradually
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // More relaxed threshold
    http_req_failed: ['rate<0.3'],     // Allow up to 30% errors
  },
};

export function setup() {
  const loginRes = http.post(`${BASE_URL}/users/login`, JSON.stringify({
    user: {
      email: 'perf-test1@example.com',
      password: 'PerfTest1234!'
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  return { token: loginRes.json('user.token') };
}

export default function (data) {
  const authHeaders = getAuthHeaders(data.token);

  // Test most critical endpoints under stress
  const response = http.get(`${BASE_URL}/articles`, authHeaders);
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);

  // Test tags endpoint
  const tagsResponse = http.get(`${BASE_URL}/tags`, authHeaders);
  check(tagsResponse, {
    'tags status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
