import React from "react";
import type { Order } from "../../types/order";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import { StatusBadge } from "../common/StatusBadge";

interface RecentOrdersProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({
  orders,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pedidos Recentes</h3>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onViewDetails(order)}
          >
            <div>
              <p className="font-semibold">Pedido #{order.id}</p>
              <p className="text-sm text-gray-600">{order.customerName}</p>
              <p className="text-xs text-gray-500">
                {formatDateTime(order.createdAt)}
              </p>
            </div>
            <div className="text-right space-y-2">
              <p className="font-semibold text-green-600">
                {formatCurrency(order.total)}
              </p>
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
