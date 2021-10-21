import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';

import { CriarJogadorDto } from '../dto/criar-jogador.dto';
import { Jogador } from '../interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.criar(criarJogadorDto);
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
}
