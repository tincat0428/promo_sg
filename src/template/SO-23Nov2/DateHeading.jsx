import { datePad } from '../../service/util';

const DateHeading = ({ dateData }) => {
    const { startDate } = dateData.startGroup[0]
    const { endDate } = dateData.endGroup[dateData.endGroup.length - 1]

    const timeForm = (timeStr) => {
        const date = new Date(timeStr);
        return `${date.getMonth() + 1}/${date.getDate()} ${datePad(date.getHours())}:${datePad(date.getMinutes())}`
    }

    if (!dateData) return null

    return (
        <h3 className="event-period">
            <strong>
                {timeForm(startDate)} - {timeForm(endDate)}
            </strong>&nbsp;
            <span className="gmt">[GMT + 8]</span>
        </h3>
    )
}

export default DateHeading
