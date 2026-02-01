package com.gery.maylocrochet.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.gery.maylocrochet.model.Producto;

@SpringBootTest
class ProductoServiceTests {

    @Autowired
    private ProductoService productoService;

    @Test
    void deberiaCrearProducto() {
        // Arrange (Preparar)
        Producto producto = Producto.builder()
                .nombre("Test Amigurumi")
                .descripcion("Descripción de prueba")
                .precio(50000.0)
                .categoria("Amigurumi")
                .imagen("/uploads/test.jpg")
                .stock(10)
                .is_made_to_order(false)
                .build();

        // Act (Actuar)
        Producto saved = productoService.saveProducto(producto);

        // Assert (Verificar)
        assertNotNull(saved.getId());
        assertEquals("Test Amigurumi", saved.getNombre());
        assertEquals(50000.0, saved.getPrecio());
        assertEquals("Amigurumi", saved.getCategoria());
    }

    @Test
    void deberiaObtenerTodosLosProductos() {
        // Arrange
        Producto producto1 = Producto.builder()
                .nombre("Producto 1")
                .descripcion("Desc 1")
                .precio(10000.0)
                .categoria("Llavero")
                .imagen("/test1.jpg")
                .stock(5)
                .is_made_to_order(false)
                .build();

        Producto producto2 = Producto.builder()
                .nombre("Producto 2")
                .descripcion("Desc 2")
                .precio(20000.0)
                .categoria("Ramo")
                .imagen("/test2.jpg")
                .stock(3)
                .is_made_to_order(false)
                .build();

        productoService.saveProducto(producto1);
        productoService.saveProducto(producto2);

        // Act
        var productos = productoService.getAllProducto();

        // Assert
        assertTrue(productos.size() >= 2);
    }

    @Test
    void deberiaActualizarProducto() {
        // Arrange
        Producto producto = Producto.builder()
                .nombre("Original")
                .descripcion("Desc original")
                .precio(10000.0)
                .categoria("Amigurumi")
                .imagen("/test.jpg")
                .stock(5)
                .is_made_to_order(false)
                .build();

        Producto saved = productoService.saveProducto(producto);

        // Act
        saved.setNombre("Actualizado");
        saved.setPrecio(15000.0);
        Producto updated = productoService.updateProducto(saved.getId(), saved);

        // Assert
        assertEquals("Actualizado", updated.getNombre());
        assertEquals(15000.0, updated.getPrecio());
    }

    @Test
    void deberiaEliminarProducto() {
        // Arrange
        Producto producto = Producto.builder()
                .nombre("Para eliminar")
                .descripcion("Desc")
                .precio(10000.0)
                .categoria("Amigurumi")
                .imagen("/test.jpg")
                .stock(5)
                .is_made_to_order(false)
                .build();

        Producto saved = productoService.saveProducto(producto);
        Long id = saved.getId();

        // Act
        productoService.deleteProducto(id);

        // Assert
        assertThrows(Exception.class, () -> {
            productoService.getProductoById(id);
        });
    }
}