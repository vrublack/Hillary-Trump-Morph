var questions = {
    trade: [{q:'Should we build a wall?', t1:0, c1:8, t5:10, c5:0}, {q:'Question2?', t1:0, c1:8, t5:10, c5:0}],
    womens_rights: [{q:'Question3?', t1:0, c1:8, t5:10, c5:0}, {q:'Abortion?', t1:0, c1:8, t5:10, c5:0}]
};
var keys = Object.keys(questions);

var category_i = 0;
var question_i = 0;
var current_q = questions[keys[category_i]][question_i];

var question_text;
var category_text;
var answer_element;

var next_question = function() {

    // TODO access value of answer_element correctly
    current_q.answer = answer_element.val;

    question_i++;
    if (question_i == questions[keys[category_i]].length)
    {
        question_i = 0;
        category_i++;
        if (category_i == keys.length)
        {
            // finished
        }

        category_text = keys[category_i];
    }
    current_q = questions[keys[category_i]][question_i];
    question_text.html(current_q.q);
};

var init = function()
{
    question_text = $('#question-text');
    category_text = $('#category-text');
    answer_element = $('#answer-element');

    category_text.html(keys[category_i]);
    console.log(questions[keys[category_i]][question_i].q);
    console.log(question_text);
    question_text.html(questions[keys[category_i]][question_i].q);
};


// Calculates rating based on all the questions that were answered. The more negative = the more pro-Trump,
// the more positive = the more pro-Clinton
var calculate_score = function()
{
    var trump_sum = 0;
    var clinton_sum = 0;

    for (var key in questions)
    {
        for (var q in questions[key])
        {
            if (q.hasOwnProperty('answer'))
            {
                trump_sum += q.t1 + (q.t5 - q.t1) * q.answer / 5.0;
                clinton_sum += q.c1 + (q.c5 - q.c1) * q.answer / 5.0;
            }
        }
    }

    return clinton_sum - trump_sum;
};
