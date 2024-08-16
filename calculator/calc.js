// калькулятор
function calculate() {
	var amount = parseInt($("#deposit_val").val().replace(/\s/g, ""), 10);
	var term = parseInt($("#term_val").val(), 10);
	var rate = checkRate(getMaxLessThan(term));
	var defaultRate = 0.07;
	var date = new Date().getFullYear();
	var daysInYear = date % 4 === 0 ? 366 : 365;
	var daysInTerm;
	var daysUntilEndOfYear = getDaysUntilEndOfYear();
	var totalIncome = 0;

	switch (getMaxLessThan(term)) {
		case 3:
			daysInTerm = 90;
			break;
		case 6:
			daysInTerm = 181;
			break;
		case 12:
			daysInTerm = 367;
			break;
	}

	var daysOutTerm =
		term === getMaxLessThan(term) ? 0 : (term - getMaxLessThan(term)) * 30;
	if (daysUntilEndOfYear >= daysInTerm) {
		if($('#izhcom_card').is(':checked')){
			var income;
			for (let i = 0; i < term; i++) {
				if (getMaxLessThan(term) < i)
					rate = defaultRate;
				income =
					(amount / daysInYear) * (rate * 30);
				totalIncome = totalIncome + income;
				amount = amount + income;
				console.log(income);
			}
			income = totalIncome;
			amount = amount - income;
		}
		else {
			var income =
				(amount / daysInYear) * (rate * daysInTerm + defaultRate * daysOutTerm);
		}
		
		// ((amount * rate) / daysInYear) * daysInTerm +
		// ((amount * defaultRate) / daysInYear) * daysOutTerm;
	} else {
		var daysInNextYear = (date + 1) % 4 === 0 ? 366 : 365;
		if($('#izhcom_card').is(':checked')){
			for (let i = 0; i < term; i++) {
				income =
					amount *
					(rate *
						(daysUntilEndOfYear / daysInYear +
							(daysInTerm - daysUntilEndOfYear) / daysInNextYear) +
						(defaultRate / daysInNextYear) * daysOutTerm);
				totalIncome = totalIncome + income;
				amount = amount + income;
			}
			income = totalIncome;
		}
		else {
			var income =
			amount *
			(rate *
				(daysUntilEndOfYear / daysInYear +
					(daysInTerm - daysUntilEndOfYear) / daysInNextYear) +
				(defaultRate / daysInNextYear) * daysOutTerm);
		}
		// ((amount * rate) / daysInYear) * daysUntilEndOfYear +((amount * rate) / daysInNextYear) * (daysInTerm - daysUntilEndOfYear) + ((amount * defaultRate) / daysInNextYear) * daysOutTerm;
	}

	$("#months").text(term + " " + formatMonth(term));
	$("#rate").text(formatNumber(rate * 100) + "%");
	$("#finalAmount").text(formatMoney((amount + income).toFixed(0)));
	$("#income").text(formatMoney(income.toFixed(0)));
}

function getMaxLessThan(num) {
	const numbers = [3, 6, 12]; //сроки, для которых установлена ставка
	return Math.max(...numbers.filter((x) => x <= num));
}

function getDaysUntilEndOfYear() {
	const today = new Date(); // Текущая дата
	const endOfYear = new Date(today.getFullYear(), 11, 31); // Последний день года (31 декабря)

	// Разница в миллисекундах между текущей датой и концом года
	const differenceInTime = endOfYear - today;

	// Преобразуем миллисекунды в дни
	const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

	return differenceInDays;
}

//код выбора ставки
function checkRate(term) {
	switch (term) {
		case 6:
			return 0.16;
			break;
		default:
			return 0.145;
			break;
	}
}
//код для вывода ставки
function formatNumber(n) {
	n = parseFloat(n.toPrecision(12));
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
