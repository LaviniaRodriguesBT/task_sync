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
import { ResponseScheduling } from '../../../domain/dto/response-scheduling';
/////////////////////////////////////
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption, PieChart, PieSeriesOption } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);
import { GridComponent } from 'echarts/components';
echarts.use([GridComponent]);
/////////////////////////////////////
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
  responsiveOptions: any[] | undefined;
  /////////////////////////////////////
  schedulings: ResponseScheduling[] = [];
  chartOptions: any;
  totalValue: number | undefined;
  /////////////////////////////////////
  @ViewChildren('statusCard') statusCards!: QueryList<ElementRef>;
  constructor(
    private schedulingService: SchedulingReadService,
    private renderer: Renderer2,
    private eventReadService: EventReadService
  ) { }
  ngOnInit(): void {
    this.schedulingService.findAll().then(data => {
      this.schedulings = data;
      this.totalPessoas = data.length;
      this.emAndamento = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em andamento').length;
      this.concluido = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'finalizada').length;
      this.emAberto = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em aberto').length;
      this.applyDynamicStyles();
      this.loadEvents();
    });
  }

  /////////////////////////////////////
  calculateTotalValue(): number {
    let total = 0;
    for (const scheduling of this.schedulings) {
      total += +scheduling.value;
    }
    return total;
  }
  /////////////////////////////////////
  /////////////////////////////////////
  async loadEvents() {
    try {
      this.events = await this.eventReadService.findAll();
      const eventNames = this.events.map((evento: { name: string }) => evento.name);
      const eventCust = new Map<string, number>();
      for (const scheduling of this.schedulings) {
        const eventName = this.getEventNameForScheduling(scheduling);
        const schedulingValue = +scheduling.value || 0;
        // Tem que fazer a logica aqui de cada scheduling de evento//
        if (eventName) {

          eventCust.set(eventName, (eventCust.get(eventName) || 0) + schedulingValue);
          console.log(eventCust.get(eventName))
        }
        console.log(scheduling)
      }
      const eventDetails = eventNames.map((eventName) => ({
        name: eventName,
        totalCost: eventCust.get(eventName) || 0,
      }));
      this.loadCharts2(eventDetails);
    } catch (error) {
      console.error("Erro ao carregar eventos e calcular custos:", error);
    }
  }
  getEventNameForScheduling(scheduling: any): string | undefined {
    return scheduling.event.name;
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
        default: ;
          break;
      }
    });
  }

  loadCharts2(eventDetails: { name: string, totalCost: number }[]) {
    const teste2 = document.getElementById('meuGrafico2');
    const myChart12 = echarts.init(teste2);
    const colors2: { [key: string]: string } = {
      'Color': '#0d729e',
    };
  
    const eventNames = eventDetails.map(event => event.name.length > 8 ? event.name.slice(0, 8) + '\n' + event.name.slice(8) : event.name);
    const eventCosts = eventDetails.map(event => event.totalCost);
  
    const chart12: echarts.ComposeOption<BarSeriesOption> = {
      title: {
        text: 'Monitoramento de Gastos por Evento',
        left: 'center',
        textStyle: {
          color: 'black',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Gastos'],
        top: 'bottom',
      },
      xAxis: {
        type: 'category',
        data: eventNames,
        axisLabel: {
          rotate: 90, 
          color: 'black', 
          fontSize: 12,   
          formatter: (value: string) => value.length > 10 ? value.slice(0, 10) + '...' : value // Adiciona '...' para textos longos
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: eventCosts.map((cost, index) => ({
            value: cost,
            itemStyle: { color: colors2['Color'] },
          })),
          barWidth: '30%',
        },
      ],
    };
  
    myChart12.setOption(chart12);
  }
  

}
