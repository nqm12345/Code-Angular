import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../pages/admin/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { Products } from '../../services/product';
import { ProductService } from '../../services/product.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminLayoutComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
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
