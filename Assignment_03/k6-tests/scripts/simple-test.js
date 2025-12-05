import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8081/api';

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  // Test simple endpoints
  let response = http.get(`${BASE_URL}/articles`);
  check(response, {
    'articles endpoint status is 200': (r) => r.status === 200,
  });
  
  sleep(1);
}
