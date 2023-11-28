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

import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { CartCouponComponent } from '@spartacus/cart/base/components';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { SpartacusCartCouponDirective } from './spartacus-cart-coupon.directive';

@Component({
  selector: 'brx-spartacus-cart-coupon',
  templateUrl: './spartacus-cart-coupon.component.html',
  styleUrls: ['./spartacus-cart-coupon.component.scss'],
})
export class SpartacusCartCouponComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCartCouponDirective, { static: true })
  wrappedComponent!: SpartacusCartCouponDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private activeCartService: ActiveCartFacade,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CartCouponComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartFacade,
          useValue: this.activeCartService,
        },
      ],
    });

    viewContainerRef.createComponent<CartCouponComponent>(componentFactory, 0, componentInjector);
  }
}
