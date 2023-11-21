import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConverterService, ImageType, Product } from '@spartacus/core';
import { BrxProductNormalizer } from './brx-product-normalizer';

describe('BrxProductNormalizer', () => {
  let service: BrxProductNormalizer;

  const mockConverterService: Partial<ConverterService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConverterService, useValue: mockConverterService }],
    });
    service = TestBed.inject(BrxProductNormalizer);
  });

  it('should convert if source and target products exist', () => {
    const source: Partial<Product> = {};
    const target: Partial<Product> = {};

    const product = service.convert(source, target);

    expect(product).toEqual({});
  });

  it('should convert if source.pid exists', () => {
    const source = {
      sale_price: 100,
      pid: 'pid',
      price_range: [20, 200],
      score: 'score',
      description: 'description',
      title: 'title',
      url: 'url',
      thumb_image: 'thumb_image',
    };

    const product = service.convert(source);

    expect(product).toEqual({
      url: source.url,
      code: source.pid,
      averageRating: source.score,
      description: source.description,
      images: {
        PRIMARY: {
          product: {
            format: 'product',
            imageType: ImageType.PRIMARY,
            url: 'thumb_image',
          },
          thumbnail: {
            format: 'thumbnail',
            imageType: ImageType.PRIMARY,
            url: source.thumb_image,
          },
        },
      },
      name: source.title,
      nameHtml: source.title,
      price: {
        currencyIso: 'USD',
        formattedValue: '$100.00',
        priceType: 'BUY',
        value: source.sale_price,
      },
      priceRange: {
        maxPrice: source.price_range[0],
        minPrice: source.price_range[1],
      },
      stock: {
        stockLevelStatus: 'inStock',
      },
    });
  });

  it('should normalize price', () => {
    const val = 100;
    const result = service.normalizePrice(val);

    expect(result).toEqual({
      currencyIso: 'USD',
      formattedValue: '$100.00',
      priceType: 'BUY',
      value: 100,
    });
  });
});
