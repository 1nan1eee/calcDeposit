$(function () {
  initCalc();
  calcKredit();
  //something
  //изменения от васильны
  //comment
  //comment23232
  //ААААА БЛЯТЬ СУКААВИАААААЛАЛАЗВВХАЗА
  //ponos
  $("#autoCost_val").focusin(function () {
    var val_autoCost = $("#autoCost_val").val().replace(/\D+/g, "");
    var min_autoCost = $("#autoCost").attr("min-value-data");
    var max_autoCost = $("#autoCost").attr("max");
    $("#autoCost_val").val(val_autoCost);
    $(".err_autoCost_val")
      .text(
        "Введите стоимость автомобиля от " +
          fn_replace(min_autoCost) +
          " до " +
          fn_replace(max_autoCost) +
          " руб."
      )
      .slideDown();
    $("#autoCost_val").on("change keyup", function () {
      val_autoCost = $("#autoCost_val").val().replace(/\D+/g, "");
      $("#autoCost_val").val(fn_replace(val_autoCost));
      if (parseInt(val_autoCost) >= parseInt(min_autoCost)) {
        if (parseInt(val_autoCost) <= parseInt(max_autoCost)) {
          $(".err_autoCost_val").text(
            "Введите стоимость автомобиля от " +
              fn_replace(min_autoCost) +
              " до " +
              fn_replace(max_autoCost) +
              " руб."
          );
        } else {
          $(".err_autoCost_val").text(
            "Максимальная стоимость автомобиля " +
              fn_replace(max_autoCost) +
              " руб."
          );
        }
      } else {
        $(".err_autoCost_val").text(
          "Минимальная стоимость автомобиля " +
            fn_replace(min_autoCost) +
            " руб."
        );
        val_autoCost = min_autoCost;
      }
    });
    $("#autoCost_val").focusout(function () {
      $("#autoCost").slider("value", parseInt(val_autoCost));
      $(".err_autoCost_val").slideUp(1000);
    });
  });

  $("#firstPayment_val").focusin(function () {
    var val_firstPayment = $("#firstPayment_val").val().replace(/\D+/g, "");
    var min_firstPayment = $("#firstPayment").attr("min-value-data");
    var max_firstPayment = $("#firstPayment").attr("max");
    $("#firstPayment_val").val(val_firstPayment);
    $(".err_firstPayment_val")
      .text(
        "Введите первоначальный взнос от " +
          fn_replace(min_firstPayment) +
          " до " +
          fn_replace(max_firstPayment) +
          " руб."
      )
      .slideDown();
    $("#firstPayment_val").on("change keyup", function () {
      val_firstPayment = $("#firstPayment_val").val().replace(/\D+/g, "");
      $("#firstPayment_val").val(fn_replace(val_firstPayment));
      if (parseInt(val_firstPayment) >= parseInt(min_firstPayment)) {
        if (parseInt(val_firstPayment) <= parseInt(max_firstPayment)) {
          $(".err_firstPayment_val").text(
            "Введите первоначальный взнос от " +
              fn_replace(min_firstPayment) +
              " до " +
              fn_replace(max_firstPayment) +
              " руб."
          );
        } else {
          $(".err_firstPayment_val").text(
            "Максимальная первоначальный взнос " +
              fn_replace(max_firstPayment) +
              " руб."
          );
        }
      } else {
        $(".err_firstPayment_val").text(
          "Минимальный первоначальный взнос " +
            fn_replace(min_firstPayment) +
            " руб."
        );
        val_firstPayment = min_firstPayment;
      }
    });
    $("#firstPayment_val").focusout(function () {
      $("#firstPayment").slider("value", parseInt(val_firstPayment));
      $(".err_firstPayment_val").slideUp(1000);
    });
  });

  $("#duration_val").focusin(function () {
    var val_duration = $("#duration_val").val().replace(/\D+/g, "");
    var min_duration = $("#duration").attr("min-value-data");
    var max_duration = $("#duration").attr("max");
    $("#duration_val").val(val_duration);
    $(".err_duration_val")
      .text(
        "Введите срок кредита от " +
          min_duration +
          " до " +
          max_duration +
          " мес."
      )
      .slideDown();
    $("#duration_val").on("change keyup", function () {
      val_duration = $("#duration_val").val().replace(/\D+/g, "");
      $("#duration_val").val(val_duration);
      if (parseInt(val_duration) >= parseInt(min_duration)) {
        if (parseInt(val_duration) <= parseInt(max_duration)) {
          $(".err_duration_val").text(
            "Введите срок кредита от " +
              min_duration +
              " до " +
              max_duration +
              " мес."
          );
        } else {
          $(".err_duration_val").text(
            "Максимальная срок кредита " + max_duration + " мес."
          );
        }
      } else {
        $(".err_duration_val").text(
          "Минимальная срок кредита " + min_duration + " мес."
        );
        val_duration = min_duration;
      }
    });
    $("#duration_val").focusout(function () {
      $("#duration").slider("value", parseInt(val_duration));
      $(".err_duration_val").slideUp(1000);
    });
  });
});
function initCalc() {
  if ($("#autoCost").length > 0 && $("#autoCost_val").length > 0) {
    var autoCost = parseInt($("#autoCost_val").val().replace(/\D+/g, ""));
    var range_auto = $("#autoCost");
    var auto_min = parseInt(range_auto.attr("min-value-data"));
    range_auto.slider({
      orientation: "horizontal",
      range: "min",
      min: auto_min,
      max: parseInt(range_auto.attr("max")),
      value: parseInt(range_auto.attr("value")),
      step: parseInt(range_auto.attr("step")),
      change: function (event, ui) {
        ui.value = (ui.value + "").replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
        $("#autoCost_val").val(ui.value + " руб.");
        changeFirstPayment();
        calcKredit();
      },
      slide: function (event, ui) {
        ui.value = (ui.value + "").replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
        $("#autoCost_val").val(ui.value + " руб.");
        changeFirstPayment();
        calcKredit();
      },
    });
  }

  if ($("#firstPayment").length > 0 && $("#firstPayment_val").length > 0) {
    var firstPayment = parseInt(
      $("#firstPayment_val").val().replace(/\D+/g, "")
    );
    var range_first = $("#firstPayment");
    var first_min = parseInt(range_first.attr("min-value-data"));
    range_first.slider({
      orientation: "horizontal",
      range: "min",
      min: first_min,
      max: parseInt($("#autoCost_val").val().replace(/\D+/g, "")),
      value: parseInt(range_first.attr("value")),
      step: parseInt(range_first.attr("step")),
      change: function (event, ui) {
        ui.value = (ui.value + "").replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
        $("#firstPayment_val").val(ui.value + " руб.");
        calcKredit();
      },
      slide: function (event, ui) {
        ui.value = (ui.value + "").replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          "$1 "
        );
        $("#firstPayment_val").val(ui.value + " руб.");
        calcKredit();
      },
    });
  }

  if ($("#duration").length > 0 && $("#duration_val").length > 0) {
    var duration = parseInt($("#duration_val").val().replace(/\D+/g, ""));
    var range_duration = $("#duration");
    var duration_min = parseInt(range_duration.attr("min-value-data"));
    range_duration.slider({
      orientation: "horizontal",
      range: "min",
      min: duration_min,
      max: parseInt(range_duration.attr("max")),
      value: parseInt(range_duration.attr("value")),
      step: parseInt(range_duration.attr("step")),
      change: function (event, ui) {
        $("#duration_val").val(ui.value + " мес.");
        calcKredit();
      },
      slide: function (event, ui) {
        $("#duration_val").val(ui.value + " мес.");
        calcKredit();
      },
    });
  }
  changeFirstPayment();
  $("#izhcom_card").on("change", function () {
    setProperties();
    changeFirstPayment();
    calcKredit();
  });
}

function setProperties() {
  var cost = parseInt($("#autoCost_val").val().replace(/\D+/g, ""));
  if ($("#izhcom_card").is(":checked")) {
    $(".firstPayment b").html("10%");
    $("#firstPayment").slider("option", "min", cost * 0.1);
    $("#duration").slider("option", "max", 84); //75
    $("#duration").attr("max", 84); //
    checked_duration_val(84);
  } else {
    $(".firstPayment b").html("10%");
    $("#firstPayment").slider("option", "min", cost * 0.5);
    $("#duration").slider("option", "max", 84); //3
    $("#duration").attr("max", 84); //3
    "#duration_val".val(84); //
  }
}

function changeFirstPayment() {
  var cost = parseInt($("#autoCost_val").val().replace(/\D+/g, ""));
  var firstPay = parseInt($("#firstPayment_val").val().replace(/\D+/g, ""));
  var minFirst;
  var defaultMin = 60000;
  if ($("#izhcom_card").is(":checked")) {
    $("#firstPayment").slider("option", "min", cost * 0.1);
    minFirst = cost * 0.1;
    $("#firstPayment").attr("min-value-data", minFirst);
  } else {
    $("#firstPayment").slider("option", "min", cost * 0.1);
    minFirst = cost * 0.1;
    $("#firstPayment").attr("min-value-data", minFirst);
  }
  $("#firstPayment").slider("option", "max", cost);
  $("#firstPayment").attr("max", cost);
  /*if(firstPay < minFirst){
		$('#firstPayment').slider('value', minFirst);
		minFirst = (minFirst+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		$('#firstPayment_val').val(minFirst +' руб.');
	}
	if(firstPay > cost){
		cost = (cost+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		$('#firstPayment_val').val(cost +' руб.');
	}*/
  $("#firstPayment").slider("option", "value", minFirst);
  calcKredit();
}

function calcKredit() {
  var percent;
  var months = parseInt($("#duration_val").val()); //parseInt($("#duration_val").val()) * 12
  var kredit =
    parseInt($("#autoCost_val").val().replace(/\D+/g, "")) -
    parseInt($("#firstPayment_val").val().replace(/\D+/g, ""));
  var cost = parseInt($("#autoCost_val").val().replace(/\D+/g, ""));
  var firstPay = parseInt($("#firstPayment_val").val().replace(/\D+/g, ""));
  if ($("#izhcom_card").is(":checked")) {
    percent = 0.195; /* old 0.185 */
    $(".deposit_result span").html("19.5%");
  } else {
    if (firstPay * 2 > cost) {
      percent = 0.199; /* old 0.189 */
      $(".deposit_result span").html("19.9%");
    } else {
      percent = 0.199; /* old 0.189 */
      $(".deposit_result span").html("19.9%");
    }
  }
  var p1 = percent / 12;
  var p2 = Math.pow(1 + p1, months) - 1;
  var p3 = kredit * (p1 + p1 / p2);
  p3 = Math.round(p3);
  var platezh = p3;
  /*var bottom = Math.pow((1 + percent), months) - 1;
	var platezh = Math.round(kredit * (percent + (percent / bottom)));*/
  $("#payments").html(
    (platezh + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
  );
  $("#persent").html(
    (kredit + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
  );
}
function fn_replace(replace_item) {
  replace_item = replace_item.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return replace_item;
}
function checked_duration_val() {
  var checked_val_duration = $("#duration_val").val().replace(/\D+/g, "");
  var checked_min_duration = $("#duration").attr("min-value-data");
  var checked_max_duration = $("#duration").attr("max");
  if (parseInt(checked_val_duration) >= parseInt(checked_min_duration)) {
    if (parseInt(checked_val_duration) <= parseInt(checked_max_duration)) {
      checked_val_duration = checked_val_duration;
    } else {
      checked_val_duration = checked_max_duration;
    }
  } else {
    checked_val_duration = checked_min_duration;
  }
  $("#duration_val").val(checked_val_duration);
  $("#duration").slider("value", parseInt(checked_val_duration));
}