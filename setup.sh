#!/bin/bash

echo "Actualizando el sistema..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "Instalando dependencias necesarias..."
sudo apt-get install -y \
  curl \
  git \
  sudo

echo "Instalando Docker..."
sudo apt-get install -y docker.io

echo "Verificando la instalación de Docker..."
sudo systemctl start docker
sudo systemctl enable docker
docker --version

echo "Añadiendo el usuario al grupo Docker..."
sudo usermod -aG docker $USER

echo "Instalando Docker Compose..."

sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

echo "Verificando la instalación de Docker Compose..."
docker-compose --version

echo "Instalación completada. Ejecuta 'newgrp docker' para aplicar los cambios de grupo."

echo "Clonando repositorio..."
git clone https://github.com/chupino/chupino-hosting.git
cd chupino-hosting