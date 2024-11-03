import './App.css';
import { useState } from 'react';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [choosenMonth, setChoosenMonth] = useState(currentDate.toLocaleString('ru', { month: 'long', year: 'numeric' }));
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate()); // Состояние для выбранного дня

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setChoosenMonth(newDate.toLocaleString('ru', { month: 'long', year: 'numeric' }));
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setChoosenMonth(newDate.toLocaleString('ru', { month: 'long', year: 'numeric' }));
  };

  const getDaysInMonth = (month) => { // тут количество дней в месяце в соответствии с месяцем отображается
      return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];

  };

  const getFirstDayOfWeek = (month, year) => {
    return (new Date(year, month, 1).getDay() + 6) % 7; // Сдвиг на 1 день назад
  };

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']; //  Дни недели на  русском  языке 

  const handleDayClick = (day) => { //  функция для выбора дня при нажатии по нему, чтоб отображалась в левой части
    setSelectedDay(day); 
  };

  return (
    <div className="App">
      <div className="main">
        <div className="today">
          <p className='day'>{daysOfWeek[(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).getDay() + 6) % 7]}</p>
          <p className='number'>{selectedDay}</p>
        </div>
        <div className="alldays">
          <div className="scroll">
            <div className="previous" onClick={handlePreviousMonth}>Предыдущий</div>
            <p className='choosenMonth'>{choosenMonth}</p>
            <div className="next" onClick={handleNextMonth}>Следующий</div>
          </div>
          <div className="dates">
            {daysOfWeek.map((day, index) => ( // дни недели в верхней части календаря
              <div key={index} className="dayOfWeek">{day}</div>
            ))}
            {Array(getFirstDayOfWeek(currentDate.getMonth(), currentDate.getFullYear())).fill(null).map((_, index) => (
              <div key={`empty-${index}`} className="empty"></div> // пустые дни в начале первой недели месяца
            ))}
            {Array(getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear())).fill(null).map((_, index) => {
              const day = index + 1;
              return (
                <div 
                  key={day} 
                  className={`day ${selectedDay === day ? 'selected' : ''}`} // для выделения  выбранного дня
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;