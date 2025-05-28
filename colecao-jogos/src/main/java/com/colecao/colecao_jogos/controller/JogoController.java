package com.colecao.colecao_jogos.controller;

import com.colecao.colecao_jogos.model.Jogo;
import com.colecao.colecao_jogos.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jogos")
public class JogoController {

    @Autowired
    private JogoRepository jogoRepository;

    // Listar todos os jogos
    @GetMapping
    public List<Jogo> listarJogos() {
        return jogoRepository.findAll();
    }

    // Buscar jogo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Jogo> buscarJogoPorId(@PathVariable Integer id) {
        Optional<Jogo> jogo = jogoRepository.findById(id);
        return jogo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Adicionar novo jogo
    @PostMapping
    public Jogo adicionarJogo(@RequestBody Jogo jogo) {
        return jogoRepository.save(jogo);
    }

    // Atualizar jogo existente
    @PutMapping("/{id}")
    public ResponseEntity<Jogo> atualizarJogo(@PathVariable Integer id, @RequestBody Jogo jogoAtualizado) {
        Optional<Jogo> optionalJogo = jogoRepository.findById(id);

        if (!optionalJogo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Jogo jogo = optionalJogo.get();
        jogo.setNome(jogoAtualizado.getNome());
        jogo.setData(jogoAtualizado.getData());
        jogo.setImagem(jogoAtualizado.getImagem());

        jogoRepository.save(jogo);

        return ResponseEntity.ok(jogo);
    }

    // Deletar jogo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarJogo(@PathVariable Integer id) {
        if (!jogoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        jogoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
