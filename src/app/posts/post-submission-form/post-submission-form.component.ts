import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../model/post';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-post-submission-form',
  templateUrl: './post-submission-form.component.html',
  styleUrls: ['./post-submission-form.component.scss'],
})
export class PostSubmissionFormComponent implements OnInit {
  constructor() {}

  files: File[] = [];

  @Input()
  formGroup: FormGroup = new FormGroup({ question: new FormControl() });

  @Output()
  submitForm = new EventEmitter<{ post: Post; files: File[] }>();

  ngOnInit(): void {}

  onSelect($event: NgxDropzoneChangeEvent) {
    this.files.push(...$event.addedFiles);
  }

  onRemove(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
  }

  createPost() {
    const post: Post = { question: this.formGroup.get('question').value };
    this.submitForm.next({ post, files: this.files });
    this.formGroup.reset();
    this.files = [];
  }
}
