// калькулятор
function calculate() {
  var amount = parseInt($("#deposit_val").val().replace(/\s/g, ""), 10);
  var term = parseInt($("#term").val(), 10);
  var rate = 0.17;
  var daysInYear = new Date().getFullYear() % 4 === 0 ? 366 : 365;
  var daysInTerm;

  // Определение количества дней в зависимости от срока
  if (term === 3) {
    daysInTerm = 91; // 3 месяца
  } else if (term === 6) {
    daysInTerm = 91 * 2; // 6 месяцев
  } else if (term === 12) {
    daysInTerm = 91 * 4; // 12 месяцев
  }

  var income = ((amount * rate) / daysInYear) * daysInTerm;

  var termText = term === 3 ? "месяца" : "месяцев";
  $("#months").text(term + " " + termText);
  $("#finalAmount").text(formatMoney((amount + income).toFixed(0)));
  $("#income").text(formatMoney(income.toFixed(0)));
}

// код для вывода суммы с пробелами
function formatMoney(amount) {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


// ползунок
$(function () {
  // вывод суммы с пробелами
  function formatMoney(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  $("#autoCost").slider({
      range: "min",
      value: 5000,
      min: 5000,
      max: 5000000,
      step: 500,
      slide: function (event, ui) {
          $("#deposit_val").val(formatMoney(ui.value) + " руб."); // Обновление поля ввода при изменении ползунка
          calculate();
      },
  });
  
  $("#deposit_val").change(function () {
      var value = $(this).val().replace(/\D/g, ""); // Удаление нечисловых символов
      value = parseInt(value, 10); // Преобразование строки в число
      if (value >= 5000 && value <= 5000000) {
          $("#autoCost").slider("value", value); // Обновление ползунка при изменении поля ввода
          $(this).val(formatMoney(value) + " руб.");
          calculate();
      }
      else {
          value = value < 5000 ? 5000 : 5000000
          $(this).val(formatMoney(value) + " руб.");
          $("#autoCost").slider("value", value);
          calculate();
      }
  });
  
  $("#term").change(calculate);
  calculate();
});
