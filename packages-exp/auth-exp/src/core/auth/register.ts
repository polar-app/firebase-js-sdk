/**
 * @license
 * Copyright 2020 Google LLC
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

import { _registerComponent, registerVersion } from '@firebase/app-exp';
import * as externs from '@firebase/auth-types-exp';
import { Component, ComponentType } from '@firebase/component';

import { version } from '../../../package.json';
import { AuthErrorCode } from '../errors';
import { assert } from '../util/assert';
import { _getClientVersion, ClientPlatform } from '../util/version';
import { _castAuth, AuthImpl, DefaultConfig } from './auth_impl';
import { AuthInternal } from './firebase_internal';

export const enum ComponentName {
  AUTH = 'auth-exp',
  AUTH_INTERNAL = 'auth-internal-exp'
}

function getVersionForPlatform(
  clientPlatform: ClientPlatform
): string | undefined {
  switch (clientPlatform) {
    case ClientPlatform.NODE:
      return 'node';
    case ClientPlatform.REACT_NATIVE:
      return 'rn';
    case ClientPlatform.WORKER:
      return 'webworker';
    default:
      return undefined;
  }
}

export function registerAuth(clientPlatform: ClientPlatform): void {
  _registerComponent(
    new Component(
      ComponentName.AUTH,
      container => {
        const app = container.getProvider('app-exp').getImmediate()!;
        const { apiKey, authDomain } = app.options;
        return (app => {
          assert(apiKey, AuthErrorCode.INVALID_API_KEY, { appName: app.name });
          const config: externs.Config = {
            apiKey,
            authDomain,
            apiHost: DefaultConfig.API_HOST,
            tokenApiHost: DefaultConfig.TOKEN_API_HOST,
            apiScheme: DefaultConfig.API_SCHEME,
            sdkClientVersion: _getClientVersion(clientPlatform)
          };
          return new AuthImpl(app, config);
        })(app);
      },
      ComponentType.PUBLIC
    )
  );

  _registerComponent(
    new Component(
      ComponentName.AUTH_INTERNAL,
      container => {
        const auth = _castAuth(
          container.getProvider(ComponentName.AUTH).getImmediate()!
        );
        return (auth => new AuthInternal(auth))(auth);
      },
      ComponentType.PRIVATE
    )
  );

  registerVersion(
    ComponentName.AUTH,
    version,
    getVersionForPlatform(clientPlatform)
  );
}
