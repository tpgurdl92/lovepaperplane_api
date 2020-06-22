export const MESSAGE_FRAGMENT=`
    fragment MessagePart on Message{
        id
        type
        to{
            id
            username
        }
        from{
            id
            username
        }
        data
        room{
            id
        }
        createdAt
    }
`