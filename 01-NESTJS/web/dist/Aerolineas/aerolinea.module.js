"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerolineaModule = void 0;
const common_1 = require("@nestjs/common");
const aerolinea_service_1 = require("./aerolinea.service");
const prisma_service_1 = require("./prisma.service");
const aerolinea_controller_1 = require("./aerolinea.controller");
let AerolineaModule = class AerolineaModule {
};
AerolineaModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [aerolinea_service_1.AerolineaService, prisma_service_1.PrismaService],
        exports: [aerolinea_service_1.AerolineaService],
        controllers: [aerolinea_controller_1.AerolineaController],
    })
], AerolineaModule);
exports.AerolineaModule = AerolineaModule;
//# sourceMappingURL=aerolinea.module.js.map