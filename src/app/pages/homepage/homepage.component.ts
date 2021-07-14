import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  images = [625, 445, 534].map((n) => `https://picsum.photos/id/${n}/1700/500`);
  constructor() { }

  ngOnInit(): void {
  }

}
