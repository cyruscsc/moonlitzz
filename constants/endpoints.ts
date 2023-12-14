const endpoints = {
  user: {
    get: '/api/user',
    update: '/api/user',
    delete: '/api/user',
  },
  sleep: {
    getOne: '/api/sleep',
    getAll: '/api/sleeps',
    create: '/api/sleeps',
    update: '/api/sleep',
    delete: '/api/sleep',
  },
  options: {
    skip: 0,
    take: 10,
    order: 'asc',
  },
};

export default endpoints;
