import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { BrxPathwaysRecommendations } from './brx-pathways-recommendations.service';
import { BrxEndpointService } from './brx-endpoint.service';
import { ConfigType } from '../models/brx-config-type.model';

describe('BrxPathwaysRecommendations', () => {
  let service: BrxPathwaysRecommendations;

  const widgetType = 'widgetType';
  const query = 'queryParam';
  const widgetId = 'widgetId';
  const categoryId = 'categoryId';
  const pids = 'id=testId;';
  const searchConfig = {};
  const mockProduct = {};
  const mockNormalizedProduct = { id: 'mockNormalizedProductId' } as any;

  const mockHttpClientData = { response: { docs: [mockProduct] } };

  const httpClientSubject = new BehaviorSubject(mockHttpClientData);

  const mockHttpClient: Partial<HttpClient> = {
    get: () => httpClientSubject.asObservable() as any,
  };

  const mockBrxEndpointService: Partial<BrxEndpointService> = {
    buildPathwaysandRecommendationsUrl: jest.fn(() => 'buildPathwaysandRecommendationsUrl'),
    envConfig: {
      authKey: 'authKey',
    } as ConfigType,
  };

  const mockConverterService: Partial<ConverterService> = {
    convert: jest.fn(() => mockNormalizedProduct),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: BrxEndpointService, useValue: mockBrxEndpointService },
        { provide: ConverterService, useValue: mockConverterService },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(BrxPathwaysRecommendations);
  });

  it('should get products when preview is false', fakeAsync(() => {
    const isPreview = false;

    service.getproducts(isPreview, query, searchConfig, widgetType, widgetId, categoryId, pids);

    flush();

    expect(mockBrxEndpointService.buildPathwaysandRecommendationsUrl).toHaveBeenCalledWith(
      isPreview,
      query,
      searchConfig,
      widgetType,
      widgetId,
      categoryId,
      pids,
    );

    expect(mockConverterService.convert).toHaveBeenCalledWith(mockProduct, PRODUCT_NORMALIZER);
    expect(service.productsSubject.value).toEqual([mockNormalizedProduct]);
  }));

  it('should get products when preview is true but query and data are empty', fakeAsync(() => {
    const isPreview = true;
    httpClientSubject.next(undefined as any);

    service.getproducts(isPreview, undefined, searchConfig, widgetType, widgetId, categoryId, pids);

    flush();

    expect(mockBrxEndpointService.buildPathwaysandRecommendationsUrl).toHaveBeenCalledWith(
      isPreview,
      '',
      searchConfig,
      widgetType,
      widgetId,
      categoryId,
      pids,
    );

    expect(service.productsSubject.value).toEqual({});
  }));
});
