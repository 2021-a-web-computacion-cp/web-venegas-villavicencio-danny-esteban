import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  helloText(): string {
    return 'Hola Texto';
  }
  @Get('html')
  @HttpCode(201)
  HelloHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }
  @Get('json')
  @HttpCode(200)
  helloJson(): string {
    return '{mensaje: "Hola JSON"}';
  }
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }
  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }
  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //Request - PETICION
    @Res() res,
  ) {
    res.cookie('galletaInsegura', 'Tengo hambre');

    res.cookie('galletaSegura', 'Web :3', {
      secure: true,
      signe: true,
    });

    res.send('ok'); // return de antes
  }
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
  @Get('parametros-consulta/:nombre/:otroParametro')
  @HttpCode(200)
  @Header('Cache-control', 'none') //Cabeceras de respuesta (response headers)
  @Header('EPN', 'Sistenas') //Cabeceras de respuesta (response headers)
  parametrosConsulta(@Query() queryParams, @Param() params) {
    return {
      parametrosConsilta: queryParams,
      parametrosRuta: params,
    };
  }
  @Post('parametros-Cuerpo') //201 Creado ( Por Defecto)
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabecerasPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
  @Get('suma')
  @HttpCode(200)
  suma(
    @Query() values,
    @Req() request,
    @Res({ passthrough: true }) response,
  ): string {
    const parametersResult =
      Number(values.first_value) + Number(values.second_value);
    if (
      request.signedCookies['total'] != undefined ||
      !isNaN(request.signedCookies['total'])
    ) {
      const actualValue = Number(request.signedCookies['total']);
      const newValue = actualValue - parametersResult;
      if (newValue <= 0) {
        response.cookie('total', 100, {
          signed: true,
        });
        return 'Terminaste el juego';
      } else {
        response.cookie('total', newValue, {
          signed: true,
        });
        return 'El nuevo valor es: ' + newValue;
      }
    } else {
      response.cookie('total', 100, {
        signed: true,
      });
      response.send('Cookie seteada por primera vez');
    }
  }

  // RESTA
  @Post('resta')
  @HttpCode(201)
  @Header('RESULTADO', 'VALUE')
  resta(@Body() values, @Req() request, @Res({ passthrough: true }) response) {
    const parametersResult =
      Number(values.first_value) - Number(values.second_value);
    response.header['RESULTADO'] = parametersResult.toString();
    if (
      request.signedCookies['total'] != undefined ||
      !isNaN(request.signedCookies['total'])
    ) {
      const actualValue = Number(request.signedCookies['total']);
      const newValue = actualValue - parametersResult;
      if (newValue <= 0) {
        response.cookie('total', 100, {
          signed: true,
        });
        return 'Terminaste el juego';
      } else {
        response.cookie('total', newValue, {
          signed: true,
        });
        return 'El nuevo valor es: ' + newValue;
      }
    } else {
      response.cookie('total', 100, {
        signed: true,
      });
      response.send('Cookie seteada por primera vez');
    }
  }

  // Multiplicacion
  @Put('multiplicacion/:first_value/:second_value')
  @HttpCode(200)
  multiplicacion(
    @Param() values,
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    const parametersResult =
      Number(values.first_value) * Number(values.second_value);
    if (
      request.signedCookies['total'] != undefined ||
      !isNaN(request.signedCookies['total'])
    ) {
      const actualValue = Number(request.signedCookies['total']);
      const newValue = actualValue - parametersResult;
      if (newValue <= 0) {
        response.cookie('total', 100, {
          signed: true,
        });
        return 'Terminaste el juego';
      } else {
        response.cookie('total', newValue, {
          signed: true,
        });
        return 'El nuevo valor es: ' + newValue;
      }
    } else {
      response.cookie('total', 100, {
        signed: true,
      });
      response.send('Cookie seteada por primera vez');
    }
  }

  // DIVISION
  @Get('division')
  @HttpCode(201)
  division(
    @Headers() headers,
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    const parametersResult =
      Number(headers.first_value) / Number(headers.second_value);
    if (
      request.signedCookies['total'] != undefined ||
      !isNaN(request.signedCookies['total'])
    ) {
      const actualValue = Number(request.signedCookies['total']);
      const newValue = actualValue - parametersResult;
      if (newValue <= 0) {
        response.cookie('total', 100, {
          signed: true,
        });
        return 'Terminaste el juego';
      } else {
        response.cookie('total', newValue, {
          signed: true,
        });
        return 'El nuevo valor es: ' + newValue;
      }
    } else {
      response.cookie('total', 100, {
        signed: true,
      });
      response.send('Cookie seteada por primera vez');
    }
  }
}
