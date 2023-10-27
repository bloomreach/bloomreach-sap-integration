/*
 * Copyright 2020-2021 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Product, ProductAdapter, PRODUCT_NORMALIZER } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrxEndpointService } from '../../../services/brx-endpoint.service';

/*
 * Inspired by src/occ/adapters/product/occ-product.adapter.ts
 * of SAP Spartacus Core Library project.
 */
@Injectable({
  providedIn: 'root',
})
export class BrxProductAdapter implements ProductAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected brxEndpoints: BrxEndpointService,
  ) {}

  load(productCode: string, scope?: string): Observable<Product> {
    return this.http
      .get(this.getEndpoint(productCode, scope))
      .pipe(map((data: any) => data.response.docs[0]))
      .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEndpoint(code: string, scope?: string): string {
    return this.brxEndpoints.buildSearchUrl(code);
  }
}
