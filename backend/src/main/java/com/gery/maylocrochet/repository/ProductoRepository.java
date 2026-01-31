package com.gery.maylocrochet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gery.maylocrochet.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {}
