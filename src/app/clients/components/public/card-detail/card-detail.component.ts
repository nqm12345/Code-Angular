import { Component } from '@angular/core';
import { Products } from '../../../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent {
  product: Products | undefined;
  errorMessages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router // Thêm Router vào constructor
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe(data => {
        if (data) {
          this.product = data;
        } else {
          this.router.navigate(['/not-found']); // Điều hướng tới trang NotFound nếu không có dữ liệu
        }
      },
      (error) => {
        this.errorMessages.push(error);
        this.router.navigate(['/not-found']); // Điều hướng tới trang NotFound khi có lỗi
      });
    }
  }

  onSelectColor(color: string) {
    if (this.product) {
      this.product.image = color;
    }
  }
}
