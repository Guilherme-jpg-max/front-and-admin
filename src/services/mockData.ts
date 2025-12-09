import type { Product } from "../types/product";
import type { Order } from "../types/order";
import type { DashboardStats } from "../types/stats";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Banana Prata",
    description: "Banana prata fresca, 1kg",
    price: 4.99,
    oldPrice: 6.99,
    discount: 29,
    category: "Hortifruti",
    imageUrl:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
    stock: 150,
    isActive: true,
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-20T14:30:00Z",
  },
  {
    id: 2,
    name: "Arroz Branco 5kg",
    description: "Arroz branco tipo 1, pacote de 5kg",
    price: 24.9,
    oldPrice: 29.9,
    discount: 17,
    category: "Grãos",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    stock: 45,
    isActive: true,
    createdAt: "2024-11-10T08:00:00Z",
    updatedAt: "2024-11-18T16:20:00Z",
  },
  {
    id: 3,
    name: "Leite Integral 1L",
    description: "Leite integral longa vida, caixa de 1 litro",
    price: 5.49,
    category: "Laticínios",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    stock: 8,
    isActive: true,
    createdAt: "2024-11-12T09:30:00Z",
    updatedAt: "2024-11-19T11:15:00Z",
  },
  {
    id: 4,
    name: "Feijão Preto 1kg",
    description: "Feijão preto tipo 1, pacote de 1kg",
    price: 7.99,
    category: "Grãos",
    imageUrl:
      "https://images.unsplash.com/photo-1615485500834-bc10199bc726?w=400",
    stock: 80,
    isActive: true,
    createdAt: "2024-11-08T15:00:00Z",
    updatedAt: "2024-11-17T10:45:00Z",
  },
  {
    id: 5,
    name: "Maçã Gala",
    description: "Maçã gala argentina, 1kg",
    price: 8.99,
    category: "Hortifruti",
    imageUrl:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    stock: 5,
    isActive: true,
    createdAt: "2024-11-14T12:00:00Z",
    updatedAt: "2024-11-20T09:00:00Z",
  },
];

export const mockOrders: Order[] = [
  {
    id: 1001,
    customerName: "João Silva",
    customerEmail: "joao@email.com",
    total: 125.5,
    status: "pending",
    createdAt: "2024-11-20T10:30:00Z",
    items: [
      {
        id: 1,
        productName: "Banana Prata",
        quantity: 2,
        price: 4.99,
        subtotal: 9.98,
      },
      {
        id: 2,
        productName: "Arroz Branco 5kg",
        quantity: 3,
        price: 24.9,
        subtotal: 74.7,
      },
      {
        id: 3,
        productName: "Feijão Preto 1kg",
        quantity: 5,
        price: 7.99,
        subtotal: 39.95,
      },
    ],
  },
  {
    id: 1002,
    customerName: "Maria Santos",
    customerEmail: "maria@email.com",
    total: 89.9,
    status: "confirmed",
    createdAt: "2024-11-20T09:15:00Z",
    items: [
      {
        id: 1,
        productName: "Leite Integral 1L",
        quantity: 10,
        price: 5.49,
        subtotal: 54.9,
      },
      {
        id: 2,
        productName: "Maçã Gala",
        quantity: 4,
        price: 8.99,
        subtotal: 35.96,
      },
    ],
  },
  {
    id: 1003,
    customerName: "Pedro Costa",
    customerEmail: "pedro@email.com",
    total: 234.0,
    status: "shipped",
    createdAt: "2024-11-19T16:45:00Z",
    items: [
      {
        id: 1,
        productName: "Arroz Branco 5kg",
        quantity: 5,
        price: 24.9,
        subtotal: 124.5,
      },
      {
        id: 2,
        productName: "Feijão Preto 1kg",
        quantity: 10,
        price: 7.99,
        subtotal: 79.9,
      },
      {
        id: 3,
        productName: "Banana Prata",
        quantity: 6,
        price: 4.99,
        subtotal: 29.94,
      },
    ],
  },
  {
    id: 1004,
    customerName: "Ana Oliveira",
    customerEmail: "ana@email.com",
    total: 45.6,
    status: "delivered",
    createdAt: "2024-11-18T14:20:00Z",
    items: [
      {
        id: 1,
        productName: "Leite Integral 1L",
        quantity: 6,
        price: 5.49,
        subtotal: 32.94,
      },
      {
        id: 2,
        productName: "Feijão Preto 1kg",
        quantity: 2,
        price: 7.99,
        subtotal: 15.98,
      },
    ],
  },
];

export const mockStats: DashboardStats = {
  todaySales: 2450.0,
  pendingOrders: 12,
  totalProducts: 145,
  lowStockProducts: 8,
};
