package com.gery.maylocrochet.service;

import com.gery.maylocrochet.model.Producto;
import java.util.List;
import java.util.Optional;

public interface ProductoService {
  List<Producto> getAllProductos();
  Optional<Producto> getProductoById(Long id);
  Producto saveProducto(Producto producto);
  void deleteProducto(Long id);
}
