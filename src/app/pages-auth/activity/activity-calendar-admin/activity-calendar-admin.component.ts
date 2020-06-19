import { Component, OnInit,ViewChild,TemplateRef, } from '@angular/core';
import { isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent,} from 'angular-calendar';
import { ActivityService } from 'src/app/services/activity.service';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';
import { ActivityModel } from 'src/app/models/activity.model';
import { DateModel } from 'src/app/models/date.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-calendar-admin',
  templateUrl: './activity-calendar-admin.component.html',
  styleUrls: ['./activity-calendar-admin.component.css']
})
export class ActivityCalendarAdminComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-calendar-check-o"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        this.router.navigate(['/system/assistance/control',this.congressSelected,event.id]);
      },
    },
    
  ];

  refresh: Subject<any> = new Subject();



  activities: CalendarEvent[] = [];

  constructor(
    private modal: NgbModal,
    private activityService: ActivityService,
    private congressService: CongresoService,
    private router: Router
  ) {}

  arrayCongress: CongressModel[] = [];
  arrayActivities: ActivityModel[] = [];
  congressSelected = -1;

  ngOnInit(): void {
    this.fnGetAllCongress();
  }


  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongress = res;
    })
    .catch(() => {});
  }

  fnGetActivityByCongress(){
    this.activityService.fnGetActivityByCongress(this.congressSelected)
    .then(res => {
      this.arrayActivities = res;
      this.fnLoadCalendar();
    })
  }



  fnLoadCalendar(){
    this.arrayActivities.forEach(obj => {
      console.log(obj);
      obj.fechas.forEach(fecha => {

        let activity: CalendarEvent = {
          id: obj._id,
          title: obj.nombre + ' - ' +obj.descripcion,
          color: {
            primary: obj.color,
            secondary: obj.color
          },
          start: this.fnGetDateFormat(true,fecha),
          end : this.fnGetDateFormat(false,fecha),
          actions:this.actions
        };


        console.log(activity);
      
        this.activities.push(activity);
      });
    });
    this.refresh.next();
  }
  
  fnGetDateFormat(start: boolean, fecha:DateModel): Date{
    let year = fecha.fecha.year;
    let month = fecha.fecha.month;
    let day = fecha.fecha.day;
    let hora;
    let minuto;
    if(start){
      hora = fecha.horaInicio.hour;
      minuto = fecha.horaInicio.minute;
    }else{
      hora = fecha.horaFin.hour;
      minuto = fecha.horaFin.minute;
    }
    let date = year + '/' + month + '/' + day + ' ' + hora + ':' + minuto;
    return new Date(date);
  }

  fnChangeCongress(){
    this.activities = [];
    this.fnGetActivityByCongress();
  }
  
  activeDayIsOpen: boolean = true;

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.activities = this.activities.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }



  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
