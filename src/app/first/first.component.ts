import { LoadingService } from './../@service/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-first',
  imports: [],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {

  constructor(private loadingService: LoadingService) {}

  openLoading() {
    // 觸發該方法後，就會呼叫 loadginService 服務中的 show()，並將訂閱的變數變更為 true
    this.loadingService.show()
  }

}
