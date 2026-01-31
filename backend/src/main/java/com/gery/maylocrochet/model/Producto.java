package com.gery.maylocrochet.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder // Útil para crear objetos de prueba rápidamente
@Table(name = "productos") // Es mejor usar minúsculas en SQL
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT") // Para que la descripción sea larga sin errores
    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    private String imagen;

    @Column(name = "pdfUrl") // Mapeo claro para el nombre de la columna en SQL
    private String pdfUrl;

    // CAMBIO IMPORTANTE: Usar Integer en lugar de Number
    // JPA no mapea bien la interfaz 'Number', prefiere tipos concretos
    private Integer stock;

    private String categoria;

    // Valor por defecto en false para evitar NullPointerExceptions
    @Column(name = "is_made_to_order", nullable = false)
    @Builder.Default
    private Boolean is_made_to_order = false;
}