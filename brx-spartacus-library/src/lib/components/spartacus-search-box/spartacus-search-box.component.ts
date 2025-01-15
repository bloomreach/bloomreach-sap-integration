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
import { CmsSearchBoxComponent } from '@spartacus/core';
import { CmsComponentData, SearchBoxComponent, SearchBoxComponentService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { SpartacusSearchBoxComponentService } from '../../services/spartacus-search-box-component.service';
import { SpartacusSearchBoxDirective } from './spartacus-search-box.directive';

interface SearchBoxParams {
  maxSuggestions?: number;
  maxProducts?: number;
  displaySuggestions?: boolean;
  displayProducts?: boolean;
  displayProductImages?: boolean;
  minCharactersBeforeRequest?: number;
}

@Component({
  selector: 'brx-spartacus-search-box',
  templateUrl: './spartacus-search-box.component.html',
})
export class SpartacusSearchBoxComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusSearchBoxDirective, { static: true })
  wrappedComponent!: SpartacusSearchBoxDirective;

  constructor(private readonly searchBoxComponentService: SpartacusSearchBoxComponentService) {}

  ngOnInit(): void {
    this.renderWrappedSearchBox();
  }

  renderWrappedSearchBox(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const {
      displayProductImages,
      displayProducts,
      displaySuggestions,
      maxProducts,
      maxSuggestions,
      minCharactersBeforeRequest,
    } = this.component.getParameters<SearchBoxParams>();

    const componentProperties: CmsSearchBoxComponent = {
      maxSuggestions,
      maxProducts,
      displaySuggestions,
      displayProducts,
      displayProductImages,
      minCharactersBeforeRequest,
    };

    const componentInjector = Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: { data$: of(componentProperties) },
        },
        {
          provide: SearchBoxComponentService,
          useValue: this.searchBoxComponentService,
        },
      ],
    });

    viewContainerRef.createComponent(SearchBoxComponent, { index: 0, injector: componentInjector });
  }
}
