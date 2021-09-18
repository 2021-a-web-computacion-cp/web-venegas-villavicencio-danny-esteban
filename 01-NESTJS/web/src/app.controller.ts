import {
  BadRequestException, Body, Headers,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res, Query, Param, Header, Put
} from '@nestjs/common';
import { AppService } from './app.service';
import {get} from "http";
import {query} from "express";
import {ok} from "assert";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // SUMA
  @Get('suma')
  @HttpCode(200)
  suma(
      @Query() values,
      @Req() request,
      @Res({passthrough: true}) response,
  ): string {
    let parametersResult = Number(values.first_value) + Number(values.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
        response.cookie(
            'total',
            100,
            {
              signed: true
            }
        )
        return "Terminaste el juego"
      } else {
        response.cookie(
            'total',
            newValue,
            {
              signed: true
            }
        )
        return "El nuevo valor es: "+newValue;
      }
    } else {
      response.cookie(
          'total',
          100,
          {
            signed: true
          }
      )
      response.send('Cookie seteada por primera vez')
    }
  }


  // RESTA
  @Post('resta')
  @HttpCode(201)
  @Header('RESULTADO','VALUE')
  resta(
      @Body() values,
      @Req() request,
      @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(values.first_value) - Number(values.second_value);
    response.header['RESULTADO']=parametersResult.toString()
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
        response.cookie(
            'total',
            100,
            {
              signed: true,
            }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
            'total',
            newValue,
            {
              signed: true,
            }
        )
        return "El nuevo valor es: "+newValue;
      }
    } else {
      response.cookie(
          'total',
          100,
          {
            signed: true,
          }
      )
      response.send('Cookie seteada por primera vez')
    }
  }

  // Multiplicacion
  @Put('multiplicacion/:first_value/:second_value')
  @HttpCode(200)
  multiplicacion(
      @Param() values,
      @Req() request,
      @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(values.first_value) * Number(values.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
        response.cookie(
            'total',
            100,
            {
              signed: true,
            }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
            'total',
            newValue,
            {
              signed: true,
            }
        )
        return "El nuevo valor es: "+newValue;
      }
    } else {
      response.cookie(
          'total',
          100,
          {
            signed: true,
          }
      )
      response.send('Cookie seteada por primera vez')
    }
  }

  // DIVISION
  @Get('division')
  @HttpCode(201)
  division(
      @Headers() headers,
      @Req() request,
      @Res({passthrough: true}) response,
  ){
    let parametersResult = Number(headers.first_value) / Number(headers.second_value);
    if (request.signedCookies['total'] != undefined || !isNaN(request.signedCookies['total'])) {
      let actualValue = Number(request.signedCookies['total']);
      let newValue = actualValue - parametersResult;
      if (newValue<=0) {
        response.cookie(
            'total',
            100,
            {
              signed: true,
            }
        )
        return "Terminaste el juego";
      } else {
        response.cookie(
            'total',
            newValue,
            {
              signed: true,
            }
        )
        return "El nuevo valor es: "+newValue;
      }
    } else {
      response.cookie(
          'total',
          100,
          {
            signed: true,
          }
      )
      response.send('Cookie seteada por primera vez')
    }
  }





  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  holaTexto() {
    return 'Hola texto'
  }
  @Get('html')
  @HttpCode(200)
  holaHtml(): string {
    return '<h1>Hola HTML </h1>>'
  }
  @Get('json')
  @HttpCode(200)
  holaJson(): string {
    return '{mensaje:"Hola json"}';
  }
  @Get('bad-request')
  badRequest(){
   throw new BadRequestException();
  }
  @Get('internal-error')
  internalError(){
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
      @Req() req, //request peticion del usuario
      @Res() res, //response
  ){
    res.cookie(
        'galletaInsegura', //nombre
        'tengo hambre', //valor
    );
    res.cookie(
        'galletaSeguraYFirmada',
        'web :3',
        {
          secure: true,//solo se transfire por canales confiables
          signed: true
        }
    );

    res.send('ok')
  };

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req){
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,

    };
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('cache-control','none') //Cabeceras de respuesta
  @Header('EPN','SISTEMAS')
  parametroConsulta(
      @Query() queryParams, //REQUEST
      @Param() params, //RESPONSE
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    }
  }



  @Post('parametros-cuerpo')//201
  @HttpCode(200)
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
  ){
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion
    }
  }



}

