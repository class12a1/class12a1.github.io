let groups = [
    document.getElementById("group1"),
    document.getElementById("group2"),
    document.getElementById("group3"),
    document.getElementById("group4")
];

function createDesks(HTMLElement, maxrows, maxcols) {
    for (let x = 0; x < maxrows; x++) {
        for (let y = 0; y < maxcols; y++) {
            let desk = document.createElement("div");
            desk.setAttribute("data-seat", "x" + x + "y" + y);
            HTMLElement.appendChild(desk);
        }
    }
}

groups.forEach(value => {
    createDesks(value, 6, 2);
});

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

students.forEach((value, index) => {
    if (value.group == 0) return;
    let seat = "x" + value.seat.x + "y" + value.seat.y;
    let desk = groups[value.group - 1].querySelector("[data-seat='" + seat + "']");
    desk.innerHTML = "<span class=\"name\">" + value.short +"</span>";
    desk.onclick = function () { showMessage(index); };
    desk.id = index;
    desk.className = "desk";
});
function clearPopup()
{
    let contents = document.getElementById("contents");
    contents.innerHTML = "";
    let info = document.getElementById("info");
    info.innerHTML = "";

}
function togglePopup(clear = false)
{
    if (clear) clearPopup();
    let popup = document.getElementById("popup");
    let dim = document.getElementById("dim");
    if (popup.style.opacity == 0)
    {
        popup.style.opacity = 1;
        popup.style.visibility = dim.style.visibility = "visible";
        dim.style.opacity = 0.5;
    }
    else
    {
        document.querySelectorAll('video').forEach(vid => vid.pause());
        document.querySelectorAll('audio').forEach(aud => aud.pause());
        popup.style.opacity = dim.style.opacity = 0;
        popup.style.visibility = dim.style.visibility = "hidden";
    }
}

function showMessage(id) {
    if (id < 0 || id > 40) return;
    let desk = document.getElementById(id);
    togglePopup(true);
    let contents = document.getElementById("contents");
    let name = document.getElementById("fullname");
    name.innerHTML = students[id].full;
    if ("flex" in students[id].contents)
    {
        contents.classList.add("flex");
        switch (students[id].contents.flex) {
            case "flex-nowrap":
                contents.classList.add("lg:flex-nowrap");
                contents.classList.remove("lg:flex-wrap");
                break;
            case "flex-wrap":
                contents.classList.add("lg:flex-wrap");
                contents.classList.remove("lg:flex-nowrap");
                break;
        }
    }
    else contents.classList.remove("flex");
    if ("video" in students[id].contents)
    {
        students[id].contents.video.forEach((value) => {
            let video = document.createElement("video");
            video.src = value;
            video.className = "p-1 mx-auto h-88";
            video.setAttribute("controls", "controls");
            contents.appendChild(video);
        });
    }
    if ("audio" in students[id].contents)
    {
        students[id].contents.audio.forEach((value) => {
            let audio = document.createElement("audio");
            audio.src = value;
            audio.className = "p-1 mx-auto";
            audio.setAttribute("controls", "controls");
            contents.appendChild(audio);
        });
    }
    if ("image" in students[id].contents)
    {
        students[id].contents.image.forEach((value) => {
            let img = document.createElement("img");
            img.src = value;
            img.className = "p-1 lg:w-1/2";
            contents.appendChild(img);
        });
    }
    if ("text" in students[id].contents)
    {
        let div = document.createElement("div");
        div.id = "text";
        div.innerHTML = students[id].contents.text;
        div.className = "text-base px-2 mx-auto md:text-2xl";
        div.classList.add("quote");
        div.classList.add("text-justify");
        if ("justify" in students[id].contents)
        {
            div.classList.remove("text-justify");
            div.classList.add(students[id].contents.justify);
        }
        contents.appendChild(div);
    }
    if ("info" in students[id].contents)
    {
        let info = document.getElementById("info");
        info.innerHTML = students[id].contents.info;
    }
}