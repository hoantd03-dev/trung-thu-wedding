import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBXA...",
  authDomain: "thiep-cuoi-hoan-thu.firebaseapp.com",
  projectId: "thiep-cuoi-hoan-thu",
  storageBucket: "thiep-cuoi-hoan-thu.firebasestorage.app",
  messagingSenderId: "622020846910",
  appId: "1:622020846910:web:71bcfbcdcfd2a61b6af86f"
};

let db = null;
let justSubmitted = false;
let loaded = false;

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("wish-form");
  const wishList = document.getElementById("wish-list");

  // 👇 Hiển thị loading trước
  wishList.innerHTML = "Đang tải lời chúc...";

  // 👇 Lazy load khi scroll tới
  const observer = new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting && !loaded){

      loaded = true;

      initFirebase(form, wishList);

    }

  });

  observer.observe(wishList);

});


// 🚀 INIT FIREBASE (chỉ chạy khi cần)
function initFirebase(form, wishList){

  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  const q = query(
    collection(db,"wishes"),
    orderBy("time","desc"),
    limit(10)
  );

  // 👇 realtime data
  onSnapshot(q,(snapshot)=>{

    wishList.innerHTML="";

    snapshot.forEach(doc=>{

      const w = doc.data();

      const div=document.createElement("div");

      div.className="wish-item";

      div.innerHTML=`
        <div class="wish-name">${w.name}</div>
        <div class="wish-text">${w.message}</div>
      `;

      wishList.appendChild(div);

    });

    // 👇 scroll đúng timing
    if(justSubmitted){

      const firstWish = wishList.querySelector(".wish-item");

      if(firstWish){
        firstWish.scrollIntoView({
          behavior:"smooth",
          block:"nearest"
        });
      }

      justSubmitted = false;

    }

  });

  // 👇 submit form
  form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    if(!db){
      alert("Đang tải dữ liệu, thử lại sau nhé!");
      return;
    }

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    justSubmitted = true;

    await addDoc(collection(db,"wishes"),{
      name,
      message,
      time: Date.now()
    });

    form.reset();

    showToast();

  });

}


// 🎉 TOAST
function showToast(){

  const toast = document.getElementById("toast-success");

  if(!toast) return;

  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },5000);

}

const wishList = document.getElementById("wish-list");

wishList.addEventListener("wheel", function(e){

  const isScrollingDown = e.deltaY > 0;
  const isScrollingUp = e.deltaY < 0;

  const isAtTop = this.scrollTop <= 0;
  const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1;

  // 👉 Nếu đang ở giữa → giữ scroll trong box
  if(
    (isScrollingDown && !isAtBottom) ||
    (isScrollingUp && !isAtTop)
  ){
    e.stopPropagation();
    return;
  }

  // 👉 Nếu chạm biên → đẩy scroll ra page NGAY LẬP TỨC
  window.scrollBy({
    top: e.deltaY,
    behavior: "auto"
  });

}, { passive: true });