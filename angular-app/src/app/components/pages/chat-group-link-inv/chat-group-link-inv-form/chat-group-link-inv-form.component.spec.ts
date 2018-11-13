import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvFormComponent } from './chat-group-link-inv-form.component';

describe('ChatGroupLinkInvFormComponent', () => {
  let component: ChatGroupLinkInvFormComponent;
  let fixture: ComponentFixture<ChatGroupLinkInvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupLinkInvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupLinkInvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
