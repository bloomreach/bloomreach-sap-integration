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
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { WishListComponent } from '@spartacus/cart/wish-list/components';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { SpartacusWishListDirective } from './spartacus-wish-list.directive';

@Component({
  selector: 'brx-spartacus-wish-list',
  templateUrl: './spartacus-wish-list.component.html',
})
export class SpartacusWishListComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusWishListDirective, { static: true })
  wrappedComponent!: SpartacusWishListDirective;

  constructor(private wishListFacade: WishListFacade) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: WishListFacade,
          useValue: this.wishListFacade,
        },
      ],
    });

    viewContainerRef.createComponent(WishListComponent, { index: 0, injector: componentInjector });
  }
}
