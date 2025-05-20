import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1000,          // 1000 virtual users
  duration: '10s',    // Run for 10 seconds
};

export default function () {
  const url = 'https://wagmi-9000-production.up.railway.app/wagmi';

  const payload = JSON.stringify({
    a: 5,
    b: 7
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is correct': (r) => JSON.parse(r.body).result === 12,
  });
}
