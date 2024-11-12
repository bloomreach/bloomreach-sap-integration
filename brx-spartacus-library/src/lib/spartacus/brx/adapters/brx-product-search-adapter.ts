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
import {
  ConverterService,
  Product,
  ProductSearchAdapter,
  ProductSearchPage,
  PRODUCT_NORMALIZER,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  PRODUCT_SUGGESTION_NORMALIZER,
  Suggestion,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { BrxSearchConfig } from '../../../models/brx-search-config.model';
import { BrxEndpointService } from '../../../services/brx-endpoint.service';

const DEFAULT_SEARCH_CONFIG: BrxSearchConfig = {
  pageSize: 20,
  type: 'search',
};

export const ALLCATEGORIES = ':allCategories:';

/*
 * Inspired by src/occ/adapters/product/occ-product-search.adapter.ts
 * of SAP Spartacus Core Library project.
 */
@Injectable({
  providedIn: 'root',
})
export class BrxProductSearchAdapter implements ProductSearchAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected brxEndpointService: BrxEndpointService,
  ) {}

  search(query = '', searchConfig: BrxSearchConfig = DEFAULT_SEARCH_CONFIG): Observable<ProductSearchPage> {
    // console.log('[** Product Search Adapter - Custom Brx API Req---]', query, searchConfig);
    if (searchConfig.type === 'suggestion') {
      return this.http.get(this.getSuggestionEndpoint(query)).pipe(
        map((response: any) => response.response?.products || []),
        map((model: any[]) => model.slice(0, searchConfig.pageSize)),
        this.converter.pipeableMany(PRODUCT_NORMALIZER),
        map<Product[], ProductSearchPage>((model: Product[]) => ({
          products: model,
        })),
      );
    }

    // to search products by category
    let smQuery = query;
    let sort: string | undefined;
    let searchQuery: string | undefined;
    let facets: string[] | undefined;
    const categoryIndex = query?.indexOf(ALLCATEGORIES);
    // Only in category page, the sort value is before the query
    if (categoryIndex >= 0) {
      smQuery = query.slice(categoryIndex + ALLCATEGORIES.length);
      [searchQuery, ...facets] = smQuery ? smQuery.split(':') : [];
      sort = query.slice(1, categoryIndex);
      searchConfig = { ...searchConfig, type: 'category' };
    } else {
      [searchQuery, sort, ...facets] = smQuery ? smQuery.split(':') : [];
    }

    if (!searchConfig.sort) {
      searchConfig = { ...searchConfig, sort };
    }
    // console.log('[BrxProductSearchAdapter.smQuery]: ', smQuery);
    const url = this.getSearchEndpoint(searchQuery, searchConfig, facets);

    return this.http.get(url).pipe(
      map((response: any) => {
        return {
          ...response,
          query,
          url,
          sort: searchConfig.sort,
        };
      }),
      this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER),
    );
  }

  loadSuggestions(term: string, pageSize = 3): Observable<Suggestion[]> {
    return this.http.get(this.getSuggestionEndpoint(term)).pipe(
      map((response: any) => response.response?.suggestions || []),
      map((model: any[]) => model.slice(0, pageSize)),
      this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER),
    );
  }

  protected getSearchEndpoint(query: string, searchConfig: BrxSearchConfig, facets?: string[]): string {
    return this.brxEndpointService.buildSearchUrl(query, searchConfig, facets);
  }

  protected getSuggestionEndpoint(term: string): string {
    return this.brxEndpointService.buildSuggestionUrl(term);
  }
}
