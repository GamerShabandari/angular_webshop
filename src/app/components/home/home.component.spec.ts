import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { MockGetProductsService } from 'src/app/services/MockGetProductsService';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientModule, BrowserAnimationsModule],
      providers: [{provide: GetproductsService, useClass: MockGetProductsService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get data", () => {
    
    expect(component.products.length).toBe(2)
  })

  it("should get categories", () => {
    expect(component.categories.length).toBe(2)
    expect(component.categories[1].name).toBe("testCategory2")
  })
});
