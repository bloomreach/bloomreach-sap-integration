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

function buildConfigObject() {
    const ENV_VARIABLES = process.env;
    const config = {};

    for (let attr in ENV_VARIABLES) {
      if (attr.startsWith('brx_')) {
        const newKey = attr.split('_')[1];
        config[newKey] = process.env[attr];
      }
    }
  
    return config;
  }
  
  exports.handler = function (event, context, callback) {
    try {
      const config = buildConfigObject();
      const returnObj = { 
        body: JSON.stringify(config),
        headers: {
         "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
       statusCode: 200 };
      console.log('runtime config data: ', JSON.stringify(returnObj, null, 2));
      return callback(null, returnObj);
    } catch (error) {
      console.error(error);
      return callback({ statusCode: 500, error });
    }
  };