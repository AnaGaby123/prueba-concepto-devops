#!/bin/bash
clear
START_TIME=$(date +%s)
ng build api-catalogos
ng build api-logistica
ng build api-finanzas
END_TIME=$(date +%s)
echo "Complete Apis compilation in: $[$END_TIME - $START_TIME] seconds..."
ng serve
