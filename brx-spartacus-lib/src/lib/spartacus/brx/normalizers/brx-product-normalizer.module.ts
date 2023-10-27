import { PRODUCT_NORMALIZER, PRODUCT_SEARCH_PAGE_NORMALIZER, PRODUCT_SUGGESTION_NORMALIZER } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrxProductSearchNormalizer } from './brx-product-search-normalizer';
import { BrxProductNormalizer } from './brx-product-normalizer';
import { BrxProductSuggestionNormalizer } from './brx-product-suggestion-normalizer';

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

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: PRODUCT_SEARCH_PAGE_NORMALIZER,
      useExisting: BrxProductSearchNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useExisting: BrxProductNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_SUGGESTION_NORMALIZER,
      useExisting: BrxProductSuggestionNormalizer,
      multi: true,
    },
  ],
})
export class BrxProductNormalizerModule {}
