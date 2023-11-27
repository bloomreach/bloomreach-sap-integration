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
import { ActiveCartService, AuthService, RoutingService, SelectiveCartService } from '@spartacus/core';
import { CartDetailsComponent } from '@spartacus/storefront';
import { SpartacusCartDetailsDirective } from './spartacus-cart-details.directive';

@Component({
  selector: 'brx-spartacus-cart-details',
  templateUrl: './spartacus-cart-details.component.html',
  styleUrls: ['./spartacus-cart-details.component.scss'],
})
export class SpartacusCartDetailsComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCartDetailsDirective, { static: true })
  wrappedComponent!: SpartacusCartDetailsDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
// TODO:Spartacus - The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' 
    private activeCartService: ActiveCartService,
// TODO:Spartacus - The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' 
    private selectiveCartService: SelectiveCartService,
    private authService: AuthService,
    private routingService: RoutingService,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CartDetailsComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartService,
// TODO:Spartacus - The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' 
          useValue: this.activeCartService,
        },
        {
          provide: SelectiveCartService,
// TODO:Spartacus - The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' 
          useValue: this.selectiveCartService,
        },
        {
          provide: AuthService,
          useValue: this.authService,
        },
        {
          provide: RoutingService,
          useValue: this.routingService,
        },
      ],
    });

    viewContainerRef.createComponent<CartDetailsComponent>(componentFactory, 0, componentInjector);
  }
}
