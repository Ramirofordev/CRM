import API from "./client";

export const authApi = {
    login: (data) => API.post("/auth/login", data),
    register: (data) => API.post("/auth/register", data),
};

export const customersApi = {
    list: () => API.get("/customers/"),
    create: (data) => API.post("/customers/", data),
    update: (id, data) => API.put(`/customers/${id}`, data),
    remove: (id) => API.delete(`/customers/${id}`),
};

export const opportunitiesApi = {
    list: () => API.get("/opportunities/"),
    create: (data) => API.post("/opportunities/", data),
    update: (id, data) => API.put(`/opportunities/${id}`, data),
    updateStatus: (id, status) => API.patch(`/opportunities/${id}/status`, { status }),
    remove: (id) => API.delete(`/opportunities/${id}`),
};

export const activitiesApi = {
    list: () => API.get("/activities/"),
    create: (data) => API.post("/activities/", data),
    update: (id, data) => API.put(`/activities/${id}`, data),
    updateStatus: (id, status) => API.patch(`/activities/${id}/status`, { status }),
    remove: (id) => API.delete(`/activities/${id}`),
};
