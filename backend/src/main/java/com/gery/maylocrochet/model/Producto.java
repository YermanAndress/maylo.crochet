package com.gery.maylocrochet.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// backend/src/main/java/com/gery/maylocrochet/model/Producto.java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @Column(columnDefinition = "TEXT")
    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @Column(nullable = false)
    @Positive(message = "El precio debe ser mayor a 0")
    @Max(value = 10000000, message = "El precio no puede exceder 10,000,000")
    private Double precio;

    @Column(nullable = false)
    private String imagen;

    private String pdfUrl;

    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    @Column(nullable = false)
    @Pattern(regexp = "Amigurumi|Llavero|Ramo|Personalizado|Patron", message = "Categoría no válida")
    private String categoria;

    @Column(name = "is_made_to_order", nullable = false)
    @Builder.Default
    private Boolean is_made_to_order = false;

}