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

import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { OrderConfirmationThankYouMessageComponent } from '@spartacus/order/components';
// eslint-disable-next-line max-len
import { SpartacusOrderConfirmationThankYouMessageDirective } from './spartacus-order-confirmation-thank-you-message.directive';

@Component({
  selector: 'brx-spartacus-order-confirmation-thank-you-message',
  templateUrl: './spartacus-order-confirmation-thank-you-message.component.html',
})
export class SpartacusOrderConfirmationThankYouMessageComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusOrderConfirmationThankYouMessageDirective, { static: true })
  wrappedComponent!: SpartacusOrderConfirmationThankYouMessageDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderWrappedOrderConfirmationThankYouMessage();
  }

  renderWrappedOrderConfirmationThankYouMessage(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      OrderConfirmationThankYouMessageComponent,
    );
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent<OrderConfirmationThankYouMessageComponent>(componentFactory, 0);
  }
}
