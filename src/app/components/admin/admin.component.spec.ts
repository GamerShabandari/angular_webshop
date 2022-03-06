import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { MockGetProductsService } from 'src/app/services/MockGetProductsService';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [HttpClientModule, BrowserAnimationsModule],
      providers: [{provide: GetproductsService, useClass: MockGetProductsService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get orders from service", () => {
    expect(component.orders.length).toBe(3)
    expect(component.orders[0].orderRows[0].orderId).toBe(8314)
  })
});
