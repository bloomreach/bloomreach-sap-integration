import { TestBed } from '@angular/core/testing';
import { BrxEndpointService } from './brx-endpoint.service';
import { BrxSearchConfig } from '../models/brx-search-config.model';

describe('BrxEndpointService', () => {
  let service: BrxEndpointService;

  const mockCurrentPage = 0;
  const mockRows = 12;
  const mockSort = '';
  const mockEnvConfig = {
    endpoint: 'test-endpoint',
    smEndPoint: 'test-smEndPoint/',
    smSuggestionEndPoint: 'test-smSuggestionEndPoint/',
    accountId: 'test-accountId',
    domainKey: 'test-domainKey',
    authKey: 'test-authKey',
  };

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2023, 11, 22));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(BrxEndpointService);

    service.envConfig = mockEnvConfig;
  });

  describe('buildSearchUrl', () => {
    it('should match search url with default parameters', () => {
      const buildSearchUrl = service.buildSearchUrl();

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smEndPoint}v1/core/?account_id=test-accountId&domain_key=test-domainKey&auth_key=test-authKey&view_id=&request_id=1703199600000&_br_uid_2=&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&request_type=search&fl=pid%2Ctitle%2Cbrand%2Cprice%2Csale_price%2Cpromotions%2Cthumb_image%2Csku_thumb_images%2Csku_swatch_images%2Csku_color_group%2Curl%2Cprice_range%2Csale_price_range%2Cdescription%2Cis_live%2Cscore&realm=prod&facet=true&search_type=keyword&rows=12&start=0&q=&sort=`;

      expect(buildSearchUrl).toEqual(resultUrl);
    });

    it('should match search url with changed parameters', () => {
      const query = 'query';
      const newCurrentPage = 2;
      const searchConfig: BrxSearchConfig = {
        currentPage: newCurrentPage,
        sort: 'relevance',
        type: 'category',
      };
      const facets: string[] = ['facet-1', 'facet-2', 'facet-3', 'facet-4'];

      const buildSearchUrl = service.buildSearchUrl(query, searchConfig, facets);

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smEndPoint}v1/core/?account_id=test-accountId&domain_key=test-domainKey&auth_key=test-authKey&view_id=&request_id=1703199600000&_br_uid_2=&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&request_type=search&fl=pid%2Ctitle%2Cbrand%2Cprice%2Csale_price%2Cpromotions%2Cthumb_image%2Csku_thumb_images%2Csku_swatch_images%2Csku_color_group%2Curl%2Cprice_range%2Csale_price_range%2Cdescription%2Cis_live%2Cscore&realm=prod&facet=true&search_type=category&rows=12&start=24&q=query&sort=&fq=facet-1%3A%22facet-2%22&fq=facet-3%3A%22facet-4%22`;

      expect(service.currentPage).toBe(newCurrentPage);
      expect(buildSearchUrl).toEqual(resultUrl);
    });
  });

  describe('buildSuggestionUrl', () => {
    it('should match suggestion url with default parameters', () => {
      const buildSuggestionUrl = service.buildSuggestionUrl();

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smSuggestionEndPoint}v1/suggest/?account_id=test-accountId&auth_key=test-authKey&request_id=1703199600000&_br_uid_2=&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&request_type=suggest&rsp_fmt=v2&q=&domain_key=test-domainKey`;

      expect(buildSuggestionUrl).toEqual(resultUrl);
    });

    it('should match suggestion url with catalog views and query', () => {
      const query = 'query';
      service.catalogViews = 'catalogViews';

      const buildSuggestionUrl = service.buildSuggestionUrl(query);

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smSuggestionEndPoint}v2/suggest/?account_id=test-accountId&auth_key=test-authKey&request_id=1703199600000&_br_uid_2=&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&request_type=suggest&rsp_fmt=v2&q=query&catalog_views=catalogViews&rsp_fmt=v2`;

      expect(buildSuggestionUrl).toEqual(resultUrl);
    });
  });

  describe('buildPathwaysandRecommendationsUrl', () => {
    const widgetType = 'widgetType';
    const query = 'queryParam';
    const widgetId = 'widgetId';
    const categoryId = 'categoryId';
    const pids = 'id=testId;';
    const searchConfig = {};

    it('should match pathwaysandRecommendations url when is in preview', () => {
      const isPreview = true;
      const buildPathwaysandRecommendationsUrl = service.buildPathwaysandRecommendationsUrl(
        isPreview,
        query,
        searchConfig,
        widgetType,
        widgetId,
        categoryId,
        pids,
      );

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smEndPoint}v2/widgets/widgetType/widgetId?account_id=test-accountId&view_id=&domain_key=test-domainKey&request_id=1703199600000&_br_uid_2=uid%253D0000000000000%253Av%253D11.5%253Ats%253D1428617911187%253Ahc%253D55&item_ids=id%3DtestId%3B&cat_id=categoryId&query=queryParam&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&rows=12&fields=pid%2Ctitle%2Cbrand%2Cprice%2Csale_price%2Cpromotions%2Cthumb_image%2Csku_thumb_images%2Csku_swatch_images%2Csku_color_group%2Curl%2Cprice_range%2Csale_price_range%2Cdescription%2Cis_live%2Cscore`;

      expect(buildPathwaysandRecommendationsUrl).toEqual(resultUrl);
    });

    it('should match pathwaysandRecommendations url when is not in preview', () => {
      const isPreview = false;

      const buildPathwaysandRecommendationsUrl = service.buildPathwaysandRecommendationsUrl(
        isPreview,
        undefined,
        undefined,
        widgetType,
        widgetId,
        undefined,
        pids,
      );

      // eslint-disable-next-line max-len
      const resultUrl = `${mockEnvConfig.smEndPoint}v2/widgets/widgetType/widgetId?account_id=test-accountId&view_id=&domain_key=test-domainKey&request_id=1703199600000&_br_uid_2=&item_ids=id%3DtestId%3B&cat_id=&query=&url=https%3A%2F%2Fgithub.com%2Fjust-jeb%2Fangular-builders&ref_url=&rows=12&fields=pid%2Ctitle%2Cbrand%2Cprice%2Csale_price%2Cpromotions%2Cthumb_image%2Csku_thumb_images%2Csku_swatch_images%2Csku_color_group%2Curl%2Cprice_range%2Csale_price_range%2Cdescription%2Cis_live%2Cscore`;

      expect(buildPathwaysandRecommendationsUrl).toEqual(resultUrl);
    });
  });

  it('should return pagination details', () => {
    const total = 20;
    const result = service.getPaginationDetails(total);

    expect(result).toEqual({
      currentPage: mockCurrentPage,
      pageSize: mockRows,
      sort: mockSort,
      totalPages: Math.ceil(total / mockRows),
      totalResults: total,
    });
  });
});
