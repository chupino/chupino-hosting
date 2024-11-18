export interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  min_hardware: number;
  imageURL: string;
  st_hardware: number;
  high_hardware: number;
  activationKeyword : string;
  createdAt: string;
  updatedAt: string;
  puertos: string[];
  docker_image: string;
}