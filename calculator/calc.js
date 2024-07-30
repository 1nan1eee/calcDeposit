// калькулятор
function calculate() {
	var amount = parseInt($("#deposit_val").val().replace(/\s/g, ""), 10);
	var term = parseInt($("#term_val").val(), 10);
	var rate = checkRate(term);
	var today = new Date();
	var daysInYear = new Date().getFullYear() % 4 === 0 ? 366 : 365;
	var daysInTerm = daysBetweenDates(today, addMonthsToDate(today, term));
	var income = ((amount * rate) / daysInYear) * daysInTerm;
	$("#months").text(term + " " + formatMonth(term));
	$("#rate").text(formatNumber(rate * 100) + "%");
	$("#finalAmount").text(formatMoney((amount + income).toFixed(0)));
	$("#income").text(formatMoney(income.toFixed(0)));
}
function daysBetweenDates(date1, date2) {
	// Разница в миллисекундах
	const diffInMs = Math.abs(date2 - date1);
	// Переводим миллисекунды в дни
	return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }
  
  function addMonthsToDate(date, months) {
	const result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
  }
  
//код выбора ставки
function checkRate(term) {
	switch (term) {
		case 3:
			return 0.145;
		default:
			return 0.17;
	}
}
//код для вывода ставки
function formatNumber(n) {
	return n % 1 === 0 ? n.toString() : n.toFixed(1).toString();
}
// код для вывода суммы с пробелами
function formatMoney(amount) {
	return amount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// код формата вывода месяцев
function formatMonth(number) {
	var cases = [2, 0, 1, 1, 1, 2];
	var titles = ["месяц", "месяца", "месяцев"];
	return titles[
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	];
}
// ползунок суммы
$(function () {
	// вывод суммы с пробелами
	function formatMoney(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	$("#autoCost").slider({
		range: "min",
		value: 5000,
		min: 5000, //минимальная сумма взноса
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
		} else {
			value = value < 5000 ? 5000 : 5000000;
			$(this).val(formatMoney(value) + " руб.");
			$("#autoCost").slider("value", value);
			calculate();
		}
	});

	$("#term").change(calculate);
	calculate();
});

// ползунок срока
$(function () {
	$("#autoTerm").slider({
		range: "min",
		value: 3,
		min: 3, //минимальный срок
		max: 24,
		step: 1,

		slide: function (event, ui) {
			$("#term_val").val(ui.value + " " + formatMonth(ui.value)); // Обновление поля ввода при изменении ползунка
			calculate();
		},
	});

	$("#term_val").change(function () {
		var value = $(this).val().replace(/\D/g, ""); // Удаление нечисловых символов
		value = parseInt(value, 10); // Преобразование строки в число
		if (value >= 3 && value <= 24) {
			$("#autoTerm").slider("value", value); // Обновление ползунка при изменении поля ввода
			$(this).val(value + " " + formatMonth(value));
			calculate();
		} else {
			value = value < 3 ? 3 : 24;
			$("#autoTerm").slider("value", value);
			$(this).val(value + " " + formatMonth(value));
			calculate();
		}
	});
});
