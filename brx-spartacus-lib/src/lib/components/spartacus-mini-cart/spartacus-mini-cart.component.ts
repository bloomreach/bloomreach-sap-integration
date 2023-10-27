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
import { ActiveCartService } from '@spartacus/core';
import { MiniCartComponent } from '@spartacus/storefront';
import { SpartacusMiniCartDirective } from './spartacus-mini-cart.directive';

@Component({
  selector: 'brx-spartacus-mini-cart',
  templateUrl: './spartacus-mini-cart.component.html',
})
export class SpartacusMiniCartComponent implements OnInit {

  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusMiniCartDirective, { static: true })
  wrappedComponent!: SpartacusMiniCartDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    protected activeCartService: ActiveCartService
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MiniCartComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartService,
          useValue: this.activeCartService,
        },
      ],
    });

    viewContainerRef.createComponent<MiniCartComponent>(componentFactory, 0, componentInjector);
}
}
