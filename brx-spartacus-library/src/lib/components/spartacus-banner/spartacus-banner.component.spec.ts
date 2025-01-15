import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { Page } from '@bloomreach/spa-sdk';
import sanitizeHTML from 'sanitize-html';
import mockPage from '../../../__mocks__/page';
import mockComponent from '../../../__mocks__/container-item';
import { SpartacusBannerComponent } from './spartacus-banner.component';
import { SpartacusBannerDirective } from './spartacus-banner.directive';

jest.mock('sanitize-html', jest.fn);

describe('SpartacusBannerComponent', () => {
  let component: SpartacusBannerComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<SpartacusBannerComponent>;

  const mockWrappedComponent = {
    viewContainerRef: {
      clear: jest.fn(),
      createComponent: jest.fn(),
    },
  };

  const mockImageUrl = 'imageURL';
  const mockLinkUrl = 'linkURL';

  const mockContentDataImage = {
    getOriginal: jest.fn(() => ({ getUrl: jest.fn(() => mockImageUrl) })),
  };

  const mockContentDataLink = {
    getUrl: jest.fn(() => mockLinkUrl),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [SpartacusBannerComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpartacusBannerComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;

    component.component = {
      ...mockComponent,
    };

    component.page = {
      ...mockPage,
      isPreview: jest.fn(() => false),
      getContent: jest.fn((content) => {
        if (content === 'image') {
          return mockContentDataImage;
        }
        if (content === 'link') {
          return mockContentDataLink;
        }
        return {
          type: 'componentcontent',
          data: {
            image: 'image',
            link: 'link',
            content: { value: 'value' },
            title: 'title',
            styleClasses: 'styleClasses',
          },
        };
      }),
    } as unknown as Page;

    component.wrappedComponent = new SpartacusBannerDirective(
      mockWrappedComponent.viewContainerRef as unknown as ViewContainerRef,
    );

    // eslint-disable-next-line no-import-assign
    (sanitizeHTML as any) = jest.fn();
    (sanitizeHTML.defaults as any) = {
      allowedTags: [],
    };

    fixture.detectChanges();
  });

  it('should initialize component correctly', () => {
    jest.spyOn(component, 'renderWrappedBanner');

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.renderWrappedBanner).toHaveBeenCalled();
    expect(mockWrappedComponent.viewContainerRef.createComponent).toHaveBeenCalled();
  });

  it('should initialize when page content is empty', () => {
    jest.spyOn(component.page, 'getContent').mockReturnValueOnce({});

    component.renderWrappedBanner();

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
