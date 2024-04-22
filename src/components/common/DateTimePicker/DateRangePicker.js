import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ onDateRangeChange, setDatePickerEmptyOrNot }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // const handleDateChange = (dates) => {
    //     const [start, end] = dates;
    //     setStartDate(start);
    //     setEndDate(end);
    //     if (onDateRangeChange) {
    //         onDateRangeChange(start, end);
    //     }
    // };

    function handleDateChange (dates)  {

        console.log("Datessss",dates);
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (!start || !end) {
            setDatePickerEmptyOrNot(true);
        } else {
            setDatePickerEmptyOrNot(false);
        }
        if (onDateRangeChange) {
            onDateRangeChange(start, end);
        }
    };

    //this function to clear the input field.
    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
        handleDateChange([0,0]);
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                startDatePlaceholderText="Start Date"
                endDatePlaceholderText="End Date"
            />
            <button className='btn' onClick={clearDates}>Reset</button>
        </div>
    );
}

export default DateRangePicker;
