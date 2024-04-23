import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {IStep2Inspector} from '@appModels/store/pendings/storer/inspector/inspector-details/inspector-details.models';
import {inspectorDetailsSelectors} from '@appSelectors/pendings/storer/inspector';
import {inspectorDetailsActions} from '@appActions/pendings/storer/inspector';
import {ITabOption} from '@appModels/botonera/botonera-option';

declare const MediaRecorder: any;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements AfterViewInit, OnDestroy {
  @ViewChild('video', {static: false}) video: ElementRef;

  step2State$: Observable<IStep2Inspector> = this.store.select(
    inspectorDetailsSelectors.selectStep2,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(inspectorDetailsSelectors.selectedTab);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  private mediaRecorder: any;
  currentVideo: HTMLMediaElement;
  mediaConstraints;
  theRecorder;
  recordedChunks = [];
  keyCount = 0;

  constructor(
    private renderer2: Renderer2,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>,
  ) {}

  ngOnDestroy(): void {
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

  base64(blob): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        return resolve(reader.result);
      };
    });
  }

  ngAfterViewInit() {
    this.startVideo();
  }

  @HostListener('window:keyup', ['$event'])
  loop(event) {
    if (event) {
      if (event.code === 'Space') {
        this.keyCount++;
        if (this.keyCount !== 2) {
          setTimeout(() => {
            this.setInspection(this.keyCount);
          }, 1000);
        }
      }
    }
  }

  setInspection(events) {
    if (events === 1) {
      this.keyCount = 0;
    } else {
      this.keyCount = 0;
    }
  }

  startVideo() {
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

  setTab(tab: ITabOption): void {
    this.store.dispatch(inspectorDetailsActions.SET_TAB_SELECTED({tab}));
  }
}
