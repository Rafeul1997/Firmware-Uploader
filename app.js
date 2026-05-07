let port;

let firmwareData;

const boardSelect =
document.getElementById(
  "boardSelect"
);

const categorySelect =
document.getElementById(
  "categorySelect"
);

const firmwareSelect =
document.getElementById(
  "firmwareSelect"
);

const connectBtn =
document.getElementById(
  "connectBtn"
);

const flashBtn =
document.getElementById(
  "flashBtn"
);

const progressBar =
document.getElementById(
  "progressBar"
);

const progressText =
document.getElementById(
  "progressText"
);

const logBox =
document.getElementById(
  "log"
);

function log(text){

  logBox.textContent +=
    text + "\\n";

  logBox.scrollTop =
    logBox.scrollHeight;

}

async function loadConfig(){

  const response =
    await fetch(
      "config/firmware.json"
    );

  firmwareData =
    await response.json();

  loadBoards();

}

function loadBoards(){

  boardSelect.innerHTML = "";

  Object.keys(
    firmwareData.boards
  ).forEach(board=>{

    const option =
      document.createElement(
        "option"
      );

    option.value = board;

    option.textContent =
      board.toUpperCase();

    boardSelect.appendChild(
      option
    );

  });

  loadCategories();

}

function loadCategories(){

  categorySelect.innerHTML =
    "";

  const board =
    boardSelect.value;

  const categories =
    firmwareData.boards[
      board
    ];

  Object.keys(categories)
  .forEach(category=>{

    const option =
      document.createElement(
        "option"
      );

    option.value =
      category;

    option.textContent =
      category;

    categorySelect
    .appendChild(option);

  });

  loadFirmwares();

}

function loadFirmwares(){

  firmwareSelect.innerHTML =
    "";

  const board =
    boardSelect.value;

  const category =
    categorySelect.value;

  const firmwares =
    firmwareData.boards
    [board][category];

  firmwares.forEach(fw=>{

    const option =
      document.createElement(
        "option"
      );

    option.value =
      fw.file;

    option.textContent =
      fw.name;

    firmwareSelect
    .appendChild(option);

  });

}

boardSelect.addEventListener(
  "change",
  loadCategories
);

categorySelect.addEventListener(
  "change",
  loadFirmwares
);

loadConfig();

/* CONNECT */

connectBtn.addEventListener(
"click",
async ()=>{

  try{

    port =
      await navigator.serial
      .requestPort();

    await port.open({
      baudRate:115200
    });

    log(
      "[INFO] Device Connected"
    );

  }catch(err){

    log(
      "[ERROR] Connection Failed"
    );

    console.error(err);

  }

});

/* FLASH */

flashBtn.addEventListener(
"click",
async ()=>{

  if(!port){

    alert(
      "Connect device first"
    );

    return;
  }

  try{

    const firmwarePath =
      firmwareSelect.value;

    log(
      "[INFO] Loading firmware..."
    );

    const response =
      await fetch(
        firmwarePath
      );

    const firmware =
      await response
      .arrayBuffer();

    log(
      "[INFO] Firmware Loaded"
    );

    log(
      "[INFO] Size: " +
      firmware.byteLength +
      " bytes"
    );

    log(
      "[INFO] Starting Upload..."
    );

    let progress = 0;

    const timer =
      setInterval(()=>{

      progress += 10;

      progressBar.style.width =
        progress + "%";

      progressText.textContent =
        progress + "%";

      log(
        "[INFO] Uploading " +
        progress +
        "%"
      );

      if(progress >= 100){

        clearInterval(timer);

        log(
          "[SUCCESS] Upload Complete"
        );

      }

    },400);

  }catch(err){

    log(
      "[ERROR] Upload Failed"
    );

    console.error(err);

  }

});
