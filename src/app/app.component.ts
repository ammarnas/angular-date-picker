import { Component } from '@angular/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Default date picker
  selectedDate1: Date | null = null;

  // Custom format date picker
  selectedDate2: Date | null = null;
  dateFormat2 = 'MM/DD/YYYY';

  // Date picker with min/max date
  selectedDate3: Date | null = null;
  minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of current month
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // Last day of current month

  // Date picker with custom placeholder
  selectedDate4: Date | null = null;
  placeholder = 'Choose a date...';

  // Date picker with auto-close disabled
  selectedDate5: Date | null = null;
  autoClose = false;

  // Date picker with year navigation
  selectedDate6: Date | null = null;
  minYearDate = new Date(new Date().getFullYear() - 20, 0, 1); // 20 years ago
  maxYearDate = new Date(new Date().getFullYear() + 20, 11, 31); // 20 years in the future

  // Handle date change events
  onDateChange1(date: Date | null): void {
    this.selectedDate1 = date;
    console.log('Date 1 changed:', date);
  }

  onDateChange2(date: Date | null): void {
    this.selectedDate2 = date;
    console.log('Date 2 changed:', date);
  }

  onDateChange3(date: Date | null): void {
    this.selectedDate3 = date;
    console.log('Date 3 changed:', date);
  }

  onDateChange4(date: Date | null): void {
    this.selectedDate4 = date;
    console.log('Date 4 changed:', date);
  }

  onDateChange5(date: Date | null): void {
    this.selectedDate5 = date;
    console.log('Date 5 changed:', date);
  }

  onDateChange6(date: Date | null): void {
    this.selectedDate6 = date;
    console.log('Date 6 changed:', date);
  }
}
