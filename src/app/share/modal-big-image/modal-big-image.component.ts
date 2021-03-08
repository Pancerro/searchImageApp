import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  faChevronLeft, faChevronRight,
  faHeart,
  faInfoCircle,
  faMapMarkerAlt,
  faPlus,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import {Image} from '../../model/photo';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-modal-big-image',
  templateUrl: './modal-big-image.component.html',
  styleUrls: ['./modal-big-image.component.css']
})
export class ModalBigImageComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() image: Image;
  @Input() isDisabledButton: boolean[];
  @Output() changePhoto: Subject<boolean> = new Subject<boolean>();
  public isRefreshPage: boolean;
  public faInfoIcon = faInfoCircle;
  public faShareIcon = faShare;
  public faAddIcon = faPlus;
  public faHeartIcon = faHeart;
  public faMapMarkerAltIcon = faMapMarkerAlt;
  public faChevronLeftIcon = faChevronLeft;
  public faChevronRightIcon = faChevronRight;
  constructor() { }

  ngOnInit(): void {
  }
  public nextPhoto(): void {
    this.changePhoto.next(true);
  }
  public previousPhoto(): void {
    this.changePhoto.next(false);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isRefreshPage = true;
    setTimeout(() => this.isRefreshPage = false, 50);
  }
}
