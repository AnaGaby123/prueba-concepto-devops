#!/bin/sh
set -e
START_TIME=$(date +%s)

hg pull;

version=$(curl https://192.168.2.43/logistica --insecure | jq ".API.Version");
versionSplit=(${version//./ })
finalVersion=${versionSplit[2]}

curl https://192.168.2.43/catalogos/restclient/default --output "./projects/api-catalogos/src/lib/swagger.json" --insecure
curl https://192.168.2.43/logistica/restclient/default --output "./projects/api-logistica/src/lib/swagger.json" --insecure
curl https://192.168.2.43/finanzas/restclient/default --output "./projects/api-finanzas/src/lib/swagger.json" --insecure

ng-swagger-gen -i "./projects/api-catalogos/src/lib/swagger.json" -c "./swagger-gen-config/catalogs-api.json"
ng-swagger-gen -i "./projects/api-logistica/src/lib/swagger.json" -c "./swagger-gen-config/logistics-api.json"
ng-swagger-gen -i "./projects/api-finanzas/src/lib/swagger.json" -c "./swagger-gen-config/finances-api.json"

filename_api_catalogos_filter="./projects/api-catalogos/src/lib/models/filter-tuple.ts";
filename_api_finanzas_filter="./projects/api-finanzas/src/lib/models/filter-tuple.ts";
filename_api_logistica_filter="./projects/api-logistica/src/lib/models/filter-tuple.ts";

search_filter="ValorFiltro?: string;";
replace_filter="ValorFiltro?: string | boolean;";

sed -i "s/$search_filter/$replace_filter/g" $filename_api_catalogos_filter;
sed -i "s/$search_filter/$replace_filter/g" $filename_api_finanzas_filter;
sed -i "s/$search_filter/$replace_filter/g" $filename_api_logistica_filter;

hg add .;
hg addremove;
hg commit -m "[UPDATE] Autorest ${finalVersion} on dev environment";
hg push --new-branch default;

END_TIME=$(date +%s)
echo "Apis environment: dev"
echo "Apis host: $ApiHost"
echo "Apis version: $ApiVersion"
echo "Apis generation completed in: $[$END_TIME - $START_TIME] seconds"
