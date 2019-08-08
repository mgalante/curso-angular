# Formularios reactivos
## Resumen

Los Formularios Reactivos nos proveen de una manera de manejar las entradas de datos del usuario cuyos valores cambian en el tiempo.

Cada cambio que ocurre en el formulario devuelve un nuevo estado, lo que ayuda a mantener la integridad del modelo entre cada cambio. Los formularios reactivos están basados en flujos de datos de tipo Observable, donde cada entrada y cada valor toman la forma de un flujo de datos que puede ser accedido de manera asíncrona.

### Ejemplo formulario reactivo:

```html
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
    <input type="hidden" formControlName="id">
  
    <label for="name"> Nombre: </label>
    <input id="name" type="text" formControlName="name">
    <app-messages-error [input]="name"></app-messages-error>
      <br/>    
  
    <label for="description"> Descripcion: </label>
    <textarea id="description" type="textarea" formControlName="description" rows="3" cols="20"></textarea>
    <app-messages-error [input]="description"></app-messages-error>
      <br/>
    <label for="trademark"> Marca: </label>
    <input id="trademark" type="text" formControlName="trademark">
    <app-messages-error [input]="trademark"></app-messages-error>
      <br/>

    <label for="year"> Año: </label>
    <input id="year" type="number" formControlName="year">
    <app-messages-error [input]="year"></app-messages-error>
    
    <br/>
    <label for="price"> Precio: </label>
    <input id="price" type="number" formControlName="price">
    <app-messages-error [input]="price"></app-messages-error>
      <br/>
      
    <input type="hidden" formControlName="photo">


    <button type="submit" [disabled]="productForm.invalid" >Submit</button>
  
  </form>
```
