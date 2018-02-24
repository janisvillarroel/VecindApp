# VecindApp

Proyecto Final Diplomado Aplicaciones Moviles 4ta Version

## Instrucciones


1. **Preveer que se tengan instaladas:**
    ```
    npm install -g cordova
    npm install -g ionic
    ```

2. **Clonar el repositorio**
    ```
    git clone https://github.com/janisvillarroel/VecindApp.git
    ```

3. **Ingresar al directorio de `VecindApp`**
    ```
    cd VecindApp
    ```

4. **Instalar dependencias**
    ```
    npm install
    ```
  
5. **Correr en el navegador**
    ```
    ionic serve
    ```
6. **Configuración Reglas Firebase
    ```
    La base de datos Firebase tiene que tener las siguientes reglas:
      {
        "rules": {
          ".read": "true",
          ".write": "true",
          "user_residences": {
            ".indexOn": ["email","resident_id","residence_id"]
           },
          "users": {
            ".indexOn": ["email"]
           },
          "requests": {
            ".indexOn": ["userId"]
           }
        }
      }
