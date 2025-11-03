import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWizardStep } from 'ngx-dynamic-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent extends AbstractWizardStep {
}
