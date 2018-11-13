import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvUserListComponent } from './chat-group-link-inv-user-list.component';

describe('ChatGroupLinkInvUserListComponent', () => {
  let component: ChatGroupLinkInvUserListComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
