import React from "react";
import type { Order, OrderStatus } from "../../types/order";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "../common/Button";
import { ORDER_STATUS_LABELS } from "../../utils/constants";

interface OrderDetailsProps {
  order: Order;
  onUpdateStatus: (status: OrderStatus) => void;
  onClose: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  onUpdateStatus,
  onClose,
}) => {
  const nextStatus: Record<OrderStatus, OrderStatus | null> = {
    pending: "confirmed",
    confirmed: "shipped",
    shipped: "delivered",
    delivered: null,
    cancelled: null,
  };

  const handleNextStatus = () => {
    const next = nextStatus[order.status];
    if (next) {
      onUpdateStatus(next);
    }
  };

  return (
    <div className="space-y-6">
      {/* Informações do Cliente */}
      <div>
        <h4 className="font-semibold text-lg mb-3">Informações do Cliente</h4>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p>
            <span className="font-medium">Nome:</span> {order.customerName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order.customerEmail}
          </p>
        </div>
      </div>

      {/* Status do Pedido */}
      <div>
        <h4 className="font-semibold text-lg mb-3">Status do Pedido</h4>
        <div className="flex items-center space-x-3">
          <StatusBadge status={order.status} />
          <span className="text-gray-600">
            {formatDateTime(order.createdAt)}
          </span>
        </div>
      </div>

      {/* Itens do Pedido */}
      <div>
        <h4 className="font-semibold text-lg mb-3">Itens do Pedido</h4>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Produto
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">
                  Qtd
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">
                  Preço
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right font-semibold">
                  Total:
                </td>
                <td className="px-4 py-3 text-right font-bold text-green-600 text-lg">
                  {formatCurrency(order.total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Ações */}
      <div className="flex space-x-3 pt-4 border-t">
        {nextStatus[order.status] && (
          <Button variant="success" onClick={handleNextStatus}>
            Avançar para: {ORDER_STATUS_LABELS[nextStatus[order.status]!]}
          </Button>
        )}
        {order.status === "pending" && (
          <Button variant="danger" onClick={() => onUpdateStatus("cancelled")}>
            Cancelar Pedido
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};
