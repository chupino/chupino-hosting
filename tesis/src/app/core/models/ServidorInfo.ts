import { Droplet } from "./Droplet";
import { Juego } from "./Juego";
import { ServerConfiguracion } from "./ServerConfiguracion";
import { ServerType } from "./ServerType";

export interface ServidorInfo {
    id: number;
    id_usuario: string;
    id_juego: number;
    hardware: number;
    do_droplet_id: string;
    nombre: string;
    createdAt: string;
    updatedAt: string;
    juego: Juego;
    hardwareType: ServerType;
    estado: string;
    configuraciones: ServerConfiguracion[];
    droplet: Droplet;
}