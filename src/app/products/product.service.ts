import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable } from 'rxjs/Observable';
import {HttpErrorResponse, HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/Rx';


@Injectable()
export class ProductService{
    private _productUrl = './api/products/products.json';

    constructor(private _http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getProductById(index: number): Observable<IProduct>{
        return this._http.get<IProduct>(this._productUrl).map((res:Response) => res.json()).map(x => x.product.filter(y => y.productId === index)
        .do(data => console.log('One Product: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }
    private handleError(err: HttpErrorResponse){
        console.log(err.message);
        return Observable.throw(err.message);
    }
}