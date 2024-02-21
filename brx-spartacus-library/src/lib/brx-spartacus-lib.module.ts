/* eslint-disable max-len */
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryHighlightComponent } from './components/category-highlight/category-highlight.component';
import { SpartacusBannerComponent } from './components/spartacus-banner/spartacus-banner.component';
import { SpartacusBannerDirective } from './components/spartacus-banner/spartacus-banner.directive';
import { SpartacusProductDetailsModule } from './components/spartacus-product-details/spartacus-product-details.module';
import { SpartacusProductHighlightComponent } from './components/spartacus-product-highlight/spartacus-product-highlight.component';
import { SpartacusProductHighlightDirective } from './components/spartacus-product-highlight/spartacus-product-highlight.directive';
import { SpartacusProductListComponent } from './components/spartacus-product-list/spartacus-product-list.component';
import { SpartacusProductListDirective } from './components/spartacus-product-list/spartacus-product-list.directive';
import { SpartacusSearchBoxComponent } from './components/spartacus-search-box/spartacus-search-box.component';
import { SpartacusSearchBoxDirective } from './components/spartacus-search-box/spartacus-search-box.directive';
import { BrxProductSearchModule } from './spartacus/brx/adapters/brx-product-search.module';
import { CmsBrxModule } from './spartacus/brx/cms-brx.module';
import { BrxProductNormalizerModule } from './spartacus/brx/normalizers/brx-product-normalizer.module';
// eslint-disable-next-line max-len
import { PathwaysRecommendationsComponent } from './components/pathways-recommendations/pathways-recommendations.component';
import { SpartacusProductFacetNavigationModule } from './components/spartacus-product-facet-navigation';
import { SpartacusLoginFormComponent } from './components/spartacus-login-form/spartacus-login-form.component';
import { SpartacusLoginFormDirective } from './components/spartacus-login-form/spartacus-login-form.directive';
import { CustomPipesModule } from './pipes/custom-pipes.module';
import { SpartacusParagraphComponent } from './components/spartacus-paragraph/spartacus-paragraph.component';
import { SpartacusParagraphDirective } from './components/spartacus-paragraph/spartacus-paragraph.directive';
import { SpartacusBreadcrumbComponent } from './components/spartacus-breadcrumb/spartacus-breadcrumb.component';
import { SpartacusBreadcrumbDirective } from './components/spartacus-breadcrumb/spartacus-breadcrumb.directive';
import { SpartacusPageMetaModule } from './services/spartacus-page-meta.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { SpartacusRegisterComponent } from './components/spartacus-register/spartacus-register.component';
import { SpartacusRegisterDirective } from './components/spartacus-register/spartacus-register.directive';
import { SpartacusLoginRegisterComponent } from './components/spartacus-login-register/spartacus-login-register.component';
import { SpartacusLoginRegisterDirective } from './components/spartacus-login-register/spartacus-login-register.directive';
import { SpartacusCartDetailsComponent } from './components/spartacus-cart-details/spartacus-cart-details.component';
import { SpartacusCartDetailsDirective } from './components/spartacus-cart-details/spartacus-cart-details.directive';
import { SpartacusCartTotalsComponent } from './components/spartacus-cart-totals/spartacus-cart-totals.component';
import { SpartacusCartTotalsDirective } from './components/spartacus-cart-totals/spartacus-cart-totals.directive';
import { SpartacusCartCouponComponent } from './components/spartacus-cart-coupon/spartacus-cart-coupon.component';
import { SpartacusCartCouponDirective } from './components/spartacus-cart-coupon/spartacus-cart-coupon.directive';
import { SpartacusCartQuickOrderFormComponent } from './components/spartacus-cart-quick-order-form/spartacus-cart-quick-order-form.component';
import { SpartacusCartQuickOrderFormDirective } from './components/spartacus-cart-quick-order-form/spartacus-cart-quick-order-form.directive';
import { SpartacusAddToSavedCartComponent } from './components/spartacus-add-to-saved-cart/spartacus-add-to-saved-cart.component';
import { SpartacusAddToSavedCartDirective } from './components/spartacus-add-to-saved-cart/spartacus-add-to-saved-cart.directive';
import { SpartacusImportExportOrderEntriesComponent } from './components/spartacus-import-export-order-entries/spartacus-import-export-order-entries.component';
import { SpartacusImportExportOrderEntriesDirective } from './components/spartacus-import-export-order-entries/spartacus-import-export-order-entries.directive';
import { SpartacusLoginComponent } from './components/spartacus-login/spartacus-login.component';
import { SpartacusLoginDirective } from './components/spartacus-login/spartacus-login.directive';
import { SpartacusMiniCartComponent } from './components/spartacus-mini-cart/spartacus-mini-cart.component';
import { SpartacusMiniCartDirective } from './components/spartacus-mini-cart/spartacus-mini-cart.directive';
import { MyAccountMenuComponent } from './components/my-account-menu/my-account-menu.component';
import { SpartacusWishListComponent } from './components/spartacus-wish-list/spartacus-wish-list.component';
import { SpartacusWishListDirective } from './components/spartacus-wish-list/spartacus-wish-list.directive';
import { SpartacusCheckoutModule } from './components/spartacus-checkout';
import { SpartacusOrderConfirmationModule } from './components/spartacus-order-confirmation/spartacus-order-confirmation.module';
import { SpartacusForgotPasswordComponent } from './components/spartacus-forgot-password/spartacus-forgot-password.component';
import { SpartacusForgotPassswordDirective } from './components/spartacus-forgot-password/spartacus-forgot-password.directive';

@NgModule({
  declarations: [
    SpartacusProductListComponent,
    SpartacusProductListDirective,
    SpartacusSearchBoxComponent,
    SpartacusSearchBoxDirective,
    BannerComponent,
    SpartacusBannerComponent,
    SpartacusBannerDirective,
    SpartacusProductHighlightComponent,
    SpartacusProductHighlightDirective,
    SpartacusParagraphDirective,
    CategoryHighlightComponent,
    PathwaysRecommendationsComponent,
    SpartacusLoginFormComponent,
    SpartacusLoginFormDirective,
    SpartacusParagraphComponent,
    SpartacusBreadcrumbComponent,
    SpartacusBreadcrumbDirective,
    MenuComponent,
    MenuItemComponent,
    SpartacusRegisterComponent,
    SpartacusRegisterDirective,
    SpartacusLoginRegisterComponent,
    SpartacusLoginRegisterDirective,
    SpartacusCartDetailsComponent,
    SpartacusCartDetailsDirective,
    SpartacusCartTotalsComponent,
    SpartacusCartTotalsDirective,
    SpartacusCartCouponComponent,
    SpartacusCartCouponDirective,
    SpartacusCartQuickOrderFormComponent,
    SpartacusCartQuickOrderFormDirective,
    SpartacusAddToSavedCartComponent,
    SpartacusAddToSavedCartDirective,
    SpartacusImportExportOrderEntriesComponent,
    SpartacusImportExportOrderEntriesDirective,
    SpartacusLoginComponent,
    SpartacusLoginDirective,
    SpartacusMiniCartComponent,
    SpartacusMiniCartDirective,
    MyAccountMenuComponent,
    SpartacusWishListComponent,
    SpartacusWishListDirective,
    SpartacusForgotPasswordComponent,
    SpartacusForgotPassswordDirective,
  ],
  imports: [
    BrowserModule,
    BrSdkModule,
    RouterModule,
    BrxProductSearchModule,
    BrxProductNormalizerModule,
    SpartacusProductDetailsModule,
    SpartacusProductFacetNavigationModule,
    CmsBrxModule,
    CarouselModule,
    MediaModule,
    CustomPipesModule,
    SpartacusPageMetaModule,
    SpartacusCheckoutModule,
    SpartacusOrderConfirmationModule,
  ],
  exports: [
    BannerComponent,
    SpartacusBannerComponent,
    SpartacusSearchBoxComponent,
    SpartacusProductListComponent,
    SpartacusProductHighlightComponent,
    BrxProductSearchModule,
    BrxProductNormalizerModule,
    SpartacusProductDetailsModule,
    SpartacusProductFacetNavigationModule,
    SpartacusLoginFormComponent,
    CmsBrxModule,
    CategoryHighlightComponent,
    PathwaysRecommendationsComponent,
    SpartacusParagraphComponent,
    SpartacusBreadcrumbComponent,
    MenuComponent,
    SpartacusRegisterComponent,
    SpartacusLoginRegisterComponent,
    SpartacusCartDetailsComponent,
    SpartacusCartTotalsComponent,
    SpartacusCartCouponComponent,
    SpartacusCartQuickOrderFormComponent,
    SpartacusAddToSavedCartComponent,
    SpartacusImportExportOrderEntriesComponent,
    SpartacusLoginComponent,
    SpartacusMiniCartComponent,
    MyAccountMenuComponent,
    SpartacusWishListComponent,
    SpartacusForgotPasswordComponent,
  ],
})
export class BrxSpartacusLibModule {}
