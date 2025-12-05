import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from './config.js';
import { getAuthHeaders } from './helpers.js';

export const options = {
  stages: [
    { duration: '1m', target: 10 },     // Ramp up
    { duration: '10m', target: 10 },    // Stay at load for 10 minutes
    { duration: '1m', target: 0 },      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
    http_req_failed: ['rate<0.1'],
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

  // Realistic user behavior
  http.get(`${BASE_URL}/articles`, authHeaders);
  sleep(3);

  http.get(`${BASE_URL}/tags`, authHeaders);
  sleep(2);
}
