// import React, { useEffect, useState } from "react";
// import type { DashboardStats } from "../types/stats";
// import type { Order } from "../types/order";
// import { dashboardService } from "../services/mockApi";
// import { StatsCard } from "../components/dashboard/StatsCard";
// import { RecentOrders } from "../components/dashboard/RecentOrders";
// import { DollarSign, ShoppingCart, Package, AlertCircle } from "lucide-react";
// import { formatCurrency } from "../utils/formatters";
// import { Modal } from "../components/common/Modal";
// import { OrderDetails } from "../components/orders/OrderDetails";
// import toast from "react-hot-toast";
// import { orderService } from "../services/mockApi";
// import type { OrderStatus } from "../types/order";

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [recentOrders, setRecentOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [statsData, ordersData] = await Promise.all([
//         dashboardService.getStats(),
//         dashboardService.getRecentOrders(),
//       ]);
//       setStats(statsData);
//       setRecentOrders(ordersData);
//     } catch (error) {
//       toast.error("Erro ao carregar dados do dashboard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateStatus = async (status: OrderStatus) => {
//     if (!selectedOrder) return;

//     try {
//       await orderService.updateStatus(selectedOrder.id, status);
//       toast.success("Status atualizado com sucesso!");
//       setSelectedOrder(null);
//       loadData();
//     } catch (error) {
//       toast.error("Erro ao atualizar status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">Carregando...</div>
//     );
//   }

//   if (!stats) return null;

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatsCard
//           label="Vendas Hoje"
//           value={formatCurrency(stats.todaySales)}
//           icon={DollarSign}
//           color="bg-green-500"
//         />
//         <StatsCard
//           label="Pedidos Pendentes"
//           value={stats.pendingOrders}
//           icon={ShoppingCart}
//           color="bg-yellow-500"
//         />
//         <StatsCard
//           label="Produtos Cadastrados"
//           value={stats.totalProducts}
//           icon={Package}
//           color="bg-blue-500"
//         />
//         <StatsCard
//           label="Estoque Baixo"
//           value={stats.lowStockProducts}
//           icon={AlertCircle}
//           color="bg-red-500"
//         />
//       </div>

//       {/* Recent Orders */}
//       <RecentOrders orders={recentOrders} onViewDetails={setSelectedOrder} />

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

// export default Dashboard;

import React, { useEffect, useState } from "react";
import type { DashboardStats } from "../types/stats";
import type { Order } from "../types/order";
import { dashboardService, orderService } from "../services/realApi";
import { StatsCard } from "../components/dashboard/StatsCard";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { DollarSign, ShoppingCart, Package, AlertCircle } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { Modal } from "../components/common/Modal";
import { OrderDetails } from "../components/orders/OrderDetails";
import toast from "react-hot-toast";
import type { OrderStatus } from "../types/order";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, ordersData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentOrders(),
      ]);
      setStats(statsData);
      setRecentOrders(ordersData);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!selectedOrder) return;

    try {
      await orderService.updateStatus(selectedOrder.id, status);
      toast.success("Status atualizado com sucesso!");
      setSelectedOrder(null);
      loadData();
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
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          label="Vendas Hoje"
          value={formatCurrency(stats.todaySales)}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatsCard
          label="Pedidos Pendentes"
          value={stats.pendingOrders}
          icon={ShoppingCart}
          color="bg-yellow-500"
        />
        <StatsCard
          label="Produtos Cadastrados"
          value={stats.totalProducts}
          icon={Package}
          color="bg-blue-500"
        />
        <StatsCard
          label="Estoque Baixo"
          value={stats.lowStockProducts}
          icon={AlertCircle}
          color="bg-red-500"
        />
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 ? (
        <RecentOrders orders={recentOrders} onViewDetails={setSelectedOrder} />
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <p className="text-lg">Nenhum pedido recente</p>
        </div>
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

export default Dashboard;
