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
  app.component.html -> 使用者看到的畫面模板、預設的網站首頁
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

陣列型別宣告方式 -> arr: Array<型別> = [];

全域變數/函式 -> 宣告在 class Appcomponent 中，可以在元件內任意地方使用(透過 "this.全域變數/函式名稱" 方式抓取該變數)

區域變數 -> 宣告在函式/方法區域中，只存在於函式區塊內，該函式執行結束後，區域變數就會消失，換句話說全域變數可以在函式/方法中抓取並使用，但區域變數無法在全域或其他函式/方法中抓取並使用。

只有全域變數可以使用 {{ 變數名稱 }} 來讓變數內容呈現在 html 畫面中。

### 函式/方法 ###
函式宣告方式 -> 函式名稱() {}，且 () 中可帶入參數，同時帶入的參數也要設定型別，ex: fn(par: string) {}

### 常用生命週期 ###
constructor -> 建構式，並非正式生命週期階段，當 class 元件(Component)建立時會先被呼叫，是元件被建構的第一步，用來注入依賴(資料服務、API 工具、登入系統等)，ex: constructor(private userService: UserService) {} 用白話文可以理解成「這個元件需要一個叫 UserService 的工具來幫我處理用戶資料。你幫我準備好它，一開工我就能用。」，此時 Angular 會自動幫你「準備好」這個服務（物件），你就不用自己去 new 它、建立它。

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
內嵌綁定 -> 
屬性綁定 ->
事件綁定 ->
以上三者為單向綁定，簡單來說就是 ts 會觸發畫面(html)的更新，並且畫面的變更時不會影響 ts 的內容。

雙向綁定 ->
