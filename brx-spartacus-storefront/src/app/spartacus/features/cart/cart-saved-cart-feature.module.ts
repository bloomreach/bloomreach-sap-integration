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
import { savedCartTranslationChunksConfig, savedCartTranslations } from '@spartacus/cart/saved-cart/assets';
import { CART_SAVED_CART_FEATURE, SavedCartRootModule } from '@spartacus/cart/saved-cart/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [SavedCartRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_SAVED_CART_FEATURE]: {
          module: () => import('@spartacus/cart/saved-cart').then((m) => m.SavedCartModule),
        },
      },
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: savedCartTranslations,
        chunks: savedCartTranslationChunksConfig,
      },
    } as I18nConfig),
  ],
})
export class CartSavedCartFeatureModule {}
