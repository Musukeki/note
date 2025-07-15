import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from './@service/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  status: boolean = false; // loading 預設為 false 不顯示

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // 訂閱的變數 _loading$ 如果有變更值，再執行下方內容
    this.loadingService._loading$.subscribe((res) => {
      console.log('觸發訂閱 _loading$ 值為' + res);
      this.status = res; // 全域變數 status 的值變更為 next 傳入的值

      setTimeout(() => { // 防呆機制，避免無法關閉 loading
        this.loadingService.hide();
      }, 3000)
    })
  }

  clickBtn() {
    // 觸發訂閱的變數修改其值
    this.loadingService.show();
  }
}

