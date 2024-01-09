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

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, InjectionToken, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BannerComponent,
  CategoryHighlightComponent,
  MenuComponent,
  MyAccountMenuComponent,
  PathwaysRecommendationsComponent,
  SpartacusBannerComponent,
  SpartacusBreadcrumbComponent,
  SpartacusCartCouponComponent,
  SpartacusCartDetailsComponent,
  SpartacusCartQuickOrderFormComponent,
  SpartacusCartTotalsComponent,
  SpartacusCheckoutOrderSummaryComponent,
  SpartacusCheckoutProgressComponent,
  SpartacusCheckoutProgressMobileBottomComponent,
  SpartacusCheckoutProgressMobileTopComponent,
  SpartacusDeliveryModeComponent,
  SpartacusForgotPasswordComponent,
  SpartacusLoginComponent,
  SpartacusLoginFormComponent,
  SpartacusLoginRegisterComponent,
  SpartacusMiniCartComponent,
  SpartacusOrderConfirmationItemsComponent,
  SpartacusOrderDetailShippingComponent,
  SpartacusOrderConfirmationThankYouMessageComponent,
  SpartacusOrderConfirmationTotalsComponent,
  SpartacusParagraphComponent,
  SpartacusPaymentMethodComponent,
  SpartacusPlaceOrderComponent,
  SpartacusProductDetailsComponent,
  SpartacusProductFacetNavigationComponent,
  SpartacusProductHighlightComponent,
  SpartacusProductListComponent,
  SpartacusRegisterComponent,
  SpartacusReviewSubmitComponent,
  SpartacusSearchBoxComponent,
  SpartacusShippingAddressComponent,
  SpartacusWishListComponent,
} from '@bloomreach/brx-spartacus-library';
import { Page } from '@bloomreach/spa-sdk';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { PageContext, RoutingService } from '@spartacus/core';
import { OutletPosition } from '@spartacus/storefront';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BrPageComponent } from '@bloomreach/ng-sdk';
import { EnvConfigService } from '../services/env-config.service';
import { buildConfiguration } from '../utils/buildConfiguration';

export const ENDPOINT = new InjectionToken<string>('brXM API endpoint');

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'brx-spartacus',
  templateUrl: './brx.component.html',
  styleUrls: ['./brx.component.scss'],
})
export class BrxComponent implements OnDestroy {
  configuration!: BrPageComponent['configuration'];

  outletPosition = OutletPosition;

  authorizationToken?: string;

  serverId?: string;

  endpointFromParams?: string;

  mapping = {
    Banner: BannerComponent,
    SpartacusBanner: SpartacusBannerComponent,
    SpartacusLogin: SpartacusLoginFormComponent,
    SpartacusProductFacetNavigation: SpartacusProductFacetNavigationComponent,
    SpartacusProductList: SpartacusProductListComponent,
    SpartacusSearchBox: SpartacusSearchBoxComponent,
    SpartacusProductDetails: SpartacusProductDetailsComponent,
    ProductHighlight: SpartacusProductHighlightComponent,
    CategoryHighlight: CategoryHighlightComponent,
    PathwaysRecommendations: PathwaysRecommendationsComponent,
    SpartacusParagraph: SpartacusParagraphComponent,
    SpartacusBreadcrumb: SpartacusBreadcrumbComponent,
    menu: MenuComponent,
    SpartacusRegister: SpartacusRegisterComponent,
    SpartacusLoginRegister: SpartacusLoginRegisterComponent,
    SpartacusCartDetails: SpartacusCartDetailsComponent,
    SpartacusCartTotals: SpartacusCartTotalsComponent,
    SpartacusCartCoupon: SpartacusCartCouponComponent,
    SpartacusCartQuickOrderForm: SpartacusCartQuickOrderFormComponent,
    SpartacusUserGreet: SpartacusLoginComponent,
    SpartacusMiniCart: SpartacusMiniCartComponent,
    UserMyAccount: MyAccountMenuComponent,
    SpartacusWishList: SpartacusWishListComponent,
    SpartacusCheckoutProgress: SpartacusCheckoutProgressComponent,
    SpartacusCheckoutProgressMobileTop: SpartacusCheckoutProgressMobileTopComponent,
    SpartacusCheckoutProgressMobileBottom: SpartacusCheckoutProgressMobileBottomComponent,
    SpartacusShippingAddress: SpartacusShippingAddressComponent,
    SpartacusCheckoutOrderSummary: SpartacusCheckoutOrderSummaryComponent,
    SpartacusDeliveryMode: SpartacusDeliveryModeComponent,
    SpartacusPaymentMethod: SpartacusPaymentMethodComponent,
    SpartacusReviewSubmit: SpartacusReviewSubmitComponent,
    SpartacusPlaceOrder: SpartacusPlaceOrderComponent,
    SpartacusOrderConfirmationThankYouMessage: SpartacusOrderConfirmationThankYouMessageComponent,
    SpartacusOrderConfirmationItems: SpartacusOrderConfirmationItemsComponent,
    SpartacusOrderDetailShippingComponent,
    SpartacusOrderConfirmationTotals: SpartacusOrderConfirmationTotalsComponent,
    SpartacusForgotPassword: SpartacusForgotPasswordComponent,
  };

  brxHttpError?: HttpErrorResponse;

  pageContext$?: Observable<PageContext>;

  showSpinner = true;

  spinnerTimeout: any;

  constructor(
    router: Router,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private envConfigService: EnvConfigService,
    @Inject(REQUEST) @Optional() request?: Request,
  ) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((navigationEvent) => {
      const event = navigationEvent as NavigationEnd;
      this.showSpinner = true;

      this.endpointFromParams = this.route.snapshot.queryParamMap.get('endpoint') || undefined;
      const endpoint: string = this.endpointFromParams
        ? this.endpointFromParams
        : this.envConfigService.config.endpoint;

      this.configuration = buildConfiguration(event.url, request, endpoint);

      this.brxHttpError = undefined;
      this.pageContext$ = this.routingService
        .getPageContext()
        .pipe(tap((pageContext) => console.log('[BrxComponent.PageContext]: ', pageContext)));
      const timeout = +environment.appConfig.defaultLoadingTime * 1000;
      if (event.url !== '/') {
        // Ignoring the spinner for the landing page
        this.spinnerTimeout = setTimeout(() => {
          this.showSpinner = false;
        }, timeout);
      } else {
        this.showSpinner = false;
      }
    });
  }

  setVisitor(page?: Page): void {
    if (page && this.endpointFromParams) {
      this.envConfigService.setEnvVariables(page.getChannelParameters(), this.endpointFromParams);
    }
    this.configuration.visitor = page?.getVisitor();
  }

  onBrxHttpError(error: HttpErrorResponse): void {
    this.brxHttpError = error;
  }

  getPageTemplate(page: Page): string | undefined {
    return page?.getComponent().getName();
  }

  isCartContext(page: Page): boolean {
    return page.getUrl()?.includes('cart') || false;
  }

  ngOnDestroy(): void {
    if (this.spinnerTimeout) {
      clearTimeout(this.spinnerTimeout);
    }
  }
}
