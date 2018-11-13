import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvDeleteModalComponent } from './chat-group-link-inv-delete-modal.component';

describe('ChatGroupLinkInvDeleteModalComponent', () => {
  let component: ChatGroupLinkInvDeleteModalComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
