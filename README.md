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


// EJERCICIO 3
// Implenetar el metodo filiter utilizado .push(), for of, if
const array = [1, 2, 4, 4];

filter(/* TODO */) {
    /* TODO */
}

const result = filter(array, x => x === 4);
// RESULT deberia dar [4, 4]

``` 


## Ejercicio 4
1. Generar un listado de productos (al menos 3) con los siguientes datos: 
name, price, expirationDate, ingredients (array de strings)
1. Duplicar el precio de todos los productos y pasar a mayusuculas el nombre
1. Agregar un nuevo producto
1. Filtrar los productos que tengan mas de 2 ingredientes


