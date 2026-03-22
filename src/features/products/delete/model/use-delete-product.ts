export const useDeleteProduct = () => {
  const deleteProduct = async (id: number) => {
    console.log('Delete product:', id);
  };

  return { deleteProduct };
};
