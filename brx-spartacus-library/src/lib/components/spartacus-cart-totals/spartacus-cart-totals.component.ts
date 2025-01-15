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
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { CustomerCouponService } from '@spartacus/core';
import { CartTotalsComponent } from '@spartacus/cart/base/components';
import { ActiveCartFacade, CartVoucherFacade } from '@spartacus/cart/base/root';
import { SpartacusCartTotalsDirective } from './spartacus-cart-totals.directive';

@Component({
  selector: 'brx-spartacus-cart-totals',
  templateUrl: './spartacus-cart-totals.component.html',
  styleUrls: ['./spartacus-cart-totals.component.scss'],
})
export class SpartacusCartTotalsComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCartTotalsDirective, { static: true })
  wrappedComponent!: SpartacusCartTotalsDirective;

  constructor(
    private cartVoucherService: CartVoucherFacade,
    private formBuilder: UntypedFormBuilder,
    private customerCouponService: CustomerCouponService,
    private activeCartService: ActiveCartFacade,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartFacade,
          useValue: this.activeCartService,
        },
        {
          provide: CartVoucherFacade,
          useValue: this.cartVoucherService,
        },
        {
          provide: UntypedFormBuilder,
          useValue: this.formBuilder,
        },
        {
          provide: CustomerCouponService,
          useValue: this.customerCouponService,
        },
      ],
    });

    viewContainerRef.createComponent(CartTotalsComponent, { index: 0, injector: componentInjector });
  }
}
