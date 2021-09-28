"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerolineaController = void 0;
const common_1 = require("@nestjs/common");
const aerolinea_service_1 = require("./aerolinea.service");
const aerolineaCraerDto_1 = require("./Dto/aerolineaCraerDto");
const class_validator_1 = require("class-validator");
const aerolineaConsultaDto_1 = require("./Dto/aerolineaConsultaDto");
let AerolineaController = class AerolineaController {
    constructor(AerolineaService) {
        this.AerolineaService = AerolineaService;
    }
    async listarAerolinea(response, parametrosConsulta) {
        const AerolineaConsultarDto = new aerolineaConsultaDto_1.AerolineaConsultaDto();
        AerolineaConsultarDto.skip = parametrosConsulta.skip;
        AerolineaConsultarDto.take = parametrosConsulta.take;
        AerolineaConsultarDto.busqueda = parametrosConsulta.busqueda;
        try {
            const errores = await (0, class_validator_1.validate)(AerolineaConsultarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuesta = await this.AerolineaService.buscarMuchos(AerolineaConsultarDto);
                response.render('aerolinea/lista', {
                    datos: { aerolinea: respuesta, mensaje: parametrosConsulta.mensaje },
                });
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en listar de aerolineas' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('aerolinea/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const aerolineaAEditar = await this.AerolineaService.buscarUno(+parametrosRuta.idAerolinea);
            response.render('aerolinea/editar', {
                aerolinea: aerolineaAEditar,
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async editarAerolineaFormulario(response, bodyParams) {
        console.log(bodyParams);
        const aerolineaEditarDto = new aerolineaCraerDto_1.AerolineaCrearDto();
        aerolineaEditarDto.nombreair = bodyParams.nombre;
        aerolineaEditarDto.anio_creacion = +bodyParams.anio;
        if (bodyParams.activa == 'true') {
            aerolineaEditarDto.activa = true;
        }
        else {
            aerolineaEditarDto.activa = false;
        }
        aerolineaEditarDto.vuelo = +bodyParams.vuelo;
        aerolineaEditarDto.pais_origen = bodyParams.pais_origen;
        console.log(aerolineaEditarDto);
        try {
            const errores = await (0, class_validator_1.validate)(aerolineaEditarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                await this.AerolineaService.actualizarUno({
                    id: +bodyParams.aerolineaId,
                    data: aerolineaEditarDto,
                });
                response.redirect('/aero/lista-aerolinea');
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear aerolinea' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async crearAerolineaFormulario(response, bodyParams) {
        console.log(bodyParams);
        const aerolineaCrearDto = new aerolineaCraerDto_1.AerolineaCrearDto();
        aerolineaCrearDto.nombreair = bodyParams.nombre;
        aerolineaCrearDto.anio_creacion = +bodyParams.anio;
        if (bodyParams.activa == 'true') {
            aerolineaCrearDto.activa = true;
        }
        else {
            aerolineaCrearDto.activa = false;
        }
        aerolineaCrearDto.vuelo = +bodyParams.vuelo;
        aerolineaCrearDto.pais_origen = bodyParams.pais_origen;
        try {
            const errores = await (0, class_validator_1.validate)(aerolineaCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuestaUsuario = await this.AerolineaService.crearUno(aerolineaCrearDto);
                response.redirect('/aero/vista-crear' +
                    '?mensaje=Se creo la aerolinea ' +
                    bodyParams.nombreair);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear aerolinea' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async eliminarAerolinea(response, parametrosRuta) {
        try {
            await this.AerolineaService.eliminarUno(+parametrosRuta.idAerolinea);
            response.redirect('/aero/lista-aerolinea' + '?mensaje= Se eliminó la aerolinea');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Eliminar');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-aerolinea'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "listarAerolinea", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AerolineaController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)('vista-editar/:idAerolinea'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "vistaEditar", null);
__decorate([
    (0, common_1.Post)('editar-aerolinea-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "editarAerolineaFormulario", null);
__decorate([
    (0, common_1.Post)('crear-aerolinea-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "crearAerolineaFormulario", null);
__decorate([
    (0, common_1.Post)('eliminar-aerolinea/:idAerolinea'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "eliminarAerolinea", null);
AerolineaController = __decorate([
    (0, common_1.Controller)('aero'),
    __metadata("design:paramtypes", [aerolinea_service_1.AerolineaService])
], AerolineaController);
exports.AerolineaController = AerolineaController;
//# sourceMappingURL=aerolinea.controller.js.map