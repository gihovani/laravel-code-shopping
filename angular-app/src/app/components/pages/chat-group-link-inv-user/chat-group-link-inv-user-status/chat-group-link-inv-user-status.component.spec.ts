import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvUserStatusComponent } from './chat-group-link-inv-user-status.component';

describe('ChatGroupLinkInvUserStatusComponent', () => {
  let component: ChatGroupLinkInvUserStatusComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
