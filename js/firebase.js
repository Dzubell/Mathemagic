import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBoOtG8R-ib9tca1HCmstkRthWuL0KJkco",
    authDomain: "mathemagic-28c45.firebaseapp.com",
    projectId: "mathemagic-28c45",
    storageBucket: "mathemagic-28c45.firebasestorage.app",
    messagingSenderId: "606105449159",
    appId: "1:606105449159:web:ad01f39cac760eeead84e2",
    measurementId: "G-3FMH7C7RK2"
};

const fbApp = initializeApp(FIREBASE_CONFIG);
const db    = getFirestore(fbApp);

/* ── Expose helpers to global scope so non-module scripts can use them ── */
window._db = db;
window._fbReady = true;

// Collections: exercises/{docId}  theories/{docId}
// Each exercise doc = the full exercise object (with diff field stored inside)
// Each theory doc   = the full theory object

window.fbGetExercises = async function(){
  const snap = await getDocs(collection(db,'exercises'));
  const ex = {easy:[],med:[],hard:[],pro:[]};
  snap.forEach(d=>{ const e=d.data(); if(ex[e.diff]) ex[e.diff].push(e); });
  return ex;
};

window.fbSaveExercise = async function(exercise){
  await setDoc(doc(db,'exercises', exercise.id), exercise);
};

window.fbDeleteExercise = async function(id){
  await deleteDoc(doc(db,'exercises', id));
};

window.fbGetTheories = async function(){
  const snap = await getDocs(collection(db,'theories'));
  return snap.docs.map(d=>d.data());
};

window.fbSaveTheory = async function(theory){
  await setDoc(doc(db,'theories', theory.id), theory);
};

window.fbDeleteTheory = async function(id){
  await deleteDoc(doc(db,'theories', id));
};

// Real-time listeners — update UI whenever Firestore changes
window._setupRealtimeListeners = function(){
  onSnapshot(collection(db,'exercises'), ()=>{ if(document.getElementById('exercise-list')) renderExercises(); });
  onSnapshot(collection(db,'theories'),  ()=>{ renderTopics(); if(document.getElementById('manage-th-items')) renderManageList(); });
};

// Signal app that Firebase is fully ready
window.dispatchEvent(new Event('firebase-ready'));