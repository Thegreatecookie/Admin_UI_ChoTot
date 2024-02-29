export const API_PATH = {
  USER: {
    GET: "/user",
    CREATE: "/user",
    GET_ONE_BY_ID: (id) => `/user/${id}`,
    UPDATE: (id) => `/user/${id}`,
    DELETE: (id) => `/user/${id}`,
  },
  ADMIN: {},
  POST: {},
  CAGETORY: {
    GET: "/gategory",
    CREATE: "/category",
    DELETE: (id) => `/user/${id}`,
  },
  ADDRESS: {
    PROVINCE: "/provinces",
    DISTRICT: (id) => `/district/?province=${id}`,
  },
};
