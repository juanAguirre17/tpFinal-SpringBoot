package com.techlab.tpFinal.service;

import com.techlab.tpFinal.entity.Producto;
import com.techlab.tpFinal.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public Producto crearProducto(Producto p) {
        return repo.save(p);
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Producto actualizarProducto(Long id, Producto cambios) {
        Producto producto = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        if(cambios.getName() != null && !cambios.getName().isBlank())
            producto.setName(cambios.getName());

        if(cambios.getDescription() != null && !cambios.getDescription().isBlank())
            producto.setDescription(cambios.getDescription());

        if(cambios.getPrice() != null)
            producto.setPrice(cambios.getPrice());

        if(cambios.getStock() != null)
            producto.setStock(cambios.getStock());

        if(cambios.getCategory() != null && !cambios.getCategory().isBlank())
            producto.setCategory(cambios.getCategory());

        return repo.save(producto);
    }

    public List<Producto> guardarLista(List<Producto> productos){
        return repo.saveAll(productos);
    }


}