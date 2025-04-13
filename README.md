# Angular Date Picker Component

A customizable date picker component for Angular applications with a clean, modern design and intuitive user experience.

## Features

- **Customizable Date Format**: Choose your preferred date format (e.g., DD/MM/YYYY, MM/DD/YYYY)
- **Min/Max Date Range**: Restrict date selection to a specific range
- **Custom Placeholder**: Set your own placeholder text
- **Auto-Close Option**: Control whether the calendar closes automatically after date selection
- **Year Navigation**: Easily navigate between years with a dedicated year selector
- **Responsive Design**: Works well on both desktop and mobile devices
- **Accessibility**: Built with accessibility in mind
- **No External Dependencies**: Lightweight and self-contained

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/angular-date-picker.git

# Navigate to the project directory
cd angular-date-picker

# Install dependencies
npm install

# Start the development server
ng serve
```

## Usage

### Basic Usage

```html
<app-date-picker (dateChange)="onDateChange($event)"></app-date-picker>
```

### With Custom Format

```html
<app-date-picker 
  [format]="'MM/DD/YYYY'" 
  (dateChange)="onDateChange($event)">
</app-date-picker>
```

### With Min/Max Date Range

```html
<app-date-picker 
  [minDate]="minDate" 
  [maxDate]="maxDate" 
  (dateChange)="onDateChange($event)">
</app-date-picker>
```

### With Custom Placeholder

```html
<app-date-picker 
  [placeholder]="'Choose a date...'" 
  (dateChange)="onDateChange($event)">
</app-date-picker>
```

### With Auto-Close Disabled

```html
<app-date-picker 
  [autoClose]="false" 
  (dateChange)="onDateChange($event)">
</app-date-picker>
```

### With Year Navigation

```html
<app-date-picker 
  [minDate]="minYearDate" 
  [maxDate]="maxYearDate" 
  (dateChange)="onDateChange($event)">
</app-date-picker>
```

**Tip:** Click on the month/year in the calendar header to open the year selector for quick navigation between years.

## Component API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `format` | string | 'DD/MM/YYYY' | The format to display the date |
| `minDate` | Date \| null | null | The minimum selectable date |
| `maxDate` | Date \| null | null | The maximum selectable date |
| `placeholder` | string | 'Select date' | The placeholder text for the input |
| `autoClose` | boolean | true | Whether to close the calendar after date selection |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dateChange` | EventEmitter<Date \| null> | Emits when the selected date changes |

## Styling

The component uses SCSS for styling and is designed to be easily customizable. You can override the default styles by targeting the component's CSS classes in your application's styles.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with polyfills)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
