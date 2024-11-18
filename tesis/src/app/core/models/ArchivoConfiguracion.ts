import { ArchivoConfiguracionField } from "./ArchivoConfiguracionField";

export interface ArchivoConfiguracion {
    id : number;
    id_juego : number;
    template_file : string;
    name_file : string;
    destination_host : string;
    destination_container_tmp : string;
    destination_container_final : string;
    fields : ArchivoConfiguracionField[];
}