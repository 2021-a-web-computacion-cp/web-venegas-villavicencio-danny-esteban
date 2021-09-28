import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class AerolineaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__AEROLINEAClient<import(".prisma/client").AEROLINEA>;
    crearUno(aerolinea: Prisma.AEROLINEACreateInput): Prisma.Prisma__AEROLINEAClient<import(".prisma/client").AEROLINEA>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").AEROLINEA[]>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.AEROLINEAUpdateInput;
    }): Prisma.Prisma__AEROLINEAClient<import(".prisma/client").AEROLINEA>;
    eliminarUno(id: number): Prisma.Prisma__AEROLINEAClient<import(".prisma/client").AEROLINEA>;
}
