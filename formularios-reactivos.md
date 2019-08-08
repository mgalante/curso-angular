# Formularios reactivos
## Resumen

Los Formularios Reactivos nos proveen de una manera de manejar las entradas de datos del usuario cuyos valores cambian en el tiempo.

Cada cambio que ocurre en el formulario devuelve un nuevo estado, lo que ayuda a mantener la integridad del modelo entre cada cambio. Los formularios reactivos están basados en flujos de datos de tipo Observable, donde cada entrada y cada valor toman la forma de un flujo de datos que puede ser accedido de manera asíncrona.

### Ejemplo de un formulario reactivo:

#### edit-product.component.html
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
    id: 1,
    name: 'Gaseosa Coca Cola',
    description: 'Refrescante y azucarada',
    trademark: 'Coca Cola',
    price: 35.75,
    year: 1900,
    photo: '../../../assets/images/coca.jpg'
  };
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder/* , productService: ProductService */
  ) {}

  ngOnInit() {

    // Se deberia obtener el producto mediante un Service(productService)

    /* Construir el FormGroup(productForm), se usa el FormBuilder
      para facilitar la construccion del formulario(setear valores y validadores) */
    this.productForm = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, [Validators.required, Validators.minLength(4)]],
      description: [
        this.product.description,
        [Validators.required, Validators.maxLength(50)]
      ],
      trademark: [this.product.trademark, [Validators.required]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      year: [
        this.product.year,
        [
          Validators.required,
          Validators.min(1900),
          /*validador custom*/
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ],
      photo: [this.product.photo]
    });

    // Escuchar cambios del FormControl 'name'
    this.name.valueChanges.subscribe(nameChanged => console.log(nameChanged));
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

  get trademark() {
    return this.productForm.get('trademark');
  }

  get price() {
    return this.productForm.get('price');
  }

  get year() {
    return this.productForm.get('year');
  }
}
```
### Construir el formulario reactivo
#### Opcion 1) mediante FormBuilder

```typescript

  constructor(private formBuilder: FormBuilder) {}
  
  
this.productForm = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, [Validators.required, Validators.minLength(4)]],
      description: [
        this.product.description,
        [Validators.required, Validators.maxLength(50)]
      ],
      trademark: [this.product.trademark, [Validators.required]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      year: [
        this.product.year,
        [
          Validators.required,
          Validators.min(1900),
          /*validador custom*/
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ],
      photo: [this.product.photo]
    });
    
    ```
    #### Opcion 2) mediante contructor FormGroup
   



