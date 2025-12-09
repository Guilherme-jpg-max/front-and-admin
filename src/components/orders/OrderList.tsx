import React from "react";
import type { Order } from "../../types/order";
import { Eye } from "lucide-react";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import { StatusBadge } from "../common/StatusBadge";

interface OrderListProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">#{order.id}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {order.customerName}
                </div>
                <div className="text-sm text-gray-500">
                  {order.customerEmail}
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-green-600">
                {formatCurrency(order.total)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 text-gray-600">
                {formatDateTime(order.createdAt)}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onViewDetails(order)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
