import { Body, Controller, Delete, Get, Inject, Post, Query } from '@nestjs/common';
import { stringify } from 'querystring';
import { CriarJogadorDto } from '../dto/criar-jogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
    if (email) {
      return this.jogadoresService.consultarJogadorPorEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
