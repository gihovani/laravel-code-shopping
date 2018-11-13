import { TestBed, inject } from '@angular/core/testing';

import { ChatGroupLinkInvitationUserHttpService } from './chat-group-link-invitation-user-http.service';

describe('ChatGroupLinkInvitationUserHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGroupLinkInvitationUserHttpService]
    });
  });

  it('should be created', inject([ChatGroupLinkInvitationUserHttpService], (service: ChatGroupLinkInvitationUserHttpService) => {
    expect(service).toBeTruthy();
  }));
});
