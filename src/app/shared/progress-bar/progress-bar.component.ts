import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() label1: any = '';
  @Input() label2: any = '';
  @Input() progress: any = 0;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--progress: ${this.progress}`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
