import { client } from "strife.js";

const dbChannel = await client.channels.fetch("1279189690251083869").catch(() => null)
if (!dbChannel || !dbChannel.isTextBased())
    throw new ReferenceError("DB channel not found")

const message = (await dbChannel.messages.fetchPinned()).first() ?? await (async () => {
    const m = await dbChannel.send("idk its a database what do you want")
    await m.pin()
    return m
})()

export let data: {
    users: string[]
} = (await (await fetch(message.attachments.first()?.url ?? "").catch(() => null))?.json()) ?? {
    users: []
}
        
setInterval(() => {
    const files = [
        { attachment: Buffer.from(JSON.stringify(data), "utf8"), name: `data.txt` },
    ];
    message.edit({ files })
}, 1000 * 60)