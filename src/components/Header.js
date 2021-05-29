import {Toolbar,Typography,Button} from "@material-ui/core";
import {ArrowBack,ArrowForward} from "@material-ui/icons";

import {monthAndYear} from "../utilities/dateUtilities.js"






export default function Header({currentDate,
                                   incrementWeek,
                               decrementWeek,
                               handleShowModal}){
    return (
        <Toolbar>
            <Button
                onClick={decrementWeek}
            ><ArrowBack /></Button>
            <Typography variant='h4'>{monthAndYear(currentDate)}</Typography>

            <Button
            onClick={incrementWeek}

            ><ArrowForward /></Button>

            <Button onClick={handleShowModal} variant='contained' color='primary'>new job</Button>
        </Toolbar>
    )
};