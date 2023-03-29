import { Test, TestingModule } from '@nestjs/testing';
import { GroupmemberService } from './groupmember.service';

describe('GroupmemberService', () => {
  let service: GroupmemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupmemberService],
    }).compile();

    service = module.get<GroupmemberService>(GroupmemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
