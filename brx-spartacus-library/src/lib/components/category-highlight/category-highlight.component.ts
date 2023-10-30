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

import { Component, Input, OnInit } from '@angular/core';
import { ContainerItem, getContainerItemContent, Page } from '@bloomreach/spa-sdk';
import { Observable } from 'rxjs';
import { CategoryHighlightCompound } from '../../models/common-types.model';
import { BrxCategoryService } from '../../services';

@Component({
  selector: 'brx-category-highlight',
  templateUrl: './category-highlight.component.html',
  styleUrls: ['./category-highlight.component.scss'],
})
export class CategoryHighlightComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  title = '';

  commerceCategoryCompound: any[] = [];

  constructor(private categoryservice: BrxCategoryService) {}

  ngOnInit(): void {
    this.renderComponent();
  }

  categoriesList$: Observable<any[]> = this.categoryservice.getAllCategoriesList();

  renderComponent(): void {
    const { title, commerceCategoryCompound } =
      getContainerItemContent<CategoryHighlightCompound>(this.component, this.page) ?? {};
    this.title = title ?? '';
    this.commerceCategoryCompound = commerceCategoryCompound
      ? commerceCategoryCompound?.map((data: any) => data.categoryid)
      : [];
  }

  getQuery(item: string): string {
    return `/category/${item}`;
  }
}
