import api from "./api";

export const concessionariaService = {
  create: (data) => api.post("/concessionaria", data),
  getAll: () => api.get("/concessionaria"),
  getById: (id) => api.get(`/concessionaria/${id}`),
  update: (id, data) => api.put(`/concessionaria/${id}`, data),
  remove: (id) => api.delete(`/concessionaria/${id}`),
};
