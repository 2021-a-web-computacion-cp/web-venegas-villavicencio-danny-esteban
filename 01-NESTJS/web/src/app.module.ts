import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    //modulo importados
    UsuarioModule,
  ],
  controllers: [
    //controladores de este modulo
    AppController,
  ],
  providers: [
    //servicios de este modulo

    AppService,
  ],
  exports: [
    //servicios exportados (que se pueden usar fuera de éste módulo)
    AppService,
  ],
})
export class AppModule {}
