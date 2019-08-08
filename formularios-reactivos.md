# Formularios reactivos
## Resumen

Los Formularios Reactivos nos proveen de una manera de manejar las entradas de datos del usuario cuyos valores cambian en el tiempo.

Cada cambio que ocurre en el formulario devuelve un nuevo estado, lo que ayuda a mantener la integridad del modelo entre cada cambio. Los formularios reactivos están basados en flujos de datos de tipo Observable, donde cada entrada y cada valor toman la forma de un flujo de datos que puede ser accedido de manera asíncrona.

Los Formularios Reactivos son mas escalables, reusables y fáciles de probar. Cada Elemento de la vista está directamente enlazado al modelo mediante una instancia de FormControl. Las actualizaciones de la vista al modelo y del modelo a la vista son síncronas y no dependen de la representación en la Interfaz de Usuario del cliente.


### Ejemplo de un formulario reactivo:
#### product.ts
```typescript
export interface Product {
    name: string;
    description: string;
    year: number;
    price: number;
}
```
#### edit-product.component.html
```html
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
  
    <label for="name"> Nombre: </label>
    <input id="name" type="text" formControlName="name">
    <app-messages-error [input]="name"></app-messages-error>
    <br/>    
  
    <label for="description"> Descripcion: </label>
    <textarea id="description" type="textarea" formControlName="description" rows="3" cols="20"></textarea>
    <app-messages-error [input]="description"></app-messages-error>
    <br/>
  
    <label for="year"> Año: </label>
    <input id="year" type="number" formControlName="year">
    <app-messages-error [input]="year"></app-messages-error>
    <br/>
    
    <label for="price"> Precio: </label>
    <input id="price" type="number" formControlName="price">
    <app-messages-error [input]="price"></app-messages-error>
    <br/>

    <button type="submit" [disabled]="productForm.invalid" >Submit</button>
  
  </form>
```
#### edit-product.component.ts
```typescript
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/interfaces/product';
import { ValidatorsCustom } from 'src/app/validators/validators-custom';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = {
    name: 'Gaseosa Coca Cola',
    description: 'Refrescante y azucarada',
    year: 1900,
    price: 35.75
  };
  
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder/* , productService: ProductService */
  ) {}

  ngOnInit() {
    const currentYear: number = (new Date()).getFullYear();

    // Se deberia obtener el producto mediante un Service(productService)

    /* Construir el FormGroup(productForm), se usa el FormBuilder para facilitar la construccion del formulario(setear valores y validadores) */
    this.productForm = this.formBuilder.group({
      name: [ this.product.name, [Validators.required, Validators.minLength(4)] ],
      description: [ this.product.description, [Validators.required, Validators.maxLength(50)] ],
      price: [ this.product.price, [Validators.required, Validators.min(0)] ],
      year: [ this.product.year, [ Validators.required, ValidatorsCustom.betweenYear(1900, currentYear)] ]
    });
   
  }

  onSubmit() {
    console.log(this.productForm.value);
    // Guardar cambios del producto usando un Service(productService)
  }
  
  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get year() {
    return this.productForm.get('year');
  }
}
```


### Configurar app.module.ts
```typescript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }

```


### Construir el formulario reactivo
#### Opcion 1) mediante FormBuilder

```typescript

      productForm: FormGroup;
      constructor(private formBuilder: FormBuilder) {}
  
  
      this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required, Validators.minLength(4)]],
      description: [
        this.product.description,
        [Validators.required, Validators.maxLength(50)]
      ],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      year: [
        this.product.year,
        [
          Validators.required,
          Validators.min(1900),
          /*validador custom*/
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ]
    });
```
  ####    Opcion 2) mediante contructor FormGroup
 
 ```typescript
 this.productForm = new FormGroup({
      name: new FormControl( this.product.name, [Validators.required, Validators.minLength(4)]),
      description: new FormControl( this.product.description, [Validators.required, Validators.maxLength(50)]),
      price: new FormControl(this.product.price, [Validators.required, Validators.min(0)]),
      year:  new FormControl( this.product.year,[ Validators.required, Validators.min(1900),
          /*validador custom*/
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      )
    });
 ```
 
 
### Validadores para los FormControl
#### Validators
 ```typescript
import {Validators} from '@angular/forms';

num: number;
patternString: string;
/* ------ algunos validators ----------*/
Validators.required;
Validators.min(num);
Validators.min(num);
Validators.minLength(num);
Validators.maxLength(num);
Validators.pattern(patternString);
/*  -----------------------------------   */
 ```
 #### Validator Custom
 Ejemplo
 validators-custom.ts
```typescript
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ValidatorsCustom {

  static betweenYear(yearA: number, yearB: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const year: number = control.value;
      if (year >= yearA && year <= yearB) {
        return null;
      } else {
        return { betweenYear: { yearA: yearA, yearB: yearB } };
      }
    };
  }
}
 ```
 
 ```typescript
 import { ValidatorsCustom } from 'src/app/validators/validators-custom';
 ....
 
 yearFrom: number;
 yearTo: number;
 /* validator custom */
  ValidatorsCustom.betweenYear(yearFrom, yearTo)
 /*                  */ 
 
  ```
 
 
  ### Obtener el object model de un FormGroup
 ```typescript
   this.productForm.value; // retorna {{ name: 'Gaseosa Coca Cola', description: 'Refrescante y azucarada', price: 35.75, year: 1900}} 
  ```
 
  
  ### Setear object model a un FormGroup
   ```typescript
  this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['',
        [Validators.required, Validators.maxLength(50)]
      ],
      price: [null, [Validators.required, Validators.min(0)]],
      year: [null,
        [
          Validators.required,
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ]
    });
 ```
 ##### por setValue() 
 El objeto tiene que tener todas las properties del formulario
 ```typescript
 this.productForm.setValue( {
    name: 'Gaseosa Coca Cola',
    description: 'Refrescante y azucarada',
    price: 35.75,
    year: 1900
  });
  ``` 
 ##### por patchValue() 
 Permite hacer actualizaciones parciales de los valores del formulario
 ```typescript
 this.productForm.patchValue( {
    name: 'Gaseosa Coca Cola',
    description: 'Refrescante y azucarada'
  })
  ```
  
  
  ### Acceder a un FormControl de un Formulario(FormGroup)
   ```typescript
   this.productForm.get('name');
   
   ```
   
   
   ### Modificar el estado de un FormControl
   ```typescript
    // PRISTINE: el valor del control no ha sido cambiado por el usuario
    // DIRTY: el usuario ha modificado el valor del control.
    // TOUCHED: el usuario ha tocado el control lanzando un evento blur al salir.
    // UNTOUCHED: el usuario no ha tocado y salido del control lanzando ningún evento blur.
    
    const control = this.productForm.get('name');
   
    control.markAsTouched();
    control.markAsUntouched();
    control.markAsDirty();
    control.markAsPristine();
 
   ```
   
   
   ### Escuchar cambios de un FormControl
   ```typescript
    this.productForm.get('name').valueChanges.subscribe(nameChanged => console.log(nameChanged));
   ```
   
   
   ### Setear validators a un FormControl
   ```typescript
    const validators: ValidatorFn[] = [];
    this.productForm.get('name').setValidators(validators);
   ```
   
   
   ### Borrar validators de un FormControl 
   ```typescript
    this.productForm.get('name').clearValidators();
   ```
   ### Obtener los errores de validaciones de un FormControl
   ```typescript
     this.productForm.get('name').errors
   ```
   
   
  
   
  
   
  
    

 




