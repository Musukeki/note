### NVM ###
安裝 NVM -> https://github.com/coreybutler/nvm-windows/releases -> nvm-setup.exe
安裝 node -> nvm install 22.16.0
檢查 node 版本 -> node -v
切換 node 版本 -> nvm use 版本號

### Angular ###
安裝(全域 Global) Angular -> npm install -g @angular/cli@版本號
檢查 Angular 版本 -> ng v
建立 Angualr 專案 -> ng new 專案資料夾名稱
開啟 Angular 專案 -> 路徑移動至專案資料夾 > ng server 或 ng server --o 或簡寫 ng s/ng s --o

### Angular 專案架構 ###
src/app/
  style.scss -> 全域的樣式設定
  main.ts -> 程式初始設定(非必要不要更改內容)
  index.html -> 網站的 head 內容設定與 <app-root> 放置位置
  檔名.spec.ts -> 測試文件(用不到可刪除)
  app.component.html -> 使用者看到的畫面模板、預設的網站首頁、所有頁面共用的內容。
  app.component.ts -> 負責對應名稱的 html 文件中，元件類別(Class)的相關邏輯，如：變數宣告、函式宣告、Interface 設定等等。
  app.config.ts -> 配置文件(依照套件需求更改內容)
  app.routes.ts -> 路由設置文件

### 元件 ###
@Component 是元件/畫面的相關設定，selector、templateUrl、styleUrls、imports 等等。
補充一：app.component.ts 中 @Component 裡面的 selector: 'app-root' 表示將該元件對應的 html 中 body 的內容包裝成一個標籤(<app-root>)，並放置在想要顯示這些內容的 html 文件的 body 標籤中，以 app.component.ts 為例，預設放置位置在 app.component.html 中的 body 標籤中。
補充二：component 可以是元件或畫面，如新建專案時自動生成的 app.component.ts 就是一個畫面，但如果想要 component 在別的畫面中嵌入(import 引用元件名稱並透過標籤<app-selectorName>嵌入想要引入的畫面)使用，那該 component 就是元件。

會使用到的套件需要在頂部設定 import { 套件名稱 } from '套件來源/路徑'，如果畫面上有使用到該套件，則元件設定(@Component)中的 imports 需要加入該套件名稱。

export class Appcomponent 代表將類別名稱為 Appcomponent 的這個元件做匯出，讓它在其他地方可以被引用，{}中是該元件的邏輯區域。

建立新元件(Component) -> ng generate component 資料夾名稱/元件名稱，縮寫 ng g c 資料夾名稱/元件名稱。

### 變數 ###
(全域)變數宣告方式 -> 變數名稱: 變數型別 = 初始值，ex: name: string = 'Tom';

(區域)變數宣告方式 -> 函式或區塊中透過 var、let、const 變數名稱 = 變數值。

變數型別 any 可以是任意類型，如果設定初始值型別為 string，則自動變更型別為字串，也可以不用設定初始值 -> name: any;

變數型別 any 以外的變數在宣告時，如果不設定一個初始值，系統會出現錯誤，此時可以在該變數名稱結尾處加上"!"，表示該變數可能有值也可能沒有值，即可以讓該變數跳過系統檢查。
補充：變數在 html(畫面)中使用時，若該想告知系統該變數可能有值或沒有值，則會在該變數名稱結尾處加上"?"。

陣列型別宣告方式 -> arr: Array<型別> = [];

全域變數/函式 -> 宣告在 class Appcomponent 中，可以在元件內任意地方使用(透過 "this.全域變數/函式名稱" 方式抓取該變數)

區域變數 -> 宣告在函式/方法區域中，只存在於函式區塊內，該函式執行結束後，區域變數就會消失，換句話說全域變數可以在函式/方法中抓取並使用，但區域變數無法在全域或其他函式/方法中抓取並使用。

只有全域變數可以使用 {{ 變數名稱 }} 來讓變數內容呈現在 html 畫面中。

### 函式/方法 ###
函式宣告方式 -> 函式名稱() {}，且 () 中可帶入參數，同時帶入的參數也要設定型別，ex: fn(par: string) {}

### 常用生命週期 ###
constructor -> 建構式，並非正式生命週期階段，當 class 元件(Component)建立時會先被呼叫，是元件被建構的第一步，用來宣告該頁面的 TS 會使用到的服務、套件、函式等等，ex: constructor(private userService: UserService) {} 用白話文可以理解成「這個元件需要一個叫 UserService 的服務來幫我處理用戶資料。你幫我準備好它，一開工我就能用。」，此時 Angular 會自動幫你「準備好」這個服務（物件），你就不用自己去 new 它、建立它。以要使用路由為例，需要在建構式中加入路由套件，ex: constructor(private router: Router) {}，private 表示非公開(只能在該 ts 中使用)、router(用來接收該套件的全域變數名稱)、Router(套件的函式/方法內容)，因此後續在該 ts 中要使用該套件時，就可以透過 this.router.要使用的函式/方法 來呼叫使用。
補充：@Component 中的 imports 為畫面要使用的套件，class AppComponent 中的建構式 constructor() 用來宣告全域變數，表示下方 ts 要使用到的套件。

ngOnInit -> 初始化(畫面剛載入)開始時執行，只會執行一次，通常都是用來處理初始要設定的程式碼。

ngAfterViewInit -> 畫面載入完成後執行，有時候畫面載入較慢而程式碼執行較快，因此在 ngOnInit 設定邏輯可能會導致資料顯示不如預期，此時就可以在 ngAfterViewInit 中設定。

生命週期不同的方法可以一次使用多個，視情況而定。

補充說明：ngOnInit(): void {} 這裡的 void 是一種回傳型別，表示這個函式「不會回傳任何結果」，換句話說，它只是「做事情」，像是載入資料、初始化變數等，但不會回傳值給誰。

### 型別轉換 ###
JSON 轉 String -> JSON.stringify(JSON格式資料)

### forEach、map ###
forEach -> 根據條件設定，遍歷可能會修改陣列本身內容。

map -> 遍歷不會修改陣列本身，會額外產生一個新陣列，需要新增變數來接收遍歷後產生的新資料。

### For迴圈 ###
TypeScript 中的 for 迴圈沒有索引位置，如需要取用索引位置可以在迴圈外宣告一個表示索引的變數，初始值為 0，且每次執行時該變數 + 1，或是改用原生 JavaScript 的 for 迴圈。

### 資料綁定(繫結) ###
內嵌綁定 -> 在 html 文件中輸入 {{ 全域變數名稱 }}，ex: <p>{{ 變數名稱 }}</p>
屬性綁定 -> 在 html 標籤中加上 [屬性名稱]="變數名稱"，ex: <img [src]="變數名稱">
事件綁定 -> 在 html 標籤中加上 (事件類型 event)="函式名稱"，ex: <button (click)="函式名稱">按鈕</button>
以上三者為單向綁定，簡單來說就是 ts 會觸發畫面(html)的更新，並且畫面的變更時不會影響 ts 的內容。

雙向綁定 -> 在支持雙向綁定的 "表單相關" 標籤內加入 [(ngModel)]="變數名稱"，該變數名稱宣告在全域，用來儲存使用者輸入的值，使值與 ts 變數進行雙向連結。
雙向綁定無論是 ts 內容或是 html 內容其中一邊有變更，另一邊就會跟著變更，是雙向性，此外，在使用雙向綁定(ngModel)之前，需要在對應的 ts 文件中引入 FormsModule。

### 路由 ###
建立路由 -> 在 app.routes.ts 中匯入(import)要使用路由的頁面(component)，並確認 app.config.ts 文件中是否有將 providerRouter(routes) 新增至 providers 陣列裡面。

定義路由線路：
  1.設定一個陣列(專案建立時預設已建加入)
  2.在陣列中定義路由路線，每筆資料為一個路由設定(物件格式)，ex: { path: '頁面名稱(可自訂)', component: 頁面/元件名稱 }，表示該網址對應哪個頁面/元件名稱。
  3.將設定的路線加進畫面或者 ts 中。

設定重新導向 -> { path: '', redirecTo: '/要重新導向的頁面', pathMatch: 'full' }，通常用來導向首頁。

設定錯誤頁面 -> 將屬性 path 設定為 '**'，並將 component 設定為網址錯誤時要導向的頁面/元件名稱。
補充說明：錯誤頁面的設定要寫在路由陣列的最後一筆。

子路由(嵌套路由) -> 在路由設定 path: ... 最後方加上逗號並新增 children 陣列，陣列中每筆資料為一個子路由設定(物件格式)。

設定路由路線後實作切換畫面：
使用之前需要先引入 RouterOutlet、RouterLink、RouterLinkActive 三個套件。
  RouterOutlet -> 引入後可在對應的 html 文件中加上標籤 <router-outlet></router-outlet>，放置標籤的位置會顯示路由頁面名稱的內容，簡單來說，加入該標籤後程式會根據網址去切換成對應 html 頁面中 @Component 裡面的 selector(標籤)名稱，ex: 假設網址為 localhost:4200/first，此時 <router-outlet></router-outlet> 就會等同於 <app-first></app-first>。

  RouterLink(HTML 導航) -> 引入後可以用來指定要切換的網頁路徑，ex: <a routerLink="/要切換的路由路徑">，routerLink 可以設定在任意 html 標籤中。

  RouterLinkActive -> 當頁面網址與路由路徑相同時，會套用 CSS 樣式設定，ex: <a routerLink="/路由路徑" routerLinkActive="CSS 選擇器">。

  使用 TS 程式切換 -> 建構式中宣告代表路由套件的全域變數，並使用該套件底下的函式/方法 navigate、navigateByUrl 來做切換，ex: this.router.navigate(['/要切換的路由路徑'])、navigateByUrl(['/要切換的路由路徑'])，可以寫在函式/方法中並搭配點擊事件觸發頁面切換。
  範例 1：<button (click)="checkTo()">切換頁面</button>，checkTo() { this.router.navigateByUrl(['/要切換的路由路徑']) }。
  範例 2：<button (click)="checkTo('/要切換的路由路徑')">切換頁面</button>，checkTo(url: string) { this.router.navigateByUrl([url]) }。

### 路由資料傳遞 ###
建立 service 服務 -> ng generate service @service/服務名稱，簡寫 ng g s 服務資料夾/服務名稱。

服務名稱.service.ts 文件中 import { Injectable } 開始到 @Injectable({ pro... }) 結束，這段表示這支 ts 檔案的內容可以讓所有元件/頁面共同使用。

資料傳遞方式：
  1.在服務中宣告一個全域變數，用來存放要傳遞的資料內容。
  2.在第一個頁面(要傳遞資料的頁面)的 ts 文件中新增建構式，並加入先前宣告存放傳遞資料的服務名稱。
  3.在第一個頁面的 html 文件中的標籤設定點擊事件綁定，並使用 Router 中的 navigateByUrl 方法觸發換頁。
  4.在觸發換頁的方法中，將共用服務中宣告用來存放要傳遞的資料內容的變數，賦予要傳遞的資料值。
  5.在第二個頁面(要接收資料的頁面)的 ts 文件中新增建構式，並加入先前宣告存放傳遞資料的服務名稱。
  6.在第二個頁面中宣告一個變數，用來存放服務中全域變數變數內容。
  原理：切換頁面前，將第一個頁面要傳遞的資料存放到服務(service)中的全域變數，觸發換頁時，第二個頁面再將服務中全域變數的資料存放到第二個頁面的 ts 文件中新增的變數裡面。

### Angular HTML @for 迴圈 ###
@for 是用來讓陣列的資料顯示在畫面中。
@for(變數名稱 of 全域變數(陣列); track $index; let i(自訂名稱變數) = $index) {...}，$index 表示唯一值(索引位置)，自訂名稱變數有需要再自行宣告即可。

### Angular HTML @if 判斷式 ###
@if 是用來判斷 html 元素是否要顯示在畫面中，與 CSS 的設定 display: none; 差異在於前者是完全消失，後者僅是隱藏，但 HTML 元素還存在於控制台當中。
@if(布林值) { HTML內容 } @else { HTML內容 }，如果判斷式中為 true，HTML內容就會顯示，反之 false 則隱藏，布林值可帶入變數，@else if、@else 可依需求決定是否要使，邏輯與 TS if、else if、else 相同。
補充：@if(變數)，像這樣直接放變數時，系統會判斷該變數是否有值，如果有則會回傳 true，沒有則回傳 false。

### API ###
匯入 HttpClient 服務 -> 在 app.config.ts 配置文件中，將 providerHttpClient() 新增至 providers 陣列裡面，並在上方 import 匯入 HttpClient 服務。

建立 HttpClient 專用 service 服務(呼叫 API 方法都在此服務設定，並提供其他頁面/元件呼叫方法使用) -> ng generate service @http-client/http-client，或縮寫 ng g s @http-client/http-client，在該服務的 ts 文件中加入建構式，並加入 HttpClient 服務 -> constructor(private httpClient: HttpClient) {}

在建立的服務中設定 HttpClient 函式/方法：
  1.get(取得) -> this.httpClient.get(API網址)
  2.post(新增) -> this.httpClient.post(API網址, 新增的資料)
  3.put(更新) -> this.httpClient.put(API網址, 更新的資料)
  4.delete(刪除) -> this.httpClient.delete(API網址)

以取得(post)為例 -> getApi(url: string) { return this.httpClient.get(API網址) }

接著在要使用 HttpClient 服務的頁面/元件中新增建構式並加入服務，即可在下方 ts 中呼叫服務中設定的 API 方法，ex: 在要使用服務的 ts 文件中呼叫 this.httpClientService(HttpClient 專用 service).getApi(專用 service 底下設定的函式/方法)(傳入的 API 網址)

加入 Subscribe(訂閱) -> 在呼叫的 API 結尾處接上".subscribe((API 回傳的內容) => {})"，表示 API 資料回傳完畢後，才會執行下方{}動作。
ex: this.httpClientService.getApi('').subscribe((res: any) => { console.log(res) })

接著可宣告一個全域變數，並在 API 取得資料的同時將資料存在在該全域變數，並在 API 方法外做使用。

### 資料排序 sort ###
資料排序函式 sort
實作一：
data.sort((a, b) => {
  if(a.屬性 < b.屬性) {
    return -1;
  }
  if(a.屬性 > b.屬性) {
    return 1;
  }
})

實作二：
data.sort((a, b) => {
  return a.屬性 - b.屬性;
})

以上兩種方式邏輯相同。

### 即時(模糊)搜尋 ###
以顯示列表為例，預設會顯示所有資料內容，當設定即時搜尋時，資料內容會根據輸入的內容顯示出符合內容的資料。
實作：
<!-- html -->
<input (keyup)="searchData()" [(ngModel)]="inputContent"></input>

<!-- TS(Global) -->
inputConten!: string;

searchData() {
  let 新建的空陣列 = []; (建立空陣列存放每筆有符合使用者輸入的資料內容)
  for(let 當前資料 of 所有資料陣列) {
    if(當前資料.indexOf(this.inputContent) != -1) {
      新建的空陣列.push(當前資料)
    }
  }
  this.全域變數(資料陣列) = 新建的空陣列;
}

### ngClass ###
動態切換 CSS 樣式。
實作一(單一判斷)：
<!-- html -->
<p [ngClass]="{'txtStyle': status = true, 第二個樣式+判斷, 第三個樣式+判斷...}">文字內容</p> (當變數 status 為 true 時，txtStyle 樣式會套用)
<button (click)="switchStatus()">

<!-- CSS -->
.txtStyle {
  color: blue;
}

<!-- ts(Global) -->
status: boolean = true;
switchStatus() {
  this.status = !this.status; (每次觸發方法就將布林值反轉)
}

實作二(多個判斷)：
<!-- html -->
<p [ngClass]="fn()">文字內容</p> (當變數 status 為 true 時，txtStyle 樣式會套用)
<button (click)="switchStatus()">

<!-- CSS -->
.txtStyle {
  color: blue;
}

<!-- ts(Global) -->
status: boolean = true;
switchStatus() {
  this.status = !this.status; (每次觸發方法就將布林值反轉)
}
fn() {
  if(!this.status) {
    return 'txtStyle';
  }
  return ''; (ngClass 規定無論如何都必須要回傳一個值)
}

### RXJS Subscribe(訂閱) ###
作用 -> 當 service 裡面的變數接收到傳遞頁要傳遞的資料時，接收頁需要一個地方去接收 service 裡被傳遞的資料，一般會在畫面載入時(ngOnInit)，但寫在 ngOnInit 只會在畫面載入時僅觸發一次，因此當觸發之後要是 service 中的資料再度更新，就不會立即再次接收 service 中更新的資料，此時如果使用 Subscribe(訂閱) 的方法，就可以在被訂閱的資料有做變更時，就會觸發訂閱並直接修改頁面中的內容。

設定方式：
  1.Subject -> 單純的訂閱，ex: private loading$ = new Subject<boolean>();

  2.BehaviorSubject -> 需要設定初始值的訂閱，ex: private loading$ = new BehaviorSubject<boolean>(fales);

  3.ReplaySubject -> 當觸發訂閱時，可以重新發送 N 筆資料的訂閱


訂閱需要設定在共用的 Service(服務) 中，因此可以建立一個 service 來專門放訂閱相關的設定。

以 @service/loading 為例：
<!-- loading.service.ts -->
import { BehaviorSubject, Subject } from 'rxjs';
...
...
export class LoadingService {
  // 分別宣告兩個(不用設定初始值、要設定初始值/僅示範兩者差異，視需求擇一即可)"私有"可以被訂閱的全域變數，設定私有(private)表示變數只能在 class 中做內容的修改，而無法在其他頁面呼叫做使用。
  private loading$ = new Subject<boolean>();
  private loading2$ = new BehaviorSubject<boolean>(false);

  // 分別宣告兩個"公開"全域變數，值為前面可被訂閱全域變數接上"asObservable()"方法，表示 _loading$、_loading2$ 兩個變數只負責接收值而無法修改
  _loading$ = this.loading$.asObservable();
  _loading2$ = this.loading$.asObservable();

  show() {
    // 將訂閱的變數值換成(next方法傳入的值)，此時 private loading$ = new Subject<boolean>(); 沒有傳入初始值就會變成傳入 true，同理 private loading2$ = new BehaviorSubject<boolean>(false); 就會從傳入初始值 false 變成傳入 true。
    this.loading$.next(true);
    this.loading2$.next(ture);
  }
  
  hide() {
    this.loading$.next(false);
    this.loading2$.next(false);
  }
}

<!-- app.component.ts -->
以 loading.service.ts 文件中的全域變數 loading$ 為例：
export class AppComponent {

  ngOnInit(): void {
    // 訂閱的變數 _loading$ 如果有變更值，再執行下方內容
    this.loadingService._loading$.subscribe((res) => {
      alert('觸發訂閱 _loading$ 值為' + res);
    })
  }

  clickBtn() {
    // 觸發訂閱的變數修改其值
    this.loadingService.show();
  }
}

<!-- app.component.html -->
<button (click)="clickBtn()">觸發訂閱</button>
