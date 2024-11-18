export interface JuegoConfiguracionEnv {
  id: number;
  id_juego: number;
  clave: string;
  descripcion: string;
  tipo_dato: string;
  obligatorio: boolean;
  valor_default: string;
  valor?: string,
  createdAt: string;
  updatedAt: string;
}