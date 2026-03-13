import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  limit
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let justSubmitted = false;

const firebaseConfig = {
  apiKey: "AIzaSyDBXA...",
  authDomain: "thiep-cuoi-hoan-thu.firebaseapp.com",
  projectId: "thiep-cuoi-hoan-thu",
  storageBucket: "thiep-cuoi-hoan-thu.firebasestorage.app",
  messagingSenderId: "622020846910",
  appId: "1:622020846910:web:71bcfbcdcfd2a61b6af86f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("wish-form");
  const wishList = document.getElementById("wish-list");

  const q = query(
  collection(db,"wishes"),
  orderBy("time","desc"),
  limit(10)
);

  // realtime render
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

  if(justSubmitted){

    const firstWish = document.querySelector(".wish-item");

    if(firstWish){
      firstWish.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }

    justSubmitted=false;

  }

});

  // submit form
  form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const name=document.getElementById("name").value;
    const message=document.getElementById("message").value;
    justSubmitted = true;

    await addDoc(collection(db,"wishes"),{
      name,
      message,
      time:Date.now()
    });

    form.reset();

    showToast();

  });

});

function showToast(){

  const toast=document.getElementById("toast-success");

  if(!toast) return;

  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },10000);

}