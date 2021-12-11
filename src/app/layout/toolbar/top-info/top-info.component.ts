import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cat-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopInfoComponent implements OnInit {
  validateForm: FormGroup;
  @Input() showInfoContent = false;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCloseInfoContent: EventEmitter<any> = new EventEmitter();

  checkOptions = [
    { label: 'Notifications', value: 'notifications', checked: true },
    { label: 'Tasks', value: 'tasks' },
    { label: 'Events', value: 'events' },
    { label: 'Downloads', value: 'downloads' },
    { label: 'Messages', value: 'messages' },
    { label: 'Updates', value: 'updates' },
    { label: 'Settings', value: 'settings' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', Validators.required],
    });
  }

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
