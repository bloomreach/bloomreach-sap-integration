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

import { Component, HostBinding, Input } from '@angular/core';
import { Component as BrComponent, isMenu, Menu, Page } from '@bloomreach/spa-sdk';
import { MenuModels } from '../../models/common-types.model';

@Component({
  selector: 'brx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @HostBinding('class') class = 'navbar-nav col-12';

  @HostBinding('class.has-edit-button')
  navbarOpen = false;

  selectedMenutem = '';

  menuName = '';

  get isPreview(): boolean {
    return this.page.isPreview();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get menu() {
    const menuRef = this.component.getModels<MenuModels>()?.menu;
    const menu = menuRef && this.page.getContent<Menu>(menuRef);

    return isMenu(menu) ? menu : ({} as any);
  }

  selectedItem(item: any) {
    this.selectedMenutem = item.getName();
  }

  setActiveSubMenu(item: any) {
    this.menuName = this.menuName !== item.getName() ? item.getName() : '';
  }

  @HostBinding('document:click')
  onClick(event: { target: any }) {
    if (!event.target.className.includes('dropdown-toggle')) {
      this.menuName = '';
    }
  }
}
