var firebaseConfig = {
    apiKey: "AIzaSyCh7VifcRe7BT3_uC3vu6_O5mhxVMKx7IU",
    authDomain: "footsteps-b2795.firebaseapp.com",
    projectId: "footsteps-b2795",
    storageBucket: "footsteps-b2795.appspot.com",
    messagingSenderId: "401387134689",
    appId: "1:401387134689:web:3baa3feddeb3d4c127e1a0",
    measurementId: "G-QW3LX24YXZ"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  
 let
    db = firebase.firestore(),
    updateBtn = document.getElementsByClassName('update-btn')[0],
    runagain_btn = document.getElementsByClassName('runagain-btn')[0],
    textarea = document.getElementsByClassName('textarea')[0],
    form = document.getElementsByClassName('form')[0]

    
 runagain_btn.onclick = () => {
       location.reload()
    }
 // Collection data
 updateBtn.onclick = (e) => {
     
    let createDb = db.collection('footsteps').doc()
    createDb.set({
       progressDetails: textarea.value,
       logTime: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    alert(' Updates logged successfully !!!')
    textarea.value = ""
 
 }
 // Displaying Data in table
 
 let
    dataTable = document.getElementsByClassName('data-table')[0]
    
 showDataTable = () => {
     // To display as it is submitted
    let dbRef = db.collection('footsteps').orderBy("logTime", "desc")
    dbRef.get().then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
          let tr = document.createElement('tr')
    
          let td_summary = document.createElement('td')
          td_summary.innerText = doc.data().progressDetails
          tr.appendChild(td_summary)
          
          let td_logTime = document.createElement('td')
          let outT = doc.data().logTime.seconds
          let n = new Date()
          n.setTime(outT * 1000)
          td_logTime.innerText = n
          tr.appendChild(td_logTime)
          
          dataTable.appendChild(tr)
       })
    })
    
 }
 showDataTable()
 
// Updating days left
let days_left = document.getElementsByClassName('days-left')[0]
let d = 36;
let createDb_daysLeft = db.collection('daysleft').doc("dayCount")

daysLeft = () => {
    setInterval(() => {
        d  = d - 1
        createDb_daysLeft.set({
            daysLeft: d - 1
        })
    }, 86400000)
    db.collection('daysleft').doc("dayCount").onSnapshot((doc) => {
        days_left.innerText = doc.data().daysLeft
    })
}

daysLeft()
 