
//set the dimensions and margins of the graph



// var F2F = new f2f();
var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      
    }
  }
  return str;
};



removeEndSpace = function (str)
{
  if(typeof str === 'string')
  {
    str = str.trim()
    str = str.replace(/  +/g, ' ');
  }
  return str;
};

var qrcode
var qrcode_text

var A = 5
var B = 0.8
var research_score = 0
var percent = 0

var total_grant_state1 = 0
var total_grant_state2 = 0
var total_grant_state3 = 0

var personnel_grant_state1 = 0
var personnel_grant_state2 = 0
var personnel_grant_state3 = 0

var non_personnel_grant_state1 = 0
var non_personnel_grant_state2 = 0
var non_personnel_grant_state3 = 0

var code1
var code2




d3.select('#AA').node().value = A
d3.select('#BB').node().value = B




function update() {

  research_score = Number(d3.select('#research_score').property("value"))
  percent = Number(d3.select('#percent').property("value"))
  if (percent > 75) { percent = 75 }
  if (percent < 0) { percent = 0 }
  d3.select('#percent').node().value = percent
  
  total_grant_state1 = 0
  personnel_grant_state1 = 0
  non_personnel_grant_state1 = 0

  total_grant_state2 = 0
  personnel_grant_state2 = 0
  non_personnel_grant_state2 = 0

  total_grant_state3 = 0
  personnel_grant_state3 = 0
  non_personnel_grant_state3 = 0

  // for state 1
  total_grant_state1 = A + research_score * B
  if (total_grant_state1 > 5) { personnel_grant_state1 = 5 + 40 * (total_grant_state1 - 5) / 100 }
  if (total_grant_state1 == 5) { personnel_grant_state1 = 5 + 40 * (total_grant_state1 - 5) / 100 }
  if (total_grant_state1 < 5) { personnel_grant_state1 = total_grant_state1 }
  non_personnel_grant_state1 = total_grant_state1 - personnel_grant_state1

  // for state 2
  personnel_grant_state2 = personnel_grant_state1 * (100 - percent) / 100
  non_personnel_grant_state2 = non_personnel_grant_state1 + personnel_grant_state1 * 3 * percent / 100
  total_grant_state2 = personnel_grant_state2 + non_personnel_grant_state2

  // for state 3
  non_personnel_grant_state3 = non_personnel_grant_state1 - non_personnel_grant_state1 * percent / 100
  personnel_grant_state3 = personnel_grant_state1 + (non_personnel_grant_state1 - non_personnel_grant_state3) / 3
  total_grant_state3 = personnel_grant_state3 + non_personnel_grant_state3


  if (d3.select("#state").property("value") == 1) {
    d3.select('#state_result').text('پژوهانه پایه')
    d3.select('#percent_title').text("بدون تبدیل:")
    d3.select('#percent').node().value = 0
    d3.select('#percent').property("disabled", true)
    d3.select('#total_grant').text(total_grant_state1.toFixed(3))
    d3.select('#percent_result_value').text('---')
    d3.select('#personnel_grant').text(personnel_grant_state1.toFixed(3))
    d3.select('#non_personnel_grant').text(non_personnel_grant_state1.toFixed(3))
  }

  if (d3.select("#state").property("value") == 2) {
    d3.select('#state_result').text('اعتبار اسنادی افزایش یافته (سرفصل الف به ب)')
    d3.select('#percent_title').text("درصد تبدیل حق التحقیق به اسنادی (0% تا 75%):")
    d3.select('#percent').property("disabled", false)
    d3.select('#total_grant').text(total_grant_state2.toFixed(3))
    d3.select('#percent_result_value').text(percent)
    d3.select('#personnel_grant').text(personnel_grant_state2.toFixed(3))
    d3.select('#non_personnel_grant').text(non_personnel_grant_state2.toFixed(3))
    
  }

  if (d3.select("#state").property("value") == 3) {
    d3.select('#state_result').text('حق التحقیق افزایش یافته (سرفصل ب به الف)')
    d3.select('#percent_title').text("درصد تبدیل اسنادی به حق التحقیق (0% تا 75%):")
    d3.select('#percent').property("disabled", false)
    d3.select('#total_grant').text(total_grant_state3.toFixed(3))
    d3.select('#percent_result_value').text(percent)
    d3.select('#personnel_grant').text(personnel_grant_state3.toFixed(3))
    d3.select('#non_personnel_grant').text(non_personnel_grant_state3.toFixed(3))
    
  }

  d3.select('#research_score_result').text(research_score)

  console.log('message - update')
}
update()


d3.select("#state").on("change", function () {
  console.log('message1')
 

  total_grant_state1 = 0
  total_grant_state2 = 0
  total_grant_state3 = 0

  personnel_grant_state1 = 0
  personnel_grant_state2 = 0
  personnel_grant_state3 = 0

  non_personnel_grant_state1 = 0
  non_personnel_grant_state2 = 0
  non_personnel_grant_state3 = 0

  

  d3.select('#percent').node().value = percent

  update()
});



d3.select("#percent").on("change", function () {
  d3.select('#percent').node().value = fixNumbers(d3.select('#percent').property("value"))
  d3.select('#percent').node().value = removeEndSpace(d3.select('#percent').property("value"))

  update()});

d3.select("#research_score").on("change", function () {
  d3.select('#research_score').node().value = fixNumbers(d3.select('#research_score').property("value"))
  d3.select('#research_score').node().value = removeEndSpace(d3.select('#research_score').property("value"))
  
  update()});


d3.select("#letter").on("click", function () {
  update()
});





