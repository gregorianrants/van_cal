export function reshape(gcalEvent){
    const {start,end} = gcalEvent
    return{
        ...gcalEvent,
        start: new Date(start.dateTime),
        end: new Date(end.dateTime),
        type: 'gcalEvent'
    }
}