/**
 * Copyright 2023 actions-toolkit authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'path';
import {describe, expect, test} from '@jest/globals';

import {Install} from '../../src/docker/install';
import {Docker} from '../../src/docker/docker';

// prettier-ignore
const tmpDir = path.join(process.env.TEMP || '/tmp', 'buildx-jest');

describe('install', () => {
  // prettier-ignore
  test.each(['23.0.0'])(
    'install docker %s', async (version) => {
      await expect((async () => {
        const install = new Install();
        const toolPath = await install.download(version);
        await install.install(toolPath, tmpDir, version);
        await Docker.printVersion();
        await Docker.printInfo();
        await install.tearDown(tmpDir);
      })()).resolves.not.toThrow();
    });
});