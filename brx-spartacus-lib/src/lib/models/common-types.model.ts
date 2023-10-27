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

export interface DocumentModels {
  document?: import('@bloomreach/spa-sdk').Reference;
}

export interface DocumentData {
  author: string;
  content: DocumentContent;
  date: number;
  publicationDate: number;
  image: import('@bloomreach/spa-sdk').Reference;
  introduction: string;
  title: string;

  [property: string]: any;
}

export interface DocumentContent {
  value: string;
}

export interface BannerCompound {
  title?: string;
  content?: DocumentContent;
  image?: import('@bloomreach/spa-sdk').Reference;
  link?: import('@bloomreach/spa-sdk').Reference;
  styleClasses?: string;
}

export interface SelectionType {
  selectionValues: { key: string; label: string }[];
}

export interface CategoryHighlightCompound {
  title: string;
  connectorid: SelectionType;
  commerceCategoryCompound?: [{ categoryid: string }];
}

export interface PathwaysRecommendationsParameters {
  interval?: number;
  limit: number;
  showDescription: boolean;
  showPid: boolean;
  showPrice: boolean;
  showTitle: boolean;
  title?: string;
}

export interface PathwaysRecommendationsCompound {
  categoryCompound?: { categoryid: string };
  keyword?: string;
  productCompound?: [{ productid: string }];
  widgetCompound?: {
    widgetid: string;
    widgetalgo: {
      sourceName: string;
      selectionValues: [{ key: string; label: string }];
    };
  };
}
export interface ParagraphCompound {
  title?: string;
  text?: DocumentContent;
}
export interface MenuModels {
  menu: import('@bloomreach/spa-sdk').Reference;
}
