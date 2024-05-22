import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../pages/public/header/header.component';
import { FooterComponent } from '../../pages/public/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from '../../pages/public/notfound/notfound.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Products } from '../../../services/product';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, FooterComponent, NotfoundComponent , HttpClientModule, CommonModule],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicComponent {
  allProducts: Products[] = [];
  errorMessages: string[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      (data) => {
        this.allProducts = data;
      },
      (error) => {
        this.errorMessages.push(error);
      }
    );
  }
}
