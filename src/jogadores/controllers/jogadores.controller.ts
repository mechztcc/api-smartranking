import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CriarJogadorDto } from '../dto/criar-jogador.dto';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }
}
