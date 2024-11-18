import { Juego } from "./Juego";
import { JuegoConfiguracionEnv } from "./JuegoConfiguracionEnv";
import { ServerType } from "./ServerType";

export interface CreateServer {
    juegos : Array<Juego>;
    serverTypes: Array<ServerType>;
    juegoConfiguraciones: Array<JuegoConfiguracionEnv>
}