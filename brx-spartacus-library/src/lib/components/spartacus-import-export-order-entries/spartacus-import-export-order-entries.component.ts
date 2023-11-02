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
import { ImportExportOrderEntriesComponent } from '@spartacus/cart/import-export/components';
import { ContextService } from '@spartacus/storefront';
import { SpartacusImportExportOrderEntriesDirective } from './spartacus-import-export-order-entries.directive';

@Component({
  selector: 'brx-spartacus-import-export-order-entries',
  templateUrl: './spartacus-import-export-order-entries.component.html',
  styleUrls: ['./spartacus-import-export-order-entries.component.scss'],
})
export class SpartacusImportExportOrderEntriesComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusImportExportOrderEntriesDirective, { static: true })
  wrappedComponent!: SpartacusImportExportOrderEntriesDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    protected contextService: ContextService,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImportExportOrderEntriesComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ContextService,
          useValue: this.contextService,
        },
      ],
    });

    viewContainerRef.createComponent<ImportExportOrderEntriesComponent>(componentFactory, 0, componentInjector);
  }
}
