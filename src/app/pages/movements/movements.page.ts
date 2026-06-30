import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, fileTrayFullOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
  standalone: false
})
export class MovementsPage implements OnInit {

  constructor() { 

    addIcons({
      homeOutline,
      addCircleOutline,
      fileTrayFullOutline
    })

  }

  ngOnInit() {
  }

}
