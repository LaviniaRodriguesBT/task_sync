import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SchedulingReadService } from '../../../services/scheduling/scheduling-read.service';
import { Scheduling } from '../../../domain/model/scheduling.model';
import { ChartModule } from 'primeng/chart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventReadService } from '../../../services/event/event-read.service';
import { Event } from '../../../domain/model/event.model';
import { CarouselModule } from 'primeng/carousel'; 

@Component({
  selector: 'task-sync-home',
  standalone: true,
  imports: [MatCardModule,
    ChartModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule, 
    CarouselModule 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalPessoas: number = 0;
  emAndamento: number = 0;
  concluido: number = 0;
  emAberto: number = 0;
  data: any;
  options: any;
  events: Event[] = [];

  @ViewChildren('statusCard') statusCards!: QueryList<ElementRef>;

  constructor(
    private schedulingService: SchedulingReadService,
    private renderer: Renderer2,
    private eventReadService: EventReadService
  ) { }

  ngOnInit(): void {
    this.schedulingService.findAll().then(data => {
      this.totalPessoas = data.length;
      this.emAndamento = data.filter((item: Scheduling) => item.status.toLowerCase() === 'em andamento').length;
      this.concluido = data.filter((item: Scheduling) => item.status.toLowerCase() === 'concluído').length;
      this.emAberto = data.filter((item: Scheduling) => item.status.toLowerCase() === 'em aberto').length;

      this.applyDynamicStyles();
      this.loadEvents();
    });
  }

  async loadEvents() {
    this.events = await this.eventReadService.findAll();
  }

  applyDynamicStyles(): void {
    this.statusCards.forEach((card: ElementRef, index: number) => {
      switch (index) {
        case 0:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#007bff'); 
          break;
        case 1:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#ffc107'); 
          break;
        case 2:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#28a745'); 
          break;
        case 3:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#dc3545');
          break;
        default:
          break;
      }
    });

    this.data = {
      labels: ['Em aberto', 'Em andamento', 'Concluído'],
      datasets: [
          {
              data: [this.emAberto,
                this.emAndamento,
                this.concluido
              ],
              backgroundColor: [
                '#dc3545',
                '#ffc107',
                '#28a745'
              ],
              hoverBackgroundColor: [
                '#dc3545',
                '#ffc107',
                '#28a745'
              ]
          }
      ]
  };
  
  
  this.options = {
      cutout: '60%',
  };
  }


}
