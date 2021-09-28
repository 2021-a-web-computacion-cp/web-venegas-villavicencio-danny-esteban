import { Module } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { PrismaService } from './prisma.service';
import { AerolineaController } from './aerolinea.controller';

@Module({
  imports: [],
  providers: [AerolineaService, PrismaService],
  exports: [AerolineaService],
  controllers: [AerolineaController],
})
export class AerolineaModule {}
