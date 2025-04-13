import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective] as const,
  providers: [provideNgxMask()]
})
export class DatePickerComponent implements OnInit {
  @Input() format: string = 'DD/MM/YYYY';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() placeholder: string = 'Select date';
  @Output() dateChange = new EventEmitter<Date | null>();
  @Input() autoClose: boolean = true;

  @ViewChild('datePicker') datePicker!: ElementRef;
  @ViewChild('calendar') calendar!: ElementRef;

  isOpen: boolean = false;
  selectedDate: Date | null = null;
  displayDate: string = '';
  mask: string = '';

  calendarDays: Date[] = [];
  currentMonth: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Year navigation
  showYearSelector: boolean = false;
  yearRange: number[] = [];
  currentYear: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {
    this.updateMask();
    this.generateCalendarDays();
    this.generateYearRange();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.datePicker.nativeElement.contains(event.target) &&
        !this.calendar.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.showYearSelector = false;
    }
  }

  updateMask() {
    this.mask = this.format
      .replace('DD', '00')
      .replace('MM', '00')
      .replace('YYYY', '0000');
  }

  toggleCalendar() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      if (this.selectedDate) {
        this.currentMonth = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          1
        );
      }
      this.generateCalendarDays();
      this.showYearSelector = false;
    }
  }

  generateCalendarDays() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.calendarDays = [];

    // Add previous month's days
    for (let i = firstDay.getDay(); i > 0; i--) {
      this.calendarDays.push(new Date(year, month, 1 - i));
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(year, month, i));
    }

    // Add next month's days
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push(new Date(year, month + 1, i));
    }
  }

  generateYearRange() {
    const currentYear = new Date().getFullYear();
    const minYear = this.minDate ? this.minDate.getFullYear() : currentYear - 100;
    const maxYear = this.maxDate ? this.maxDate.getFullYear() : currentYear + 10;

    this.yearRange = [];
    for (let year = minYear; year <= maxYear; year++) {
      this.yearRange.push(year);
    }
  }

  selectDate(date: Date) {
    if (this.isDateInRange(date)) {
      this.selectedDate = date;
      this.displayDate = this.formatDate(date);
      this.dateChange.emit(date);

      // Update the current month to the selected date's month
      this.currentMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      );

      // Keep the calendar open and update the days
      this.generateCalendarDays();

      // Auto-close the calendar if enabled
      if (this.autoClose) {
        this.closeCalendar();
      }
    }
  }

  isDateInRange(date: Date): boolean {
    if (this.minDate && date < this.minDate) return false;
    if (this.maxDate && date > this.maxDate) return false;
    return true;
  }

  formatDate(date: Date): string {
    return this.format
      .replace('DD', date.getDate().toString().padStart(2, '0'))
      .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace('YYYY', date.getFullYear().toString());
  }

  parseDate(dateStr: string): Date | null {
    const parts = dateStr.split(/[\/\-\.]/);
    if (parts.length !== 3) return null;

    const formatParts = this.format.split(/[\/\-\.]/);
    const dateObj: { [key: string]: number } = {};

    formatParts.forEach((part, index) => {
      if (part === 'DD') dateObj['day'] = parseInt(parts[index]);
      if (part === 'MM') dateObj['month'] = parseInt(parts[index]) - 1;
      if (part === 'YYYY') dateObj['year'] = parseInt(parts[index]);
    });

    if (!dateObj['day'] || !dateObj['month'] || !dateObj['year']) return null;

    const date = new Date(dateObj['year'], dateObj['month'], dateObj['day']);
    return this.isDateInRange(date) ? date : null;
  }

  onInputChange(event: any) {
    const date = this.parseDate(event.target.value);
    if (date) {
      this.selectedDate = date;
      this.dateChange.emit(date);
    } else {
      this.selectedDate = null;
      this.dateChange.emit(null);
    }
  }

  clearDate() {
    this.selectedDate = null;
    this.displayDate = '';
    this.dateChange.emit(null);
  }

  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
  }

  previousYear() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear() - 1,
      this.currentMonth.getMonth(),
      1
    );
    this.generateCalendarDays();
  }

  nextYear() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear() + 1,
      this.currentMonth.getMonth(),
      1
    );
    this.generateCalendarDays();
  }

  toggleYearSelector() {
    this.showYearSelector = !this.showYearSelector;
    if (this.showYearSelector) {
      this.currentYear = this.currentMonth.getFullYear();
    }
  }

  selectYear(year: number) {
    this.currentMonth = new Date(
      year,
      this.currentMonth.getMonth(),
      1
    );
    this.generateCalendarDays();
    this.showYearSelector = false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  closeCalendar() {
    this.isOpen = false;
    this.showYearSelector = false;
  }
}
