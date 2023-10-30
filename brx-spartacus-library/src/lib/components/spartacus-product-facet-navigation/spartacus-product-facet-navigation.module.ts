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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ActiveFacetsModule } from './active-facets/active-facets.module';
import { FacetListModule } from './facet-list/facet-list.module';
import { SpartacusProductFacetNavigationComponent } from './spartacus-product-facet-navigation.component';

/*
 * Copied from cms-components/product/product-list/product-facet-navigation/product-facet-navigation.module.ts
 * of SAP Spartacus Storefront project.
 */
@NgModule({
  imports: [
    CommonModule,
    FacetListModule,
    ActiveFacetsModule,
    IconModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductRefinementComponent: {
          component: SpartacusProductFacetNavigationComponent,
        },
      },
    }),
  ],
  declarations: [SpartacusProductFacetNavigationComponent],
  exports: [SpartacusProductFacetNavigationComponent],
})
export class SpartacusProductFacetNavigationModule {}
