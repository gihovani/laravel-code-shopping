import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

describe('ChatGroupLinkInvListComponent', () => {
  let component: ChatGroupLinkInvListComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
