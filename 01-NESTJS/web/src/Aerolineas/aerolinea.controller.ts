import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { AerolineaCrearDto } from './Dto/aerolineaCraerDto';
import { validate } from 'class-validator';
import { AerolineaConsultaDto } from './Dto/aerolineaConsultaDto';

@Controller('aero')
export class AerolineaController{
  constructor(private AerolineaService: AerolineaService,
  ) {}

  @Get('lista-aerolinea')
  async listarAerolinea(@Res() response, @Query() parametrosConsulta) {
    //HAGO VALIDACIONES DE SKIP TAKE Y BUSQUEDA
    const AerolineaConsultarDto = new AerolineaConsultaDto();
    AerolineaConsultarDto.skip = parametrosConsulta.skip;
    AerolineaConsultarDto.take = parametrosConsulta.take;
    AerolineaConsultarDto.busqueda = parametrosConsulta.busqueda;
    try {
      const errores = await validate(AerolineaConsultarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuesta = await this.AerolineaService.buscarMuchos(
          AerolineaConsultarDto,
        );
        response.render('aerolinea/lista', {
          datos: { aerolinea: respuesta, mensaje: parametrosConsulta.mensaje },
        });
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en listar de aerolineas' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('aerolinea/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Get('vista-editar/:idAerolinea')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const aerolineaAEditar = await this.AerolineaService.buscarUno(
        +parametrosRuta.idAerolinea,
      );
      response.render('aerolinea/editar', {
        aerolinea: aerolineaAEditar,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Editar');
    }
  }

  @Post('editar-aerolinea-formulario')
  async editarAerolineaFormulario(@Res() response, @Body() bodyParams) {
    console.log(bodyParams);
    const aerolineaEditarDto = new AerolineaCrearDto();
    aerolineaEditarDto.nombreair = bodyParams.nombre;
    aerolineaEditarDto.anio_creacion = +bodyParams.anio;
    if (bodyParams.activa == 'true') {
      aerolineaEditarDto.activa = true;
    } else {
      aerolineaEditarDto.activa = false;
    }
    aerolineaEditarDto.vuelo = +bodyParams.vuelo;
    aerolineaEditarDto.pais_origen = bodyParams.pais_origen;
    console.log(aerolineaEditarDto);
    try {
      const errores = await validate(aerolineaEditarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        await this.AerolineaService.actualizarUno({
          id: +bodyParams.aerolineaId,
          data: aerolineaEditarDto,
        });
        response.redirect('/aero/lista-aerolinea');
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear aerolinea' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('crear-aerolinea-formulario')
  async crearAerolineaFormulario(@Res() response, @Body() bodyParams) {
    console.log(bodyParams);
    const aerolineaCrearDto = new AerolineaCrearDto();
    aerolineaCrearDto.nombreair = bodyParams.nombre;
    aerolineaCrearDto.anio_creacion = +bodyParams.anio;
    if (bodyParams.activa == 'true') {
      aerolineaCrearDto.activa = true;
    } else {
      aerolineaCrearDto.activa = false;
    }
    aerolineaCrearDto.vuelo = +bodyParams.vuelo;
    aerolineaCrearDto.pais_origen = bodyParams.pais_origen;
    try {
      const errores = await validate(aerolineaCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuestaUsuario = await this.AerolineaService.crearUno(
          aerolineaCrearDto,
        );
        response.redirect(
          '/aero/vista-crear' +
            '?mensaje=Se creo la aerolinea ' +
            bodyParams.nombreair,
        );
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear aerolinea' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('eliminar-aerolinea/:idAerolinea')
  async eliminarAerolinea(@Res() response, @Param() parametrosRuta) {
    try {
      await this.AerolineaService.eliminarUno(+parametrosRuta.idAerolinea);
      response.redirect(
        '/aero/lista-aerolinea' + '?mensaje= Se eliminó la aerolinea',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Eliminar');
    }
  }

  /*
    @Post('crear')
    async crearUno(@Body() bodyParams) {
      const bandaCrearDto = new AerolineaCrearDto();
      bandaCrearDto.nombre = bodyParams.nombre;
      bandaCrearDto.anio_creacion = bodyParams.anio_creacion;
      bandaCrearDto.activa = bodyParams.activa;
      bandaCrearDto.num_integrantes = bodyParams.num_integrantes;
      bandaCrearDto.genero = bodyParams.genero;
      try {
        const errores = await validate(bandaCrearDto);
        if (errores.length > 0) {
          console.log(JSON.stringify(errores));
          throw new BadRequestException('No envia bien paramentros');
        } else {
          return this.bandaService.crearUno(bandaCrearDto);
        }
      } catch (error) {
        console.error({ error: error, mensaje: 'Errores en crear aerolinea' });
        throw new InternalServerErrorException('Error servidor');
      }
    }*/
}
