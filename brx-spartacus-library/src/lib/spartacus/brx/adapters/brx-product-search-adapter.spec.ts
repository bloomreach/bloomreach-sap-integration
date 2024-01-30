import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConverterService } from '@spartacus/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BrxEndpointService } from '../../../services';
import { BrxProductSearchAdapter } from './brx-product-search-adapter';

describe('BrxProductSearchAdapter', () => {
  let service: BrxProductSearchAdapter;

  const buildSuggestionUrl = 'buildSuggestionUrl';
  const buildSearchUrl = 'buildSearchUrl';
  const mockHttpClientData = { response: { products: [{}] } };
  const searchData = {};
  const suggestionData = [{ name: 'productName' }];

  const httpClientSubject = new BehaviorSubject(mockHttpClientData);

  const mockHttpClient: Partial<HttpClient> = {
    get: jest.fn(() => httpClientSubject.asObservable() as any),
  };

  const mockBrxEndpointService: Partial<BrxEndpointService> = {
    buildSuggestionUrl: jest.fn(() => buildSuggestionUrl),
    buildSearchUrl: jest.fn(() => buildSearchUrl),
  };

  const mockConverterService: Partial<ConverterService> = {
    pipeable: jest.fn(() => () => searchData as any),
    pipeableMany: jest.fn(() => () => suggestionData as any),
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
    service = TestBed.inject(BrxProductSearchAdapter);
  });

  it('should search with default params', fakeAsync(() => {
    const result = service.search();

    flush();

    expect(mockHttpClient.get).toHaveBeenCalledWith(buildSearchUrl);
    expect(result).toEqual(searchData);
  }));
});
