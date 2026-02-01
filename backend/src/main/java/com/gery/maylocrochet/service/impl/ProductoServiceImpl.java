package com.gery.maylocrochet.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gery.maylocrochet.exception.ResourceNotFoundException;
import com.gery.maylocrochet.model.Producto;
import com.gery.maylocrochet.repository.ProductoRepository;
import com.gery.maylocrochet.service.ProductoService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public List<Producto> getAllProducto() {
        return productoRepository.findAll();
    }

    // Asegurar que el id coincida
    @Override
    public Producto updateProducto(Long id, Producto producto) {
        return productoRepository
                .findById(id)
                .map(existingProducto -> {
                    producto.setId(id);
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto con id " + id + " no encontrado"));
    }

    @Override
    public void deleteProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("ID " + id + " no existe");
        }
        productoRepository.deleteById(id);
    }

    @Override
    public Producto getProductoById(Long id) {
        return productoRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto con id " + id + " no encontrado"));
    }

    @Override
    public String guardarArchivo(MultipartFile archivo, String subCarpeta)
            throws IOException {
        if (archivo == null || archivo.isEmpty())
            return null;

        String nombreArchivo = System.currentTimeMillis() + "_" + archivo.getOriginalFilename();
        Path ruta = Paths.get("uploads/" + subCarpeta + "/" + nombreArchivo);

        Files.createDirectories(ruta.getParent());
        Files.write(ruta, archivo.getBytes());

        log.info("Archivo guardado: {}", ruta);
        return "/uploads/" + subCarpeta + "/" + nombreArchivo;
    }

    // Ahora puedes simplificar guardarImagen usando el método de arriba:
    /*
     * @Override
     * public String guardarImagen(MultipartFile imagen) throws IOException {
     * return guardarArchivo(imagen, "imagenes");
     * }
     */
}
