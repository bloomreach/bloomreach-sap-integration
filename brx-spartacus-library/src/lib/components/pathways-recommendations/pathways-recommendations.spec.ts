import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Page } from '@bloomreach/spa-sdk';
import { BehaviorSubject } from 'rxjs';
import { PathwaysRecommendationsComponent } from './pathways-recommendations.component';
import { BrxPathwaysRecommendations } from '../../services';
import mockComponent from '../../../__mocks__/container-item';
import mockPage from '../../../__mocks__/page';

describe('PathwaysRecommendationsComponent', () => {
  let component: PathwaysRecommendationsComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<PathwaysRecommendationsComponent>;

  const productsSubject = new BehaviorSubject([]);

  const widgetId = 'widgetid';
  const keyword = 'keyword';
  const productId = 'productId';
  const productCode = 'productCode';
  const categoryId = 'categoryId';
  const selectionValueKey = 'selectionValueKey';
  const mockPageContent = {
    type: 'componentcontent',
    data: {
      widgetCompound: {
        widgetid: widgetId,
        widgetalgo: {
          selectionValues: [{ key: `${selectionValueKey}.test` }],
        },
      },
      keyword,
      categoryCompound: {
        categoryid: categoryId,
      },
      productCompound: [{ productid: `id=${productId};code=` }, { productid: `id=;code=${productCode}` }],
    },
  };

  const mockBrxPathwaysRecommendations: Partial<BrxPathwaysRecommendations> = {
    getproducts: jest.fn(),
    productsSubject,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [PathwaysRecommendationsComponent],
      providers: [
        { provide: BrxPathwaysRecommendations, useValue: mockBrxPathwaysRecommendations },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwaysRecommendationsComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;

    component.component = {
      ...mockComponent,
    };

    component.page = {
      ...mockPage,
      isPreview: jest.fn(() => false),
      getContent: jest.fn(() => mockPageContent),
    } as unknown as Page;

    fixture.detectChanges();
  });

  it('should initialize component correctly', () => {
    jest.spyOn(component, 'renderWrappedPathways');
    productsSubject.next({ product: 'test' } as any);

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.renderWrappedPathways).toHaveBeenCalled();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('renderWrappedPathways', () => {
    it('should call getproducts', () => {
      component.renderWrappedPathways();

      expect(mockBrxPathwaysRecommendations.getproducts).toHaveBeenCalledWith(
        false,
        keyword,
        { pageSize: 4 },
        selectionValueKey,
        widgetId,
        categoryId,
        `${productId},${productCode}`,
      );
    });

    it('should use default parameters when none are passed', () => {
      jest.spyOn(component.component, 'getParameters').mockReturnValueOnce({});

      component.renderWrappedPathways();

      expect(component.title).toBe('');
      expect(component.interval).toBe(0);
      expect(component.limit).toBe(4);
    });

    it('should show an error message if widgetId or widgetType are missing', () => {
      const mockContentData = { ...mockPageContent };
      mockContentData.data.widgetCompound = {} as any;
      jest.spyOn(component.page, 'getContent').mockReturnValueOnce(mockContentData);

      component.renderWrappedPathways();

      fixture.detectChanges();

      expect(component.errorMessage).toBe('Please configure Widget ID and Widget Type first');
      expect(fixture.nativeElement).toMatchSnapshot();
    });

    it('should show an error message if keyword is missing', () => {
      const mockContentData = { ...mockPageContent };
      const mockWidgetType = 'keyword';
      mockContentData.data.keyword = '';
      mockContentData.data.widgetCompound = {
        widgetid: widgetId,
        widgetalgo: {
          selectionValues: [{ key: `${mockWidgetType}.test` }],
        },
      };
      jest.spyOn(component.page, 'getContent').mockReturnValueOnce(mockContentData);

      component.renderWrappedPathways();

      expect(component.errorMessage).toBe('Widget configured incorrectly: please add a Keyword');
    });

    it('should show an error message if category id is missing', () => {
      const mockContentData = { ...mockPageContent };
      const mockWidgetType = 'category';
      mockContentData.data.categoryCompound.categoryid = '';
      mockContentData.data.widgetCompound = {
        widgetid: widgetId,
        widgetalgo: {
          selectionValues: [{ key: `${mockWidgetType}.test` }],
        },
      };
      jest.spyOn(component.page, 'getContent').mockReturnValueOnce(mockContentData);

      component.renderWrappedPathways();

      expect(component.errorMessage).toBe('Widget configured incorrectly: please add a Category ID');
    });

    it('should show an error message if product ids are missing', () => {
      const mockContentData = { ...mockPageContent };
      const mockWidgetType = 'item';
      mockContentData.data.productCompound = undefined as any;
      mockContentData.data.widgetCompound = {
        widgetid: widgetId,
        widgetalgo: {
          selectionValues: [{ key: `${mockWidgetType}.test` }],
        },
      };
      jest.spyOn(component.page, 'getContent').mockReturnValueOnce(mockContentData);

      component.renderWrappedPathways();

      expect(component.errorMessage).toBe('Widget configured incorrectly: please add Product IDs');
    });
  });
});
