import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, FeelingColors } from 'src/app/_models/activity';

@Component({
  selector: 'app-activities-forms',
  templateUrl: './activities-forms.component.html',
  styleUrls: ['./activities-forms.component.css']
})
export class ActivitiesFormsComponent implements OnInit {
  @Output() newActivity = new EventEmitter<Omit<Activity, 'id'>>();
  feelingColors = FeelingColors;

  activityForm: FormGroup = this.fb.group({
    date: [''],
    type: ['', Validators.required],
    duration: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    notes: [''],
    feelingColor: [''],
    feeling: [''],
    link: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newActivity.emit(this.activityForm.value);
  }
}
