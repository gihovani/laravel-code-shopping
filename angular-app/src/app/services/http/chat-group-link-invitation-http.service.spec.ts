import { TestBed, inject } from '@angular/core/testing';

import { ChatGroupLinkInvitationHttpService } from './chat-group-link-invitation-http.service';

describe('ChatGroupLinkInvitationHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatGroupLinkInvitationHttpService]
    });
  });

  it('should be created', inject([ChatGroupLinkInvitationHttpService], (service: ChatGroupLinkInvitationHttpService) => {
    expect(service).toBeTruthy();
  }));
});
