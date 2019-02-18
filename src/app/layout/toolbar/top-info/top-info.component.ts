import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'cat-top-info',
  templateUrl: './top-info.component.html',
  styleUrls: ['./top-info.component.less']
})
export class TopInfoComponent implements OnInit {
  validateForm: FormGroup;

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

  submitForm() {
    console.log(this.validateForm.value);
  }
}
