#!/bin/bash

# Verificar si se proporcionó un nombre de rama
if [ -z "$1" ]; then
    echo "Por favor, proporciona un nombre para la nueva rama."
    exit 1
fi

# Crear la nueva rama vacía
hg branch "$1"
hg commit -m "Crear rama $1"