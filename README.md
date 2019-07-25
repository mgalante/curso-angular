# Resumen clase 1

```javascript
const nums = [10,1,2,345];
const dobles = nums.map(num => num*2);

// Documentacion js de buena calidad
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce

// Para saber si una caracteristica existe en el browser
//https://caniuse.com/#search=reduce

// EJERCICIOS 
// 1) Programar         
const dobles2 = nums.reduce(/* COMPLETAR! */);


// probar find, filter, map, reduce, every, some

nums.forEach((num,index)=>{
    console.log(num, index);
});

for(const num of nums)
{
    console.log(num);
}

const nums3 = [...nums, 10, 66];
const persona = {
    nombre: "pepe",
    apellido: "juarez"
}
const serverId =  12344;
const p = {...persona, serverId };

const [x,y,z] = ["a", "b", "c"];
const { nombre, apellido } = p;

function crearSumador(x) { 
    const sum = function(num) {
        return x + num;
    }
    return sum;
}
const sum10 = crearSumador(10);
sum10(5);


// EJERCICIO 2
function minLengh(minLength){
    // TODO;
}

const minLength10 = minLengh(10);
minLengh10("Hola") // false;
minLengh10("Hola como estas") // true;


``` 


# Resumen clase 2


# Visual Studio Code
`CTRL + SHIFT + P` Buscar comandos
`CTRL +`` `  ó `CTRL +ñ` Abre la consola`

Trabajamos siempre sobre una carpeta considerando que esa carpeta es el proyecto. Dicha carpeta deberia ser el root del repo de GIT.

# Node JS 
Node.js® es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. El ecosistema de paquetes de Node.js, npm, es el ecosistema mas grande de librerías de código abierto en el mundo.

## NPM
Para instalar paquetes globales debemos hacerlo con permisos de administrador
`npm install -g NOMBRE_DEL_PAQUETE`


### Uso:
Crear el package.json original:
`npm init`

Para agregar dependecias:

dependencias del producto en sí: ej. un Widget
`npm i NOMBRE_DEL_PAQUETE` 

dependencias para desarrollar: ej. typescript
`npm i --save-dev NOMBRE_DEL_PAQUETE`

para instalar una version en particular:
`npm i --save-dev NOMBRE_DEL_PAQUETE@VERSION`

### Nomenclatura de versiones
Se utiliza SemVer, por ejemplo v1.2.3, donde el primer digito es el major, segudo minor y tercero patch.
* Mayor: Cambios que no son compatibles hacia atras
* Minor: Se agregan funcionalidades
* Patch: Bugfixing

^1.2.3 equivale a 1.X.X
~1.2.3 equivale a 1.2.X
y * equivale a X.X.X



## package.json 
guardará la información del paquete, los scripts necesarios par la gestion y sus dependencias de desarrollo y de ejecución.

## Scripts de ejecución
agregar a package.json un propiedad ejemplo:

`"scripts": {
    "start": "ng serve -o"
}`

ejecución de un script
`npm run start` ó solo para el caso del start se puede omitir el run `npm start`

# TypeScript
Lenguaje de programación y Compilador escrito en TypeScript.
Como puede ser posible ? https://stackoverflow.com/questions/193560/writing-a-compiler-in-its-own-language


## Instalación

A nivel global:
`npm install -g typescript`

## Configuración
Crear tsconfig.json inicial
`tsc --init`

## Compilar:
`tsc`
CCompila una vez

`tsc -w`
Compila y queda corriendo esperando cambios
Por lo general vamos a usarlo indirectamente con webpack

### Tipado de variables
```typescript
let miNumbero: number = 5;
let texto = "hola" //TS infiere que texto es del tipo string
texto = 5; //ERROR!
```

### Tipos mixtos (Union types)
```typescript
let x: number|null = 5;
x = null;
```

### Tipado básico de funciones
```typescript
function repeatText(x:string, times: number):string{
    let repeatedText : string = "";
    for(let i:number = 0; i<times;i++){
        repeatedText += x;
    }
    return x;
}
