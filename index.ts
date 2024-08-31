
import { ActivityType, GatewayIntentBits } from "discord.js";
import login, { client } from "strife.js";
import { fileURLToPath } from "url";

await login({
	modulesDirectory: fileURLToPath(new URL("./modules", import.meta.url)),
	defaultCommandAccess: true,
	async handleError(error, event) {
		console.log(error, event)
	},
	clientOptions: {
		intents:
			GatewayIntentBits.Guilds |
			GatewayIntentBits.GuildMembers// |
			// GatewayIntentBits.GuildModeration |
			// GatewayIntentBits.GuildEmojisAndStickers |
			// GatewayIntentBits.GuildWebhooks |
			// GatewayIntentBits.GuildInvites |
			// GatewayIntentBits.GuildVoiceStates |
			// GatewayIntentBits.GuildPresences |
			// GatewayIntentBits.GuildMessages |
			// GatewayIntentBits.GuildMessageReactions |
			// GatewayIntentBits.DirectMessages |
			// GatewayIntentBits.MessageContent |
			// GatewayIntentBits.GuildScheduledEvents |
			// GatewayIntentBits.AutoModerationExecution
            ,
		presence: { status: "dnd" },
	},
	commandErrorMessage: `An error occurred.`,
});
process.on("uncaughtException", () => undefined)
 client.user.setStatus("online")
 client.user.setActivity({type:ActivityType.Custom,name:'Thinkin Miku'})