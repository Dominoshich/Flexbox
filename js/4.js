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
	new Question("Какое свойство в CSS позволяет элементам flexbox переноситься на следующую строку, чтобы избежать переполнения контейнера?", 
	[
		new Answer("flex-flow: row wrap;", 0),
		new Answer("flex-direction: row-reverse;", 0),
		new Answer("flex-wrap: wrap;", 1)
	]),

	new Question("Какое свойство в CSS задает ширину каждого блока внутри flexbox контейнера?", 
	[
		new Answer("flex: 200px", 1),
		new Answer("flex-wrap: wrap;", 0),
		new Answer("flex-direction: row-reverse", 0)
	]),

	new Question("Какое свойство в CSS позволяет изменить направление расположения элементов flexbox контейнера на обратное?", 
	[
		new Answer("flex-direction: row-reverse;", 1),
		new Answer("flex-flow: row wrap;", 0),
		new Answer("flex-wrap: wrap;", 0)
	]),

	new Question("Какое свойство в CSS является сокращением для комбинации flex-direction и flex-wrap?", 
	[
		new Answer("flex-wrap: row wrap;", 0),
		new Answer("flex: row wrap;", 0),
		new Answer("flex-flow: row wrap;", 1)
	]),

	new Question("Что делатся с детями-блоками когда они не помещаются если есть CSS-правило flex-wrap: wrap;?", 
	[
		new Answer("Переносятся на новую строку", 1),
		new Answer("Выбиваются из своего родителя-контейнера", 0),
		new Answer("Сплющиваются", 0)
	]),

	new Question("На какое свойство нужно изменить flex-direction, чтобы макет начинался не в обратном порядке ?", 
	[
		new Answer("flex-direction: row;", 1),
		new Answer("flex-direction: row-reverse;", 0),
		new Answer("flex-direction: column;", 0)
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
            “Перенос строк”</h1>
			<p>`+ "<span>Итоги:</span>" + quiz.score + " из 6" + `</p>
            `+"<p>" + quiz.results[quiz.result].text + "</p>"+`
          <div class="inputs_of_results">
            <input type="submit" value="Другие тесты" onclick="document.location='/tests.html'">
            <input type="submit" value="Следующий урок" onclick="document.location='../lesson/lesson5.html'">
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