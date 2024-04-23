ECHO OFF
CLS
SET START_TIME=%TIME%

CALL ng build api-logistica
CALL ng build api-catalogos
CALL ng build api-finanzas

SET END_TIME=%TIME%
SET /A START_TIME=(1%START_TIME:~0,2%-100)*360000 + (1%START_TIME:~3,2%-100)*6000 + (1%START_TIME:~6,2%-100)*100 + (1%START_TIME:~9,2%-100)
SET /A END_TIME=(1%END_TIME:~0,2%-100)*360000 + (1%END_TIME:~3,2%-100)*6000 + (1%END_TIME:~6,2%-100)*100 + (1%END_TIME:~9,2%-100)
SET /A DURATION=(%END_TIME%-%START_TIME%)/100

ECHO "Apis generation completed in: %DURATION% seconds..."

CALL ng serve
