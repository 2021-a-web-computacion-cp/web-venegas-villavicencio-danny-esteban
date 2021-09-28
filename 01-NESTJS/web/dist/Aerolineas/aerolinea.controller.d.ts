import { AerolineaService } from './aerolinea.service';
export declare class AerolineaController {
    private AerolineaService;
    constructor(AerolineaService: AerolineaService);
    listarAerolinea(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    editarAerolineaFormulario(response: any, bodyParams: any): Promise<void>;
    crearAerolineaFormulario(response: any, bodyParams: any): Promise<void>;
    eliminarAerolinea(response: any, parametrosRuta: any): Promise<void>;
}
