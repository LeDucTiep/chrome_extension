// function get_index(plate) {
//   let results = "";
//   for (let index = 3; index < plate.length; index++) {
//     results += plate[index];
//   }
//   return Number(results);
// }

function reddenPage() {
  function up_one(input) {
    let number_out_of_range = 0;
    let string_result = "";
    for (let index = input.length - 1; index >= 0; index--) {
      if ((number_out_of_range == 1) || (index == input.length - 1)) {
        let temp = ascii_plus_one(input[index]);
        if(temp == 'A'){
          number_out_of_range = 1;
        } else {
          number_out_of_range = 0;
        }
        string_result = temp + string_result;
      } else {
        string_result = input[index] + string_result;
      }
    }
    return string_result;
  }

  function ascii_plus_one(char) {
    if(char == 'A'){
      return 'B';
    }
    else if(char == 'B'){
      return 'C';
    }
    else if(char == 'C'){
      return 'D';
    }
    else if(char == 'D'){
      return 'E';
    }
    else if(char == 'E'){
      return 'F';
    }
    else if(char == 'F'){
      return 'G';
    }
    else if(char == 'G'){
      return 'H';
    }
    else if(char == 'H'){
      return 'J';
    }
    else if(char == 'J'){
      return 'K';
    }
    else if(char == 'K'){
      return 'L';
    }
    else if(char == 'L'){
      return 'M';
    }
    else if(char == 'M'){
      return 'N';
    }
    else if(char == 'N'){
      return 'P';
    }
    else if(char == 'P'){
      return 'Q';
    }
    else if(char == 'Q'){
      return 'R';
    }
    else if(char == 'R'){
      return 'S';
    }
    else if(char == 'S'){
      return 'T';
    }
    else if(char == 'T'){
      return 'U';
    }
    else if(char == 'U'){
      return 'W';
    }
    else if(char == 'W'){
      return 'Y';
    }
    else if(char == 'Y'){
      return 'Z';
    }
    else if(char == 'Z'){
      return 'A';
    }
  }

  var current_plate = document.querySelector(
    "input.form-control.text-uppercase"
  ).value;
  var plate_error = false;
  if (current_plate == "") {
    try {
      current_plate = document
        .querySelector("li.list-group-item.list-group-item-warning")
        .querySelector("b.terminal").innerText;
    } catch (error) {
      plate_error = true;
      chrome.storage.local.get(["downloaded_plate"], function (result) {
        document.querySelector("input.form-control.text-uppercase").value =
          result.downloaded_plate;
      });
    }
  }
  if (!plate_error) {
    let temp_string = "";
    for (let index = 3; index < current_plate.length; index++) {
      temp_string += current_plate[index];
    }
    let index = Number(temp_string);

    let plate = current_plate[0] + current_plate[1] + current_plate[2];

    let results = document.body.innerHTML;
    let a = document.createElement("a");
    let bb = new Blob([results], { type: "text/plain" });
    a.download = plate + index + ".txt";
    a.href = window.URL.createObjectURL(bb);
    a.click();
    // let is_good = is_good();
    // if (is_good) {
    index += 1;
    // }
    if (index == 1000 || index == 999) {
      plate = up_one(plate);
      index = 1;
    }
    document.querySelector("input.form-control.text-uppercase").value =
      plate + index;
    chrome.storage.local.set({ downloaded_plate: plate + index }, function () {
      // console.log("The downloaded_plate is set to " + (plate + index));
    });
    try {
      document
        .querySelector("form.navbar-left.navbar-form.search-form")
        .submit();
    } catch (error) {
      // console.log("Error!");
      document.getElementById("car-search").submit();
    }
  }
}

// function is_good() {
//   let is_good = document.body.innerText.search("Vehicle information for") == -1;
//   if (is_good) {
//     for (let key of document.getElementsByClassName("key")) {
//       let s = key.getAttribute("data-key");
//       if (
//         s == "vin" ||
//         s == "engine_number" ||
//         s == "vehicle_equipment_class"
//       ) {
//         is_good =
//           is_good &&
//           key.parentElement.getElementsByClassName("value")[0].innerText !=
//             " Get CARJAM Report";
//       }
//     }
//   }
//   return is_good;
// }

// chrome.storage.local.set({ start_scrape: false }, function () {
//   console.log("Stoping scrape");
// });


chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(["start_scrape"], function (result) {
    chrome.storage.local.set(
      { start_scrape: !result.start_scrape },
      function () {
        console.log("Scraping is: ", !result.start_scrape);
      }
    );
  });
});

chrome.alarms.create("5min", {
  delayInMinutes: 5 / 60,
  periodInMinutes: 5 / 60,
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "5min") {
    chrome.storage.local.get(["start_scrape"], function (result) {
      if (result.start_scrape == true) {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            let tab_id = tabs[0].id;
            // console.log(tabs[0]);
            chrome.scripting.executeScript({
              target: { tabId: tab_id },
              function: reddenPage,
            });
          }
        );
      }
    });
  }
});

// setTimeout(function () {
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     let tab_id = tabs[0].id;
//     chrome.scripting.executeScript({
//       target: { tabId: tab_id },
//       function: reddenPage,
//     });
//   });
// }, 5000);
