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
import { Params, Router } from '@angular/router';
import {
  CmsPageAdapter,
  CmsStructureModel,
  CMS_PAGE_NORMALIZER,
  ConverterService,
  Occ,
  PageContext,
  PageType,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrxCmsPageAdapter implements CmsPageAdapter {
  constructor(
    protected converter: ConverterService,
    private readonly routingConfigService: RoutingConfigService,
    private readonly routingService: RoutingService,
    private readonly router: Router,
  ) {}

  /**
   * @override returns the PMA data for the given context and converts
   * the data by any configured `CMS_PAGE_NORMALIZER`.
   */
  load(pageContext: PageContext): Observable<CmsStructureModel> {
    // console.log('[BrxCmsPageAdapter.load]');
    // console.log('[pageContext]: ', pageContext);
    return this.routingService.getRouterState().pipe(
      take(1),
      map((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { url, queryParams = {} } = state.nextState ?? {};
        // console.log('[BrxCmsPageAdapter]: router state url: ', url);
        // console.log('[BrxCmsPageAdapter]: router state queryParams: ', queryParams);
        if (pageContext?.type === PageType.PRODUCT_PAGE) {
          return this.generateProductPageTemplate(pageContext);
        }
        if (pageContext?.type === PageType.CATEGORY_PAGE) {
          return this.generateCategoryPageTemplate(pageContext);
        }

        // By default, pageContext's id is path
        let path = pageContext?.id ?? '';
        if (path.startsWith('/')) {
          path = path.slice(1);
        }
        const routeName = this.routingConfigService.getRouteName(path);
        // console.log('[BrxCmsPageAdapter]: routeName: ', routeName);
        if (routeName?.startsWith('checkout')) {
          return this.generateCheckoutPageTemplate(pageContext, routeName, path, queryParams);
        }
        if (routeName?.startsWith('orderConfirmation')) {
          return this.generateOrderConfirmationPageTemplate(pageContext, queryParams);
        }

        return {
          typeCode: pageContext?.type,
          template: this.getPageTemplate(pageContext),
          contentSlots: {
            contentSlot: [],
          },
        };
      }),
      this.converter.pipeable(CMS_PAGE_NORMALIZER),
    );
  }

  /**
   * returns a mock OCC response for product details page,
   * for the native Spartacus product details page implementation to work correctly.
   */
  protected generateProductPageTemplate(pageContext: PageContext): Occ.CMSPage {
    return {
      uid: 'productDetails',
      typeCode: pageContext?.type,
      template: 'ProductDetailsPageTemplate',
      contentSlots: {
        contentSlot: [
          {
            slotId: 'ProductSummarySlot',
            position: 'Summary',
            components: {
              component: [
                {
                  uid: 'ProductImagesComponent',
                  typeCode: 'CMSFlexComponent',
                  flexType: 'ProductImagesComponent',
                },
                {
                  uid: 'ProductIntroComponent',
                  typeCode: 'CMSFlexComponent',
                  flexType: 'ProductIntroComponent',
                },
                {
                  uid: 'ProductSummaryComponent',
                  typeCode: 'CMSFlexComponent',
                  flexType: 'ProductSummaryComponent',
                },
                {
                  uid: 'VariantSelector',
                  typeCode: 'ProductVariantSelectorComponent',
                  flexType: 'ProductVariantSelectorComponent',
                },
                {
                  uid: 'AddToCart',
                  typeCode: 'ProductAddToCartComponent',
                  flexType: 'ProductAddToCartComponent',
                },
                {
                  uid: 'AddToWishListComponent',
                  typeCode: 'CMSFlexComponent',
                  flexType: 'AddToWishListComponent',
                },
                {
                  uid: 'StockNotificationComponent',
                  typeCode: 'CMSFlexComponent',
                  flexType: 'StockNotificationComponent',
                },
              ],
            },
          },
          {
            slotId: 'TabsSlot',
            position: 'Tabs',
            components: {
              component: [
                {
                  uid: 'TabPanelContainer',
                  typeCode: 'CMSTabParagraphContainer',
                  components:
                    'ProductDetailsTabComponent ProductSpecsTabComponent ProductReviewsTabComponent deliveryTab',
                },
              ],
            },
          },
        ],
      },
    };
  }

  /**
   * returns a mock OCC response for product category page,
   * so the Spartacus page meta service (used by the breadcrumb component) for category page can work correctly.
   */
  protected generateCategoryPageTemplate(pageContext: PageContext): Occ.CMSPage {
    return {
      uid: 'productList',
      typeCode: pageContext?.type,
      template: 'ProductListPageTemplate',
      contentSlots: {
        contentSlot: [
          {
            slotId: 'ProductListSlot',
            position: 'ProductListSlot',
            slotShared: true,
            components: {
              component: [
                {
                  uid: 'ProductListComponent',
                  typeCode: 'CMSProductListComponent',
                  container: 'false',
                },
              ],
            },
          },
        ],
      },
    };
  }

  /**
   * returns a mock OCC response for checkout page,
   * so the Spartacus component guards can work correctly.
   * The component guards are required to prevent unauthorized access to the checkout pages.
   */
  protected generateCheckoutPageTemplate(
    pageContext: PageContext,
    routeName: string,
    path: string,
    queryParams: Params,
  ): Occ.CMSPage {
    const checkoutPage: Occ.CMSPage = {
      uid: routeName,
      typeCode: pageContext?.type,
      label: `/${path}`,
      template: 'MultiStepCheckoutSummaryPageTemplate',
      title: routeName,
      contentSlots: {
        contentSlot: [],
      },
    };

    // To prevent firing unnecessary guards, only add component types on live page
    if (!this.isPreview(queryParams)) {
      switch (routeName) {
        case 'checkout':
          checkoutPage.contentSlots!.contentSlot!.push({
            name: 'Checkout Orchestrator Slot',
            position: 'BodyContent',
            slotId: 'BodyContentSlot-checkout',
            slotShared: false,
            components: {
              component: [
                {
                  container: 'false',
                  flexType: 'CheckoutOrchestrator',
                  name: 'Checkout Orchestrator Component',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutOrchestratorComponent',
                },
              ],
            },
          });
          break;
        case 'checkoutShippingAddress':
          checkoutPage.contentSlots!.contentSlot!.push({
            name: 'Checkout Shipping Address Slot',
            position: 'BodyContent',
            slotId: 'BodyContentSlot-checkoutShippingAddress',
            slotShared: false,
            components: {
              component: [
                {
                  container: 'false',
                  flexType: 'CheckoutProgress',
                  name: 'Checkout Progress Component',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutProgressComponent',
                },
                {
                  container: 'false',
                  flexType: 'CheckoutShippingAddress',
                  name: 'Checkout Shipping Address Component',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutShippingAddressComponent',
                },
              ],
            },
          });
          break;
        case 'checkoutDeliveryMode':
          checkoutPage.contentSlots!.contentSlot!.push({
            name: 'Checkout Delivery Mode Slot',
            position: 'BodyContent',
            slotId: 'BodyContentSlot-checkoutDeliveryMode',
            slotShared: false,
            components: {
              component: [
                {
                  container: 'false',
                  flexType: 'CheckoutProgress',
                  name: 'Checkout Progress Component',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutProgressComponent',
                },
                {
                  container: 'false',
                  flexType: 'CheckoutDeliveryMode',
                  name: 'CheckoutDeliveryModeComponent',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutDeliveryModeComponent',
                },
              ],
            },
          });
          break;
        case 'checkoutPaymentDetails':
          checkoutPage.contentSlots!.contentSlot!.push({
            name: 'Checkout Payment Details Slot',
            position: 'BodyContent',
            slotId: 'BodyContentSlot-checkoutPaymentDetails',
            slotShared: false,
            components: {
              component: [
                {
                  container: 'false',
                  flexType: 'CheckoutProgress',
                  name: 'Checkout Progress Component',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutProgressComponent',
                },
                {
                  container: 'false',
                  flexType: 'CheckoutPaymentDetails',
                  name: 'CheckoutPaymentDetailsComponent',
                  typeCode: 'CMSFlexComponent',
                  uid: 'CheckoutPaymentDetailsComponent',
                },
              ],
            },
          });
          break;
        case 'checkoutReviewOrder':
          checkoutPage.contentSlots!.contentSlot!.push(
            {
              name: 'Checkout Review Order Slot',
              position: 'BodyContent',
              slotId: 'BodyContentSlot-checkoutReviewOrder',
              slotShared: false,
              components: {
                component: [
                  {
                    container: 'false',
                    flexType: 'CheckoutProgress',
                    name: 'Checkout Progress Component',
                    typeCode: 'CMSFlexComponent',
                    uid: 'CheckoutProgressComponent',
                  },
                  {
                    container: 'false',
                    flexType: 'CheckoutReviewOrder',
                    name: 'CheckoutReviewOrderComponent',
                    typeCode: 'CMSFlexComponent',
                    uid: 'CheckoutReviewOrderComponent',
                  },
                ],
              },
            },
            {
              name: 'Checkout Place Order Slot',
              position: 'SideContent',
              slotId: `SideContentSlot-checkoutReviewOrder`,
              slotShared: false,
              components: {
                component: [
                  {
                    container: 'false',
                    flexType: 'CheckoutPlaceOrder',
                    name: 'CheckoutPlaceOrderComponent',
                    typeCode: 'CMSFlexComponent',
                    uid: 'CheckoutPlaceOrderComponent',
                  },
                ],
              },
            },
          );
          break;
        default:
          break;
      }
    }

    return checkoutPage;
  }

  /**
   * returns a mock OCC response for order confirmation page,
   * so the Spartacus component guards can work correctly.
   * The component guards are required to prevent unauthorized access to the order confirmation page.
   */
  protected generateOrderConfirmationPageTemplate(pageContext: PageContext, queryParams: Params): Occ.CMSPage {
    const orderConfirmationPage: Occ.CMSPage = {
      uid: 'orderConfirmationPage',
      typeCode: pageContext?.type,
      label: `/order-confirmation`,
      template: 'OrderConfirmationPageTemplate',
      title: 'Order Confirmation',
      contentSlots: {
        contentSlot: [],
      },
    };

    // To prevent firing unnecessary guards, only add component types on live page
    if (!this.isPreview(queryParams)) {
      orderConfirmationPage.contentSlots!.contentSlot!.push({
        name: 'Body Content Slot for Order Confirmation',
        position: 'BodyContent',
        slotId: 'BodyContent-orderConfirmation',
        slotShared: false,
        components: {
          component: [
            {
              container: 'false',
              flexType: 'OrderConfirmationThankMessageComponent',
              typeCode: 'CMSFlexComponent',
              uid: 'OrderConfirmationThankMessageComponent',
            },
            {
              container: 'false',
              flexType: 'OrderConfirmationOverviewComponent',
              typeCode: 'CMSFlexComponent',
              uid: 'OrderConfirmationOverviewComponent',
            },
            {
              container: 'false',
              flexType: 'OrderConfirmationItemsComponent',
              typeCode: 'CMSFlexComponent',
              uid: 'OrderConfirmationItemsComponent',
            },
            {
              container: 'false',
              flexType: 'OrderConfirmationTotalsComponent',
              typeCode: 'CMSFlexComponent',
              uid: 'OrderConfirmationTotalsComponent',
            },
          ],
        },
      });
    }

    return orderConfirmationPage;
  }

  // Mock page template for breadcrumb component
  protected getPageTemplate(pageContext: PageContext): string | undefined {
    if (pageContext.id === 'search') {
      return 'SearchResultsListPageTemplate';
    }

    return undefined;
  }

  private isPreview(queryParams: Params): boolean {
    return queryParams.token && queryParams.endpoint;
  }
}
