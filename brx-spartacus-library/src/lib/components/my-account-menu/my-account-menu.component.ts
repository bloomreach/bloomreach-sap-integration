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
import { Component, OnInit, Input } from '@angular/core';
import { Component as BrComponent, isMenu, Menu, Page } from '@bloomreach/spa-sdk';
import { AuthService, User } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'brx-my-account-menu',
  templateUrl: './my-account-menu.component.html',
  styleUrls: ['./my-account-menu.component.scss'],
})
export class MyAccountMenuComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  user$: Observable<boolean> | undefined;

  navbarOpen = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.isUserLoggedIn();
  }
}
