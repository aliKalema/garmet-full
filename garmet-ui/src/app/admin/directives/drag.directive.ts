import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../../interfaces/file-handle";

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding("style.background")
  private background = "#eee";

  @Output()
  private fileEmitter : EventEmitter<FileHandle> = new EventEmitter<FileHandle>();
  constructor(private sanitizer: DomSanitizer) { }
  @HostListener("dragover", ["$event"])
  onDragOver(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }
  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
    const file = evt.dataTransfer!.files[0];
    let fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file))
    };
    this.fileEmitter.emit(fileHandle);
  }

}
