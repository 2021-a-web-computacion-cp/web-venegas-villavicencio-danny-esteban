import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";


export class AerolineaConsultaDto{
  @IsInt()
  @IsOptional()
  skip: number;

  @IsInt()
  @IsOptional()
  take: number;

  @MaxLength(10)
  @IsString()
  @IsOptional()
  busqueda: string;
}
