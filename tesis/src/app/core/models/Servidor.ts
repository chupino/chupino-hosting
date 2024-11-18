import { Juego } from "./Juego";
import { ServerConfiguracion } from "./ServerConfiguracion";
import { ServerType } from "./ServerType";

export interface Servidor {
    id : number;
    id_usuario: string;
    id_juego: number;
    hardware: number;
    do_droplet_id: number;
    nombre: string;
    createdAt: string;
    updatedAt: string;
    juego: Juego;
    estado: string;
    hardwareType: ServerType;
    configuraciones: ServerConfiguracion[];
}