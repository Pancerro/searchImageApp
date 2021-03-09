import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchComponent} from '../../share/search/search.component';
import {Router} from '@angular/router';
import {UnsplashService} from '../../service/unsplash.service';
import {Observable} from 'rxjs';
import {Trend} from '../../model/trend';

@Component({
  selector: 'app-starter-page',
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css']
})
export class StarterPageComponent implements OnInit {
  @ViewChild(SearchComponent, { static: true }) public search: SearchComponent;
  public trendTable: Observable<Trend[]> = this.unsplashService.getTopic();
  constructor(private router: Router,
              private unsplashService: UnsplashService) { }
  ngOnInit(): void {
  }
  public searchImage(word: string): void {
    this.router.navigate(['/search-result-page/' + word]).then(() => {});
  }
}
