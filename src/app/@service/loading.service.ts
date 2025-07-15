import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  // 分別宣告兩個(不用設定初始值、要設定初始值/僅示範兩者差異，視需求擇一即可)"私有"可以被訂閱的全域變數，設定私有(private)表示變數只能在 class 中做內容的修改，而無法在其他頁面呼叫做使用。
  private loading$ = new Subject<boolean>();
  private loading2$ = new BehaviorSubject<boolean>(false);

  // 分別宣告兩個"公開"全域變數，值為前面可被訂閱全域變數接上"asObservable()"方法，表示 _loading$、_loading2$ 兩個變數只負責接收值而無法修改
  _loading$ = this.loading$.asObservable();
  _loading2$ = this.loading$.asObservable();

  show() {
    // 將訂閱的變數值換成(next方法傳入的值)，此時 private loading$ = new Subject<boolean>(); 沒有傳入初始值就會變成傳入 true，同理 private loading2$ = new BehaviorSubject<boolean>(false); 就會從傳入初始值 false 變成傳入 true。
    this.loading$.next(true);
    this.loading2$.next(true);
  }

  hide() {
    this.loading$.next(false);
    this.loading2$.next(false);
  }
}
