let port;

const connectBtn = document.getElementById("connectBtn");
const flashBtn = document.getElementById("flashBtn");
const logBox = document.getElementById("log");
const progressBar = document.getElementById("progressBar");
const firmwareSelect = document.getElementById("firmwareSelect");

function log(text){
  logBox.textContent += text + "\n";
  logBox.scrollTop = logBox.scrollHeight;
}

connectBtn.addEventListener("click", async ()=>{

  try{

    port = await navigator.serial.requestPort();

    await port.open({
      baudRate:115200
    });

    log("ESP32 Connected");

  }catch(err){

    log("Connection Failed");
    console.error(err);

  }

});

flashBtn.addEventListener("click", async ()=>{

  if(!port){
    alert("Connect ESP32 first");
    return;
  }

  try{

    log("Downloading firmware...");

    const response = await fetch(
      firmwareSelect.value
    );

    const firmware = await response.arrayBuffer();

    log("Firmware Loaded");
    log("Starting Flash...");

    // Fake progress demo
    // Replace with esptool flashing later

    let progress = 0;

    const timer = setInterval(()=>{

      progress += 10;

      progressBar.style.width =
        progress + "%";

      log("Uploading " + progress + "%");

      if(progress >= 100){

        clearInterval(timer);

        log("Flash Complete");

      }

    },500);

  }catch(err){

    log("Flash Failed");
    console.error(err);

  }

});
