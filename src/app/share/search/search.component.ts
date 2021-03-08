import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {WordService} from '../../service/word.service';
import {Subject, Subscription} from 'rxjs';
import {Hint} from '../../model/hint';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() isReadonly: boolean;
  @Input() isRound: boolean;
  @Input() searchImage = '';
  @Output() reKeyword: Subject<string> = new Subject();
  public faSearchIcon = faSearch;
  public faTimesIcon = faTimes;
  public hintTable: Hint[];
  public viewHint = true;
  private subscription: Subscription;
  constructor( private wordService: WordService) { }

  ngOnInit(): void {
  }
  public searchAndShow(): void {
    this.reKeyword.next(this.searchImage);
    this.isReadonly = true;
    this.hintTable = [];
  }
  public startSearch(searchWord: string): void {
    this.searchImage = searchWord;
    this.searchAndShow();
  }
  public writeInSearchInput(): void {
    if (this.searchImage.length >= 2) {
      this.subscription = this.wordService.getHint(this.searchImage, 10).subscribe((res: Hint[]) => {
        this.hintTable = res;
      });
    }
  }
  public clearSearch(): void {
    this.searchImage = '';
    this.hintTable = [];
    this.isReadonly = false;
  }
  public openHint(): void {
    this.viewHint = true;
  }
  public closeHint(): void {
    this.viewHint = false;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
