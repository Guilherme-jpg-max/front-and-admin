import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { AxiosInstance } from "axios";
// URL base da API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    // Erro de rede
    if (!error.response) {
      toast.error("Erro de conexão com o servidor");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Tratamento por status
    switch (status) {
      case 401:
        // Não autenticado - redirecionar para login
        toast.error("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("admin_token");
        window.location.href = "/login";
        break;

      case 403:
        toast.error("Acesso negado. Apenas administradores.");
        break;

      case 404:
        toast.error("Recurso não encontrado");
        break;

      case 409:
        toast.error(data?.error || "Conflito de dados");
        break;

      case 500:
        toast.error("Erro interno do servidor");
        break;

      default:
        toast.error(data?.error || "Erro desconhecido");
    }

    return Promise.reject(error);
  }
);

export default api;
