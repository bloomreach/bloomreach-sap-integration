import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrxSearchConfig } from '../models/brx-search-config.model';
import { ConfigType } from '../models/brx-config-type.model';
import { BrxEndpointService } from './brx-endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class BrxPathwaysRecommendations {
  constructor(
    protected http: HttpClient,
    protected brxEndpoints: BrxEndpointService,
    protected converter: ConverterService,
  ) {}

  productsSubject = new BehaviorSubject<any>([]);

  getproducts(
    isPreview: boolean,
    query = '',
    searchConfig: BrxSearchConfig,
    widgetType: string,
    widgetid: string,
    categoryid: string,
    pids: string,
  ) {
    const { authKey } = this.brxEndpoints.envConfig;
    const requestOptions = {
      headers: new HttpHeaders({ 'auth-key': authKey }),
    };
    const req = this.http
      .get(
        this.brxEndpoints.buildPathwaysandRecommendationsUrl(
          isPreview,
          query,
          searchConfig,
          widgetType,
          widgetid,
          categoryid,
          pids,
        ),
        requestOptions,
      )
      .pipe(
        map((data: any) => {
          return data?.response?.docs.map((product: any) => this.converter.convert(product, PRODUCT_NORMALIZER)) ?? {};
        }),
      );

    req.subscribe((data) => {
      this.productsSubject.next(data);
    });
  }
}
