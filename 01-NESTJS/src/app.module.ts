import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// @ts-ignore

import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioService } from './usuario/usuario.service';

@Module({
  imports: [ //modulo importados
    UsuarioModule,
  ],
  controllers: [//controladores de este modulo
    AppController,
  ],
  providers: [//servicios de este modulo

    AppService,

  ],
  exports: [//servicios exportados (que se pueden usar fuera de éste módulo)
    AppService,
  ],
})
export class AppModule {}