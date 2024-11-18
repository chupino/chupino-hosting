import { ArchivoConfiguracion } from "./ArchivoConfiguracion";
import { JuegoConfiguracionEnv } from "./JuegoConfiguracionEnv";

export interface JuegoConfiguracion {
    env : JuegoConfiguracionEnv[];
    files: ArchivoConfiguracion[];
}