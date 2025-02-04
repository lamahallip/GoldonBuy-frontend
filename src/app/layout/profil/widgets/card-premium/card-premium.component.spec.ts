import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPremiumComponent } from './card-premium.component';

describe('CardPremiumComponent', () => {
  let component: CardPremiumComponent;
  let fixture: ComponentFixture<CardPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
