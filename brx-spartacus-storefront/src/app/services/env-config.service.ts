/*
 * Copyright 2022-2023 BloomReach (https://www.bloomreach.com/)
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

import { Inject, Injectable } from '@angular/core';
import { BrxEndpointService } from '@bloomreach/brx-spartacus-library';
import { APP_CONFIG, LibConfig } from 'src/app.config';
import { environment } from 'src/environments/environment';

export interface ChannelProps {
  graphql_baseurl: string;
  graphqlTenantName: string;
  discoveryAccountId: string;
  discoveryDomainKey: string;
  discoveryRealm: string;
  discoveryViewId: string;
  spaUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnvConfigService {
  config: LibConfig = {} as LibConfig;

  constructor(private brxService: BrxEndpointService, @Inject(APP_CONFIG) private netlifyConfig: LibConfig) {}

  initilizeConfigFromNetlify(): void {
    const envVariables = { ...environment.libConfig };
    const netlifyVariables = { ...this.netlifyConfig };

    this.config = {
      endpoint: netlifyVariables.endpoint || envVariables.endpoint,
      smEndPoint: netlifyVariables.smEndPoint || envVariables.smEndPoint,
      smSuggestionEndPoint: netlifyVariables.smSuggestionEndPoint || envVariables.smSuggestionEndPoint,
      accountId: netlifyVariables.accountId || envVariables.accountId,
      domainKey: netlifyVariables.domainKey || envVariables.domainKey,
      authKey: netlifyVariables.authKey || envVariables.authKey,
    };
    this.setEnvConfigInLibrary();
  }

  setEnvVariables(channelProps: ChannelProps, endpointFromParms: string = ''): void {
    this.config.endpoint = endpointFromParms || this.config.endpoint;
    const { discoveryAccountId, discoveryDomainKey } = channelProps;

    // Overwrite ENV variables if endpoint paramaneter is passed in the query param
    // and account Id and Domain key are not set
    this.config.accountId = discoveryAccountId || this.config.accountId;
    this.config.domainKey = discoveryDomainKey || this.config.domainKey;

    this.setEnvConfigInLibrary();
  }

  setEnvConfigInLibrary(): void {
    this.brxService.envConfig = this.config;
  }
}
