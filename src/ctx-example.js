const ctx = {
  method: 'GET',
  url: '/user/42?active=true',
  path: '/user/42',
  query: {
    active: 'true'
  },
  headers: {
    host: 'localhost:3000',
    'user-agent': 'PostmanRuntime/7.36.0',
    accept: 'application/json'
  },
  status: 200,
  body: {
    id: 42,
    name: 'Alice'
  },
  request: {
    method: 'GET',
    url: '/user/42?active=true',
    query: {
      active: 'true'
    },
    headers: {
      host: 'localhost:3000',
      accept: 'application/json',
      identity: 'sdofisdfkjshdfkshfdsdfkhsdfksdhfkhj',
      correlationId: '1234567890abcdef'
    },
    body: {},
  },
  response: {
    status: 200,
    message: 'OK',
    body: {
      id: 42,
      name: 'Alice'
    }
  },
  params: {
    id: '42'
  },
  state: {
    user: {
      id: 1,
      role: 'admin'
    }
  },
  ip: '127.0.0.1',
  protocol: 'http'
};
