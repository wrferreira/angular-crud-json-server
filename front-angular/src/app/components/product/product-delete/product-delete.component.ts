import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product-create/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe( retProduct => {
      this.product = retProduct
    })
  }

  deleteProduct():void {
    //opções: `${this.product.id}`  ou trocar no Service o retorno de 'this.product.id' para number => 'id: number'
    this.productService.delete(this.product.id).subscribe(()=>{
      this.productService.showMessage('Produto excluído com sucesso.')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
