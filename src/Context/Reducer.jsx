
export const reducerData = {
    masterKey: null,
    userLogin: false,
    userName: "",
    messages: {},
    contacts: [],
    userOnline: false
}
/*

messages:{
    user_1:[
        {me:"msg"},
        {user_1"msg"}
    ],
    user_2:[
        {me:"msg"},
        {user_2:"msg"}
    ]
}


 */

export const updateReducer = (state, action) => {
    switch (action.type) {
        case "update_login":
            return {
                ...state,
                userLogin: action.userLogin
            }

        case "update_userName":
            return {
                ...state,
                userName: action.userName
            }

        case "update_contacts":

            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.newContact
                ]
            }

        case "update_masterKey":
            return {
                ...state,
                masterKey: action.masterKey
            }


        case "update_messages":
            let userName = action.newMessage.userName;
            let senderName = action.newMessage.senderName;//'me' or 'username!==state.username'
            let userMessage = action.newMessage.senderMessage

            if (userName === state.userName) {
                return{
                    ...state
                }
            }
            
            if (state.messages[userName]) {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        [userName]: [
                            ...state.messages[userName],
                            { [senderName]: userMessage }
                        ]
                    }
                }
            } else {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        [userName]: [
                            { [senderName]: userMessage }
                        ]
                    }
                }
            }

        case "full_update":
            return {
                ...state,
                ...action.allData
            }

        default:
            return state;
    }
}

