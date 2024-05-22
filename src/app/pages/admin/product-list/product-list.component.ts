import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../../services/product';
import { ProductService } from '../../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: Products[] = [];
  errorMessages: string[] = [];
  successMessage: string | null = null;
  filteredProducts: Products[] = [];
  searchTerm: string = '';
  p: number = 1; // Biến để lưu số trang hiện tại

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      (data) => {
        this.allProducts = data;
        this.filteredProducts = data; // Khởi tạo filteredProducts
      },
      (error) => {
        this.errorMessages.push(error);
      }
    );
  }

  deleteProduct(event: Event, id: number): void {
    event.stopPropagation();
    const confirmDelete = confirm(`Bạn có chắc muốn xóa sản phẩm ${id} không?`);
    if (confirmDelete) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.successMessage = `Xóa thành công sản phẩm ${id}`;
          this.allProducts = this.allProducts.filter(product => product.id !== id);
          this.filterProducts(); // Cập nhật filteredProducts sau khi xóa
          setTimeout(() => this.successMessage = null, 3000); // Clear message after 3 seconds
        },
        (error) => {
          console.error('Error deleting product', error);
          this.errorMessages.push('Có lỗi xảy ra khi xóa sản phẩm.');
        }
      );
    }
  }

  filterProducts(): void {
    this.filteredProducts = this.allProducts.filter(product => 
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.p = 1; // Reset về trang đầu tiên sau khi lọc
  }
}
