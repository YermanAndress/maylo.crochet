package com.gery.maylocrochet.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.gery.maylocrochet.model.Producto;
import com.gery.maylocrochet.service.ProductoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAllProducto() {
        return productoService.getAllProducto();
    }

    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    // 2. Mejorar manejo de errores en ProductoController
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createProducto(
            @Valid @ModelAttribute Producto producto,
            BindingResult result,
            @RequestParam(value = "archivoImagen", required = true) MultipartFile file,
            @RequestParam(value = "pdf", required = false) MultipartFile pdf) throws IOException {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "La imagen es obligatoria"));
        }

        // Validar tipo de archivo
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Solo se permiten archivos de imagen"));
        }

        String rutaImagen = productoService.guardarArchivo(file, "imagenes");
        producto.setImagen(rutaImagen);

        if (pdf != null && !pdf.isEmpty()) {
            if (!"application/pdf".equals(pdf.getContentType())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Solo se permiten archivos PDF"));
            }
            producto.setPdfUrl(productoService.guardarArchivo(pdf, "patrones"));
        }

        Producto saved = productoService.saveProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Producto updateProducto(
            @PathVariable Long id,
            @ModelAttribute Producto productoActualizado,
            BindingResult result,
            @RequestParam(value = "archivoImagen", required = false) MultipartFile file,
            @RequestParam(value = "pdf", required = false) MultipartFile pdf) throws IOException {

        if (result.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error en los datos");
        }

        Producto existente = productoService.getProductoById(id);

        // 1. Manejo de IMAGEN (Reusando guardarArchivo)
        if (file != null && !file.isEmpty()) {
            // Usamos el método genérico indicando la carpeta 'imagenes'
            productoActualizado.setImagen(productoService.guardarArchivo(file, "imagenes"));
        } else if (productoActualizado.getImagen() == null || productoActualizado.getImagen().isEmpty()) {
            // Si no subió nada nuevo y el string 'imagen' llegó vacío, rescatamos la ruta
            // vieja
            productoActualizado.setImagen(existente.getImagen());
        }

        // 2. Manejo de PDF (Reusando guardarArchivo)
        if (pdf != null && !pdf.isEmpty()) {
            productoActualizado.setPdfUrl(productoService.guardarArchivo(pdf, "patrones"));
        } else {
            // Mantiene el PDF anterior si no se sube uno nuevo
            productoActualizado.setPdfUrl(existente.getPdfUrl());
        }

        return productoService.updateProducto(id, productoActualizado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }
}