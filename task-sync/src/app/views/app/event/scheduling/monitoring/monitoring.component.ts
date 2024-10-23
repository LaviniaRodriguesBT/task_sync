import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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
import { GridComponent } from 'echarts/components';
import { EventReadService } from '../../../../../services/event/event-read.service';
import { User } from '../../../../../domain/model/user.model';
echarts.use([GridComponent]);

@Component({
  selector: 'task-sync-monitoring',
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
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class Monitoring implements OnInit {

  @ViewChild('infoModal') infoModal: any;
  @ViewChildren('statusCard') statusCards!: QueryList<ElementRef>;

  fa = fontawesome;
  faAdd = faPlus;
  eventId: string = '';
  users: User[] = [];
  userId?: string | null;
  accessType?: string | null;
  form!: FormGroup;
  eventName: string = '';
  totalPessoas: number = 0;
  totalScheduling: number = 0;
  emAndamento: number = 0;
  concluido: number = 0;
  emAberto: number = 0;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 10, 15];
  searchText: string = "";
  schedulings: ResponseScheduling[] = [];
  schedulingCopy: ResponseScheduling[] = [];
  modalRef: NgbModalRef | null = null;
  chartOptions: any;
  totalValue: number | undefined;
  constructor(
    private schedulingReadService: SchedulingReadService,
    private eventReadService: EventReadService,
    private schedulingDeleteService: SchedulingDeleteService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private excelExporter: IgxExcelExporterService,
    private updateStatus: SchedulingUpdateService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private modalService: NgbModal,
    public _MatPaginatorIntl: MatPaginatorIntl,
  ) {
    this.userId = localStorage.getItem('id');
    this.accessType = localStorage.getItem('accessType')
  }
  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    await this.loadSchedulings();
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

    this.totalValue = this.calculateTotalValue();
    console.log(this.totalValue);
  }

  calculateTotalValue(): number {
    let total = 0;
    for (const scheduling of this.schedulings) {
      total += +scheduling.value;
    }
    return total;
  }

  async loadSchedulings() {
    const event = await this.eventReadService.findById(this.eventId);
    this.eventName = event.name;
    console.log(this.eventName);
    this.schedulingReadService.findByEventId(this.eventId).then(data => {
      const quantidadePessoas = new Set();
      data.forEach(scheduling => {
        quantidadePessoas.add(scheduling.user.id)
      })
      this.totalPessoas = quantidadePessoas.size;
      this.totalScheduling = data.length;
      this.emAndamento = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em andamento').length;
      this.concluido = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'finalizada').length;
      this.emAberto = data.filter((item: ResponseScheduling) => item.status.toLowerCase() === 'em aberto').length;
      this.schedulingCopy = data;
      this.schedulings = data.filter(item => {
        if(this.accessType == 'Administrador'){
          return item;
        }else if(item.user.id == this.userId){
          return item;
        }
        return null;
      });
    
      this.length = data.length;
      this.applyDynamicStyles();

      const formData: { [key: string]: string[] } = {};
      this.schedulings.forEach(e => {
        formData[`status${e.id}`] = [e.status];
      });
      this.form = this.formBuilder.group(formData);
      this.loadCharts();
      this.loadCharts2();
    });
  }

  applyDynamicStyles(): void {
    this.statusCards.forEach((card: ElementRef, index: number) => {
      switch (index) {
        case 0:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        case 1:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        case 2:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        case 3:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        case 4:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        case 5:
          this.renderer.setStyle(card.nativeElement, 'background-color', '#06112e');
          break;
        default: ;
          break;
      }
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  openInfoModal() {
    this.modalService.open(this.infoModal, { size: 'lg', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  openMyModal(content: any) {
    const options: NgbModalOptions = {
      backdropClass: 'app-session-modal-backdrop',
      windowClass: 'app-session-modal-window',
    };
    this.modalRef = this.modalService.open(content, { size: 'lg', centered: true });
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
      if(this.accessType == 'Administrador'){
        this.loadCharts();
        this.loadCharts2();
      }
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

  loadCharts() {
    const teste = document.getElementById('meuGrafico');
    const myChart1 = echarts.init(teste);
    const colors: { [key in 'Em andamento' | 'Finalizado' | 'Em aberto']: string } = {
      'Em andamento': '#0d729e',
      'Finalizado': '#044865',
      'Em aberto': '#64b4d7',
    };
    const chart1: echarts.ComposeOption<PieSeriesOption> = {
      title: {
  
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
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
            color: (params) => {
              return colors[params.name as 'Em andamento' | 'Finalizado' | 'Em aberto'];
            },
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
            { value: this.concluido, name: 'Finalizado' },
          ],
        },
      ],
    };
    myChart1.setOption(chart1);

  }


  loadCharts2() {
    const teste2 = document.getElementById('meuGrafico2');
    const myChart12 = echarts.init(teste2);
    const colors2: { [key in 'Em andamento' | 'Finalizado' | 'Em aberto']: string } = {
      'Em andamento': '#0d729e',
      'Finalizado': '#044865',
      'Em aberto': '#64b4d7',
    };
    const chart12: echarts.ComposeOption<BarSeriesOption> = {
      title: {
     
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
        data: ['Em andamento', 'Em aberto', 'Finalizado'],
        top: 'bottom',
      },
      xAxis: {
        type: 'category',
        data: ['Em andamento', 'Em aberto', 'Finalizado'],
        axisLabel: {
          formatter: (value: string) => {
              return value.split(' ').join('\n'); 
          },
      },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          barWidth:'30',
          data: [
            {
              value: this.emAndamento,
              itemStyle: { color: colors2['Em andamento'] },
              name: 'Em andamento',
            },
            {
              value: this.emAberto,
              itemStyle: { color: colors2['Em aberto'] },
              name: 'Em aberto',
            },
            {
              value: this.concluido,
              itemStyle: { color: colors2['Finalizado'] },
              name: 'Finalizado',
            },            
          ],
        },
      ],
    };
    myChart12.setOption(chart12);
  }
  
}
