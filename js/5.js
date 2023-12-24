const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const element = document.getElementById("nizButton");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Ваша оценка 2", 0),
	new Result("Ваша оценка 3", 3),
	new Result("Ваша оценка 4", 4),
	new Result("Ваша оценка 5", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("Сколько будет занимать второй элемент articel, если в CSS мы добавим правило article:nth-of-type(3){ flex: 2;}?", 
	[
		new Answer("2/4 свободного места", 0),
		new Answer("1/4 свободного места", 1),
		new Answer("3/4 свободного места", 0)
	]),

	new Question("Какие значения по умолчанию заданы для flex элементов?", 
	[
		new Answer("Равные размеры по ширине и высоте", 1),
		new Answer("Разные размеры по ширине и высоте", 0),
		new Answer("Нет значений по умолчанию", 0)
	]),

	new Question("Что произойдет с третьим элементом article, если добавить следующие правила CSS? article{flex: 1 200px;} article:nth-of-type(3){flex: 2 200px;}", 
	[
		new Answer("Он займет в два раза больше доступной ширины, чем другие элементы, и будет иметь минимальный размер 200px.", 1),
		new Answer("Он займет в три раза больше доступной ширины, чем другие элементы, и будет иметь минимальный размер 200px.", 0),
		new Answer("Он не изменится и будет занимать такое же пространство, как и другие элементы, и будет иметь минимальный размер 200px.", 0)
	]),

	new Question("Какая особенность flexbox делает его гибким и отзывчивым?", 
	[
		new Answer("Возможность изменять размер окна браузера", 0),
		new Answer("Возможность добавлять новые элементы article.", 0),
		new Answer("Возможность контролировать пропорции занимаемого пространства flex элементами.", 1)
	]),

	new Question("Какое значение display можно использовать для расстановки inline элементов как flex блоков?", 
	[
		new Answer("display: flex", 0),
		new Answer("display: inline-flex", 1),
		new Answer("display: inline-block", 0)
	]),

	new Question("Сколько будет занимать третий элемент articel, если в CSS мы добавим правило article:nth-of-type(3){ flex: 2;}?", 
	[
		new Answer("2/4 свободного места", 1),
		new Answer("1/4 свободного места", 0),
		new Answer("3/4 свободного места", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);


//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let label = document.createElement("label");
          
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "answer";
            input.className = "button";
            input.value = i;
          
            let span = document.createElement("span");
          
            let p = document.createElement("p");
            p.innerHTML = quiz.questions[quiz.current].answers[i].text;
          
            label.appendChild(input);
            label.appendChild(span);
            label.appendChild(p);
          
            buttonsElem.appendChild(label);
            buttonsElem.appendChild(document.createElement("br"));
			if(quiz.current == '5'){
				const html2Code = `<input type="button" value="Завершить" class="button_next" onclick="Next()">`;
				const buttonFinal = document.getElementById("nizButton");
				buttonFinal.innerHTML = html2Code;
			}
          }
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = "Вопрос " + (quiz.current + 1) + " из " + quiz.questions.length;
	}
	else
	{
        // let div_res = document.createElement("div");
        // div_res.className = "result_block";
        // let h1 = document.createElement("h1");
        // const outputElemH1 = document.getElementById("output");
		//Если это конец, то выводим результат
        function openModal() {
            const modal = document.getElementById("modal");
            modal.style.display = "flex";
        }

        // Function to close the modal window


        // Update function to check if it's the 6th question and open the modal window

		if (quiz.current == '6') {
			openModal();
		} else {
			// Rest of the update logic
			// ...
		}



        const htmlCode = `
        <div class="result_block result_block_remove">
          <h1>Тест на тему: <br>
            “Гибкое изменение размеров flex элементов”</h1>
			<p>`+ "<span>Итоги:</span>" + quiz.score + " из 6" + `</p>
            `+"<p>" + quiz.results[quiz.result].text + "</p>"+`
          <div class="inputs_of_results">
            <input type="submit" value="Другие тесты" onclick="document.location='/tests.html'">
            <input type="submit" value="Следующий урок" onclick="document.location='../lesson/lesson6.html'">
          </div>
        </div>
      `;
        const outputElem = document.getElementById("output");

		
        outputElem.innerHTML = htmlCode;
		buttonsElem.innerHTML = "";
        element.innerHTML = "";
        element.remove();
		headElem.innerHTML = quiz.results[quiz.result].text;
	}
}

function Next()
{
	//Получаем выбранный ответ
	let selectedAnswer = document.querySelector('input[name="answer"]:checked');
	if (selectedAnswer) {
		let index = parseInt(selectedAnswer.value);
		let correct = quiz.Click(index);

		//Находим все кнопки
		let btns = document.getElementsByClassName("button");

		//Делаем кнопки серыми
		for(let i = 0; i < btns.length; i++)
		{
			btns[i].className = "button button_passive";
		}

		//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
		if(quiz.type == 1)
		{
			if(correct >= 0)
			{
				btns[correct].className = "button button_correct";
			}

			if(index != correct) 
			{
				btns[index].className = "button button_wrong";
			} 
		}
		else
		{
			//Иначе просто подсвечиваем зелёным ответ пользователя
			btns[index].className = "button button_correct";
		}

		//Ждём секунду и обновляем тест
		setTimeout(Update, 100);
	}
}
function closeModal() {
	const modal = document.getElementById("modal");
	modal.style.display = "none";
}
window.addEventListener("click", function(event) {
            const modal = document.getElementById("modal");
            if (event.target == modal) {
                closeModal();
            }
		})