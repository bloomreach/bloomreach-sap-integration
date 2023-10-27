/*
 * Copyright 2022-2023 BloomReach (https://www.bloomreach.com/)
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

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { productVariantsTranslationChunksConfig, productVariantsTranslations } from '@spartacus/product/variants/assets';
import { ProductVariantsRootModule, PRODUCT_VARIANTS_FEATURE } from '@spartacus/product/variants/root';

@NgModule({
  declarations: [],
  imports: [
    ProductVariantsRootModule
  ],
  providers: [provideConfig({
    featureModules: {
      [PRODUCT_VARIANTS_FEATURE]: {
        module: () =>
          import('@spartacus/product/variants').then((m) => m.ProductVariantsModule),
      },
    }
  } as CmsConfig),
  provideConfig({
    i18n: {
      resources: productVariantsTranslations,
      chunks: productVariantsTranslationChunksConfig,
    },
  } as I18nConfig)
  ],
})
export class ProductVariantsFeatureModule { }
