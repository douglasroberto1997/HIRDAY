import dayjs from "dayjs"
import {openingHours} from "../../utils/opening-hours.js"
import { HoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({date,dailySchedules }) {

    //limpa a lista de horarios

    hours.innerHTML = ""

    //obtem a lista  de horarios ocupados
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))
    
    const opening = openingHours .map((hour) => {
        
        //recupera somente a hora
        const [scheduleHour] = hour.split (":")

        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

        const available = !unavailableHours.includes(hour) && !isHourPast

       return {
            hour,
            available
       }
    })

    //renderizar os horarios
    opening.forEach(({ hour, available}) =>{
        const li = document.createElement("li")

        li.classList.add("hour")
        li.classList.add(available ? "hour-available" : "hour-unavailable")
    
        li.textContent = hour

        if (hour ==="9:00") {
                hourHeaderAdd("Manhã")
            } else if (hour ==="13:00") {
                hourHeaderAdd("Tarde")
            } else if (hour ==="18:00") {
              hourHeaderAdd("Noite")
        }


        hours.append(li)
})
    //adiciona o evento de clique no horarios disponiveis 
    HoursClick()
}

function hourHeaderAdd(title) {
const header = document.createElement("li")
header.classList.add("hour-period")
header.textContent = title
hours. append(header)
}