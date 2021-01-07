import tmi from 'tmi.js'
import { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN, BLOCKED_WORDS } from './constants';

const options = {
    options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options);

client.connect();


client.on('message', (channel, userstate, message, self) => {
    if(self) return;

    if(userstate.username === BOT_USERNAME) return;

	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
    }
    
    checkTwitchChat(userstate, message, channel);
});

function checkTwitchChat(userstate, message, channel)
{
    message = message.toLowerCase()
    let shouldSendMessage = false
    // checks message 

    shouldSendMessage = BLOCKED_WORDS.some(blockedWord=> message.includes(blockedWord.toLowerCase()))

    if(shouldSendMessage) 
    {
    // tell user
    client.say(channel,`@${userstate.username}, sorry your message was deleted!`)

    // delete message
    client.deletemessage(channel, userstate.id)
    }


}