// import type { Product, ProductFormData } from "../types/product";
// import type { Order, OrderStatus } from "../types/order";
// import type { DashboardStats } from "../types/stats";
// import { mockProducts, mockOrders } from "./mockData";

// // Simula delay de rede
// const delay = (ms: number = 500) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

// // ============================================
// // PRODUTOS
// // ============================================
// let products = [...mockProducts];
// let productIdCounter = 6;

// export const productService = {
//   getAll: async (search?: string): Promise<Product[]> => {
//     await delay();
//     if (search) {
//       return products.filter((p) =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     return products;
//   },

//   getById: async (id: number): Promise<Product | undefined> => {
//     await delay(300);
//     return products.find((p) => p.id === id);
//   },

//   create: async (data: ProductFormData): Promise<Product> => {
//     await delay();
//     const newProduct: Product = {
//       ...data,
//       id: productIdCounter++,
//       isActive: true,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     products.push(newProduct);
//     return newProduct;
//   },

//   update: async (
//     id: number,
//     data: Partial<ProductFormData>
//   ): Promise<Product> => {
//     await delay();
//     const index = products.findIndex((p) => p.id === id);
//     if (index === -1) throw new Error("Produto não encontrado");

//     products[index] = {
//       ...products[index],
//       ...data,
//       updatedAt: new Date().toISOString(),
//     };
//     return products[index];
//   },

//   delete: async (id: number): Promise<void> => {
//     await delay();
//     products = products.filter((p) => p.id !== id);
//   },

//   toggleActive: async (id: number): Promise<Product> => {
//     await delay(300);
//     const index = products.findIndex((p) => p.id === id);
//     if (index === -1) throw new Error("Produto não encontrado");

//     products[index].isActive = !products[index].isActive;
//     products[index].updatedAt = new Date().toISOString();
//     return products[index];
//   },

//   updateStock: async (id: number, stock: number): Promise<Product> => {
//     await delay(300);
//     const index = products.findIndex((p) => p.id === id);
//     if (index === -1) throw new Error("Produto não encontrado");

//     products[index].stock = stock;
//     products[index].updatedAt = new Date().toISOString();
//     return products[index];
//   },
// };

// // ============================================
// // PEDIDOS
// // ============================================
// const orders = [...mockOrders];

// export const orderService = {
//   getAll: async (status?: OrderStatus): Promise<Order[]> => {
//     await delay();
//     if (status) {
//       return orders.filter((o) => o.status === status);
//     }
//     return orders;
//   },

//   getById: async (id: number): Promise<Order | undefined> => {
//     await delay(300);
//     return orders.find((o) => o.id === id);
//   },

//   updateStatus: async (id: number, status: OrderStatus): Promise<Order> => {
//     await delay();
//     const index = orders.findIndex((o) => o.id === id);
//     if (index === -1) throw new Error("Pedido não encontrado");

//     orders[index].status = status;
//     return orders[index];
//   },
// };

// // ============================================
// // DASHBOARD
// // ============================================
// export const dashboardService = {
//   getStats: async (): Promise<DashboardStats> => {
//     await delay();
//     // Calcula estatísticas em tempo real baseado nos dados mockados
//     return {
//       todaySales: orders
//         .filter(
//           (o) =>
//             new Date(o.createdAt).toDateString() === new Date().toDateString()
//         )
//         .reduce((sum, o) => sum + o.total, 0),
//       pendingOrders: orders.filter((o) => o.status === "pending").length,
//       totalProducts: products.length,
//       lowStockProducts: products.filter((p) => p.stock < 20).length,
//     };
//   },

//   getRecentOrders: async (): Promise<Order[]> => {
//     await delay();
//     return orders.slice(0, 5);
//   },
// };
