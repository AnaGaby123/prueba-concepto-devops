import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';

declare const MediaRecorder: any;

@Component({
  selector: 'app-non-shippable-part',
  templateUrl: './non-shippable-part.component.html',
  styleUrls: ['./non-shippable-part.component.scss'],
})
export class NonShippablePartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video', {static: false}) video: ElementRef;

  private mediaRecorder: any;
  currentVideo: HTMLMediaElement;
  mediaConstraints;
  theRecorder;
  recordedChunks = [];

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.video) {
      this.startVideo();
    }
  }

  ngOnDestroy(): void {
    if (this.video) {
      const stream: any = this.currentVideo.srcObject;
      const tracks = stream.getTracks();

      for (const track of tracks) {
        track.stop();
      }
      const blob = new Blob(this.recordedChunks, {type: 'video/webm'});
      const url = URL.createObjectURL(blob);

      this.base64(blob).then((data: string) => {
        const base = data.split(',');
        const b64 = base[1];
      });

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
      this.currentVideo.srcObject = null;
    }
  }

  base64(blob): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        return resolve(reader.result);
      };
    });
  }

  startVideo(): void {
    this.currentVideo = this.renderer2.selectRootElement(this.video.nativeElement, false);

    if (this.currentVideo) {
      this.mediaConstraints = {
        video: {mandatory: {minWidth: 1480, minHeight: 1024}},
        audio: false,
      };
      navigator.mediaDevices
        .getUserMedia({video: true})
        .then((stream) => {
          this.currentVideo.srcObject = stream;
          try {
            this.mediaRecorder = new MediaRecorder(stream, {
              mimeType: 'video/webm',
            });
          } catch (e) {
            console.error('Exception while creating MediaRecorder: ' + e);
            return;
          }

          this.theRecorder = this.mediaRecorder;
          this.mediaRecorder.ondataavailable = (event) => {
            this.recordedChunks.push(event.data);
          };
          this.mediaRecorder.start(100);
        })
        .catch((error) => {});
    }
  }
}
