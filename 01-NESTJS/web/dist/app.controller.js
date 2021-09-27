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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    helloText() {
        return 'Hola Texto';
    }
    HelloHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    helloJson() {
        return '{mensaje: "Hola JSON"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSegura', 'Web :3', {
            secure: true,
            signe: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsilta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
    suma(values, request, response) {
        const parametersResult = Number(values.first_value) + Number(values.second_value);
        if (request.signedCookies['total'] != undefined ||
            !isNaN(request.signedCookies['total'])) {
            const actualValue = Number(request.signedCookies['total']);
            const newValue = actualValue - parametersResult;
            if (newValue <= 0) {
                response.cookie('total', 100, {
                    signed: true,
                });
                return 'Terminaste el juego';
            }
            else {
                response.cookie('total', newValue, {
                    signed: true,
                });
                return 'El nuevo valor es: ' + newValue;
            }
        }
        else {
            response.cookie('total', 100, {
                signed: true,
            });
            response.send('Cookie seteada por primera vez');
        }
    }
    resta(values, request, response) {
        const parametersResult = Number(values.first_value) - Number(values.second_value);
        response.header['RESULTADO'] = parametersResult.toString();
        if (request.signedCookies['total'] != undefined ||
            !isNaN(request.signedCookies['total'])) {
            const actualValue = Number(request.signedCookies['total']);
            const newValue = actualValue - parametersResult;
            if (newValue <= 0) {
                response.cookie('total', 100, {
                    signed: true,
                });
                return 'Terminaste el juego';
            }
            else {
                response.cookie('total', newValue, {
                    signed: true,
                });
                return 'El nuevo valor es: ' + newValue;
            }
        }
        else {
            response.cookie('total', 100, {
                signed: true,
            });
            response.send('Cookie seteada por primera vez');
        }
    }
    multiplicacion(values, request, response) {
        const parametersResult = Number(values.first_value) * Number(values.second_value);
        if (request.signedCookies['total'] != undefined ||
            !isNaN(request.signedCookies['total'])) {
            const actualValue = Number(request.signedCookies['total']);
            const newValue = actualValue - parametersResult;
            if (newValue <= 0) {
                response.cookie('total', 100, {
                    signed: true,
                });
                return 'Terminaste el juego';
            }
            else {
                response.cookie('total', newValue, {
                    signed: true,
                });
                return 'El nuevo valor es: ' + newValue;
            }
        }
        else {
            response.cookie('total', 100, {
                signed: true,
            });
            response.send('Cookie seteada por primera vez');
        }
    }
    division(headers, request, response) {
        const parametersResult = Number(headers.first_value) / Number(headers.second_value);
        if (request.signedCookies['total'] != undefined ||
            !isNaN(request.signedCookies['total'])) {
            const actualValue = Number(request.signedCookies['total']);
            const newValue = actualValue - parametersResult;
            if (newValue <= 0) {
                response.cookie('total', 100, {
                    signed: true,
                });
                return 'Terminaste el juego';
            }
            else {
                response.cookie('total', newValue, {
                    signed: true,
                });
                return 'El nuevo valor es: ' + newValue;
            }
        }
        else {
            response.cookie('total', 100, {
                signed: true,
            });
            response.send('Cookie seteada por primera vez');
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('texto'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloText", null);
__decorate([
    (0, common_1.Get)('html'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "HelloHTML", null);
__decorate([
    (0, common_1.Get)('json'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "helloJson", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    (0, common_1.Get)('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    (0, common_1.Get)('setear-cookie-insegura'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    (0, common_1.Get)('mostrar-cookies'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    (0, common_1.Get)('parametros-consulta/:nombre/:otroParametro'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('Cache-control', 'none'),
    (0, common_1.Header)('EPN', 'Sistenas'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    (0, common_1.Post)('parametros-Cuerpo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
__decorate([
    (0, common_1.Get)('suma'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "suma", null);
__decorate([
    (0, common_1.Post)('resta'),
    (0, common_1.HttpCode)(201),
    (0, common_1.Header)('RESULTADO', 'VALUE'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    (0, common_1.Put)('multiplicacion/:first_value/:second_value'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    (0, common_1.Get)('division'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map