# Parametros para indicarle el ambiente
param ($env= 'dev')

CLS
$StartDate = GET-DATE

switch ($env)
{
  dev {$ApiHost= '192.168.2.43'; Break}
  prod {$ApiHost= '172.24.28.13'; Break}
  Default {$ApiHost= '192.168.2.43'}
}
# Recibir últimos cambios del repo remoto
hg pull

# Hack para permitir la conexión insegura con el server del api
add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Ssl3, [Net.SecurityProtocolType]::Tls, [Net.SecurityProtocolType]::Tls11, [Net.SecurityProtocolType]::Tls12

# Obtener la versión del api
$ApiVersionResponse = Invoke-WebRequest -Uri "https://${ApiHost}/catalogos" -Method Get -ContentType "Application/Json"
$ApiVersion = ($ApiVersionResponse.Content | jq ".API.Version").Split('"')[1].Split(".")[2]

# Descargar el archivo Json de las apis
$CatalogsResponse = Invoke-WebRequest -Uri "https://${ApiHost}/catalogos/restclient/default" -Method Get -ContentType "Application/Json"
$LogisticsResponse = Invoke-WebRequest -Uri "https://${ApiHost}/logistica/restclient/default" -Method Get -ContentType "Application/Json"
$FinancesResponse = Invoke-WebRequest -Uri "https://${ApiHost}/finanzas/restclient/default" -Method Get -ContentType "Application/Json"

# Reemplazar los anteriores archivos Json de las apis
[System.IO.Directory]::CreateDirectory("${PSScriptRoot}\projects\api-catalogos\src\lib")
[System.IO.Directory]::CreateDirectory("${PSScriptRoot}\projects\api-logistica\src\lib")
[System.IO.Directory]::CreateDirectory("${PSScriptRoot}\projects\api-finanzas\src\lib")
[System.IO.File]::WriteAllText("${PSScriptRoot}\projects\api-catalogos\src\lib\swagger.json", $CatalogsResponse.Content)
[System.IO.File]::WriteAllText("${PSScriptRoot}\projects\api-logistica\src\lib\swagger.json", $LogisticsResponse.Content)
[System.IO.File]::WriteAllText("${PSScriptRoot}\projects\api-finanzas\src\lib\swagger.json", $FinancesResponse.Content)

# Generar las apis desde los archivos Json
ng-swagger-gen -i "${PSScriptRoot}\projects\api-catalogos\src\lib\swagger.json" -c "${PSScriptRoot}\swagger-gen-config\catalogs-api.json"
ng-swagger-gen -i "${PSScriptRoot}\projects\api-logistica\src\lib\swagger.json" -c "${PSScriptRoot}\swagger-gen-config\logistics-api.json"
ng-swagger-gen -i "${PSScriptRoot}\projects\api-finanzas\src\lib\swagger.json" -c "${PSScriptRoot}\swagger-gen-config\finances-api.json"

# Reemplazar el tipo de dato de los filtros a los servicios
$filename_api_catalogos_filter="${PSScriptRoot}\projects\api-catalogos\src\lib\models\filter-tuple.ts"
$filename_api_logistica_filter="${PSScriptRoot}\projects\api-logistica\src\lib\models\filter-tuple.ts"
$filename_api_finanzas_filter="${PSScriptRoot}\projects\api-finanzas\src\lib\models\filter-tuple.ts"
$search_filter="ValorFiltro?: string;"
$replace_filter="ValorFiltro?: string | boolean;"

$Replaced = [System.IO.File]::ReadAllText($filename_api_catalogos_filter).Replace($search_filter,$replace_filter)
[System.IO.File]::WriteAllText($filename_api_catalogos_filter, $Replaced)

$Replaced = [System.IO.File]::ReadAllText($filename_api_logistica_filter).Replace($search_filter,$replace_filter)
[System.IO.File]::WriteAllText($filename_api_logistica_filter, $Replaced)

$Replaced = [System.IO.File]::ReadAllText($filename_api_finanzas_filter).Replace($search_filter,$replace_filter)
[System.IO.File]::WriteAllText($filename_api_finanzas_filter, $Replaced)

# Constuir las librerías
ng build api-catalogos
ng build api-logistica
ng build api-finanzas

# Actualizar el repo remoto con los cambios
hg add .
hg addremove
hg commit -m "[UPDATE] Autorest $ApiVersion on $env environment"
hg push --new-branch default

$EndDate = GET-DATE
$Duration = New-TimeSpan -Start $StartDate -End $EndDate

Write-Output "Apis environment: $env"
Write-Output "Apis host: $ApiHost"
Write-Output "Apis version: $ApiVersion"
Write-Output "Apis generation completed in: $Duration"
