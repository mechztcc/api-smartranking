import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { CriarJogadorDto } from '../dto/criar-jogador.dto';
import { Jogador } from '../interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

    if (jogadorEncontrado) {
      this.atualizar(criarJogadorDto, jogadorEncontrado);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email}, não encontrado!`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

    this.jogadores = this.jogadores.filter((jogador) => jogador.email !== jogadorEncontrado.email);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: v4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'emptyUrl',
    };

    this.jogadores.push(jogador);
    this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
  }

  private atualizar(criarJogadorDto: CriarJogadorDto, jogadorEncontrado: Jogador): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
