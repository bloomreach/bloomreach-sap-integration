import { Component, Input, OnInit } from '@angular/core';
import { ContainerItem, getContainerItemContent, Page } from '@bloomreach/spa-sdk';

import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { BrxPathwaysRecommendations } from '../../services';
import { PathwaysRecommendationsCompound, PathwaysRecommendationsParameters } from '../../models/common-types.model';

@Component({
  selector: 'brx-pathways-recommendations',
  templateUrl: './pathways-recommendations.component.html',
  styleUrls: ['./pathways-recommendations.component.scss'],
})
export class PathwaysRecommendationsComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  title = '';

  errorMessage: string | undefined;

  interval: number | undefined;

  limit: number | undefined;

  showDescription = false;

  showPid = false;

  showPrice = false;

  showTitle = false;

  products$: Observable<Observable<any>[]> | undefined;

  constructor(private brxpathwaysrecommendationsservice: BrxPathwaysRecommendations) {}

  ngOnInit(): void {
    this.renderWrappedPathways();
    this.products$ = this.brxpathwaysrecommendationsservice.productsSubject.pipe(
      map((item: any) => Object.values(item).map((val: any) => of(val))),
    );
  }

  getempty(): Observable<any>[] {
    return [of()];
  }

  renderWrappedPathways(): void {
    // eslint-disable-next-line max-len
    const { interval, limit, title, showDescription, showPid, showPrice, showTitle } =
      this.component.getParameters<PathwaysRecommendationsParameters>();

    this.title = title || '';
    this.interval = interval || 0;
    this.limit = limit || 4;
    this.showDescription = showDescription;
    this.showPid = showPid;
    this.showPrice = showPrice;
    this.showTitle = showTitle;

    const { categoryCompound, keyword, productCompound, widgetCompound } =
      getContainerItemContent<PathwaysRecommendationsCompound>(this.component, this.page) ?? {};

    const { categoryid } = categoryCompound ?? {};

    const pids = productCompound?.map(({ productid }) => {
      const [, id, code] = productid.match(/id=([\w\d._=-]+[\w\d=]?)?;code=([\w\d._=/-]+[\w\d=]?)?/i) ?? [];
      return code ?? id;
    });
    const { widgetid: widgetId = '', widgetalgo: widgetAlgo } = widgetCompound ?? {};
    const widgetType = widgetAlgo?.selectionValues?.[0].key.split('.')[0] ?? '';

    if ((widgetId ?? 'undefined') !== 'undefined' && widgetType) {
      switch (widgetType) {
        case 'item':
          this.errorMessage = !pids ? 'Widget configured incorrectly: please add Product IDs' : undefined;
          break;
        case 'category':
          this.errorMessage = !categoryid ? 'Widget configured incorrectly: please add a Category ID' : undefined;
          break;
        case 'keyword':
        case 'personalized':
          this.errorMessage = !keyword ? 'Widget configured incorrectly: please add a Keyword' : undefined;
          break;
        default:
          this.errorMessage = undefined;
      }
    } else {
      this.errorMessage = 'Please configure Widget ID and Widget Type first';
    }

    this.brxpathwaysrecommendationsservice.getproducts(
      this.page.isPreview(),
      keyword,
      {
        pageSize: this.limit,
      },
      widgetType,
      widgetId,
      categoryid || '',
      pids?.join(',') ?? '',
    );
  }
}
