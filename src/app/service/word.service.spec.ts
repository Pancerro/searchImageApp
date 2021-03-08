import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new WordService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get hint', (done: DoneFn) => {
    service.getHint('island', 1).subscribe(value => {
      expect(value.length).toBe(1);
      done();
    });
  });
});
