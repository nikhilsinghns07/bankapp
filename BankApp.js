const account1 = {
    owner: 'Nikhil Singh',
    movements: [200000,450000,-40000,30000,-65000,-13000,700000,130000],
    interestRate: 1.2,
    pin: 1111,
    movementsDates: [
        '2021-03-19T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-01T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'en-GB', 
};
const account2 = {
    owner: 'Nikhil Kumar Singh',
    movements: [500000,34000,-15000,-79000,-32100,-10000,85000,-30000],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
};
const account3 = {
    owner: 'Rohit Sharma',
    movements: [20000,-20000,340000,-30000,-20000,50000,400000,-46000],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'IND',
      locale: 'en-IN',
};
const account4 = {
    owner: 'MS Dhoni',
    movements: [4300000,1000000,700000,500000,900000],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'IND',
      locale: 'en-IN',
};
const account5 ={
    owner: "UnknownHacker",
    movements:[1000000000000],
    interestRate: 1,
    pin: 7777,
    movementsDates: [],
    currency: 'INR',
    locale: 'en-IN', 
}
  const accounts = [account1, account2, account3, account4,account5];
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');  //label are things where we put some text.
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');    
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatCur = function(value,locale,currency) {
    return  new Intl.NumberFormat(locale,{
        style:'currency',
        currency:currency,
    }).format(value)
}

const formatMovementDate = function(date,locale){
    const calcDaysPassed = (date1,date2) => Math.round(Math.abs(date2-date1)/(1000*60*60*24))
    const daysPassed = calcDaysPassed(new Date(),date)
    console.log(daysPassed)
    if(daysPassed === 0) {
        return 'Today'
    }if(daysPassed === 1) {
        return 'Yesterday'
    }if(daysPassed <= 7){
        return `${daysPassed} days ago`
    }else{
         //const day = `${date.getDate()}`.padStart(2,'0')
         //const month = `${date.getMonth() + 1}`.padStart(2,0)
         //const year = date.getFullYear()
         //return `${day}/${month}/${year}`
         return new Intl.DateTimeFormat(locale).format(date)
    }
}

const displayMovements = function(acc,sort = false) {
    containerMovements.innerHTML = ''
    const movs = sort ? acc.movements.slice().sort((a,b)=>a-b) : acc.movements;  //sorting movements.
    movs.forEach(function (mov,i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const date = new Date(acc.movementsDates[i])
        const displayDate = formatMovementDate(date,acc.locale) 
        const formattedMov = formatCur(mov,acc.locale,acc.currency)
        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`
      containerMovements.insertAdjacentHTML('afterbegin',html)
    })
}

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCur(acc.balance,acc.locale,acc.currency)

}

const calcDisplaySummary = function(acc){
    const incomes = acc.movements.filter(mov => mov>0).reduce((acc,mov)=>acc+mov,0)
    labelSumIn.textContent = formatCur(incomes  ,acc.locale,acc.currency)
    const out = acc.movements.filter(mov => mov<0).reduce((acc,mov)=>acc+mov,0)
    labelSumOut.textContent = formatCur(Math.abs(out),acc.locale,acc.currency)
    const interest = acc.movements.filter(mov => mov >0).filter((int,i,arr)=>{
        return int >= 1;
    }).reduce((acc,int) => acc+int,0);
    labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency)
}

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
    })
}

createUsernames(accounts)
account4.username = 'MSD'
account5.username = 'uh'
const updateUI=function(acc){
    displayMovements(acc)
    calcDisplayBalance(acc)
    calcDisplaySummary(acc)
}

const startLogoutTimer = function() {
    const tick = function() {
        const min = String(Math.trunc(time/60)).padStart(2,'0')
        const sec = String(time%60).padStart(2,'0')
        labelTimer.textContent = `${min}:${sec}`;
        if(time === 0){
            clearInterval(timer);
            labelWelcome.textContent = 'Log In to get started';
            containerApp.style.opacity = 0
        }
        time--;
    }
    let time  = 300;
    tick();
    const timer = setInterval(tick,1000);
    return timer;
}

let currentAccount, timer;
btnLogin.addEventListener('click',function(e) {
    e.preventDefault();    
    //this will prevent form from submitting,as the default feature of the form button is to refresh the webpaage.
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
// question mark sign after currentAccount is optional chaining method,pin will only be read if the currentAccount provided by the user exists.
    if(currentAccount?.pin === +(inputLoginPin.value)){
        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100;
        const now = new Date()
        const options = {
            hour:'numeric',
            minute:'numeric',
            day:'numeric',
            month:'long',
        }
        //const locale = navigator.language;
        //console.log(locale)
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now)
        //Adding Dates console.log('----Lecture 173----')
        //const day = `${now.getDate()}`.padStart(2,'0')
        //const month = `${now.getMonth() + 1}`.padStart(2,0)
        //const year = now.getFullYear()
        //const hour = now.getHours()
        //const min = now.getMinutes()
        //labelDate.textContent = `${day}/${month}/${year}  ${hour}:${min}`
        inputLoginUsername.value = inputLoginPin.value = ''
        inputLoginPin.blur();
        if(timer) {
            clearInterval(timer)
        }
        timer = startLogoutTimer();
        updateUI(currentAccount)
    }
})

btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value)
    const rAccount = accounts.find(acc => acc.username === inputTransferTo.value)
    inputTransferAmount.value = inputTransferTo.value = '';
    if(amount > 0 && rAccount && currentAccount.balance >= amount && rAccount?.username !== currentAccount.username){
        currentAccount.movements.push(-amount);
        rAccount.movements.push(amount)
        //add transfer date
        currentAccount.movementsDates.push(new Date().toISOString)
        rAccount.movementsDates.push(new Date().toISOString) 
        updateUI(currentAccount)
        clearInterval(timer);
        timer = startLogoutTimer();
    }
})

btnLoan.addEventListener('click',function(e) {
    e.preventDefault();
    const amount = Math.floor(Number(inputLoanAmount.value))
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount*0.1 )) {
        setTimeout(function(){
            currentAccount.movements.push(amount); //add movement
            currentAccount.movementsDates.push(new Date().toISOString) // add date to loan
            updateUI(currentAccount);
        },3000)
    }
    inputLoanAmount.value = '';
    clearInterval(timer);
    timer = startLogoutTimer();
})

btnClose.addEventListener('click',function(e) {
    e.preventDefault()
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        accounts.splice(index, 1);
        containerApp.style.opacity = 0;
    }else {
        alert('Credentials incorrect!')
    }
    inputCloseUsername.value = inputClosePin.value ='';
})

//initializing sorting button  // lecture 161 
// sort button sorts all transactions in Ascending order and when we click it again it sorts to the original array of transcations.
let sorted = false
btnSort.addEventListener('click',function(e) {
    e.preventDefault();
    displayMovements(acc)
    sorted = !sorted;
})

//section 11
console.log(23 === 23.0)
//Base 10 - 0 to 9
//Binary base 2-0 1
console.log(0.1 + 0.2)

//Remainder Operator
console.log('----Lecture 170----')
labelBalance.addEventListener('click',function() {
    [...document.querySelectorAll('.movements__row')].forEach(function(row,i) {
        if(i % 2 === 0)row.style.backgroundColor = 'orange'
    })
})

// Fake always login
//currentAccount = account1
//updateUI(currentAccount)
//containerApp.style.opacity = 100;
//Adding Dates console.log('----Lecture 173----')
//const now = new Date()
//const day = `${now.getDate()}`.padStart(2,'0')
//const month = `${now.getMonth() + 1}`.padStart(2,'0')
//const year = now.getFullYear()
//const hour = `${now.getHours()}`.padStart(2,'0')
//const min = `${now.getMinutes()}`.padStart(2,'0')
//labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`
