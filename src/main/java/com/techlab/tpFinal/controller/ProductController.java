package com.techlab.tpFinal.controller;

import com.techlab.tpFinal.entity.Producto;
import com.techlab.tpFinal.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Producto crear(@RequestBody Producto p) {
        return service.crearProducto(p);
    }

    @GetMapping
    public List<Producto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Producto buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return "Producto eliminado";
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto cambios) {
        return service.actualizarProducto(id, cambios);
    }

    @PostMapping("/lista")
    public List<Producto> crearLista(@RequestBody List<Producto> productos) {
        return service.guardarLista(productos);
    }


}
