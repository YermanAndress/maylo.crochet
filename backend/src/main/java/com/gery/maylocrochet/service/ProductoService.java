package com.gery.maylocrochet.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.gery.maylocrochet.model.Producto;

public interface ProductoService {
    Producto saveProducto(Producto producto);

    List<Producto> getAllProducto();

    Producto updateProducto(Long id, Producto producto);

    void deleteProducto(Long id);

    Producto getProductoById(Long id);

    /*
     * String guardarImagen(MultipartFile imagen) throws IOException;
     */
    String guardarArchivo(MultipartFile archivo, String subCarpeta)
            throws IOException;
}
