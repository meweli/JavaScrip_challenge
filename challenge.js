import readline from 'readline'; // https://nodejs.org/api/readline.html

let students = [{
  age: 32,
  examScores: [],
  gender: 'male',
  name: 'edu'
},
{
  age: 29,
  examScores: [],
  gender: 'female',
  name: 'silvia'
}]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

function getUserNumber(rl) {
  console.log(`
------------------------------------------------------------------------------------
1- Mostrar en formato de tabla todos los alumnos.
2- Mostrar por consola la cantidad de alumnos que hay en clase.
3- Mostrar por consola todos los nombres de los alumnos.
4- Eliminar el último alumno de la clase.
5- Eliminar un alumno aleatoriamente de la clase.
6- Mostrar por consola todos los datos de los alumnos que son chicas.
7- Mostrar por consola el número de chicos y chicas que hay en la clase.
8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.
9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
10- Añadir un alumno nuevo con los siguientes datos:
    - nombre aleatorio.
    - edad aleatoria entre 20 y 50 años.
    . género aleatorio.
    . listado de calificaciones vacío.
11- Mostrar por consola el nombre de la persona más joven de la clase.
12- Mostrar por consola la edad media de todos los alumnos de la clase.
13- Mostrar por consola la edad media de las chicas de la clase.
14- Añadir nueva nota a los alumnos. 
15- Ordenar el array de alumnos alfabéticamente según su nombre.
Qualifier otro numero- se termina la ejecución.1
------------------------------------------------------------------------------------
`)
  return new Promise((resolve, reject) => {
    rl.question('Introduzca el número: ', function(num) {
      rl.pause();
      const parsedNumber = parseInt(num)
      resolve(parsedNumber);
    })
  });
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getFemaleStudents (students) {
  let femaleStudents = students.filter(obj => obj.gender ===
    "female");
  return femaleStudents
}
function getMaleStudents (students) {
  let maleStudents = students.filter(obj => obj.gender ===
    "male");
  return maleStudents
}
function allFemales(students, females, males) {
  if (females.length === students.length) {
    return true
  } else {
    return false
  }
}
function getRandomName(gender, femalenames, malenames) {
  if (gender === "female") {
    return femalenames [Math.floor(Math.random()*femalenames.length)];
  } else if (gender === "male") {
    return malenames [Math.floor(Math.random()*malenames.length)];
  }
} 
function roundedToFixed(input, digits){
  var rounded = Math.pow(10, digits);
  return parseFloat((Math.round(input * rounded) / rounded).toFixed(digits));
}

let stop = false;

while (! stop ) {
  let usernum = await getUserNumber(rl);
  if (usernum <= 0 || usernum > 15) {
    stop = true
  }
  switch(usernum) {
    case 1: 
      console.table(students);
      break
    case 2:
      console.log(students.length);
      break
    case 3:
      let studentsNames = students.map(function(item) {
        return item["name"]
      });
      console.log(studentsNames)
      break
    case 4:
      let _ = students.splice(-1, 1)
      break
    case 5:
      const randomItem = students => students.splice((Math.random() * students.length) | 1, 6);
      break
    case 6:
      console.log(getFemaleStudents(students))
      break
    case 7:
      console.log("females: " + getFemaleStudents(students).length, "males: " + getMaleStudents(students).length)
      break
    case 8:
      console.log(allFemales(students, getFemaleStudents(students), getMaleStudents(students)))
      break
    case 9:
      let ageRange = {
        lower: 20,
        upper: 25
      }
      let filteredAge = students.filter(function (students) {
        return students.age >= this.lower && students.age <= this.upper;
      }, ageRange)
      
      console.log(filteredAge)
      break
    case 10:
      let RandomGender = availableGenders [Math.floor(Math.random()*availableGenders.length)];
      const min = parseInt(20)
      const max = parseInt(50)
      const RandomAge = Math.floor(Math.random() * (max - min + 1)) + min;
      let RandomStudent = {age: RandomAge, examScores: [], gender: RandomGender, name: getRandomName(RandomGender, availableFemaleNames, availableMaleNames) };
      students.push(RandomStudent)
      break
    case 11:
      function getYoungestAge(data) {
        return data.reduce((min, p) => p.age < min.age ? p : min, data[0])
      }
      const youngest = getYoungestAge(students) 
      console.log(youngest.name);
      break
    case 12:
      let getAverageAge = students => {
        let reducer = (total, currentValue) => total + currentValue;
        let sum = students.reduce(reducer)
        return sum / students.length;
      }
      let ages = students.map(students => students.age);
      console.log(getAverageAge(ages));
      break
    case 13:
      let femaleStudents = students.filter(obj => obj.gender ===
        "female");
      let getAverageAgeFem = femaleStudents => {
        let reducer = (total, currentValue) => total + currentValue;
        let sum = femaleStudents.reduce(reducer)
        return sum / students.length;
      }
  
      let agesfem = femaleStudents.map(femaleStudents => femaleStudents.age);
      console.log(getAverageAgeFem(agesfem));
      break
    case 14:
      for(let student of students) student.examScores.push(roundedToFixed(Math.random()*10, 1)); 
      break
    case 15:
      students.sort(function(a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });  
      break
  }
}




