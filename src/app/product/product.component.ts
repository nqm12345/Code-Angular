import { Component } from '@angular/core';
import { IProduct } from './productlist';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  name = 'Angular';
  products: IProduct[] = [
    {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2016",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
      },
      {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2016",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
      },
      {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
      },
      {
      "productId": 10,
      "productName": "Video Game Controller",
      "productCode": "GMG-0042",
      "releaseDate": "October 15, 2015",
      "description": "Standard two-button video game controller",
      "price": 35.95,
      "starRating": 4.6,
      "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }     
  ];

  filteredProducts: IProduct[] = [];
  private _filterValue: string = ''; // Sử dụng biến riêng để lưu trữ giá trị

  constructor() {
    // Sao chép mảng sản phẩm vào mảng filteredProducts ban đầu
    this.filteredProducts = this.products;
  }

  // Getter cho filterValue
  get filterValue(): string {
    return this._filterValue;
  }

  // Setter cho filterValue
  set filterValue(value: string) {
    this._filterValue = value;
    this.filter(); // Gọi hàm filter mỗi khi filterValue thay đổi
  }

  filter() {
    // Chuyển đổi từ khóa thành chữ thường để tìm kiếm không phân biệt chữ hoa chữ thường
    const keyword = this._filterValue.toLowerCase().trim();

    // Nếu không có từ khóa hoặc từ khóa rỗng, hiển thị tất cả sản phẩm
    if (!keyword || keyword === '') {
      this.filteredProducts = this.products;
    } else {
      // Lọc sản phẩm theo từ khóa
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLowerCase().includes(keyword)
      );
    }
  }

  // Thuộc tính để lưu trạng thái ẩn hiện hình ảnh
  hideImages: boolean = false;

  // Hàm để thay đổi trạng thái ẩn hiện hình ảnh
  toggleImages() {
    this.hideImages = !this.hideImages;
  }

  // Hàm kiểm tra xem hình ảnh có nên được hiển thị không
  shouldDisplayImage(): boolean {
    return !this.hideImages;
  }
}
