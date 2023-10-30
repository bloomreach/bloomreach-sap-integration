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

import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { Converter, ConverterService, ImageType, Price, PriceType, Product } from '@spartacus/core';

/*
 * Inspired by src/occ/adapters/product/converters/product-image-normalizer.ts
 * of SAP Spartacus Core Library project.
 */
@Injectable({
  providedIn: 'root',
})
export class BrxProductNormalizer implements Converter<any, Product> {
  constructor(private converterService: ConverterService) {}

  convert(source: any, target: Product = {}): Product {
    // target = {
    //   ...target,
    //   ...(source as any),
    // };

    // this.normalizeFacets(target);
    // if (src.products) {
    //   target.products = src.products.map((data: any) =>
    //     this.converterService.convert(data, PRODUCT_NORMALIZER)
    //   );
    // }

    // target.sorts = src.sorts;
    // console.log('[BrxProductNormalizer, source]: ', source);
    // console.log('[BrxProductNormalizer, target]: ', target);
    target = target ?? { ...(source as Partial<Product>) };

    // All brSM product responses contain 'pid' field
    if (source?.pid) {
      target = {
        price: this.normalizePrice(source.sale_price),
        priceRange: source.price_range
          ? { maxPrice: source.price_range[0], minPrice: source.price_range[1] }
          : undefined,
        averageRating: source.score,
        description: source.description,
        name: source.title,
        nameHtml: source.title,
        url: source.url,
        code: source.pid,
        stock: {
          stockLevelStatus: 'inStock',
        },
        images: {
          PRIMARY: {
            thumbnail: {
              format: 'thumbnail',
              imageType: ImageType.PRIMARY,
              url: source.thumb_image,
            },
            product: {
              format: 'product',
              imageType: ImageType.PRIMARY,
              url: source.thumb_image,
            },
          },
        },
      };
    }
    return target;
  }

  normalizePrice(val: any): Price {
    const currencySymbol: string = getCurrencySymbol('USD', 'narrow', 'en');

    const priceformatedval = formatCurrency(val, 'en', currencySymbol, 'USD');

    return {
      currencyIso: 'USD',
      formattedValue: priceformatedval,
      priceType: PriceType.BUY,
      value: val,
    };
  }
}
