function format(text, returnType = 0) {
    return text == "" ? (returnType >= 1 ? (returnType >= 2 ? "SS" : "0") : "N/A") : text
}

function intToDiff(diff) {
    switch (diff)
    {
        case 0:
            return "Easy";
        case 1:
            return "Normal";
        case 2:
            return "Hard";
        case 3:
            return "Expert";
        case 4:
            return "Expert +";
    }
    return "Unknown";
}

function SetPercentage(percentage) {
    try {
        bar.style.width = (percentage * 100) + "%"
    } catch {}
}


var lastID = "";
var lastSongKey = "";
var got404 = false;

function SetImage(id) {
    if(id.startsWith("custom_level_") && id != lastID) {
        fetch("https://beatsaver.com/api/maps/by-hash/" + id.replace("custom_level_", "")).then((result) => {
            result.json().then((json) => {
                try {
                    key.innerHTML = json["key"]
                } catch {}
                
                try {
                    if(lastSongKey != "") {
                        try {
                            prekeyContainer.style.display = "inline"
                        } catch {}
                    }
                    prekey.innerHTML = lastSongKey
                } catch {}
                lastSongKey = json["key"]
            })
        }).catch((err) => {})
    } else if(useLocalhost && stats["fetchedKey"]) {
        try {
            key.innerHTML = stats["key"]
        } catch {}
        lastSongKey = stats["key"]
    }
    if(id != lastID || got404) {
        fetch(useLocalhost ? localip + "cover" : "http://" + ip + ":53502/cover/base64").then((res) => {
            res.text().then((base64) => {
                if(res.status == 404) {
                    cover.src = "default.png"
                    got404 = true;
                } else {
                    cover.src = base64
                    got404 = false;
                }
            })
        }).catch((err) => {
            // Fallback to default cover
            got404 = true
            cover.src = "default.png"
        })
    }
    lastID = id
}


var bar = document.getElementById("energybar")
var barContainer = document.getElementById("energybarContainer")
var songName = document.getElementById("songName")
var songAuthor = document.getElementById("songAuthor")
var mapper = document.getElementById("mapper")
var diff = document.getElementById("diff")
var combo = document.getElementById("combo")
var score = document.getElementById("score")
var cover = document.getElementById("cover")
var key = document.getElementById("key")
var rank = document.getElementById("rank")
var percentage = document.getElementById("percentage")
var songSub = document.getElementById("songSub")
var njs = document.getElementById("njs")
var bpm = document.getElementById("bpm")
var timePlayed = document.getElementById("timePlayed")
var totalTime = document.getElementById("totalTime")
var mpCode = document.getElementById("mpCode")
var mpCodeContainer = document.getElementById("mpCodeContainer")
var prekey = document.getElementById("preKey")
var prekeyContainer = document.getElementById("preKeyContainer")
var customTextContainer = document.getElementById("customText")

var williamGayContainer = document.getElementById("williamGayContainer")
var pinkCuteContainer = document.getElementById("pinkCuteContainer")
var eraCuteContainer = document.getElementById("eraCuteContainer")

var url_string = window.location.href
var url = new URL(url_string);
var ip = url.searchParams.get("ip");
var rate = url.searchParams.get("updaterate")
var decimals = url.searchParams.get("decimals")

var showmpcode = url.searchParams.get("dontshowmpcode")
if(showmpcode == null) showmpcode = true;
else showmpcode = false

var alwaysupdate = url.searchParams.get("alwaysupdate")
if(alwaysupdate == null) alwaysupdate = false;
else alwaysupdate = true

var nosetip = url.searchParams.get("nosetip")
if(nosetip == null) nosetip = false;
else nosetip = true

var long = url.searchParams.get("unnecessarilylongparameterwhichsetsupdateratewithc00lstufftofuqy0u0ffs0youdontwriteitbtwpinkcuteandwilliamgayandblameenderforthisideaandcomputerforimplementingitintotheoverlaysgotabitcarriedawaytypingthissohavefunnowbutwhatifitellyouthisisntdoingwhatyouarethinkingbcicandowhatiwantwithcodeandyouaretypingittogetrickrolledsoicanhavemyfunevenwhenitsnotaprilfirst")
if(long != null) {
    alert("You're crazy stop typing this stuff. Here have fun:")
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_self")
}

var williamGay = url.searchParams.get("williamgay")
if(williamGay != null) {
    try {
        williamGayContainer.style.display = "block"
    } catch {}
} else {
    try {
        williamGayContainer.style.display = "none"
    } catch {}
}

var eraCute = url.searchParams.get("eracute")
if(eraCute != null) {
    try {
        eraCuteContainer.style.display = "block"
    } catch {}
} else {
    try {
        eraCuteContainer.style.display = "none"
    } catch {}
}

var pinkCute = url.searchParams.get("pinkcute")
if(pinkCute != null) {
    try {
        pinkCuteContainer.style.display = "block"
    } catch {}
} else {
    try {
        pinkCuteContainer.style.display = "none"
    } catch {}
}

var alwaysshowmpcode = url.searchParams.get("alwayshowmpcode")
if(alwaysshowmpcode == null) alwaysshowmpcode = false;
else alwaysshowmpcode = true

var chartwidth = url.searchParams.get("chartwidth")
if(chartwidth == null) chartwidth = 100;

var showenergyBar = url.searchParams.get("dontshowenergy")
if(showenergyBar == null) showenergyBar = true;
else showenergyBar = false

var customText = url.searchParams.get("customtext");
if(customText != null && customText != "") {
    try {
        customTextContainer.innerHTML = customText
    } catch {}
} else {
    try {
        customTextContainer.style.display = "none"
    } catch {}
}

if(ip == null || ip == "") {
    ip = prompt("Please enter your Quests IP:", "192.168.x.x");
}
if(rate == null) rate = 100
if(decimals == null) decimals = 2
console.log("update rate: " + rate)
console.log("decimals for percentage: " + decimals)
console.log("ip: " + ip)
console.log("show mp code: " + showmpcode)
console.log("show energy bar: " + showenergyBar)

var useLocalhost = false;
const localip = 'http://localhost:53510/api/raw';

try {
    prekeyContainer.style.display = "none"
} catch {}

fetch(localip).then((res) => {
    useLocalhost = true
    console.log(`Using client at ${localip} to fetch data`)
}).catch(() => {
    useLocalhost = false
    console.log(`falling back to Quest ip (${ip})`)
})

var stats = {}

var firstRequest = true

setInterval(function() {
    fetch(useLocalhost ? localip + "?ip=" + ip + (nosetip ? "&nosetip" : "") : "http://" + ip + ":53502").then((response) => {
        response.json().then((json) => {
            //console.log(stats)
            if(json["location"] == 1 || json["location"] == 2 || json["location"] == 3 || json["location"] == 4 || alwaysupdate || firstRequest) {
                stats = json
                firstRequest = false
            } else {
                stats["location"] = json["location"]
                stats["mpGameId"] = json["mpGameId"]
                stats["mpGameIdShown"] = json["mpGameIdShown"]
            }
            
            if(json["connected"] != undefined && !json["connected"]) {
                basicSetNotConnected()
            } else {
                setAll()
            }
        })
    })
}, rate)

function basicSetNotConnected() {
    try {
        SetPercentage(1.0)
    } catch {}
    try {
        songName.innerHTML = format("Quest disconnected")
    } catch {}
    try {
        songAuthor.innerHTML = format("")
    } catch {}
    try {
        mapper.innerHTML = format("")
    } catch {}
    try {
        diff.innerHTML = intToDiff(4)
    } catch {}
    try {
        combo.innerHTML = format(0, 1)
    } catch {}
    try {
        score.innerHTML = format(AddComma(0), 1)
    } catch {}
    try {
        rank.innerHTML = format("SS", 2)
    } catch {}
    try {
        percentage.innerHTML = format(trim(100)) + " %"
    } catch {}
    try {
        songSub.innerHTML = format(0)
    } catch {}
    try {
        njs.innerHTML = format(trim(0))
    } catch {}
    try {
        bpm.innerHTML = format(trim(0), 1)
    } catch {}
    try {
        mpCode.innerHTML = "not in lobby"
    } catch {}
    try {
        mpCodeContainer.style.display = "none"
    } catch {}
    try {
        updateTime(10, 5)
    } catch {}
}

function setAll() {
    try {
        SetPercentage(stats["energy"])
    } catch {}
    try {
        songName.innerHTML = format(stats["levelName"])
    } catch {}
    try {
        songAuthor.innerHTML = format(stats["songAuthor"])
    } catch {}
    try {
        mapper.innerHTML = format(stats["levelAuthor"])
    } catch {}
    try {
        diff.innerHTML = intToDiff(stats["difficulty"])
    } catch {}
    try {
        combo.innerHTML = format(stats["combo"], 1)
    } catch {}
    try {
        score.innerHTML = format(AddComma(stats["score"]), 1)
    } catch {}
    try {
        rank.innerHTML = format(stats["rank"], 2)
    } catch {}
    try {
        percentage.innerHTML = format(trim(stats["accuracy"] * 100)) + " %"
    } catch {}
    try {
        SetImage(stats["id"])
    } catch {}
    try {
        songSub.innerHTML = format(stats["levelSubName"])
    } catch {}
    try {
        njs.innerHTML = format(trim(stats["njs"]))
    } catch {}
    try {
        bpm.innerHTML = format(trim(stats["bpm"]), 1)
    } catch {}
    try {
        if(stats["location"] == 2 || stats["location"] == 5) {
            // Is in mp lobby or song
            if(stats["mpGameIdShown"] && showmpcode || alwaysshowmpcode) {
                mpCode.innerHTML = format(stats["mpGameId"])
            } else {
                mpCode.innerHTML = "*****"
            }
        } else {
            mpCode.innerHTML = "not in lobby"
        }
    } catch {}
    try {
        if((stats["location"] == 2 || stats["location"] == 5) && showmpcode) {
            mpCodeContainer.style.display = "block"
        } else {
            mpCodeContainer.style.display = "none"
        }
    } catch {}
    try {
        updateTime(stats["endTime"], stats["time"])
    } catch {}

    try {
        if(!showenergyBar) {
            barContainer.style.display = "none"
        }
    } catch {}
    try {
        SetFPS(stats["fps"], chartwidth)
    } catch {}
}

function AddComma(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function trim(input) {
    return input.toFixed(decimals)
}

function ToElapsed(input) {
    var date = new Date(0);
    date.setSeconds(input); // specify value for SECONDS here
    var timeString = date.toISOString().substr(14, 5);
    return timeString
}