/* eslint-disable camelcase */
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
import { Injectable } from '@angular/core';
import {
  Breadcrumb,
  Converter,
  ConverterService,
  FacetValue,
  ProductSearchPage,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { BrxEndpointService } from '../../../services/brx-endpoint.service';
import { ALLCATEGORIES } from '../adapters/brx-product-search-adapter';

interface BloomreachFacet {
  count: number;
  crumb: string;
  cat_name: string;
  name: string;
  parent: string;
  cat_id: string;
  tree_path: string;
}

/*
 * Inspired by src/occ/adapters/product/converters/occ-product-search-page-normalizer.ts
 * of SAP Spartacus Core Library project.
 */
@Injectable({
  providedIn: 'root',
})
export class BrxProductSearchNormalizer implements Converter<any, ProductSearchPage> {
  constructor(private converterService: ConverterService, private brxEndpointService: BrxEndpointService) {}

  convert(source: any, target: ProductSearchPage = {}): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };

    const src: ProductSearchPage = {
      breadcrumbs: [],
      categoryCode: '',
      currentQuery: {},
      facets: [],
      freeTextSearch: '',
      keywordRedirectUrl: '',
      pagination: {},
      products: source.response.docs,
      sorts: [
        {
          code: '',
          name: 'Relevance',
          selected: true,
        },
        {
          code: 'reviews desc',
          name: 'Top Rated',
          selected: false,
        },
        {
          code: 'title asc',
          name: 'Name (ascending)',
          selected: false,
        },
        {
          code: 'title desc',
          name: 'Name (descending)',
          selected: false,
        },
        {
          code: 'price asc',
          name: 'Price (lowest first)',
          selected: false,
        },
        {
          code: 'price desc',
          name: 'Price (highest first)',
          selected: false,
        },
      ],
      spellingSuggestion: {},
    };

    if (src.products) {
      target.products = src.products.map((data: any) => this.converterService.convert(data, PRODUCT_NORMALIZER));
    }

    const sort = source.sort ?? 'relevance';
    // eslint-disable-next-line prefer-destructuring
    let query: string = source.query;
    const categoryIndex = query?.indexOf(ALLCATEGORIES);
    if (categoryIndex >= 0) {
      query = query.slice(categoryIndex + ALLCATEGORIES.length);
    }

    // eslint-disable-next-line prefer-const
    let [searchText, ...facets] = query?.split(':') ?? [];
    // Reconstruct query. Notice that category queries has sort value in front of query
    if (categoryIndex >= 0) {
      query = `:${sort}${ALLCATEGORIES}${searchText}`;
      if (facets?.length) {
        query += `:${facets.join(':')}`;
      }
    } else {
      facets = facets?.slice(1);
      query = facets?.length ? `${searchText}:${sort}:${facets.join(':')}` : `${searchText}:${sort}`;
    }

    if (query) {
      target.breadcrumbs = [];
      target.facets = Object.entries(source.facet_counts?.facet_fields ?? {}).map(([facetName, facetValues]) => {
        let category = false;
        const values: FacetValue[] =
          (facetValues as BloomreachFacet[])
            .map((value) => {
              category = !!value.cat_name;
              const facetValue = value.cat_name ? value.cat_id : value.name;
              const facetValueName = value.cat_name ?? value.name;

              // We need special treatment for category pages
              if (`${query}:`.includes(`${ALLCATEGORIES}${facetValue}:`)) {
                this.processCategories(searchText, facetValues as BloomreachFacet[], query, target.breadcrumbs!);
                return undefined;
              }

              if (`${query}:`.includes(`:${facetName}:${facetValue}:`)) {
                const removeQuery = query.replace(`:${facetName}:${facetValue}`, '');
                target.breadcrumbs!.push({
                  facetCode: facetName,
                  facetName,
                  facetValueCode: facetValue,
                  facetValueName,
                  removeQuery: {
                    query: {
                      value: removeQuery,
                    },
                    url: `/search?q=${encodeURIComponent(removeQuery)}`,
                  },
                });
                return undefined;
              }

              return {
                count: value.count,
                name: facetValueName,
                query: {
                  query: {
                    value: `${query}:${facetName}:${facetValue}`,
                  },
                  url: `/search?q=${query}%3A${facetName}%2C+${encodeURIComponent(facetValue)}`,
                },
                selected: false,
              } as FacetValue;
            })
            .filter<FacetValue>(Boolean as any) ?? [];

        return {
          category,
          multiSelect: true,
          name: facetName,
          values,
          visible: true,
        };
      });

      target.currentQuery = {
        query: {
          value: query,
        },
      };
    }
    // Convert the Source to target
    target.sorts = src.sorts;
    target.pagination = this.brxEndpointService.getPaginationDetails(source.response.numFound);
    return target;
  }

  private processCategories(
    catId: string,
    allCategories: BloomreachFacet[],
    query: string,
    breadcrumbs: Breadcrumb[],
  ): void {
    const crumbs = allCategories.find((value) => value.cat_id === catId)?.crumb?.split('/') ?? [];
    crumbs.filter(Boolean).forEach((crumb) => {
      const category = allCategories.find((value) => value.cat_id === crumb);
      if (category) {
        const removeQuery = query.replace(`${ALLCATEGORIES}${category.cat_id}`, '');
        breadcrumbs.push({
          facetCode: 'allCategories',
          facetName: 'category',
          facetValueCode: category.cat_id,
          facetValueName: category.cat_name,
          removeQuery: {
            query: {
              value: removeQuery,
            },
            url: `/search?q=${encodeURIComponent(removeQuery)}`,
          },
        });
      }
    });
  }
}
