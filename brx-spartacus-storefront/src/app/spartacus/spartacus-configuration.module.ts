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
import { translationChunksConfig, translations } from '@spartacus/assets';
import {ConfigModule, FeaturesConfig, I18nConfig, OccConfig, provideConfig, SiteContextConfig} from '@spartacus/core';
import { defaultCmsContentProviders, layoutConfig, mediaConfig } from '@spartacus/storefront';
import { defaultImportEntriesLayoutConfig } from './default-import-entries-layout.config';
import { importExportTranslationChunksConfig, importExportTranslations } from '@spartacus/cart/import-export/assets';
import { quickOrderTranslationChunksConfig, quickOrderTranslations } from '@spartacus/cart/quick-order/assets';
import { defaultSavedCartFormLayoutConfig } from './default-saved-cart-form-layout.config';

@NgModule({
  declarations: [],
  imports: [
    ConfigModule.withConfig({
      routing: {
        routes: {
          product: { paths: ['product/:productCode'] },
          category: { paths: ['category/:categoryCode', 'category'] },
          search: { paths: ['search/:query', 'search'] },
          login: { paths: ['sign-in'] },
          forgotPassword: { paths: ['forgot-password'] },
          resetPassword: { paths: ['sign-in/pw/change'] },
          register: { paths: ['register'] },
        }
      }
    })
  ],
  providers: [provideConfig(layoutConfig), provideConfig(mediaConfig), ...defaultCmsContentProviders, provideConfig({
    backend: {
      occ: {
        baseUrl: 'https://api.cvbrtj6s9u-bloomreac1-d1-public.model-t.cc.commerce.ondemand.com', prefix: '/occ/v2/'
      }
    },
  } as OccConfig), provideConfig({
    context: {
      currency: ['USD'],
      language: ['en'],
      baseSite: ['pacificSupply']
    },
  } as SiteContextConfig), provideConfig({
    i18n: {
      resources: translations,
      chunks: translationChunksConfig,
      fallbackLang: 'en'
    },
  } as I18nConfig), provideConfig({
    i18n: {
      resources: importExportTranslations,
      chunks: importExportTranslationChunksConfig,
      fallbackLang: 'en'
    },
  } as I18nConfig), provideConfig({
    i18n: {
      resources: quickOrderTranslations,
      chunks: quickOrderTranslationChunksConfig,
      fallbackLang: 'en'
    },
  } as I18nConfig), provideConfig({
    features: {
      level: '4.0'
    }
  } as FeaturesConfig), provideConfig(defaultImportEntriesLayoutConfig),
    provideConfig(defaultSavedCartFormLayoutConfig),
  ]
})
export class SpartacusConfigurationModule { }


