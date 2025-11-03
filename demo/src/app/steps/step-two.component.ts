import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWizardStep } from 'ngx-dynamic-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent extends AbstractWizardStep {
}
