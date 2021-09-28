import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AerolineaService {
  constructor(private prisma: PrismaService) {}

  buscarUno(id: number) {
    return this.prisma.aEROLINEA.findUnique({
      where: { id: id },
    });
  }

  crearUno(aerolinea: Prisma.AEROLINEACreateInput) {
    return this.prisma.aEROLINEA.create({ data: aerolinea });
  }

  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
  }) {
    const or = parametrosBusqueda.busqueda
        ? {
          OR: [
            { nombreair: { contains: parametrosBusqueda.busqueda } },
            { pais_origen: { contains: parametrosBusqueda.busqueda } },
          ],
        }
        : {};
    return this.prisma.aEROLINEA.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.AEROLINEAUpdateInput;
  }) {
    return this.prisma.aEROLINEA.update({
      data: parametrosActualizar.data,
      where: { id: parametrosActualizar.id },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.aEROLINEA.delete({
      where: { id: id },
    });
  }
}
