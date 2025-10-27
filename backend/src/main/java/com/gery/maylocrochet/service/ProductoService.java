package com.gery.maylocrochet.service;

import com.gery.maylocrochet.model.Producto;
import java.util.List;
import java.util.Optional;

public interface ProductoService {
  Producto saveProducto(Producto producto);
  List<Producto> getAllProductos();
  Producto updateProducto(Long id, Producto producto);
  void deleteProducto(Long id);
  Optional<Producto> getProductoById(Long id);
}
