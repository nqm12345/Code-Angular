import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Products } from '../../../../services/product';
import { ProductService } from '../../../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule], // Add FormsModule to imports
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardProductComponent {
  allProducts: Products[] = [];
  filteredProducts: Products[] = [];
  errorMessages: string[] = [];
  searchTerm: string = '';
  p: number = 1; // Biến để lưu số trang hiện tại

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      (data) => {
        this.allProducts = data;
        this.filteredProducts = data;
      },
      (error) => {
        this.errorMessages.push(error);
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.allProducts.filter(product => 
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.p = 1; // Reset về trang đầu tiên sau khi lọc
  }
}