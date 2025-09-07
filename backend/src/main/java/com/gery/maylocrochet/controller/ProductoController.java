package com.gery.maylocrochet.controller;

import com.gery.maylocrochet.model.Producto;
import com.gery.maylocrochet.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

  private final ProductoService productoService;
  
  public ProductoController(ProductoService productoService) {
    this.productoService = productoService;
  }

  // Get: Obtener Los Productos
  @GetMapping
  public List<Producto> getAllProductos() {
    return productoService.getAllProductos();
  }

  // Get: Obtener Producto Por ID
  @GetMapping("/{id}")
  public Optional<Producto> getProductoById(@PathVariable Long id) {
    return productoService.getProductoById(id);
  }

  // Post: Crear Nuevo Producto
  @PostMapping
  public Producto createProducto(@RequestBody Producto producto) {
    return productoService.saveProducto(producto);
  }

  // Put: Actualizar Producto Existente
  @PutMapping("/{id}")
  public Producto updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
    producto.setId(id);
    // productoService.getProductoById(id);
    return productoService.saveProducto(producto);
  }

  // Delete: Eliminar Producto
  @DeleteMapping("/{id}")
  public void deleteProducto(@PathVariable Long id) {
    productoService.deleteProducto(id);
  }
}
