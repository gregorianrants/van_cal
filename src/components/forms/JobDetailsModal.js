import Modal from "./Modal";
import {Card,
    CardContent,
    CardHeader,
    Typography,

IconButton} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontSize: 14,
        fontWeight: "bold",
        fontVariant: 'small-caps',
        color: '#324191'
    },
    group: {
        marginBottom: '0.5em'
    },
    content:{
      paddingTop: 0
    }
})


export default function JobDetailsModal({displayEvent}){
    const classes = useStyles()

    const {summary,location,start,end,description} = displayEvent
    return(
        <Modal
        open={true}
        >
            <Card style={{width: 300}}>
                <CardHeader
                    title={summary}
                    action={
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    }
                />
                <CardContent className={classes.content}>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            location
                        </Typography>
                        <Typography variant='body2'>
                            {location}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            start
                        </Typography>
                        <Typography variant='body1'>
                            {start.toLocaleString()}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            end
                        </Typography>
                        <Typography variant='body1'>
                            {end.toLocaleString()}
                        </Typography>
                    </div>
                    <div className={classes.group}>
                        <Typography className={classes.title}>
                            description
                        </Typography>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                    </div>




                    <Typography>

                    </Typography>


                </CardContent>
            </Card>

        </Modal>
    )

}