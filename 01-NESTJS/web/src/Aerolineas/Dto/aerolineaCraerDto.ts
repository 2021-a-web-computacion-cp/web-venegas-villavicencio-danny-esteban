
import {IsBoolean, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class AerolineaCrearDto {
  @MinLength(2) //ej:U2
  @MaxLength(15)
  @IsString()
  @IsNotEmpty()
  nombreair: string;

  @IsInt()
  @Max(2021)
  @Min(1901)
  @IsNotEmpty()
  anio_creacion: number;

  @IsBoolean()
  @IsNotEmpty()
  activa: boolean;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  vuelo: number;

  @MinLength(3) //ej:pop
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  pais_origen: string;
}
