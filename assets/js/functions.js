
function capitalise(string) {
  return string[0].toUpperCase() + string.substring(1, string.length);
}
function removeIndex(arry, index) {
  return [...arry.slice(0, index), ...arry.slice(index + 1, arry.length)];
}

function renderRepaterWrapper() {
  let dayshtml = ``;

  $("#school")[0].value = school;
  $("#date_from")[0].value = date.from;
  $("#date_to")[0].value = date.to;

  days.forEach((day) => {
    let formDay = getDayFromFormData(day);
    let repeaters = Array.from(formDay.repeater);
    dayshtml += `    
        <div class="col-md-6 w-20 mb-3 text-center day" data-name=${day}>
            <div class="border p-2">
                <div class="form-group mb-3">
                    <div class="form-check form-switch">
                        <input class="form-check-input ${day}_eanbled" data-day="" ${
      formDay.enabled ? "checked" : ""
    } type="checkbox" onchange="setDayStatus(event,'${day}')">
                    </div>
                </div>
                <div class="repeater-wrapper mb-3">
                    ${renderRepeteres(repeaters, day)}
                </div>
                <div class="form-group mb-3">
                    <button class="btn btn-danger" data-day="${day}" onclick="addRepeter('${day}')">Ajouter</button>
                </div>
            </div>
        </div>
    `;
  });
  $(".days").html(dayshtml);
  setEventListners();
}

function renderCategories(formDay) {
  categoriesHtml = ``;
  categories.forEach((category) => {
    categoriesHtml += `<option value="${category}" ${
      formDay.category === category ? "selected" : ""
    }>${category}</option>`;
  });
  return categoriesHtml;
}

function renderTags(day, formDay, repeaterIndex) {
  let tagsHtml = ``;
  formDay.tags.forEach((tag, index) => {
    tagsHtml += `
        <span class="tag badge badge-pill badge-primary bg-secondary small">${tag} 
            <span class="badge bg-danger" data-day="${day}" data-repeater="${repeaterIndex}" data-index=${index} onclick="removetag(${index},'${day}',${repeaterIndex})">x</span>
        </span>`;
  });
  return tagsHtml;
}

function renderRepeteres(repeaters, day) {
  let repeatersHtml = ``;
  repeaters.forEach((item, index) => {
    repeatersHtml += `<div class="repeater mb-3 border p-1">
            <div class="close" onclick="removeRepeter('${day}',${index})" data-day="${day}" data-index="${index}">
                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#ff0000"></path> </g></svg>
            </div>
            <div class="form-group mb-3">
                <label for="${day}" class="form-label">${capitalise(
      day
    )}</label>
                <select onchange="setCategory(this,'${day}',${index})" id="${day}" data-day="${day}" data-index="${index}" class="form-select form-control ${day}_caregory" required value="${
      item.category
    }">
                    <option value="">Choisir Categorie</option>
                    ${renderCategories(item)}
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="${day}_tag_input_${index}" class="form-control d-flex flex-wrap">
                    ${renderTags(day, item, index)}
                    <input data-day="${day}" id="${day}_tag_input_${index}" data-repeater="${index}" type="text" class="border-0 ${day}_tag_input tag-input">
                </label>
            </div>
        </div>`;
  });
  return repeatersHtml;
}

function repareFormData() {
  if (!formData || formData.length == 0) {
    formData = [];
    days.forEach((day, i) => {
      formData.push({
        day: day,
        enabled: true,
        repeater: [
          {
            category: null,
            tags: [],
          },
        ],
      });
    });
  }
}

function getDayFromFormData(day) {
  return formData.find((formday) => formday.day === day);
}

function addRepeter(day) {
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  formData[dayIndex].repeater.push({
    category: null,
    tags: [],
  });
  renderRepaterWrapper();
}

function removeRepeter(day, index) {
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  formData[dayIndex].repeater = removeIndex(formData[dayIndex].repeater, index);
  renderRepaterWrapper();
}

async function addtag(tag, day, repeaterIndex) {
  tag = await spelCheckstring(tag);
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  if (formData[dayIndex].repeater[repeaterIndex].tags.length < 3) {
    formData[dayIndex].repeater[repeaterIndex].tags.push(tag);
    renderRepaterWrapper();
  } else {
    alert("Max allowed tag is 3!");
  }
}

function removetag(tagIndex, day, repeaterIndex) {
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  formData[dayIndex].repeater[repeaterIndex].tags = removeIndex(
    formData[dayIndex].repeater[repeaterIndex].tags,
    tagIndex
  );
  renderRepaterWrapper();
}

function setEventListners() {
  $("#form").submit((e) => {
    e.preventDefualt();
  });

  $(".tag-input").keyup((e) => {
    let day = e.target.dataset.day;
    let repeterIndex = e.target.dataset.repeater;
    let tag = e.target.value;
    if (e.key === "Enter" && tag.length > 2) {
      addtag(tag, day, repeterIndex);
    }
  });
  $(".tag-input")
    .toArray()
    .forEach((tagInput) => {
      let repeaterIndex = tagInput.dataset.repeater;
      let day = tagInput.dataset.day;
      let dayIndex = formData.findIndex((formDay) => formDay.day === day);
      let category = formData[dayIndex].repeater[repeaterIndex].category;
      $(tagInput)
        .autocomplete({
          source: categoriesTags[category]?.length
            ? categoriesTags[category]
            : [],
          minLength: 0,
          select: function (event, ui) {
            addtag(ui.item.value, day, repeaterIndex);
          },
        })
        .bind("focus", function () {
          $(this).autocomplete("search");
        });
    });
}

async function spelCheckstring(string) {
    const tags = string;
    let value = string;
    if (value) {
      value = value.trim();
    }
    let response = await fetch(`https://clients1.google.com/complete/search?q=${value}&nolabels=t&client=youtube&ds=yt&dataType=jsonb`);
    response = await response.text();
    const parsedResponse = await parseJSONP(response);
    if (parsedResponse.suggestions.length) {
      value = parsedResponse.suggestions[0].phrase;
      // bug to fix : 
    // input :  bigest piza
    //   output:  biggest piz
    //   {phrase: 'biggest pizza in the world', index: 0, details: Array(2)}
    // todo : ony trim unecessary words
      if (value.length > string.length) {
        value = value.substring(0, string.length);
      }
      console.log("input : ",string);
      console.log("output: ",value);
      console.log("suggestions",parsedResponse.suggestions);
      console.log("suggestion 0",parsedResponse.suggestions[0]);
      return value;
    } else {
        return string;
    }
  
    function parseJSONP(jsonpResponse) {
      const jsonStart = jsonpResponse.indexOf("(") + 1;
      const jsonEnd = jsonpResponse.lastIndexOf(")");
      const jsonString = jsonpResponse.substring(jsonStart, jsonEnd);
      const jsonData = JSON.parse(jsonString);
      const result = {
        query: jsonData[0],
        suggestions: jsonData[1].map((item) => ({
          phrase: item[0],
          index: item[1],
          details: item[2],
        })),
        metadata: jsonData[2],
      };
      return result;
    }
  }

function setCategory(category, day, repeterIndex) {
  category = category.value;
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  formData[dayIndex].repeater[repeterIndex].category = category;
  renderRepaterWrapper();
}

function setDayStatus(e, day) {
  let dayIndex = formData.findIndex((formDay) => formDay.day === day);
  formData[dayIndex].enabled = e.target.checked;
}

function setSchool(value) {
  school = value;
}
function setDate(value, type) {
  date[type] = value;
}

function generatePdf() {
  // if (!school || !date.from || !date.tag) {
  //     alert("Some fields are required!")
  // }else{
  let data = {
    school,
    date,
    days: formData,
  };
  alert(JSON.stringify(data));
  // }
}
