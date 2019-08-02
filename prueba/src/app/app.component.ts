import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject, Subscription } from 'rxjs';
import { CountService } from './count.service';
import { map, filter, publish, refCount } from 'rxjs/operators';
import { Product } from './product';
import { ProductClientService } from './product-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private countService: CountService,
    private productClient: ProductClientService) {}
  subscruptions: Subscription[] = [];

  products: Product[] = [];

  count$ = this.countService.count$;

  valor;

  async ngOnInit() {
    // this.productClient.getProducts().toPromise()

    this.subscruptions.push(
      this.countService.count$
        .pipe(
          filter(x => x % 2 === 0),
          map(x => `Number: ${x}`),
          publish(),
          refCount()
        )
        .subscribe(x => (this.valor = x))
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscruptions) {
      subscription.unsubscribe();
    }
  }

  onClickEmitir() {
    this.countService.sumar();
  }

  onClickSuscribir() {}

  title = 'products';

  selectedPrice = 0;

  onSelectPrice(price: number, product: Product) {
    this.selectedPrice = price;
    product.price = price;
  }

}

