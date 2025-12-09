import api from "./api";
import type { Product, ProductFormData } from "../types/product";
import type { Order } from "../types/order";
import type { DashboardStats } from "../types/stats";
import type { OrderStatus } from "../types/order";
// ============================================
// AUTENTICAÇÃO
// ============================================
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("admin_token");
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// ============================================
// PRODUTOS
// ============================================
export const productService = {
  getAll: async (search?: string): Promise<Product[]> => {
    const params = search ? { search } : {};
    const response = await api.get("/products", { params });
    return response.data.products || [];
  },

  getById: async (id: number): Promise<Product | undefined> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return undefined;
    }
  },

  create: async (data: ProductFormData): Promise<Product> => {
    const payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      oldPrice: data.oldPrice || null,
      category: data.category,
      stock: data.stock,
      imageUrl: data.imageUrl,
    };
    const response = await api.post("/admin/products", payload);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<ProductFormData>
  ): Promise<Product> => {
    const payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      oldPrice: data.oldPrice || null,
      category: data.category,
      stock: data.stock,
      imageUrl: data.imageUrl,
    };
    const response = await api.put(`/admin/products/${id}`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
  },

  toggleActive: async (id: number): Promise<Product> => {
    const response = await api.patch(`/admin/products/${id}/toggle-active`);
    return response.data;
  },

  updateStock: async (id: number, stock: number): Promise<Product> => {
    const response = await api.patch(`/admin/products/${id}/stock`, { stock });
    return response.data;
  },
};

// ============================================
// PEDIDOS
// ============================================
export const orderService = {
  getAll: async (status?: OrderStatus): Promise<Order[]> => {
    const params = status ? { status } : {};
    const response = await api.get("/admin/orders", { params });
    return response.data.orders || [];
  },

  getById: async (id: number): Promise<Order | undefined> => {
    try {
      const response = await api.get(`/admin/orders/${id}`);
      return response.data;
    } catch (error) {
      return undefined;
    }
  },

  updateStatus: async (id: number, status: OrderStatus): Promise<Order> => {
    const response = await api.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },
};

// ============================================
// DASHBOARD
// ============================================
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/admin/dashboard/stats");
    return response.data;
  },

  getRecentOrders: async (): Promise<Order[]> => {
    const response = await api.get("/admin/dashboard/recent-orders");
    return response.data.orders || [];
  },
};

// ============================================
// EXPORTAR TUDO
// ============================================
export const realApi = {
  auth: authService,
  products: productService,
  orders: orderService,
  dashboard: dashboardService,
};
