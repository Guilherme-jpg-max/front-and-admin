// import React, { useEffect, useState } from "react";
// import type { Order, OrderStatus } from "../types/order";
// import { orderService } from "../services/mockApi";
// import { OrderList } from "../components/orders/OrderList";
// import { OrderDetails } from "../components/orders/OrderDetails";
// import { Modal } from "../components/common/Modal";
// import toast from "react-hot-toast";
// import { ORDER_STATUS_LABELS } from "../utils/constants";

// const Orders: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   useEffect(() => {
//     filterOrders();
//   }, [statusFilter, orders]);

//   const loadOrders = async () => {
//     try {
//       const data = await orderService.getAll();
//       setOrders(data);
//     } catch (error) {
//       toast.error("Erro ao carregar pedidos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterOrders = () => {
//     if (statusFilter === "all") {
//       setFilteredOrders(orders);
//     } else {
//       setFilteredOrders(orders.filter((o) => o.status === statusFilter));
//     }
//   };

//   const handleUpdateStatus = async (status: OrderStatus) => {
//     if (!selectedOrder) return;

//     try {
//       await orderService.updateStatus(selectedOrder.id, status);
//       toast.success("Status atualizado com sucesso!");
//       setSelectedOrder(null);
//       loadOrders();
//     } catch (error) {
//       toast.error("Erro ao atualizar status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">Carregando...</div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Pedidos</h2>

//       {/* Status Filter */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Filtrar por Status
//         </label>
//         <select
//           value={statusFilter}
//           onChange={(e) =>
//             setStatusFilter(e.target.value as OrderStatus | "all")
//           }
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="all">Todos os Status</option>
//           <option value="pending">{ORDER_STATUS_LABELS.pending}</option>
//           <option value="confirmed">{ORDER_STATUS_LABELS.confirmed}</option>
//           <option value="shipped">{ORDER_STATUS_LABELS.shipped}</option>
//           <option value="delivered">{ORDER_STATUS_LABELS.delivered}</option>
//           <option value="cancelled">{ORDER_STATUS_LABELS.cancelled}</option>
//         </select>
//       </div>

//       {/* Orders List */}
//       <OrderList orders={filteredOrders} onViewDetails={setSelectedOrder} />

//       {/* Order Details Modal */}
//       <Modal
//         isOpen={!!selectedOrder}
//         onClose={() => setSelectedOrder(null)}
//         title={`Detalhes do Pedido #${selectedOrder?.id}`}
//       >
//         {selectedOrder && (
//           <OrderDetails
//             order={selectedOrder}
//             onUpdateStatus={handleUpdateStatus}
//             onClose={() => setSelectedOrder(null)}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import type { Order, OrderStatus } from "../types/order";
import { orderService } from "../services/realApi";
import { OrderList } from "../components/orders/OrderList";
import { OrderDetails } from "../components/orders/OrderDetails";
import { Modal } from "../components/common/Modal";
import toast from "react-hot-toast";
import { ORDER_STATUS_LABELS } from "../utils/constants";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, orders]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      toast.error("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === statusFilter));
    }
  };

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!selectedOrder) return;

    try {
      await orderService.updateStatus(selectedOrder.id, status);
      toast.success("Status atualizado com sucesso!");
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Pedidos</h2>

      {/* Status Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as OrderStatus | "all")
          }
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">{ORDER_STATUS_LABELS.pending}</option>
          <option value="confirmed">{ORDER_STATUS_LABELS.confirmed}</option>
          <option value="shipped">{ORDER_STATUS_LABELS.shipped}</option>
          <option value="delivered">{ORDER_STATUS_LABELS.delivered}</option>
          <option value="cancelled">{ORDER_STATUS_LABELS.cancelled}</option>
        </select>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <p className="text-lg">
            {statusFilter === "all"
              ? "Nenhum pedido encontrado"
              : `Nenhum pedido com status "${ORDER_STATUS_LABELS[statusFilter]}"`}
          </p>
        </div>
      ) : (
        <OrderList orders={filteredOrders} onViewDetails={setSelectedOrder} />
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Detalhes do Pedido #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Orders;
