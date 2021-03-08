import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Params, ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {UnsplashService} from '../../service/unsplash.service';
import {SearchComponent} from '../../share/search/search.component';
import {WordService} from '../../service/word.service';
import {Photo, Image} from '../../model/photo';
import {Hint} from '../../model/hint';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit, OnDestroy {
  @ViewChild(SearchComponent, { static: true }) public search: SearchComponent;
  public searchKeyword = '';
  public photoResults: Image[] = [];
  public hintTable: Hint[] = [];
  public image: Image;
  public isViewImage = true;
  public isViewHint = true;
  public isDisabledButton = [false, false];
  private actualPage = 1;
  private maxPage: number;
  private actualPhoto = 0;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private unsplash: UnsplashService,
              private wordService: WordService ) {
    router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          if (event.url === '/starter-page') {
            this.router.navigate(['/starter-page']).then();
          } else {
            setTimeout(() => {
              this.startSearch(this.searchKeyword);
            }, 0);
          }
        }
      });
  }
  ngOnInit(): void {
      this.route.paramMap.forEach(({params}: Params) => {
        this.searchKeyword = params.searchKeyword;
      });
      this.searchImage(this.searchKeyword);
      this.search.searchImage = this.searchKeyword;
  }
  public startSearch(searchKeyword: string): void {
    this.isViewImage = true;
    this.isViewHint = true;
    this.photoResults = [];
    this.actualPage = 1;
    this.searchImage(searchKeyword);
  }
  private searchImage(searchKeyword: string): void {
    this.router.navigate(['/search-result-page/' + searchKeyword]).then(() => {});
    this.unsplash.getSearchPhoto(searchKeyword, this.actualPage).subscribe((photo: Photo) => {
      this.photoResults = this.photoResults.concat(photo.results);
      this.image = photo.results[0];
      this.maxPage = photo.total_pages;
      this.isViewImage = false;
    }, () => this.isViewImage = false,
      () => this.isViewImage = false);
    this.subscription = this.wordService.getHint(searchKeyword, 30).subscribe((res: Hint[]) => {
      this.hintTable = res.filter((word: Hint) => word.word !== searchKeyword);
      this.isViewHint = false;
    }, () => this.isViewHint = false, () => this.isViewHint = false );
  }
  public scrollHint(event): void {
    if (event.deltaY < 0) {
      document.getElementById('hint-container').scrollLeft += 40;
    } else {
      document.getElementById('hint-container').scrollLeft -= 40;
    }
  }
  public scrollImage(): void {
    if (this.actualPage <= this.maxPage) {
      this.actualPage++;
    }
    this.searchImage(this.searchKeyword);
  }
  public bigImage(indexPhoto: number): void {
    this.actualPhoto = indexPhoto;
    this.checkButtonArrowsInModal();
    this.unsplash.getOnePhoto(this.photoResults[indexPhoto].id).subscribe((res) => this.image = res);
  }
  public changePhoto(isPhotoChanges: boolean): void {
    if (isPhotoChanges) {
      if (this.actualPhoto < this.photoResults.length - 1) {
        this.actualPhoto++;
      }
    } else {
      if (this.actualPhoto > 0) {
        this.actualPhoto--;
      }
    }
    this.bigImage(this.actualPhoto);
  }
  public checkButtonArrowsInModal(): void {
    if (this.actualPhoto < this.photoResults.length - 1) {
      this.isDisabledButton[0] = false;
    } else {
      this.isDisabledButton[0] = true;
    }
    if (this.actualPhoto > 0) {
      this.isDisabledButton[1] = false;
    } else {
      this.isDisabledButton[1] = true;
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
