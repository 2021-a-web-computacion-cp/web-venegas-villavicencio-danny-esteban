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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerolineaCrearDto = void 0;
const class_validator_1 = require("class-validator");
class AerolineaCrearDto {
}
__decorate([
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AerolineaCrearDto.prototype, "nombreair", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Max)(2021),
    (0, class_validator_1.Min)(1901),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AerolineaCrearDto.prototype, "anio_creacion", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], AerolineaCrearDto.prototype, "activa", void 0);
__decorate([
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AerolineaCrearDto.prototype, "vuelo", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AerolineaCrearDto.prototype, "pais_origen", void 0);
exports.AerolineaCrearDto = AerolineaCrearDto;
//# sourceMappingURL=aerolineaCraerDto.js.map