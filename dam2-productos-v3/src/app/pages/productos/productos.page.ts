import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Paginación
  page = 1;
  readonly pageSize = 10;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  // Números de página visibles (ventana de 5 alrededor de la actual)
  get pages(): number[] {
    const visible = 5;
    const end = Math.min(this.totalPages, Math.max(1, this.page - 2) + visible - 1);
    const start = Math.max(1, end - visible + 1);
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  get firstItem(): number {
    return this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get lastItem(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

  // Stock valorado = unidades * (precio - descuento aplicable)
  stockValue(product: Product): number {
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    return product.stock * discountedPrice;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }
    this.page = page;
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    const skip = (this.page - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
      }
    });
  }
}
