import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cat-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.less']
})
export class TopInfoComponent implements OnInit {
  validateForm: FormGroup;
  @Input() showInfoContent: boolean = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCloseInfoContent: EventEmitter<any> = new EventEmitter();

  checkOptions = [
    { label: 'Notifications', value: 'notifications', checked: true },
    { label: 'Tasks', value: 'tasks' },
    { label: 'Events', value: 'events' },
    { label: 'Downloads', value: 'downloads' },
    { label: 'Messages', value: 'messages' },
    { label: 'Updates', value: 'updates' },
    { label: 'Settings', value: 'settings' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
