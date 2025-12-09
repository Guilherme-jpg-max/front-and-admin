import React, { useState } from "react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import toast from "react-hot-toast";

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "SuperMercado",
    email: "contato@supermercado.com",
    phone: "(11) 99999-9999",
    address: "Rua Exemplo, 123",
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Configurações</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome da Empresa"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />

          <Input
            label="Email de Contato"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Telefone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Endereço"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Notificações de Novos Pedidos</p>
              <p className="text-sm text-gray-600">Receber alertas por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <Button type="submit">Salvar Alterações</Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
