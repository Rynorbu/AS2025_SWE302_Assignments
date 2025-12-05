import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from './config.js';
import { getAuthHeaders } from './helpers.js';

export const options = {
  stages: [
    { duration: '30s', target: 5 },     // Normal load
    { duration: '1m', target: 5 },      // Stable
    { duration: '30s', target: 50 },    // Sudden spike!
    { duration: '2m', target: 50 },     // Stay at spike
    { duration: '30s', target: 5 },     // Back to normal
    { duration: '1m', target: 5 },      // Recovery period
    { duration: '30s', target: 0 },     // Ramp down
  ],
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
  
  const response = http.get(`${BASE_URL}/articles`, authHeaders);
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}
