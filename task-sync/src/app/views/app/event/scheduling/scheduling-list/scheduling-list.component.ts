import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingDeleteService } from '../../../../../services/scheduling/scheduling-delete.service';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResponseScheduling } from '../../../../../domain/dto/response-scheduling';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import { SchedulingUpdateService } from '../../../../../services/scheduling/scheduling-update.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgbModalRef, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as echarts from 'echarts/core';
import { BarChart, BarSeriesOption, PieChart, PieSeriesOption } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);
import { CanvasJSChart } from '@canvasjs/angular-charts';import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { GridComponent } from 'echarts/components';
echarts.use([GridComponent]);

@Component({
  selector: 'task-sync-scheduling-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  templateUrl: './scheduling-list.component.html',
  styleUrl: './scheduling-list.component.css'
})
export class SchedulingListComponent implements OnInit {
  
  fa = fontawesome;
  faAdd = faPlus;
  eventId: string = '';
  userId?: string | null;
  accessType?: string | null;
  form!: FormGroup;
  totalPessoas: number = 0;
  totalScheduling: number = 0;
  emAndamento: number = 0;
  concluido: number = 0;
  emAberto: number = 0;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [3,5, 10, 15];
  searchText: string = "";
  schedulings: ResponseScheduling[] = [];
  schedulingCopy: ResponseScheduling[] = [];
  @ViewChildren('statusCard') statusCards!: QueryList<ElementRef>;
  modalRef: NgbModalRef | null = null;
  chartOptions: any;

  createChartOptions(data: any[]): any {
    return {
      animationEnabled: true,
      title: {
        text: "Meu Gráfico"
      },
      data: [{
        type: "column",
        dataPoints: data
      }]
    };
  }
  constructor(
    private schedulingReadService: SchedulingReadService,
    private schedulingDeleteService: SchedulingDeleteService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private excelExporter: IgxExcelExporterService,
    private updateStatus: SchedulingUpdateService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private modalService: NgbModal,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {
    this.userId = localStorage.getItem('id');
    this.accessType = localStorage.getItem('accessType')
  }
  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    this.loadSchedulings();
    console.log("Total de scheduling " + this.schedulingCopy.length);
    this._MatPaginatorIntl.itemsPerPageLabel = "Itens por página";
    this._MatPaginatorIntl.previousPageLabel = "Voltar a página anterior";
    this._MatPaginatorIntl.nextPageLabel = "Próxima página";
    this._MatPaginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0) {
        return `Nenhum resultado encontrado.`;
      }
      const from = page * pageSize + 1;
      const to = Math.min(from + pageSize - 1, length);
      return `${from} - ${to} de ${length}`;
    };     
      const chartDom = document.getElementById('myChart') as HTMLDivElement;    
      if (!chartDom) {
        console.error('Elemento do gráfico não encontrado');
        return;
      } 
          
      this.loadCharts(); 
      this.loadCharts2(); 
      
    

      
  }
  
  loadSchedulings() {
    this.schedulingReadService.findByEventId(this.eventId).then(data => {
      this.totalPessoas = data.length;
      this.totalScheduling = data.length;
      this.emAndamento = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em andamento').length;
      this.concluido = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'finalizada').length;
      this.emAberto = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em aberto').length;
      this.schedulingCopy = data;
      this.schedulings = data;
      this.length = data.length;  
      this.applyDynamicStyles();
      this.loadCharts();
      this.loadCharts2();
     
      const formData: { [key: string]: string[] } = {};
      this.schedulings.forEach(e => {
        formData[`status${e.id}`] = [e.status];
      });
      this.form = this.formBuilder.group(formData);
    });
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
        default:;
          break;
      }
    });
  }



  
  openMyModal(content: any) {
    const options: NgbModalOptions = {
      backdropClass: 'app-session-modal-backdrop',
      windowClass: 'app-session-modal-window',
    };
    this.modalRef = this.modalService.open(content, {
      windowClass: 'custom-modal-class'
    });
  }
  closeMyModal() {
    if (this.modalRef) {this.modalRef.close();
    }
  }
  async deleteScheduling(schedulingId: string) {
    try {
      console.log('Iniciando a remoção do cronograma' + schedulingId);
      await this.schedulingDeleteService.delete(schedulingId);
      this.toastrService.success('Cronograma excluído com sucesso');
      await this.loadSchedulings();
    } catch (error) {
      this.toastrService.error('Não foi possível remover o cronograma');
    }
  }
  async update(scheduling: ResponseScheduling) {
    try {
      const schedulingUpdate: Scheduling = {
        id: scheduling.id,
        event_id: scheduling.event.id!,
        user_id: scheduling.user.id!,
        userId: scheduling.user.id!,
        task_id: scheduling.task.id!,
        event: scheduling.event.name,
        value: scheduling.value,
        start_time: scheduling.start_time,
        end_time: scheduling.end_time,
        date: scheduling.date,
        status: this.form.controls[`status${scheduling.id}`].value,
      }
      console.log(schedulingUpdate);
      await this.updateStatus.update(schedulingUpdate);
      this.toastrService.success('Cronograma atualizado com sucesso!');
      this.emAndamento = this.schedulings.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em andamento').length;
      this.concluido = this.schedulings.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'finalizada').length;
      this.emAberto = this.schedulings.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em aberto').length;      
      this.loadCharts();
      this.loadCharts2(); 
      } catch (error) {
      this.toastrService.error('Erro. Cronograma não foi atualizado.');
    }
  }
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.schedulings = this.schedulingCopy.slice(this.pageIndex * this.pageSize, 
      (this.pageIndex + 1) * this.pageSize);
  }
  gerarPdf() {
    window.print()
  }
  public exportExcelEventList() {
    this.excelExporter.exportData(this.schedulings, new IgxExcelExporterOptions('ExportedDataFile'));
  }
  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;
    let event = input.value;
    if (this.schedulingCopy.length <= 0 || this.schedulingCopy == null)
      return;
    if (event == null || event == undefined || event.length <= 0) {
      this.schedulings = this.schedulingCopy;
      this.searchText = "";
      return;
    }
    this.searchText = event;
    let schedulings = this.schedulingCopy.filter((predicate) =>
      predicate.event.name?.toLocaleLowerCase().includes(event.toLocaleLowerCase()) ||
      predicate.task.name?.toLocaleLowerCase().includes(event.toLocaleLowerCase()) ||
      predicate.user.name?.toLocaleUpperCase().includes(event.toLocaleUpperCase()));
    if (schedulings == undefined) {
      this.schedulings = [];
      return;
    }
    this.schedulings = schedulings;
  }

  loadCharts(){
    const teste = document.getElementById('meuGrafico');
    const myChart1 = echarts.init(teste);
    const chart1: echarts.ComposeOption<PieSeriesOption> = {
      title: {
        text: 'Cronogramas',
        left: 'center',
        textStyle: {
          color: 'black',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '1%',
        left: 'center',
      },
      series: [
        {
          name: 'Cronogramas',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
            },
          },
          data: [
            { value: this.emAndamento, name: 'Em andamento' },
            { value: this.emAberto, name: 'Em aberto' },
            { value: this.concluido, name: 'Concluído' },
          ],
        },
      ],
    };
    myChart1.setOption(chart1);
    
  }



  loadCharts2() {
    const teste2 = document.getElementById('meuGrafico2');
    const myChart12 = echarts.init(teste2);
    const chart12: echarts.ComposeOption<BarSeriesOption> = {
      title: {
        text: 'Cronogramas xxxx',
        left: 'center',
        textStyle: {
          color: 'black',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Em andamento', 'Em aberto', 'Concluído']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Cronogramas',
          type: 'bar',
          data: [this.emAndamento, this.emAberto, this.concluido]
        }
      ]
    };
    myChart12.setOption(chart12);
  }



}
