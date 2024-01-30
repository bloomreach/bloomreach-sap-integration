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
import { CheckoutProgressMobileBottomComponent } from '@spartacus/checkout/base/components';
import { SpartacusCheckoutProgressMobileBottomDirective } from './spartacus-checkout-progress-mobile-bottom.directive';

@Component({
  selector: 'brx-spartacus-checkout-progress-mobile-bottom',
  templateUrl: './spartacus-checkout-progress-mobile-bottom.component.html',
})
export class SpartacusCheckoutProgressMobileBottomComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCheckoutProgressMobileBottomDirective, { static: true })
  wrappedComponent!: SpartacusCheckoutProgressMobileBottomDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderWrappedCheckoutProgressMobileTop();
  }

  renderWrappedCheckoutProgressMobileTop(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CheckoutProgressMobileBottomComponent,
    );
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent<CheckoutProgressMobileBottomComponent>(componentFactory, 0);
  }
}
