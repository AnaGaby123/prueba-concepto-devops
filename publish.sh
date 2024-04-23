#!/bin/bash

cwd=$(pwd)
echo -e "La carpeta actual es: $cwd"


# Paths
srcFrontendPath=$cwd"/ProquifaDotNet/"
remoteTomcatPath="/var/www/"
remoteWebappPath=$remoteTomcatPath"html/"
frontendFolderName="ProquifaDotNet"
distFrontendPath=$srcFrontendPath$frontendFolderName
remoteFrontendPath=$remoteWebappPath$frontendFolderName

# Versioning
versionFile="src/app/util/common.protocols.ts"
appVersionNumberLabel="APP_VERSION_NUMBER"
idRevision=$(hg identify --id)
# hg pull -r $idRevision -f
branchName=$(hg branch)
numRevision=$(hg identify --num --rev $branchName)
versionText="1.0.$numRevision.0"

echo "Revision number $numRevision ($idRevision)"

# REPLACING VERSION IN TS FILE
while IFS= read -r line; do
if [[ $line == *$appVersionNumberLabel* ]] ; then
orig="$line"
repl="${line%%=*}= '$versionText';"
fi
done < "$srcFrontendPath$versionFile"
sed -i'' "s/$orig/$repl/g" "$srcFrontendPath$versionFile"
echo -e "Se reemplazó la versión del archivo $versionFile"

# REMOVE DIST FOLDER
echo -e "Depurando carpetas temporales"
rm -rf $srcFrontendPath"dist"
rm -rf $srcFrontendPath"ProquifaDotNet"

# COMPILE IN PRODUCTION MODE
echo -e "Compilando frontend en modo productivo"
cd $srcFrontendPath
npm install --loglevel verbose
ng build api-catalogos
ng build api-logistica
ng build api-finanzas
ng build --prod --build-optimizer=false --aot=false --base-href=/ProquifaDotNet/
mv $srcFrontendPath"dist" $distFrontendPath
mv $srcFrontendPath"web.config" $distFrontendPath"/ProquifaDotNet/web.config"
cd ..
