// import React, { useEffect, useState } from "react";
// import type { Product, ProductFormData } from "../types/product";
// import { productService } from "../services/mockApi";
// import { ProductList } from "../components/products/ProductList";
// import { ProductForm } from "../components/products/ProductForm";
// import { Modal } from "../components/common/Modal";
// import { Button } from "../components/common/Button";
// import { LoadingSpinner } from "../components/common/LoadingSpinner";
// import { EmptyState } from "../components/common/EmptyState";
// import { Plus, Search, Package } from "lucide-react";
// import toast from "react-hot-toast";

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | undefined>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     filterProducts();
//   }, [searchTerm, products]);

//   const loadProducts = async () => {
//     setLoading(true);
//     try {
//       const data = await productService.getAll();
//       setProducts(data);
//     } catch (error) {
//       toast.error("Erro ao carregar produtos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     if (!searchTerm) {
//       setFilteredProducts(products);
//       return;
//     }
//     const filtered = products.filter((p) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   const handleCreate = async (data: ProductFormData) => {
//     try {
//       await productService.create(data);
//       toast.success("Produto criado com sucesso!");
//       setShowModal(false);
//       loadProducts();
//     } catch (error) {
//       toast.error("Erro ao criar produto");
//     }
//   };

//   const handleUpdate = async (data: ProductFormData) => {
//     if (!editingProduct) return;
//     try {
//       await productService.update(editingProduct.id, data);
//       toast.success("Produto atualizado com sucesso!");
//       setShowModal(false);
//       setEditingProduct(undefined);
//       loadProducts();
//     } catch (error) {
//       toast.error("Erro ao atualizar produto");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Tem certeza que deseja excluir este produto?")) return;
//     try {
//       await productService.delete(id);
//       toast.success("Produto excluído com sucesso!");
//       loadProducts();
//     } catch (error) {
//       toast.error("Erro ao excluir produto");
//     }
//   };

//   const handleEdit = (product: Product) => {
//     setEditingProduct(product);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingProduct(undefined);
//   };

//   const handleNewProduct = () => {
//     setEditingProduct(undefined);
//     setShowModal(true);
//   };

//   if (loading) {
//     return <LoadingSpinner text="Carregando produtos..." />;
//   }

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Produtos</h2>
//         <Button icon={Plus} onClick={handleNewProduct}>
//           Novo Produto
//         </Button>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <div className="relative max-w-md">
//           <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Buscar produtos..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Products List or Empty State */}
//       {filteredProducts.length === 0 && !searchTerm ? (
//         <EmptyState
//           icon={Package}
//           title="Nenhum produto cadastrado"
//           description="Comece adicionando seu primeiro produto ao sistema"
//           action={{
//             label: "Adicionar Produto",
//             onClick: handleNewProduct,
//           }}
//         />
//       ) : filteredProducts.length === 0 && searchTerm ? (
//         <EmptyState
//           icon={Search}
//           title="Nenhum produto encontrado"
//           description={`Não encontramos produtos com "${searchTerm}"`}
//         />
//       ) : (
//         <ProductList
//           products={filteredProducts}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}

//       {/* Product Form Modal */}
//       <Modal
//         isOpen={showModal}
//         onClose={handleCloseModal}
//         title={editingProduct ? "Editar Produto" : "Novo Produto"}
//       >
//         <ProductForm
//           product={editingProduct}
//           onSubmit={editingProduct ? handleUpdate : handleCreate}
//           onCancel={handleCloseModal}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import type { Product, ProductFormData } from "../types/product";
import { productService } from "../services/realApi";
import { ProductList } from "../components/products/ProductList";
import { ProductForm } from "../components/products/ProductForm";
import { Modal } from "../components/common/Modal";
import { Button } from "../components/common/Button";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";
import { Plus, Search, Package } from "lucide-react";
import toast from "react-hot-toast";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCreate = async (data: ProductFormData) => {
    try {
      await productService.create(data);
      toast.success("Produto criado com sucesso!");
      setShowModal(false);
      loadProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto");
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editingProduct) return;
    try {
      await productService.update(editingProduct.id, data);
      toast.success("Produto atualizado com sucesso!");
      setShowModal(false);
      setEditingProduct(undefined);
      loadProducts();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Erro ao atualizar produto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await productService.delete(id);
      toast.success("Produto excluído com sucesso!");
      loadProducts();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(undefined);
  };

  const handleNewProduct = () => {
    setEditingProduct(undefined);
    setShowModal(true);
  };

  if (loading) {
    return <LoadingSpinner text="Carregando produtos..." />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Produtos</h2>
        <Button icon={Plus} onClick={handleNewProduct}>
          Novo Produto
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products List or Empty State */}
      {filteredProducts.length === 0 && !searchTerm ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto cadastrado"
          description="Comece adicionando seu primeiro produto ao sistema"
          action={{
            label: "Adicionar Produto",
            onClick: handleNewProduct,
          }}
        />
      ) : filteredProducts.length === 0 && searchTerm ? (
        <EmptyState
          icon={Search}
          title="Nenhum produto encontrado"
          description={`Não encontramos produtos com "${searchTerm}"`}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? "Editar Produto" : "Novo Produto"}
      >
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Products;
