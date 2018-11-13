import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvNewModalComponent } from './chat-group-link-inv-new-modal.component';

describe('ChatGroupLinkInvNewModalComponent', () => {
  let component: ChatGroupLinkInvNewModalComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
