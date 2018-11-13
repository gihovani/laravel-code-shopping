import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvEditModalComponent } from './chat-group-link-inv-edit-modal.component';

describe('ChatGroupLinkInvEditModalComponent', () => {
  let component: ChatGroupLinkInvEditModalComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
