package com.gery.maylocrochet.service.impl;

import com.gery.maylocrochet.model.Producto;
import com.gery.maylocrochet.repository.ProductoRepository;
import com.gery.maylocrochet.service.ProductoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

  private final ProductoRepository productoRepository;

  public ProductoServiceImpl(ProductoRepository productoRepository) {
    this.productoRepository = productoRepository;
  }

  @Override
  public List<Producto> getAllProductos() {
    return productoRepository.findAll();
  }

  @Override
  public Producto updateProducto(Long id, Producto producto) {
      return productoRepository.findById(id)
              .map(existingProducto -> {
                  producto.setId(id); // Asegurar que el id coincida
                  return productoRepository.save(producto);
              })
              .orElseThrow(() -> new RuntimeException("Producto con id " + id + " no encontrado"));
  }


  @Override
  public Producto saveProducto(Producto producto) {
    return productoRepository.save(producto);
  }

  @Override
  public void deleteProducto(Long id) {
    productoRepository.deleteById(id);
  }
  
}
