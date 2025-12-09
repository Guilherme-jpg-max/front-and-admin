import React from "react";
import type { OrderStatus } from "../../types/order";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from "../../utils/constants";

interface StatusBadgeProps {
  status: OrderStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[status]}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
};
