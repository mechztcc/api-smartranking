import { Module } from '@nestjs/common';
import { JogadoresController } from '../jogadores/controllers/jogadores.controller';
import { JogadoresService } from './services/jogadores.service';

@Module({
    controllers: [JogadoresController],
    providers: [JogadoresService],
})
export class JogadoresModule {}
