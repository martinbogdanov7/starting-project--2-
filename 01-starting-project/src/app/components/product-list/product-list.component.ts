import { Component } from '@angular/core';
import { ProductService } from '../../services/productservices.service';
import { Product } from '../../models/productmodels';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, ProductDetailsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {

  products: Product[] = [];
  categories: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'All';
  sortBy: string = 'default';

  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.hasError = false;

    this.productService.getProducts().subscribe({
      next: (response) => {
      this.products = response.products;

      const allCategories = this.products.map(product => product.category);
      this.categories = [...new Set(allCategories)].sort();
      this.isLoading = false;
      },

      error: (errorr: any) => {
        console.error('Greshka pri zaqvkata:', errorr);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    let result = this.products.filter(product => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase().trim());

      const matchesCategory =
        this.selectedCategory === 'All' || product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  
  
    switch (this.sortBy) {
        case 'price-asc':
          return [...result].sort((a, b) => a.price - b.price);
        case 'price-desc':
          return [...result].sort((a, b) => b.price - a.price);
        case 'rating-desc':
          return [...result].sort((a, b) => b.rating - a.rating);
        case 'name-asc':
          return [...result].sort((a, b) => a.title.localeCompare(b.title));
        default:
          return result;
    }
  }
}
