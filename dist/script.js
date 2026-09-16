const topics = [
  {id:'add',name:'Сложение и вычитание',icon:'＋',subtitle:'Считаем уверенно'},
  {id:'multiply',name:'Умножение и деление',icon:'×',subtitle:'Находим связи'},
  {id:'problems',name:'Задачи из жизни',icon:'□',subtitle:'Думаем по шагам'},
  {id:'fractions',name:'Доли и дроби',icon:'½',subtitle:'Части целого'}
];
const $ = id => document.getElementById(id);
const rnd = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const pick = values => values[rnd(0,values.length-1)];
const key = 'math-steps-progress-v1';
let progress = {};
try { progress = JSON.parse(localStorage.getItem(key)||'{}')||{}; } catch {}
let grade=3, topic='add', question, answered=false, hintShown=false, solutionShown=false;
const progressKey = () => `${grade}-${topic}`;
const solved = () => Number(progress[progressKey()]||0);
const level = () => Math.min(4,Math.floor(solved()/3)+1);
const total = () => topics.reduce((sum,t)=>sum+Number(progress[`${grade}-${t.id}`]||0),0);
const make = (text,answer,hint,steps) => ({text,answer,hint,steps,result:`Ответ: ${answer}.`});

function addition(l) {
  const big=grade===4;
  if(l===1){
    const a=rnd(big?120:21,big?480:68), b=rnd(big?20:11,big?80:29), t=Math.floor(b/10)*10, u=b%10;
    return make(`${a} + ${b} = ?`,a+b,'Разложи второе число на десятки и единицы.',[`${b} = ${t} + ${u}.`,`${a} + ${t} = ${a+t}.`,`${a+t} + ${u} = ${a+b}.`]);
  }
  if(l===2){
    const a=rnd(big?230:50,big?760:94), b=rnd(big?35:16,big?88:49), t=Math.floor(b/10)*10, u=b%10;
    return make(`${a} − ${b} = ?`,a-b,'Вычитай по частям: сначала десятки, затем единицы.',[`${b} = ${t} + ${u}.`,`${a} − ${t} = ${a-t}.`,`${a-t} − ${u} = ${a-b}.`]);
  }
  if(l===3){
    const a=rnd(big?430:120,big?890:460), b=rnd(big?130:42,big?270:189), h=Math.floor(b/100)*100, t=Math.floor(b%100/10)*10, u=b%10;
    return make(`${a} + ${b} = ?`,a+b,'Разложи второе число на сотни, десятки и единицы.',[`${b} = ${h} + ${t} + ${u}.`,`${a} + ${h} = ${a+h}.`,`${a+h} + ${t} = ${a+h+t}.`,`${a+h+t} + ${u} = ${a+b}.`]);
  }
  const a=rnd(big?250:75,big?680:190), b=rnd(big?110:24,big?290:78), c=rnd(big?40:15,big?100:49);
  return make(`${a} + ${b} − ${c} = ?`,a+b-c,'В выражении без скобок считай слева направо.',[`Сначала сложи: ${a} + ${b} = ${a+b}.`,`Затем вычти: ${a+b} − ${c} = ${a+b-c}.`]);
}
function multiplication(l) {
  const big=grade===4;
  if(l===1&&!big){
    const a=rnd(3,9),b=rnd(3,9);
    return make(`${a} × ${b} = ?`,a*b,`Сложи ${a} число ${b} раз.`,[`Умножение здесь означает ${b} одинаковых слагаемых по ${a}.`,`${Array(b).fill(a).join(' + ')} = ${a*b}.`]);
  }
  if(l===1||l===2&&big||l===3&&!big){
    const a=rnd(l===2?112:12,l===2?320:39),b=rnd(2,4),h=Math.floor(a/100)*100,t=Math.floor(a%100/10)*10,u=a%10;
    const parts=[h,t,u].filter(x=>x>0);
    return make(`${a} × ${b} = ?`,a*b,'Умножь отдельно сотни, десятки и единицы.',[`${a} = ${parts.join(' + ')}.`,...parts.map(x=>`${x} × ${b} = ${x*b}.`),`${parts.map(x=>x*b).join(' + ')} = ${a*b}.`]);
  }
  if(l===2&&!big||l===3&&big){
    const d=big?pick([3,4,5,6,8]):rnd(3,9),q=big?rnd(14,39):rnd(3,9),n=d*q;
    return make(`${n} : ${d} = ?`,q,'Подбери частное и проверь умножением.',[`Ищем число, которое при умножении на ${d} даёт ${n}.`,`${d} × ${q} = ${n}.`,`Значит, ${n} : ${d} = ${q}.`]);
  }
  if(!big){
    const a=rnd(4,9),b=rnd(3,8),c=rnd(2,8);
    return make(`${a} × ${b} + ${c} = ?`,a*b+c,'Сначала умножение, затем сложение.',[`${a} × ${b} = ${a*b}.`,`${a*b} + ${c} = ${a*b+c}.`]);
  }
  const a=rnd(12,34),b=rnd(11,19),t=Math.floor(b/10)*10,u=b%10;
  return make(`${a} × ${b} = ?`,a*b,'Разложи второй множитель на десятки и единицы.',[`${b} = ${t} + ${u}.`,`${a} × ${t} = ${a*t}; ${a} × ${u} = ${a*u}.`,`${a*t} + ${a*u} = ${a*b}.`]);
}
function problem(l) {
  const k=grade===4?2:1;
  if(l===1){
    const a=rnd(14,39)*k,b=rnd(8,25)*k;
    return make(`У Лены было ${a} наклеек. Ей подарили ещё ${b}. Сколько наклеек стало у Лены?`,a+b,'Когда предметов становится больше, их складывают.',[`Было ${a} наклеек, добавили ${b}.`,`${a} + ${b} = ${a+b} наклеек.`]);
  }
  if(l===2){
    const a=rnd(38,75)*k,b=rnd(12,33)*k;
    return make(`В библиотеке было ${a} книг. ${b} книг взяли читать. Сколько книг осталось?`,a-b,'Когда часть забрали, её вычитают.',[`Было ${a} книг, взяли ${b}.`,`${a} − ${b} = ${a-b} книг.`]);
  }
  if(l===3){
    const boxes=rnd(3,grade===4?9:7), each=rnd(grade===4?12:4,grade===4?24:9);
    return make(`В ${boxes} коробках лежит по ${each} карандашей. Сколько карандашей во всех коробках?`,boxes*each,'Одинаковые группы удобно считать умножением.',[`Есть ${boxes} коробок по ${each} карандашей.`,`${boxes} × ${each} = ${boxes*each} карандашей.`]);
  }
  const boxes=rnd(3,grade===4?8:6),each=rnd(grade===4?12:5,grade===4?22:9),extra=pick(grade===4?[15,20,25,30,35,40,45]:[5,10,15]);
  return make(`Для праздника купили ${boxes} упаковок по ${each} шаров и ещё ${extra} шара. Сколько шаров купили всего?`,boxes*each+extra,'Сначала посчитай шары в упаковках, затем добавь остальные.',[`В упаковках: ${boxes} × ${each} = ${boxes*each} шаров.`,`Всего: ${boxes*each} + ${extra} = ${boxes*each+extra} шаров.`]);
}
function fraction(l) {
  const k=grade===4?2:1;
  if(l<3){
    const d=l===1?pick([2,4]):pick([3,4,5]),part=rnd(3,9)*k,whole=d*part;
    return make(`Чему равна 1/${d} от числа ${whole}?`,part,`Раздели ${whole} на ${d} равных частей.`,[`Одна доля — это одна из ${d} равных частей.`,`${whole} : ${d} = ${part}.`]);
  }
  const d=l===3?pick([3,4,5]):pick([4,5,6]),n=rnd(l===3?2:1,d-(l===3?1:2)),part=rnd(4,9)*k,whole=d*part,used=n*part;
  if(l===3) return make(`Чему равны ${n}/${d} от числа ${whole}?`,used,`Сначала найди 1/${d}, затем возьми ${n} такие части.`,[`Одна доля: ${whole} : ${d} = ${part}.`,`${n} доли: ${part} × ${n} = ${used}.`]);
  return make(`От ленты длиной ${whole} см отрезали ${n}/${d}. Сколько сантиметров ленты осталось?`,whole-used,'Найди длину отрезанной части, затем вычти её из всей длины.',[`Одна доля: ${whole} : ${d} = ${part} см.`,`Отрезали: ${part} × ${n} = ${used} см.`,`Осталось: ${whole} − ${used} = ${whole-used} см.`]);
}
const generate = () => ({add:addition,multiply:multiplication,problems:problem,fractions:fraction})[topic](level());
function renderTopics(){
  const list=$('topic-list');list.replaceChildren();
  for(const item of topics){
    const button=document.createElement('button');button.type='button';button.className='topic-button'+(item.id===topic?' active':'');
    button.setAttribute('aria-current',String(item.id===topic));
    button.innerHTML=`<span class="topic-icon" aria-hidden="true">${item.icon}</span><span class="topic-meta"><span>${item.name}</span><small>${item.subtitle}</small></span>`;
    button.addEventListener('click',()=>chooseTopic(item.id));list.append(button);
  }
}
function renderProgress(){
  $('solved-count').textContent=total();
  $('topic-label').textContent=topics.find(t=>t.id===topic).name;
  $('level-label').textContent=`Уровень ${level()} из 4`;
  $('level-track').innerHTML=Array.from({length:4},(_,i)=>`<span class="${i<level()?'filled':''}"></span>`).join('');
  $('level-track').setAttribute('aria-label',`Уровень ${level()} из 4`);
}
function nextQuestion(){
  let next=generate();for(let i=0;i<5&&question&&next.text===question.text;i++)next=generate();
  question=next;answered=false;hintShown=false;solutionShown=false;
  $('exercise-title').textContent='Попробуй решить';$('exercise-text').textContent=question.text;
  $('answer-input').value='';$('answer-input').disabled=false;$('answer-form').querySelector('button').disabled=false;
  $('feedback').hidden=true;$('explanation').hidden=true;$('next-button').hidden=true;
  $('hint-button').textContent='Показать подсказку';$('hint-button').disabled=false;renderProgress();
}
function chooseTopic(id){topic=id;renderTopics();nextQuestion();}
function chooseGrade(value){
  grade=value;document.querySelectorAll('.grade-button').forEach(button=>{const on=Number(button.dataset.grade)===grade;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
  nextQuestion();
}
function feedback(message,kind){const box=$('feedback');box.textContent=message;box.className=`feedback ${kind}`;box.hidden=false;}
function explain(){
  const panel=$('explanation');panel.replaceChildren();
  const title=document.createElement('h3');title.textContent='Разберём по шагам';panel.append(title);
  const list=document.createElement('ol');question.steps.forEach(step=>{const li=document.createElement('li');li.textContent=step;list.append(li);});panel.append(list);
  const result=document.createElement('p');result.className='result';result.textContent=question.result;panel.append(result);panel.hidden=false;
}
function check(raw){
  if(answered||solutionShown)return {status:'closed'};
  const clean=String(raw).trim().replace(',','.');
  if(!/^-?\d+(?:\.\d+)?$/.test(clean)){feedback('Напиши ответ числом.','try');return {status:'invalid'};}
  if(Number(clean)!==question.answer){feedback('Пока не получилось. Попробуй ещё раз или открой подсказку.','try');return {status:'incorrect'};}
  answered=true;progress[progressKey()]=solved()+1;try{localStorage.setItem(key,JSON.stringify(progress));}catch{}
  feedback(solved()%3===0&&level()>1?`Верно! Открыт уровень ${level()}.`:'Верно! Отличная работа.','good');
  $('answer-input').disabled=true;$('answer-form').querySelector('button').disabled=true;$('exercise-title').textContent='Задача решена!';
  $('next-button').hidden=false;explain();renderProgress();return {status:'correct',level:level(),solved:total()};
}
function hint(){
  if(!hintShown){hintShown=true;feedback(`Подсказка: ${question.hint}`,'try');$('hint-button').textContent='Показать решение';return {status:'hint'};}
  solutionShown=true;explain();$('next-button').hidden=false;$('hint-button').textContent='Решение показано';$('hint-button').disabled=true;
  $('answer-input').disabled=true;$('answer-form').querySelector('button').disabled=true;
  return {status:'solution',answer:question.answer};
}
document.querySelectorAll('.grade-button').forEach(button=>button.addEventListener('click',()=>chooseGrade(Number(button.dataset.grade))));
$('answer-form').addEventListener('submit',event=>{event.preventDefault();check($('answer-input').value);});
$('hint-button').addEventListener('click',hint);$('skip-button').addEventListener('click',nextQuestion);$('next-button').addEventListener('click',nextQuestion);
renderTopics();nextQuestion();

if(document.modelContext?.registerTool){
  const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool)).catch(()=>{});}catch{}};
  register({name:'get_current_exercise',title:'Прочитать задание',description:'Показывает текущее задание, класс, тему и уровень.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({grade,topic,level:level(),question:question.text})});
  register({name:'choose_math_practice',title:'Выбрать тренировку',description:'Выбирает класс и тему, затем показывает новое задание.',inputSchema:{type:'object',properties:{grade:{type:'integer',enum:[3,4]},topic:{type:'string',enum:topics.map(t=>t.id)}},required:['grade','topic'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(![3,4].includes(input?.grade)||!topics.some(t=>t.id===input?.topic))throw Error('Выбери 3 или 4 класс и доступную тему.');chooseGrade(input.grade);chooseTopic(input.topic);return {grade,topic,level:level(),question:question.text};}});
  register({name:'submit_math_answer',title:'Проверить ответ',description:'Проверяет числовой ответ и показывает разбор при верном решении.',inputSchema:{type:'object',properties:{answer:{type:'number'}},required:['answer'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(typeof input?.answer!=='number'||!Number.isFinite(input.answer))throw Error('Ответ должен быть числом.');return check(input.answer);}});
}
