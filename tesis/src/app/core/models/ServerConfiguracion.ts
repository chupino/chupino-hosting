export interface ServerConfiguracion {
  id: number;
  valor: string;
  editable: boolean;
  id_juego_configuracion: number;
  clave: string;
  descripcion: string;
  tipo_dato: string;
  obligatorio: boolean;
  valor_default: string;
}