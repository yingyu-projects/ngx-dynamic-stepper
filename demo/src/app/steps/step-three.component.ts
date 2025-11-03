import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractWizardStep } from 'ngx-dynamic-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent extends AbstractWizardStep {
}
